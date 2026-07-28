'use server'

import { createClient } from '@/utils/supabase/server'
import { revalidatePath } from 'next/cache'

export async function bookAppointment(formData: FormData) {
  const supabase = await createClient()
  
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) {
    return { error: 'Unauthorized' }
  }

  // Get data from form (in a real app, you would parse and validate this, e.g., with Zod)
  // const date = formData.get('date')
  // const time = formData.get('time')
  // const type = formData.get('type')
  
  // Here we simulate the booking process
  const mockBooking = {
    patient_id: user.id,
    appointment_date: new Date().toISOString(), // Mock date
    status: 'scheduled',
    notes: 'Booked via portal'
  }

  const { data, error } = await supabase
    .from('appointments')
    .insert(mockBooking)
    .select()

  if (error) {
    console.error('Error booking appointment:', error)
    return { error: error.message }
  }

  // Revalidate the appointments page to show the new booking
  revalidatePath('/dashboard/patient/appointments')
  revalidatePath('/dashboard/staff')
  
  return { success: true, data }
}

export async function cancelAppointment(appointmentId: string) {
  const supabase = await createClient()
  
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) {
    return { error: 'Unauthorized' }
  }

  const { error } = await supabase
    .from('appointments')
    .update({ status: 'cancelled' })
    .eq('id', appointmentId)
    .eq('patient_id', user.id) // Security check: patient must own the appointment

  if (error) {
    console.error('Error cancelling appointment:', error)
    return { error: error.message }
  }

  revalidatePath('/dashboard/patient/appointments')
  revalidatePath('/dashboard/staff')
  
  return { success: true }
}
