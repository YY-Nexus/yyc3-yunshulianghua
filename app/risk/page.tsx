import { RiskOverview } from "@/components/risk/risk-overview"
import { PortfolioRisk } from "@/components/risk/portfolio-risk"
import { RiskAlerts } from "@/components/risk/risk-alerts"
import { ComplianceMonitor } from "@/components/risk/compliance-monitor"
import { SystemMonitor } from "@/components/risk/system-monitor"
import { Header } from "@/components/header"
import { Sidebar } from "@/components/sidebar"

export default function RiskPage() {
  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-auto p-6">
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h1 className="text-2xl font-bold">风险管理</h1>
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <div className="w-2 h-2 bg-accent rounded-full animate-pulse" />
                <span>实时监控中</span>
              </div>
            </div>

            <RiskOverview />

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <PortfolioRisk />
              </div>
              <div className="lg:col-span-1">
                <RiskAlerts />
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <ComplianceMonitor />
              <SystemMonitor />
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
