import { SiteCard, SiteCardContent } from '@/components/ui/SiteCard'
import { SiteButton } from '@/components/ui/SiteButton'
import { CreditCard, FileText, CheckCircle2, Clock } from 'lucide-react'

export default function PatientBilling() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-heading font-extrabold text-brand-ink mb-2">Billing & Invoices</h1>
        <p className="text-muted-foreground font-body text-lg">View your payment history and outstanding balances.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <SiteCard className="border-brand-teal/20 bg-white/70 backdrop-blur-xl shadow-md">
          <SiteCardContent className="flex flex-row items-center justify-between pb-2">
            <div className="text-sm font-heading font-semibold text-brand-ink">Outstanding Balance</div>
            <CreditCard className="h-4 w-4 text-brand-teal" />
          </SiteCardContent>
          <SiteCardContent>
            <div className="text-2xl font-bold font-heading text-brand-ink">$150.00</div>
            <p className="text-xs text-muted-foreground font-body mt-1">Due by Oct 30, 2026</p>
            <SiteButton className="w-full mt-4 font-heading border-2 border-brand-teal bg-white text-brand-teal hover:bg-brand-teal hover:text-white transition-colors">
              Make a Payment
            </SiteButton>
          </SiteCardContent>
        </SiteCard>

        <SiteCard className="border-brand-teal/20 bg-white/70 backdrop-blur-xl shadow-md">
          <SiteCardContent className="flex flex-row items-center justify-between pb-2">
            <div className="text-sm font-heading font-semibold text-brand-ink">Last Payment</div>
            <CheckCircle2 className="h-4 w-4 text-brand-teal" />
          </SiteCardContent>
          <SiteCardContent>
            <div className="text-2xl font-bold font-heading text-brand-ink">$150.00</div>
            <p className="text-xs text-muted-foreground font-body mt-1">Paid on Oct 10, 2026</p>
          </SiteCardContent>
        </SiteCard>
      </div>

      <SiteCard className="border-brand-teal/20 bg-white/70 backdrop-blur-xl shadow-md">
        <SiteCardContent>
          <div className="font-heading text-xl">Recent Invoices</div>
          <p className="font-body">Your recent billing statements.</p>
        </SiteCardContent>
        <SiteCardContent>
          <div className="space-y-4">
            <div className="flex flex-col md:flex-row md:items-center justify-between border-2 border-brand-teal/10 p-4 rounded-md">
              <div className="space-y-1">
                <div className="flex items-center text-brand-ink font-heading font-bold">
                  <FileText className="mr-2 h-4 w-4 text-brand-teal" />
                  Invoice #INV-2026-004
                </div>
                <div className="text-sm text-muted-foreground font-body">Gazelle Chair Session (Oct 24, 2026)</div>
              </div>
              <div className="mt-4 md:mt-0 flex items-center justify-between md:space-x-4">
                <div className="text-right">
                  <div className="font-heading font-bold text-lg text-brand-ink">$150.00</div>
                  <div className="text-xs font-bold text-amber-500 uppercase flex items-center justify-end"><Clock className="mr-1 h-3 w-3"/> Unpaid</div>
                </div>
                <SiteButton variant="outline" className="border-2 border-brand-teal/20 hover:bg-brand-teal/10">View PDF</SiteButton>
              </div>
            </div>

            <div className="flex flex-col md:flex-row md:items-center justify-between border-2 border-brand-teal/10 p-4 rounded-md opacity-70">
              <div className="space-y-1">
                <div className="flex items-center text-brand-ink font-heading font-bold">
                  <FileText className="mr-2 h-4 w-4 text-muted-foreground" />
                  Invoice #INV-2026-003
                </div>
                <div className="text-sm text-muted-foreground font-body">Gazelle Chair Session (Oct 17, 2026)</div>
              </div>
              <div className="mt-4 md:mt-0 flex items-center justify-between md:space-x-4">
                <div className="text-right">
                  <div className="font-heading font-bold text-lg text-brand-ink">$150.00</div>
                  <div className="text-xs font-bold text-green-600 uppercase flex items-center justify-end"><CheckCircle2 className="mr-1 h-3 w-3"/> Paid</div>
                </div>
                <SiteButton variant="outline" className="border-2 border-brand-teal/20 hover:bg-brand-teal/10">View PDF</SiteButton>
              </div>
            </div>
          </div>
        </SiteCardContent>
      </SiteCard>
    </div>
  )
}
