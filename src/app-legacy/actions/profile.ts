'use server'

import { createClient } from '@/utils/supabase/server'
import { revalidatePath } from 'next/cache'

export async function updateAdminProfile(formData: FormData) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    throw new Error('Not authenticated')
  }

  const firstName = formData.get('first_name') as string
  const lastName = formData.get('last_name') as string
  const phone = formData.get('phone') as string

  const { error } = await supabase
    .from('profiles')
    .update({
      first_name: firstName,
      last_name: lastName,
      phone: phone
    })
    .eq('id', user.id)

  if (error) {
    console.error('Error updating admin profile:', error)
    return { error: error.message }
  }

  revalidatePath('/admin/profile')
  
  return { success: true }
}

export async function updateStaffProfile(formData: FormData) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    throw new Error('Not authenticated')
  }

  const firstName = formData.get('first_name') as string
  const lastName = formData.get('last_name') as string
  const phone = formData.get('phone') as string

  const { error } = await supabase
    .from('profiles')
    .update({
      first_name: firstName,
      last_name: lastName,
      phone: phone
    })
    .eq('id', user.id)

  if (error) {
    console.error('Error updating staff profile:', error)
    return { error: error.message }
  }

  revalidatePath('/admin/profile')
  revalidatePath('/doc-nurse/profile')
  
  return { success: true }
}

export async function updatePatientProfile(formData: FormData) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    throw new Error('Not authenticated')
  }

  const firstName = formData.get('first_name') as string
  const lastName = formData.get('last_name') as string
  const phone = formData.get('phone') as string
  const emergencyContactName = formData.get('emergency_contact_name') as string
  const emergencyContactPhone = formData.get('emergency_contact_phone') as string

  // Update profile data
  const { error: profileError } = await supabase
    .from('profiles')
    .update({
      first_name: firstName,
      last_name: lastName,
      phone: phone
    })
    .eq('id', user.id)

  if (profileError) {
    console.error('Error updating patient profile:', profileError)
    return { error: profileError.message }
  }

  // Update patient data
  const { error: patientError } = await supabase
    .from('patients')
    .update({
      emergency_contact_name: emergencyContactName,
      emergency_contact_phone: emergencyContactPhone
    })
    .eq('profile_id', user.id)

  if (patientError) {
    console.error('Error updating patient emergency info:', patientError)
    return { error: patientError.message }
  }

  revalidatePath('/patient/profile')
  
  return { success: true }
}
