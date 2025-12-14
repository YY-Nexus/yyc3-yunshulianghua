"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Activity, Server, Database, Cpu, Zap, CheckCircle, AlertCircle, Clock } from "lucide-react"

interface DeploymentModule {
  id: string
  name: string
  status: "deployed" | "deploying" | "pending" | "error"
  progress: number
  dependencies: string[]
  resources: {
    cpu: string
    memory: string
    storage: string
  }
}

export default function HybridPlatformConfig() {
  const [deploymentModules, setDeploymentModules] = useState<DeploymentModule[]>([
    {
      id: "abu-engine",
      name: "Abu量化策略引擎",
      status: "deployed",
      progress: 100,
      dependencies: ["database", "redis"],
      resources: { cpu: "2 cores", memory: "4GB", storage: "10GB" },
    },
    {
      id: "trading-agents",
      name: "TradingAgents多智能体",
      status: "deployed",
      progress: 100,
      dependencies: ["llm-api", "message-queue"],
      resources: { cpu: "4 cores", memory: "8GB", storage: "5GB" },
    },
    {
      id: "quantum-interface",
      name: "量子计算接口",
      status: "pending",
      progress: 0,
      dependencies: ["cuda-runtime", "gpu-cluster"],
      resources: { cpu: "8 cores", memory: "16GB", storage: "20GB" },
    },
    {
      id: "auto-optimization",
      name: "自动化优化系统",
      status: "deployed",
      progress: 100,
      dependencies: ["abu-engine", "trading-agents"],
      resources: { cpu: "2 cores", memory: "4GB", storage: "5GB" },
    },
    {
      id: "knowledge-graph",
      name: "金融知识图谱",
      status: "deploying",
      progress: 65,
      dependencies: ["neo4j", "data-pipeline"],
      resources: { cpu: "4 cores", memory: "8GB", storage: "50GB" },
    },
  ])

  const [platformConfig, setPlatformConfig] = useState({
    environment: "production",
    scalingMode: "auto",
    loadBalancer: true,
    monitoring: true,
    backup: true,
    ssl: true,
  })

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "deployed":
        return <CheckCircle className="h-4 w-4 text-emerald-500" />
      case "deploying":
        return <Clock className="h-4 w-4 text-yellow-500" />
      case "pending":
        return <AlertCircle className="h-4 w-4 text-gray-500" />
      case "error":
        return <AlertCircle className="h-4 w-4 text-red-500" />
      default:
        return <AlertCircle className="h-4 w-4 text-gray-500" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "deployed":
        return "bg-emerald-500/10 text-emerald-500 border-emerald-500/20"
      case "deploying":
        return "bg-yellow-500/10 text-yellow-500 border-yellow-500/20"
      case "pending":
        return "bg-gray-500/10 text-gray-500 border-gray-500/20"
      case "error":
        return "bg-red-500/10 text-red-500 border-red-500/20"
      default:
        return "bg-gray-500/10 text-gray-500 border-gray-500/20"
    }
  }

  const handleDeploy = (moduleId: string) => {
    setDeploymentModules((prev) =>
      prev.map((module) =>
        module.id === moduleId ? { ...module, status: "deploying" as const, progress: 0 } : module,
      ),
    )

    // 模拟部署进度
    const interval = setInterval(() => {
      setDeploymentModules((prev) =>
        prev.map((module) => {
          if (module.id === moduleId && module.status === "deploying") {
            const newProgress = Math.min(module.progress + 10, 100)
            return {
              ...module,
              progress: newProgress,
              status: newProgress === 100 ? ("deployed" as const) : ("deploying" as const),
            }
          }
          return module
        }),
      )
    }, 500)

    setTimeout(() => clearInterval(interval), 5000)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white">混合智能平台部署</h2>
          <p className="text-gray-400">管理和部署量化交易系统的各个智能模块</p>
        </div>
        <Button className="bg-emerald-600 hover:bg-emerald-700">
          <Server className="mr-2 h-4 w-4" />
          全量部署
        </Button>
      </div>

      <Tabs defaultValue="modules" className="space-y-4">
        <TabsList className="grid w-full grid-cols-3 bg-gray-800/50">
          <TabsTrigger value="modules">部署模块</TabsTrigger>
          <TabsTrigger value="config">平台配置</TabsTrigger>
          <TabsTrigger value="monitoring">监控状态</TabsTrigger>
        </TabsList>

        <TabsContent value="modules" className="space-y-4">
          <div className="grid gap-4">
            {deploymentModules.map((module) => (
              <Card key={module.id} className="bg-gray-800/50 border-gray-700">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      {getStatusIcon(module.status)}
                      <div>
                        <CardTitle className="text-white text-lg">{module.name}</CardTitle>
                        <CardDescription>依赖: {module.dependencies.join(", ")}</CardDescription>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge className={getStatusColor(module.status)}>
                        {module.status === "deployed"
                          ? "已部署"
                          : module.status === "deploying"
                            ? "部署中"
                            : module.status === "pending"
                              ? "待部署"
                              : "错误"}
                      </Badge>
                      {module.status !== "deployed" && (
                        <Button
                          size="sm"
                          onClick={() => handleDeploy(module.id)}
                          disabled={module.status === "deploying"}
                          className="bg-emerald-600 hover:bg-emerald-700"
                        >
                          {module.status === "deploying" ? "部署中..." : "部署"}
                        </Button>
                      )}
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  {module.status === "deploying" && (
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-400">部署进度</span>
                        <span className="text-white">{module.progress}%</span>
                      </div>
                      <Progress value={module.progress} className="h-2" />
                    </div>
                  )}
                  <div className="grid grid-cols-3 gap-4 text-sm">
                    <div className="flex items-center space-x-2">
                      <Cpu className="h-4 w-4 text-gray-400" />
                      <span className="text-gray-400">CPU:</span>
                      <span className="text-white">{module.resources.cpu}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Database className="h-4 w-4 text-gray-400" />
                      <span className="text-gray-400">内存:</span>
                      <span className="text-white">{module.resources.memory}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Server className="h-4 w-4 text-gray-400" />
                      <span className="text-gray-400">存储:</span>
                      <span className="text-white">{module.resources.storage}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="config" className="space-y-4">
          <Card className="bg-gray-800/50 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white">平台配置</CardTitle>
              <CardDescription>配置混合智能平台的运行参数</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="environment" className="text-white">
                    部署环境
                  </Label>
                  <Select
                    value={platformConfig.environment}
                    onValueChange={(value) => setPlatformConfig((prev) => ({ ...prev, environment: value }))}
                  >
                    <SelectTrigger className="bg-gray-700 border-gray-600">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="development">开发环境</SelectItem>
                      <SelectItem value="staging">测试环境</SelectItem>
                      <SelectItem value="production">生产环境</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="scaling" className="text-white">
                    扩展模式
                  </Label>
                  <Select
                    value={platformConfig.scalingMode}
                    onValueChange={(value) => setPlatformConfig((prev) => ({ ...prev, scalingMode: value }))}
                  >
                    <SelectTrigger className="bg-gray-700 border-gray-600">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="manual">手动扩展</SelectItem>
                      <SelectItem value="auto">自动扩展</SelectItem>
                      <SelectItem value="scheduled">定时扩展</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-white">负载均衡</Label>
                    <p className="text-sm text-gray-400">启用多实例负载均衡</p>
                  </div>
                  <Switch
                    checked={platformConfig.loadBalancer}
                    onCheckedChange={(checked) => setPlatformConfig((prev) => ({ ...prev, loadBalancer: checked }))}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-white">系统监控</Label>
                    <p className="text-sm text-gray-400">启用实时性能监控</p>
                  </div>
                  <Switch
                    checked={platformConfig.monitoring}
                    onCheckedChange={(checked) => setPlatformConfig((prev) => ({ ...prev, monitoring: checked }))}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-white">自动备份</Label>
                    <p className="text-sm text-gray-400">定期备份系统数据</p>
                  </div>
                  <Switch
                    checked={platformConfig.backup}
                    onCheckedChange={(checked) => setPlatformConfig((prev) => ({ ...prev, backup: checked }))}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-white">SSL加密</Label>
                    <p className="text-sm text-gray-400">启用HTTPS安全连接</p>
                  </div>
                  <Switch
                    checked={platformConfig.ssl}
                    onCheckedChange={(checked) => setPlatformConfig((prev) => ({ ...prev, ssl: checked }))}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="monitoring" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card className="bg-gray-800/50 border-gray-700">
              <CardContent className="p-6">
                <div className="flex items-center space-x-2">
                  <Activity className="h-5 w-5 text-emerald-500" />
                  <div>
                    <p className="text-sm text-gray-400">系统状态</p>
                    <p className="text-2xl font-bold text-white">正常</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="bg-gray-800/50 border-gray-700">
              <CardContent className="p-6">
                <div className="flex items-center space-x-2">
                  <Cpu className="h-5 w-5 text-blue-500" />
                  <div>
                    <p className="text-sm text-gray-400">CPU使用率</p>
                    <p className="text-2xl font-bold text-white">45%</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="bg-gray-800/50 border-gray-700">
              <CardContent className="p-6">
                <div className="flex items-center space-x-2">
                  <Database className="h-5 w-5 text-purple-500" />
                  <div>
                    <p className="text-sm text-gray-400">内存使用</p>
                    <p className="text-2xl font-bold text-white">32GB</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="bg-gray-800/50 border-gray-700">
              <CardContent className="p-6">
                <div className="flex items-center space-x-2">
                  <Zap className="h-5 w-5 text-yellow-500" />
                  <div>
                    <p className="text-sm text-gray-400">活跃连接</p>
                    <p className="text-2xl font-bold text-white">1,247</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
