"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Cpu, MemoryStick, HardDrive, Network, Activity, AlertTriangle, CheckCircle, Clock } from "lucide-react"
import { useEffect, useState } from "react"

interface SystemMetrics {
  cpu: number
  memory: number
  disk: number
  network: number
  uptime: number
  requests: number
  errors: number
}

interface ServiceStatus {
  name: string
  status: "healthy" | "warning" | "error"
  uptime: string
  lastCheck: string
  responseTime: number
}

export function SystemMonitor() {
  const [metrics, setMetrics] = useState<SystemMetrics>({
    cpu: 45,
    memory: 68,
    disk: 32,
    network: 12,
    uptime: 99.9,
    requests: 1247,
    errors: 3,
  })

  const [services, setServices] = useState<ServiceStatus[]>([
    {
      name: "前端应用",
      status: "healthy",
      uptime: "99.9%",
      lastCheck: "2分钟前",
      responseTime: 120,
    },
    {
      name: "API服务",
      status: "healthy",
      uptime: "99.8%",
      lastCheck: "1分钟前",
      responseTime: 85,
    },
    {
      name: "数据库",
      status: "warning",
      uptime: "99.5%",
      lastCheck: "30秒前",
      responseTime: 250,
    },
    {
      name: "Redis缓存",
      status: "healthy",
      uptime: "100%",
      lastCheck: "1分钟前",
      responseTime: 15,
    },
    {
      name: "消息队列",
      status: "healthy",
      uptime: "99.9%",
      lastCheck: "2分钟前",
      responseTime: 45,
    },
    {
      name: "AI模型服务",
      status: "error",
      uptime: "95.2%",
      lastCheck: "5分钟前",
      responseTime: 0,
    },
  ])

  // 模拟实时数据更新
  useEffect(() => {
    const interval = setInterval(() => {
      setMetrics((prev) => ({
        ...prev,
        cpu: Math.max(10, Math.min(90, prev.cpu + (Math.random() - 0.5) * 10)),
        memory: Math.max(20, Math.min(95, prev.memory + (Math.random() - 0.5) * 5)),
        network: Math.max(0, Math.min(100, prev.network + (Math.random() - 0.5) * 20)),
        requests: prev.requests + Math.floor(Math.random() * 10),
        errors: prev.errors + (Math.random() > 0.95 ? 1 : 0),
      }))
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  const getStatusColor = (status: string) => {
    switch (status) {
      case "healthy":
        return "bg-accent/20 text-accent"
      case "warning":
        return "bg-yellow-500/20 text-yellow-500"
      case "error":
        return "bg-destructive/20 text-destructive"
      default:
        return "bg-muted"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "healthy":
        return <CheckCircle className="w-4 h-4" />
      case "warning":
        return <AlertTriangle className="w-4 h-4" />
      case "error":
        return <AlertTriangle className="w-4 h-4" />
      default:
        return <Clock className="w-4 h-4" />
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">系统监控</h2>
        <div className="flex items-center space-x-2">
          <Badge variant="outline" className="bg-accent/20 text-accent">
            <Activity className="w-3 h-3 mr-1" />
            系统正常
          </Badge>
          <Button variant="outline" size="sm">
            刷新数据
          </Button>
        </div>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">系统概览</TabsTrigger>
          <TabsTrigger value="services">服务状态</TabsTrigger>
          <TabsTrigger value="performance">性能指标</TabsTrigger>
          <TabsTrigger value="deployment">部署配置</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-4 gap-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">CPU使用率</CardTitle>
                <Cpu className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{metrics.cpu.toFixed(1)}%</div>
                <Progress value={metrics.cpu} className="mt-2" />
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">内存使用率</CardTitle>
                <MemoryStick className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{metrics.memory.toFixed(1)}%</div>
                <Progress value={metrics.memory} className="mt-2" />
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">磁盘使用率</CardTitle>
                <HardDrive className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{metrics.disk}%</div>
                <Progress value={metrics.disk} className="mt-2" />
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">网络流量</CardTitle>
                <Network className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{metrics.network.toFixed(1)} MB/s</div>
                <Progress value={metrics.network} className="mt-2" />
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">系统运行时间</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-accent">{metrics.uptime}%</div>
                <p className="text-sm text-muted-foreground mt-2">过去30天可用性</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">请求处理</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{metrics.requests.toLocaleString()}</div>
                <p className="text-sm text-muted-foreground mt-2">今日总请求数</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">错误统计</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-destructive">{metrics.errors}</div>
                <p className="text-sm text-muted-foreground mt-2">今日错误次数</p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="services" className="space-y-4">
          <div className="grid gap-4">
            {services.map((service) => (
              <Card key={service.name}>
                <CardContent className="flex items-center justify-between p-6">
                  <div className="flex items-center space-x-4">
                    <div className={`p-2 rounded-full ${getStatusColor(service.status)}`}>
                      {getStatusIcon(service.status)}
                    </div>
                    <div>
                      <h3 className="font-medium">{service.name}</h3>
                      <p className="text-sm text-muted-foreground">
                        运行时间: {service.uptime} | 最后检查: {service.lastCheck}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-mono text-sm">
                      {service.responseTime > 0 ? `${service.responseTime}ms` : "离线"}
                    </div>
                    <Badge variant="outline" className={getStatusColor(service.status)}>
                      {service.status === "healthy" ? "正常" : service.status === "warning" ? "警告" : "错误"}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="performance" className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>API响应时间</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">平均响应时间</span>
                    <span className="font-mono">125ms</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">P95响应时间</span>
                    <span className="font-mono">280ms</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">P99响应时间</span>
                    <span className="font-mono">450ms</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>数据库性能</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">查询平均时间</span>
                    <span className="font-mono">45ms</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">连接池使用率</span>
                    <span className="font-mono">68%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">慢查询数量</span>
                    <span className="font-mono">2</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="deployment" className="space-y-4">
          <div className="grid gap-4">
            <Card>
              <CardHeader>
                <CardTitle>部署环境</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-muted-foreground">环境:</span>
                    <span className="ml-2 font-mono">生产环境</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">版本:</span>
                    <span className="ml-2 font-mono">v1.2.3</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">部署时间:</span>
                    <span className="ml-2 font-mono">2024-01-15 14:30</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">服务器:</span>
                    <span className="ml-2 font-mono">阿里云ECS</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>容器状态</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[
                    { name: "frontend", status: "running", image: "quant-frontend:latest" },
                    { name: "backend", status: "running", image: "quant-backend:latest" },
                    { name: "database", status: "running", image: "timescaledb:latest" },
                    { name: "redis", status: "running", image: "redis:alpine" },
                  ].map((container) => (
                    <div key={container.name} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                      <div>
                        <div className="font-medium">{container.name}</div>
                        <div className="text-sm text-muted-foreground">{container.image}</div>
                      </div>
                      <Badge className="bg-accent/20 text-accent">{container.status}</Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
