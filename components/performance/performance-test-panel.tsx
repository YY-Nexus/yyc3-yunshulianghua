"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from "recharts"
import {
  Zap,
  Target,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  Clock,
  Cpu,
  Database,
  Network,
  MemoryStick,
} from "lucide-react"

interface PerformanceTest {
  id: string
  name: string
  type: "load" | "stress" | "spike" | "volume" | "endurance"
  status: "idle" | "running" | "completed" | "failed"
  progress: number
  duration: number
  results?: PerformanceResult
}

interface PerformanceResult {
  avgResponseTime: number
  p95ResponseTime: number
  p99ResponseTime: number
  throughput: number
  errorRate: number
  cpuUsage: number
  memoryUsage: number
  recommendations: string[]
}

interface OptimizationSuggestion {
  category: "database" | "api" | "frontend" | "infrastructure"
  priority: "high" | "medium" | "low"
  title: string
  description: string
  impact: string
  effort: string
}

export default function PerformanceTestPanel() {
  const [tests, setTests] = useState<PerformanceTest[]>([
    {
      id: "load_test_1",
      name: "负载测试 - 正常流量",
      type: "load",
      status: "completed",
      progress: 100,
      duration: 300,
      results: {
        avgResponseTime: 125,
        p95ResponseTime: 280,
        p99ResponseTime: 450,
        throughput: 850,
        errorRate: 0.2,
        cpuUsage: 45,
        memoryUsage: 68,
        recommendations: ["优化数据库查询", "增加Redis缓存", "启用CDN加速"],
      },
    },
    {
      id: "stress_test_1",
      name: "压力测试 - 峰值流量",
      type: "stress",
      status: "running",
      progress: 65,
      duration: 600,
    },
    {
      id: "spike_test_1",
      name: "尖峰测试 - 突发流量",
      type: "spike",
      status: "idle",
      progress: 0,
      duration: 180,
    },
  ])

  const [optimizations] = useState<OptimizationSuggestion[]>([
    {
      category: "database",
      priority: "high",
      title: "数据库查询优化",
      description: "优化慢查询，添加合适的索引，使用查询缓存",
      impact: "响应时间减少40%",
      effort: "2-3天",
    },
    {
      category: "api",
      priority: "high",
      title: "API响应缓存",
      description: "为频繁访问的API端点添加Redis缓存层",
      impact: "吞吐量提升60%",
      effort: "1-2天",
    },
    {
      category: "frontend",
      priority: "medium",
      title: "前端资源优化",
      description: "启用代码分割，优化图片加载，使用CDN",
      impact: "页面加载速度提升30%",
      effort: "3-4天",
    },
    {
      category: "infrastructure",
      priority: "medium",
      title: "负载均衡配置",
      description: "配置多实例负载均衡，实现自动扩缩容",
      impact: "并发处理能力提升100%",
      effort: "1周",
    },
  ])

  const [performanceData] = useState([
    { time: "00:00", responseTime: 120, throughput: 800, errorRate: 0.1 },
    { time: "00:05", responseTime: 135, throughput: 850, errorRate: 0.2 },
    { time: "00:10", responseTime: 145, throughput: 820, errorRate: 0.3 },
    { time: "00:15", responseTime: 160, throughput: 780, errorRate: 0.5 },
    { time: "00:20", responseTime: 180, throughput: 750, errorRate: 0.8 },
    { time: "00:25", responseTime: 125, throughput: 870, errorRate: 0.1 },
  ])

  const runTest = (testId: string) => {
    setTests((prev) =>
      prev.map((test) => (test.id === testId ? { ...test, status: "running" as const, progress: 0 } : test)),
    )

    // 模拟测试进度
    const interval = setInterval(() => {
      setTests((prev) =>
        prev.map((test) => {
          if (test.id === testId && test.status === "running") {
            const newProgress = Math.min(test.progress + 5, 100)
            return {
              ...test,
              progress: newProgress,
              status: newProgress === 100 ? ("completed" as const) : ("running" as const),
              results:
                newProgress === 100
                  ? {
                      avgResponseTime: 120 + Math.random() * 50,
                      p95ResponseTime: 250 + Math.random() * 100,
                      p99ResponseTime: 400 + Math.random() * 150,
                      throughput: 800 + Math.random() * 200,
                      errorRate: Math.random() * 1,
                      cpuUsage: 40 + Math.random() * 30,
                      memoryUsage: 60 + Math.random() * 25,
                      recommendations: ["优化数据库连接池", "增加缓存策略", "优化API响应"],
                    }
                  : undefined,
            }
          }
          return test
        }),
      )
    }, 1000)

    setTimeout(
      () => clearInterval(interval),
      (test) => (test.id === testId ? test.duration * 100 : 10000),
    )
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="h-4 w-4 text-emerald-500" />
      case "running":
        return <Clock className="h-4 w-4 text-yellow-500" />
      case "failed":
        return <AlertTriangle className="h-4 w-4 text-red-500" />
      default:
        return <Target className="h-4 w-4 text-gray-500" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-emerald-500/10 text-emerald-500 border-emerald-500/20"
      case "running":
        return "bg-yellow-500/10 text-yellow-500 border-yellow-500/20"
      case "failed":
        return "bg-red-500/10 text-red-500 border-red-500/20"
      default:
        return "bg-gray-500/10 text-gray-500 border-gray-500/20"
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-500/10 text-red-500 border-red-500/20"
      case "medium":
        return "bg-yellow-500/10 text-yellow-500 border-yellow-500/20"
      case "low":
        return "bg-green-500/10 text-green-500 border-green-500/20"
      default:
        return "bg-gray-500/10 text-gray-500 border-gray-500/20"
    }
  }

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "database":
        return <Database className="h-4 w-4" />
      case "api":
        return <Network className="h-4 w-4" />
      case "frontend":
        return <TrendingUp className="h-4 w-4" />
      case "infrastructure":
        return <Cpu className="h-4 w-4" />
      default:
        return <Zap className="h-4 w-4" />
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white">性能测试与优化</h2>
          <p className="text-gray-400">系统性能测试、分析和优化建议</p>
        </div>
        <Button className="bg-emerald-600 hover:bg-emerald-700">
          <Zap className="mr-2 h-4 w-4" />
          新建测试
        </Button>
      </div>

      <Tabs defaultValue="tests" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4 bg-gray-800/50">
          <TabsTrigger value="tests">性能测试</TabsTrigger>
          <TabsTrigger value="results">测试结果</TabsTrigger>
          <TabsTrigger value="optimization">优化建议</TabsTrigger>
          <TabsTrigger value="monitoring">实时监控</TabsTrigger>
        </TabsList>

        <TabsContent value="tests" className="space-y-4">
          <div className="grid gap-4">
            {tests.map((test) => (
              <Card key={test.id} className="bg-gray-800/50 border-gray-700">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      {getStatusIcon(test.status)}
                      <div>
                        <CardTitle className="text-white text-lg">{test.name}</CardTitle>
                        <CardDescription>
                          类型: {test.type} | 持续时间: {test.duration}秒
                        </CardDescription>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge className={getStatusColor(test.status)}>
                        {test.status === "completed"
                          ? "已完成"
                          : test.status === "running"
                            ? "运行中"
                            : test.status === "failed"
                              ? "失败"
                              : "待运行"}
                      </Badge>
                      {test.status === "idle" && (
                        <Button
                          size="sm"
                          onClick={() => runTest(test.id)}
                          className="bg-emerald-600 hover:bg-emerald-700"
                        >
                          开始测试
                        </Button>
                      )}
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  {test.status === "running" && (
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-400">测试进度</span>
                        <span className="text-white">{test.progress}%</span>
                      </div>
                      <Progress value={test.progress} className="h-2" />
                    </div>
                  )}
                  {test.results && (
                    <div className="grid grid-cols-4 gap-4 text-sm">
                      <div>
                        <p className="text-gray-400">平均响应时间</p>
                        <p className="text-white font-mono">{test.results.avgResponseTime.toFixed(0)}ms</p>
                      </div>
                      <div>
                        <p className="text-gray-400">吞吐量</p>
                        <p className="text-white font-mono">{test.results.throughput.toFixed(0)} req/s</p>
                      </div>
                      <div>
                        <p className="text-gray-400">错误率</p>
                        <p className="text-white font-mono">{test.results.errorRate.toFixed(2)}%</p>
                      </div>
                      <div>
                        <p className="text-gray-400">CPU使用率</p>
                        <p className="text-white font-mono">{test.results.cpuUsage.toFixed(0)}%</p>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="results" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="bg-gray-800/50 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white">响应时间趋势</CardTitle>
                <CardDescription>测试期间的响应时间变化</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={performanceData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                    <XAxis dataKey="time" stroke="#9CA3AF" />
                    <YAxis stroke="#9CA3AF" />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "#1F2937",
                        border: "1px solid #374151",
                        borderRadius: "8px",
                      }}
                    />
                    <Line
                      type="monotone"
                      dataKey="responseTime"
                      stroke="#10B981"
                      strokeWidth={2}
                      name="响应时间 (ms)"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card className="bg-gray-800/50 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white">吞吐量分析</CardTitle>
                <CardDescription>系统处理能力变化</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={performanceData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                    <XAxis dataKey="time" stroke="#9CA3AF" />
                    <YAxis stroke="#9CA3AF" />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "#1F2937",
                        border: "1px solid #374151",
                        borderRadius: "8px",
                      }}
                    />
                    <Bar dataKey="throughput" fill="#3B82F6" name="吞吐量 (req/s)" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card className="bg-gray-800/50 border-gray-700">
              <CardContent className="p-6">
                <div className="flex items-center space-x-2">
                  <Clock className="h-5 w-5 text-blue-500" />
                  <div>
                    <p className="text-sm text-gray-400">平均响应时间</p>
                    <p className="text-2xl font-bold text-white">125ms</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="bg-gray-800/50 border-gray-700">
              <CardContent className="p-6">
                <div className="flex items-center space-x-2">
                  <TrendingUp className="h-5 w-5 text-emerald-500" />
                  <div>
                    <p className="text-sm text-gray-400">峰值吞吐量</p>
                    <p className="text-2xl font-bold text-white">870 req/s</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="bg-gray-800/50 border-gray-700">
              <CardContent className="p-6">
                <div className="flex items-center space-x-2">
                  <AlertTriangle className="h-5 w-5 text-yellow-500" />
                  <div>
                    <p className="text-sm text-gray-400">错误率</p>
                    <p className="text-2xl font-bold text-white">0.2%</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="bg-gray-800/50 border-gray-700">
              <CardContent className="p-6">
                <div className="flex items-center space-x-2">
                  <Cpu className="h-5 w-5 text-purple-500" />
                  <div>
                    <p className="text-sm text-gray-400">CPU峰值</p>
                    <p className="text-2xl font-bold text-white">68%</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="optimization" className="space-y-4">
          <div className="grid gap-4">
            {optimizations.map((opt, index) => (
              <Card key={index} className="bg-gray-800/50 border-gray-700">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      {getCategoryIcon(opt.category)}
                      <div>
                        <CardTitle className="text-white text-lg">{opt.title}</CardTitle>
                        <CardDescription>{opt.description}</CardDescription>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge className={getPriorityColor(opt.priority)}>
                        {opt.priority === "high" ? "高优先级" : opt.priority === "medium" ? "中优先级" : "低优先级"}
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-gray-400">预期影响:</span>
                      <span className="ml-2 text-emerald-400">{opt.impact}</span>
                    </div>
                    <div>
                      <span className="text-gray-400">实施工作量:</span>
                      <span className="ml-2 text-white">{opt.effort}</span>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <Button size="sm" className="bg-emerald-600 hover:bg-emerald-700">
                      实施优化
                    </Button>
                    <Button size="sm" variant="outline" className="border-gray-600 bg-transparent">
                      查看详情
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="monitoring" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card className="bg-gray-800/50 border-gray-700">
              <CardContent className="p-6">
                <div className="flex items-center space-x-2">
                  <Cpu className="h-5 w-5 text-blue-500" />
                  <div>
                    <p className="text-sm text-gray-400">CPU使用率</p>
                    <p className="text-2xl font-bold text-white">45%</p>
                    <Progress value={45} className="mt-2 h-2" />
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="bg-gray-800/50 border-gray-700">
              <CardContent className="p-6">
                <div className="flex items-center space-x-2">
                  <MemoryStick className="h-5 w-5 text-purple-500" />
                  <div>
                    <p className="text-sm text-gray-400">内存使用率</p>
                    <p className="text-2xl font-bold text-white">68%</p>
                    <Progress value={68} className="mt-2 h-2" />
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="bg-gray-800/50 border-gray-700">
              <CardContent className="p-6">
                <div className="flex items-center space-x-2">
                  <Network className="h-5 w-5 text-emerald-500" />
                  <div>
                    <p className="text-sm text-gray-400">网络吞吐</p>
                    <p className="text-2xl font-bold text-white">12.5 MB/s</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="bg-gray-800/50 border-gray-700">
              <CardContent className="p-6">
                <div className="flex items-center space-x-2">
                  <Database className="h-5 w-5 text-yellow-500" />
                  <div>
                    <p className="text-sm text-gray-400">数据库连接</p>
                    <p className="text-2xl font-bold text-white">23/50</p>
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
