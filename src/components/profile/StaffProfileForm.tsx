'use client'

import { SiteButton } from '@/components/ui/SiteButton'
import { User, Phone, Edit, Check, X } from 'lucide-react'
import { useState } from 'react'
import { supabase } from '@/lib/supabaseClient'
import { toast } from 'sonner'

export function StaffProfileForm({ profile }: { profile: any }) {
  const [isEditing, setIsEditing] = useState(false)
  const [isPending, setIsPending] = useState(false)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsPending(true);
    const formData = new FormData(e.currentTarget);
    
    try {
      const { error } = await supabase
        .from('profiles')
        .update({
          first_name: formData.get('first_name'),
          last_name: formData.get('last_name'),
          phone: formData.get('phone')
        })
        .eq('id', profile.id);
        
      if (error) throw error;
      
      toast.success('Profile updated successfully!')
      setIsEditing(false)
    } catch (err: any) {
      toast.error('Failed to update profile: ' + err.message)
    } finally {
      setIsPending(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="flex justify-between items-center mb-6 border-b border-brand-teal/10 pb-4">
        <h3 className="font-heading text-xl font-bold text-brand-ink">Personal Information</h3>
        {!isEditing ? (
          <SiteButton type="button" variant="ghost" size="sm" onClick={() => setIsEditing(true)}>
            <Edit className="h-4 w-4 mr-2" /> Edit
          </SiteButton>
        ) : (
          <div className="flex gap-2">
            <SiteButton type="button" variant="ghost" size="sm" onClick={() => setIsEditing(false)} className="text-muted-foreground hover:bg-gray-100">
              <X className="h-4 w-4 mr-2" /> Cancel
            </SiteButton>
            <SiteButton type="submit" size="sm" disabled={isPending}>
              <Check className="h-4 w-4 mr-2" /> {isPending ? 'Saving...' : 'Save'}
            </SiteButton>
          </div>
        )}
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-1">
          <label className="text-sm font-medium text-muted-foreground flex items-center">
            <User className="h-4 w-4 mr-2 text-brand-teal" /> First Name
          </label>
          {isEditing ? (
            <input 
              name="first_name" 
              defaultValue={profile.first_name || ''} 
              className="w-full px-3 py-2 border-2 border-brand-teal/20 rounded-md font-body text-sm bg-white"
              required
            />
          ) : (
            <p className="font-body text-brand-ink capitalize">{profile.first_name || 'Not provided'}</p>
          )}
        </div>
        
        <div className="space-y-1">
          <label className="text-sm font-medium text-muted-foreground flex items-center">
            <User className="h-4 w-4 mr-2 text-brand-teal" /> Last Name
          </label>
          {isEditing ? (
            <input 
              name="last_name" 
              defaultValue={profile.last_name || ''} 
              className="w-full px-3 py-2 border-2 border-brand-teal/20 rounded-md font-body text-sm bg-white"
              required
            />
          ) : (
            <p className="font-body text-brand-ink capitalize">{profile.last_name || 'Not provided'}</p>
          )}
        </div>
        
        <div className="space-y-1">
          <label className="text-sm font-medium text-muted-foreground flex items-center">
            <Phone className="h-4 w-4 mr-2 text-brand-teal" /> Phone Number
          </label>
          {isEditing ? (
            <input 
              name="phone" 
              type="tel"
              defaultValue={profile.phone || ''} 
              className="w-full px-3 py-2 border-2 border-brand-teal/20 rounded-md font-body text-sm bg-white"
            />
          ) : (
            <p className="font-body text-brand-ink">{profile.phone || 'Not provided'}</p>
          )}
        </div>
      </div>
    </form>
  )
}
