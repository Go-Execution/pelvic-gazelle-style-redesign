import { SiteCard, SiteCardContent } from '@/components/ui/SiteCard'
import { SiteButton } from '@/components/ui/SiteButton'
import { Calendar, Clock, MapPin } from 'lucide-react'

export default function PatientAppointments() {
  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-heading font-extrabold text-brand-ink mb-2">My Appointments</h1>
          <p className="text-muted-foreground font-body text-lg">Manage your upcoming and past sessions.</p>
        </div>
        <SiteButton className="font-heading border-2 border-brand-teal bg-white text-brand-teal hover:bg-brand-teal hover:text-white transition-colors">
          <Calendar className="mr-2 h-4 w-4" /> Book New Appointment
        </SiteButton>
      </div>

      <div className="grid gap-6">
        <SiteCard className="border-brand-teal/20 bg-white/70 backdrop-blur-xl shadow-md">
          <SiteCardContent>
            <div className="font-heading text-xl">Upcoming Appointments</div>
            <p className="font-body">Your next scheduled visits.</p>
          </SiteCardContent>
          <SiteCardContent className="space-y-4">
            {/* Example Appointment Item */}
            <div className="flex flex-col md:flex-row md:items-center justify-between border-2 border-brand-teal/10 p-4 rounded-md">
              <div className="space-y-2">
                <div className="flex items-center text-brand-ink font-heading font-bold text-lg">
                  <Calendar className="mr-2 h-5 w-5 text-brand-teal" />
                  October 24, 2026
                </div>
                <div className="flex items-center text-muted-foreground font-body text-sm space-x-4">
                  <span className="flex items-center"><Clock className="mr-1 h-4 w-4" /> 10:00 AM - 10:30 AM</span>
                  <span className="flex items-center"><MapPin className="mr-1 h-4 w-4" /> Main Clinic</span>
                </div>
              </div>
              <div className="mt-4 md:mt-0 flex space-x-2">
                <SiteButton variant="outline" className="border-2 border-brand-teal/20 font-heading font-semibold hover:bg-brand-teal/10">Reschedule</SiteButton>
                <SiteButton variant="outline" className="border-2 border-destructive text-red-500 font-heading font-semibold hover:bg-red-50 hover:text-white">Cancel</SiteButton>
              </div>
            </div>
          </SiteCardContent>
        </SiteCard>

        <SiteCard className="border-brand-teal/20 bg-white/70 backdrop-blur-xl shadow-md">
          <SiteCardContent>
            <div className="font-heading text-xl">Past Appointments</div>
            <p className="font-body">History of your completed sessions.</p>
          </SiteCardContent>
          <SiteCardContent>
             <div className="flex flex-col border-2 border-brand-teal/10 p-4 rounded-md opacity-70">
              <div className="space-y-2">
                <div className="flex items-center text-brand-ink font-heading font-bold text-lg">
                  <Calendar className="mr-2 h-5 w-5 text-muted-foreground" />
                  October 17, 2026
                </div>
                <div className="flex items-center text-muted-foreground font-body text-sm space-x-4">
                  <span className="flex items-center"><Clock className="mr-1 h-4 w-4" /> 09:30 AM - 10:00 AM</span>
                  <span className="flex items-center">Status: Completed</span>
                </div>
              </div>
            </div>
          </SiteCardContent>
        </SiteCard>
      </div>
    </div>
  )
}
