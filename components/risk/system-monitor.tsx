"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Server, Database, Wifi, Cpu, HardDrive } from "lucide-react"
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer } from "recharts"

const systemMetrics = [
  {
    name: "CPU使用率",
    value: 45,
    status: "normal",
    icon: Cpu,
    unit: "%",
  },
  {
    name: "内存使用率",
    value: 68,
    status: "warning",
    icon: HardDrive,
    unit: "%",
  },
  {
    name: "数据库连接",
    value: 85,
    status: "normal",
    icon: Database,
    unit: "%",
  },
  {
    name: "网络延迟",
    value: 12,
    status: "good",
    icon: Wifi,
    unit: "ms",
  },
]

const performanceData = [
  { time: "14:00", cpu: 42, memory: 65, network: 10 },
  { time: "14:15", cpu: 45, memory: 67, network: 12 },
  { time: "14:30", cpu: 48, memory: 70, network: 15 },
  { time: "14:45", cpu: 44, memory: 68, network: 11 },
  { time: "15:00", cpu: 45, memory: 68, network: 12 },
]

const serviceStatus = [
  { name: "交易引擎", status: "running", uptime: "99.9%", lastRestart: "2024-01-10" },
  { name: "行情服务", status: "running", uptime: "99.8%", lastRestart: "2024-01-12" },
  { name: "风控系统", status: "running", uptime: "100%", lastRestart: "2024-01-08" },
  { name: "数据库", status: "warning", uptime: "98.5%", lastRestart: "2024-01-15" },
  { name: "API网关", status: "running", uptime: "99.7%", lastRestart: "2024-01-11" },
]

export function SystemMonitor() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Server className="w-5 h-5 text-primary" />
          <span>系统监控</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* 系统指标 */}
        <div className="grid grid-cols-2 gap-4">
          {systemMetrics.map((metric, index) => {
            const Icon = metric.icon
            return (
              <div key={index} className="p-3 bg-muted/30 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    <Icon className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm font-medium">{metric.name}</span>
                  </div>
                  <Badge
                    variant={
                      metric.status === "good" ? "secondary" : metric.status === "warning" ? "destructive" : "outline"
                    }
                    className={
                      metric.status === "good"
                        ? "bg-accent/20 text-accent"
                        : metric.status === "warning"
                          ? "bg-yellow-500/20 text-yellow-600"
                          : ""
                    }
                  >
                    {metric.status === "good" ? "优秀" : metric.status === "warning" ? "警告" : "正常"}
                  </Badge>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Progress
                      value={metric.value}
                      className={`flex-1 mr-2 ${metric.status === "warning" ? "bg-yellow-500/20" : "bg-accent/20"}`}
                    />
                    <span className="text-sm font-bold">
                      {metric.value}
                      {metric.unit}
                    </span>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* 性能趋势 */}
        <div className="space-y-3">
          <h4 className="font-medium text-sm">性能趋势</h4>
          <div className="h-32">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={performanceData}>
                <XAxis dataKey="time" stroke="hsl(var(--muted-foreground))" fontSize={10} />
                <YAxis stroke="hsl(var(--muted-foreground))" fontSize={10} />
                <Line type="monotone" dataKey="cpu" stroke="hsl(var(--chart-1))" strokeWidth={1} dot={false} />
                <Line type="monotone" dataKey="memory" stroke="hsl(var(--chart-2))" strokeWidth={1} dot={false} />
                <Line type="monotone" dataKey="network" stroke="hsl(var(--chart-3))" strokeWidth={1} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div className="flex items-center space-x-4 text-xs">
            <div className="flex items-center space-x-1">
              <div className="w-2 h-0.5 bg-chart-1" />
              <span>CPU</span>
            </div>
            <div className="flex items-center space-x-1">
              <div className="w-2 h-0.5 bg-chart-2" />
              <span>内存</span>
            </div>
            <div className="flex items-center space-x-1">
              <div className="w-2 h-0.5 bg-chart-3" />
              <span>网络</span>
            </div>
          </div>
        </div>

        {/* 服务状态 */}
        <div className="space-y-3">
          <h4 className="font-medium text-sm">服务状态</h4>
          <div className="space-y-2">
            {serviceStatus.map((service, index) => (
              <div key={index} className="flex items-center justify-between p-2 bg-muted/20 rounded text-sm">
                <div className="flex items-center space-x-2">
                  <div
                    className={`w-2 h-2 rounded-full ${service.status === "running" ? "bg-accent" : "bg-yellow-500"}`}
                  />
                  <span className="font-medium">{service.name}</span>
                </div>
                <div className="flex items-center space-x-4 text-xs">
                  <span className="text-muted-foreground">运行时间: {service.uptime}</span>
                  <Badge variant={service.status === "running" ? "secondary" : "destructive"}>
                    {service.status === "running" ? "运行中" : "警告"}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
