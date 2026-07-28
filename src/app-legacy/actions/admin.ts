'use server'

import { createClient } from '@/utils/supabase/server'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

export async function updateUserRole(formData: FormData) {
  const targetUserId = formData.get('userId') as string
  const newRole = formData.get('role') as string

  if (!targetUserId || !newRole) {
    return { error: 'Missing required fields.' }
  }

  // Ensure new role is never admin
  if (newRole === 'admin') {
    return { error: 'Admin role can only be assigned via Supabase dashboard.' }
  }

  // Ensure new role is valid (only patient or staff)
  if (newRole !== 'patient' && newRole !== 'staff') {
    return { error: 'Invalid role.' }
  }

  const supabase = await createClient()

  // Verify the current user is an admin
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) {
    return { error: 'Not authenticated.' }
  }

  const { data: currentProfile } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', user.id)
    .single()

  if (currentProfile?.role !== 'admin') {
    return { error: 'Unauthorized. Only admins can update roles.' }
  }

  // Update the user's role
  const { error } = await supabase
    .from('profiles')
    .update({ role: newRole })
    .eq('id', targetUserId)

  if (error) {
    return { error: 'Failed to update user role.' }
  }

  // Revalidate the users page to show changes
  revalidatePath('/admin/users')
  
  return { success: true }
}

export async function createStaffUser(prevState: any, formData: FormData) {
  const email = formData.get('email') as string
  const password = formData.get('password') as string
  const firstName = formData.get('firstName') as string
  const lastName = formData.get('lastName') as string
  const role = formData.get('role') as string

  if (!email || !password || !firstName || !lastName || !role) {
    return { error: 'Missing required fields.' }
  }

  if (role !== 'patient' && role !== 'staff') {
    return { error: 'Invalid role.' }
  }

  const supabase = await createClient()

  // Verify the current user is an admin
  const { data: { user: currentUser } } = await supabase.auth.getUser()
  if (!currentUser) {
    return { error: 'Not authenticated.' }
  }

  const { data: currentProfile } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', currentUser.id)
    .single()

  if (currentProfile?.role !== 'admin') {
    return { error: 'Unauthorized. Only admins can create users.' }
  }

  // Create an admin client to bypass RLS and create users
  const { createClient: createSupabaseClient } = await import('@supabase/supabase-js')
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

  if (!supabaseUrl || !supabaseServiceKey) {
    return { error: 'Server configuration error: Missing service role key.' }
  }

  const supabaseAdmin = createSupabaseClient(supabaseUrl, supabaseServiceKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  })

  // Create the user using the admin API
  const { data: newAuthUser, error: createError } = await supabaseAdmin.auth.admin.createUser({
    email: email,
    password: password,
    email_confirm: true, // Auto confirm so they don't need to click a link
    user_metadata: {
      first_name: firstName,
      last_name: lastName
    }
  })

  if (createError) {
    return { error: createError.message }
  }

  if (!newAuthUser.user) {
    return { error: 'Failed to create user.' }
  }

  // Update the user's profile with the specified role and name
  // Note: the trigger creates the profile with 'patient', we must update it
  const { error: profileError } = await supabaseAdmin
    .from('profiles')
    .update({ 
      role: role,
      first_name: firstName,
      last_name: lastName
    })
    .eq('id', newAuthUser.user.id)

  if (profileError) {
    // We created the auth user but failed to update the profile. 
    // This shouldn't happen usually, but we report it.
    return { error: 'User created, but failed to assign role.' }
  }

  revalidatePath('/admin/users')
  
  redirect('/admin/users')
}
