import { SiteCard, SiteCardContent } from '@/components/ui/SiteCard'
import { SiteButton } from '@/components/ui/SiteButton'
import { Users, FileText, Activity } from 'lucide-react'

export default function StaffPatients() {
  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-heading font-extrabold text-brand-ink mb-2">Patient Roster</h1>
          <p className="text-muted-foreground font-body text-lg">Manage patients and view their progress.</p>
        </div>
        <div className="flex space-x-2">
          <input
            type="text"
            placeholder="Search patients..."
            className="px-4 py-2 border-2 border-brand-teal/20 rounded-md font-body focus:outline-none focus:border-brand-teal"
          />
          <SiteButton className="font-heading border-2 border-brand-teal bg-brand-teal text-white hover:bg-dark hover:border-brand-teal/20 transition-colors">
            Search
          </SiteButton>
        </div>
      </div>

      <SiteCard className="border-brand-teal/20 bg-white/70 backdrop-blur-xl shadow-md">
        <SiteCardContent>
          <div className="font-heading text-xl flex items-center">
            <Users className="mr-2 h-5 w-5 text-brand-teal" /> Active Patients
          </div>
          <p className="font-body">Currently undergoing treatment.</p>
        </SiteCardContent>
        <SiteCardContent>
          <div className="space-y-4">
            {/* Example Patient Item */}
            <div className="flex flex-col md:flex-row md:items-center justify-between border-2 border-brand-teal/10 p-4 rounded-md hover:border-brand-teal transition-colors">
              <div className="space-y-1">
                <div className="flex items-center text-brand-ink font-heading font-bold text-lg">
                  Sarah Johnson
                </div>
                <div className="text-sm text-muted-foreground font-body space-x-4">
                  <span>DOB: 1985-04-12</span>
                  <span>Sessions: 2 / 6</span>
                </div>
              </div>
              <div className="mt-4 md:mt-0 flex flex-wrap gap-2">
                <SiteButton variant="outline" className="border-2 border-brand-teal/20 hover:bg-brand-teal/10 text-xs">
                  <Activity className="mr-1 h-3 w-3" /> View Progress
                </SiteButton>
                <SiteButton variant="outline" className="border-2 border-brand-teal/20 hover:bg-brand-teal/10 text-xs">
                  <FileText className="mr-1 h-3 w-3" /> Upload Report
                </SiteButton>
              </div>
            </div>

            <div className="flex flex-col md:flex-row md:items-center justify-between border-2 border-brand-teal/10 p-4 rounded-md hover:border-brand-teal transition-colors">
              <div className="space-y-1">
                <div className="flex items-center text-brand-ink font-heading font-bold text-lg">
                  Jane Doe
                </div>
                <div className="text-sm text-muted-foreground font-body space-x-4">
                  <span>DOB: 1990-08-22</span>
                  <span>Sessions: 4 / 6</span>
                </div>
              </div>
              <div className="mt-4 md:mt-0 flex flex-wrap gap-2">
                <SiteButton variant="outline" className="border-2 border-brand-teal/20 hover:bg-brand-teal/10 text-xs">
                  <Activity className="mr-1 h-3 w-3" /> View Progress
                </SiteButton>
                <SiteButton variant="outline" className="border-2 border-brand-teal/20 hover:bg-brand-teal/10 text-xs">
                  <FileText className="mr-1 h-3 w-3" /> Upload Report
                </SiteButton>
              </div>
            </div>
          </div>
        </SiteCardContent>
      </SiteCard>
    </div>
  )
}
