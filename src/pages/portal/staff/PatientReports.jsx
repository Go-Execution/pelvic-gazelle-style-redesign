import { SiteCard, SiteCardContent } from '@/components/ui/SiteCard'
import { SiteButton } from '@/components/ui/SiteButton'
import { ClipboardList, Save } from 'lucide-react'

export default function LogSession() {
  const handleSave = (e) => {
    e.preventDefault()
    // Logic to save the session to Supabase would go here
    alert("Session logged successfully!")
  }

  return (
    <div className="space-y-8 max-w-3xl mx-auto">
      <div>
        <h1 className="text-3xl font-heading font-extrabold text-brand-ink mb-2">Patient Reports & Sessions</h1>
        <p className="text-muted-foreground font-body text-lg">Record treatment metrics and view reports for a patient.</p>
      </div>

      <SiteCard className="border-brand-teal/20 bg-white/70 backdrop-blur-xl shadow-md">
        <SiteCardContent>
          <div className="font-heading text-xl flex items-center">
            <ClipboardList className="mr-2 h-5 w-5 text-brand-teal" /> Session Details
          </div>
          <p className="font-body">Enter the data from today's treatment.</p>
        </SiteCardContent>
        <SiteCardContent>
          <form onSubmit={handleSave} className="space-y-6">
            <div className="space-y-2">
              <label className="font-heading font-bold text-brand-ink text-sm block">Select Patient</label>
              <select className="w-full px-4 py-2 border-2 border-brand-teal/20 rounded-md font-body focus:outline-none focus:border-brand-teal bg-white">
                <option value="">-- Choose a Patient --</option>
                <option value="p1">Sarah Johnson (DOB: 1985-04-12)</option>
                <option value="p2">Jane Doe (DOB: 1990-08-22)</option>
              </select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="font-heading font-bold text-brand-ink text-sm block">Session Date</label>
                <input type="date" required className="w-full px-4 py-2 border-2 border-brand-teal/20 rounded-md font-body focus:outline-none focus:border-brand-teal" />
              </div>
              <div className="space-y-2">
                <label className="font-heading font-bold text-brand-ink text-sm block">Duration (minutes)</label>
                <input type="number" min="1" required className="w-full px-4 py-2 border-2 border-brand-teal/20 rounded-md font-body focus:outline-none focus:border-brand-teal" placeholder="30" />
              </div>
            </div>

            <div className="space-y-2">
              <label className="font-heading font-bold text-brand-ink text-sm block">Kegels Equivalent</label>
              <input type="number" min="0" required className="w-full px-4 py-2 border-2 border-brand-teal/20 rounded-md font-body focus:outline-none focus:border-brand-teal" placeholder="e.g. 11000" />
            </div>

            <div className="space-y-2">
              <label className="font-heading font-bold text-brand-ink text-sm block">Clinical Notes</label>
              <textarea rows={4} className="w-full px-4 py-2 border-2 border-brand-teal/20 rounded-md font-body focus:outline-none focus:border-brand-teal" placeholder="Enter observations and notes here..."></textarea>
            </div>

            <SiteButton type="submit" className="w-full font-heading border-2 border-brand-teal bg-brand-teal text-white hover:bg-dark hover:border-brand-teal/20 transition-colors">
              <Save className="mr-2 h-4 w-4" /> Save Session Log
            </SiteButton>
          </form>
        </SiteCardContent>
      </SiteCard>
    </div>
  )
}
