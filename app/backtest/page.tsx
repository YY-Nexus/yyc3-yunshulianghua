import { StrategyList } from "@/components/backtest/strategy-list"
import { BacktestResults } from "@/components/backtest/backtest-results"
import { StrategyBuilder } from "@/components/backtest/strategy-builder"
import { PerformanceMetrics } from "@/components/backtest/performance-metrics"
import { AbuStrategyEngine } from "@/components/backtest/abu-strategy-engine"
import { Header } from "@/components/header"
import { Sidebar } from "@/components/sidebar"

export default function BacktestPage() {
  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-auto p-6">
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h1 className="text-2xl font-bold">策略回测</h1>
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <div className="w-2 h-2 bg-accent rounded-full animate-pulse" />
                <span>Abu引擎就绪</span>
              </div>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-5 gap-6">
              <div className="xl:col-span-1">
                <StrategyList />
              </div>
              <div className="xl:col-span-2">
                <BacktestResults />
              </div>
              <div className="xl:col-span-1">
                <StrategyBuilder />
              </div>
              <div className="xl:col-span-1">
                <AbuStrategyEngine />
              </div>
            </div>

            <PerformanceMetrics />
          </div>
        </main>
      </div>
    </div>
  )
}
