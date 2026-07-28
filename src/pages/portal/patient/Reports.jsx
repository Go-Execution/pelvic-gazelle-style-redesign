import { SiteCard, SiteCardContent } from '@/components/ui/SiteCard'
import { FileText } from 'lucide-react'

export default function PatientReports() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-heading font-extrabold text-brand-ink mb-2">My Reports</h1>
        <p className="text-muted-foreground font-body text-lg">View your treatment metrics and progress reports.</p>
      </div>

      <SiteCard className="border-brand-teal/20 bg-white/70">
        <SiteCardContent className="p-8 text-center">
          <div className="w-16 h-16 bg-brand-sand rounded-full flex items-center justify-center mx-auto mb-4">
            <FileText className="h-8 w-8 text-brand-teal" />
          </div>
          <h2 className="text-xl font-heading font-bold text-brand-ink mb-2">No reports yet</h2>
          <p className="text-muted-foreground max-w-md mx-auto">
            Once you complete a Gazelle Chair session, your reports and metrics will appear here.
          </p>
        </SiteCardContent>
      </SiteCard>
    </div>
  )
}
