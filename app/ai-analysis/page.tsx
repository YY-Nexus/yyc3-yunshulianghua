import { AIRecommendations } from "@/components/ai/ai-recommendations"
import { ChartSuggestions } from "@/components/ai/chart-suggestions"
import { AnomalyDetection } from "@/components/ai/anomaly-detection"
import { TrendAnalysis } from "@/components/ai/trend-analysis"
import { AIInsights } from "@/components/ai/ai-insights"
import { TradingAgentsPanel } from "@/components/ai/trading-agents-panel"
import { MultiAgentDebate } from "@/components/ai/multi-agent-debate"
import { QuantumComputingPanel } from "@/components/quantum/quantum-computing-panel"
import { Header } from "@/components/header"
import { Sidebar } from "@/components/sidebar"

export default function AIAnalysisPage() {
  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-auto p-6">
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h1 className="text-2xl font-bold">AI智能分析</h1>
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                <span>混合智能计算中</span>
              </div>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
              <div className="xl:col-span-1">
                <TradingAgentsPanel />
              </div>
              <div className="xl:col-span-2">
                <MultiAgentDebate />
              </div>
              <div className="xl:col-span-1">
                <QuantumComputingPanel />
              </div>
            </div>

            <AIRecommendations />

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <ChartSuggestions />
              <AnomalyDetection />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <TrendAnalysis />
              </div>
              <div className="lg:col-span-1">
                <AIInsights />
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
