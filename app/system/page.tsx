import { SystemMonitor } from "@/components/deployment/system-monitor"
import { AutoOptimizationPanel } from "@/components/automation/auto-optimization-panel"
import HybridPlatformConfig from "@/components/deployment/hybrid-platform-config"
import FinancialKGPanel from "@/components/knowledge-graph/financial-kg-panel"
import { Header } from "@/components/header"
import { Sidebar } from "@/components/sidebar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import PerformanceTestPanel from "@/components/performance/performance-test-panel"

export default function SystemPage() {
  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-auto p-6">
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h1 className="text-2xl font-bold">系统管理</h1>
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <div className="w-2 h-2 bg-accent rounded-full animate-pulse" />
                <span>混合智能平台运行中</span>
              </div>
            </div>

            <Tabs defaultValue="optimization" className="space-y-4">
              <TabsList className="grid w-full grid-cols-5 bg-gray-800/50">
                <TabsTrigger value="optimization">自动化优化</TabsTrigger>
                <TabsTrigger value="deployment">平台部署</TabsTrigger>
                <TabsTrigger value="knowledge-graph">知识图谱</TabsTrigger>
                <TabsTrigger value="performance">性能测试</TabsTrigger>
                <TabsTrigger value="monitoring">系统监控</TabsTrigger>
              </TabsList>

              <TabsContent value="optimization" className="space-y-6">
                <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                  <AutoOptimizationPanel />
                  <SystemMonitor />
                </div>
              </TabsContent>

              <TabsContent value="deployment" className="space-y-6">
                <HybridPlatformConfig />
              </TabsContent>

              <TabsContent value="knowledge-graph" className="space-y-6">
                <FinancialKGPanel />
              </TabsContent>

              <TabsContent value="performance" className="space-y-6">
                <PerformanceTestPanel />
              </TabsContent>

              <TabsContent value="monitoring" className="space-y-6">
                <SystemMonitor />
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
    </div>
  )
}
