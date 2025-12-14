"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { Slider } from "@/components/ui/slider"
import { Progress } from "@/components/ui/progress"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  Bot,
  Settings,
  Play,
  RefreshCw,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  Clock,
  Zap,
  Brain,
  Target,
} from "lucide-react"
import { useState } from "react"

const optimizationTasks = [
  {
    id: "strategy_tuning",
    name: "策略参数调优",
    description: "自动优化交易策略参数以提升收益率",
    status: "running",
    progress: 75,
    lastRun: "2分钟前",
    improvement: "+12.3%",
    priority: "high",
  },
  {
    id: "risk_adjustment",
    name: "风险参数调整",
    description: "动态调整止损止盈和仓位管理参数",
    status: "completed",
    progress: 100,
    lastRun: "15分钟前",
    improvement: "-8.7%",
    priority: "high",
  },
  {
    id: "ml_retraining",
    name: "机器学习重训练",
    description: "基于最新数据重新训练预测模型",
    status: "scheduled",
    progress: 0,
    lastRun: "2小时前",
    improvement: "+5.2%",
    priority: "medium",
  },
  {
    id: "portfolio_rebalance",
    name: "投资组合再平衡",
    description: "根据市场变化自动调整资产配置",
    status: "running",
    progress: 45,
    lastRun: "30分钟前",
    improvement: "+3.8%",
    priority: "medium",
  },
  {
    id: "quantum_optimization",
    name: "量子参数优化",
    description: "使用量子算法优化复杂约束问题",
    status: "pending",
    progress: 0,
    lastRun: "未运行",
    improvement: "预计+15%",
    priority: "low",
  },
]

const optimizationMetrics = [
  { name: "总体收益提升", value: "+18.7%", trend: "up", color: "text-green-500" },
  { name: "风险降低", value: "-12.4%", trend: "down", color: "text-green-500" },
  { name: "夏普比率", value: "2.34", trend: "up", color: "text-accent" },
  { name: "最大回撤", value: "-3.2%", trend: "down", color: "text-green-500" },
  { name: "胜率", value: "73.5%", trend: "up", color: "text-accent" },
  { name: "平均持仓时间", value: "4.2天", trend: "down", color: "text-blue-500" },
]

export function AutoOptimizationPanel() {
  const [autoOptimization, setAutoOptimization] = useState(true)
  const [optimizationFrequency, setOptimizationFrequency] = useState("daily")
  const [riskTolerance, setRiskTolerance] = useState([3])
  const [optimizationTarget, setOptimizationTarget] = useState("sharpe")
  const [isOptimizing, setIsOptimizing] = useState(false)

  const startOptimization = () => {
    setIsOptimizing(true)
    setTimeout(() => setIsOptimizing(false), 10000)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Bot className="w-5 h-5 text-accent" />
          <span>自动化优化系统</span>
          <Badge variant="secondary" className="bg-accent/20 text-accent">
            智能调优
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">概览</TabsTrigger>
            <TabsTrigger value="tasks">优化任务</TabsTrigger>
            <TabsTrigger value="config">配置</TabsTrigger>
            <TabsTrigger value="history">历史</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label>启用自动优化</Label>
                <p className="text-xs text-muted-foreground">系统将自动监控并优化策略性能</p>
              </div>
              <Switch checked={autoOptimization} onCheckedChange={setAutoOptimization} />
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
              {optimizationMetrics.map((metric) => (
                <div key={metric.name} className="p-3 bg-muted/30 rounded-lg">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs text-muted-foreground">{metric.name}</span>
                    {metric.trend === "up" ? (
                      <TrendingUp className="w-3 h-3 text-green-500" />
                    ) : (
                      <TrendingUp className="w-3 h-3 text-green-500 rotate-180" />
                    )}
                  </div>
                  <span className={`text-sm font-bold ${metric.color}`}>{metric.value}</span>
                </div>
              ))}
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Label>优化进度</Label>
                <span className="text-sm text-muted-foreground">
                  {optimizationTasks.filter((t) => t.status === "running").length} 个任务运行中
                </span>
              </div>

              <div className="space-y-2">
                {optimizationTasks
                  .filter((task) => task.status === "running")
                  .map((task) => (
                    <div key={task.id} className="space-y-1">
                      <div className="flex items-center justify-between text-sm">
                        <span>{task.name}</span>
                        <span className="text-muted-foreground">{task.progress}%</span>
                      </div>
                      <Progress value={task.progress} className="h-1" />
                    </div>
                  ))}
              </div>
            </div>

            <div className="p-3 bg-accent/10 border border-accent/20 rounded-lg">
              <div className="flex items-center space-x-2 mb-2">
                <CheckCircle className="w-4 h-4 text-accent" />
                <span className="font-medium text-sm">最近优化成果</span>
              </div>
              <p className="text-xs text-muted-foreground">
                过去24小时内，自动优化系统提升了策略收益率12.3%，降低了风险8.7%，
                夏普比率从1.87提升至2.34。系统建议继续当前优化策略。
              </p>
            </div>
          </TabsContent>

          <TabsContent value="tasks" className="space-y-4">
            <ScrollArea className="h-96">
              <div className="space-y-3">
                {optimizationTasks.map((task) => (
                  <div key={task.id} className="p-4 bg-muted/30 rounded-lg border">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-2">
                        <div className="flex items-center space-x-2">
                          {task.status === "running" && <RefreshCw className="w-4 h-4 text-blue-500 animate-spin" />}
                          {task.status === "completed" && <CheckCircle className="w-4 h-4 text-green-500" />}
                          {task.status === "scheduled" && <Clock className="w-4 h-4 text-orange-500" />}
                          {task.status === "pending" && <AlertTriangle className="w-4 h-4 text-gray-500" />}
                          <span className="font-medium text-sm">{task.name}</span>
                        </div>
                        <Badge
                          variant={
                            task.priority === "high"
                              ? "destructive"
                              : task.priority === "medium"
                                ? "default"
                                : "outline"
                          }
                          className="text-xs"
                        >
                          {task.priority === "high" ? "高优先级" : task.priority === "medium" ? "中优先级" : "低优先级"}
                        </Badge>
                      </div>
                      <Button variant="ghost" size="sm" className="h-6 px-2">
                        <Settings className="w-3 h-3" />
                      </Button>
                    </div>

                    <p className="text-xs text-muted-foreground mb-3">{task.description}</p>

                    {task.status === "running" && (
                      <div className="space-y-1 mb-3">
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-muted-foreground">进度</span>
                          <span>{task.progress}%</span>
                        </div>
                        <Progress value={task.progress} className="h-1" />
                      </div>
                    )}

                    <div className="flex items-center justify-between text-xs">
                      <span className="text-muted-foreground">上次运行: {task.lastRun}</span>
                      <span
                        className={`font-medium ${task.improvement.startsWith("+") ? "text-green-500" : task.improvement.startsWith("-") ? "text-red-500" : "text-muted-foreground"}`}
                      >
                        {task.improvement}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </TabsContent>

          <TabsContent value="config" className="space-y-4">
            <div className="space-y-4">
              <div>
                <Label>优化频率</Label>
                <Select value={optimizationFrequency} onValueChange={setOptimizationFrequency}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="realtime">实时优化</SelectItem>
                    <SelectItem value="hourly">每小时</SelectItem>
                    <SelectItem value="daily">每日</SelectItem>
                    <SelectItem value="weekly">每周</SelectItem>
                    <SelectItem value="monthly">每月</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label>优化目标</Label>
                <Select value={optimizationTarget} onValueChange={setOptimizationTarget}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="sharpe">最大化夏普比率</SelectItem>
                    <SelectItem value="return">最大化收益率</SelectItem>
                    <SelectItem value="risk">最小化风险</SelectItem>
                    <SelectItem value="drawdown">最小化回撤</SelectItem>
                    <SelectItem value="calmar">最大化卡玛比率</SelectItem>
                    <SelectItem value="sortino">最大化索提诺比率</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-3">
                <Label>风险容忍度</Label>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">保守</span>
                    <span className="text-sm">激进</span>
                  </div>
                  <Slider
                    value={riskTolerance}
                    onValueChange={setRiskTolerance}
                    max={5}
                    min={1}
                    step={1}
                    className="w-full"
                  />
                  <div className="text-center">
                    <Badge variant="outline">
                      等级 {riskTolerance[0]} -{" "}
                      {riskTolerance[0] <= 2
                        ? "保守"
                        : riskTolerance[0] <= 3
                          ? "平衡"
                          : riskTolerance[0] <= 4
                            ? "积极"
                            : "激进"}
                    </Badge>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label className="text-xs">最大仓位(%)</Label>
                  <Input type="number" defaultValue="50" max="100" min="1" className="h-8" />
                </div>
                <div>
                  <Label className="text-xs">止损阈值(%)</Label>
                  <Input type="number" defaultValue="5" max="20" min="1" step="0.1" className="h-8" />
                </div>
              </div>

              <div className="space-y-3">
                <Label>启用的优化模块</Label>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Brain className="w-4 h-4 text-blue-500" />
                      <span className="text-sm">Abu策略优化</span>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Bot className="w-4 h-4 text-green-500" />
                      <span className="text-sm">多智能体协作</span>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Zap className="w-4 h-4 text-purple-500" />
                      <span className="text-sm">量子计算优化</span>
                    </div>
                    <Switch />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Target className="w-4 h-4 text-orange-500" />
                      <span className="text-sm">风险管理优化</span>
                    </div>
                    <Switch defaultChecked />
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="history" className="space-y-4">
            <ScrollArea className="h-96">
              <div className="space-y-3">
                <div className="p-3 bg-green-500/10 border border-green-500/20 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span className="font-medium text-sm">策略参数优化完成</span>
                    </div>
                    <span className="text-xs text-muted-foreground">2小时前</span>
                  </div>
                  <p className="text-xs text-muted-foreground mb-2">
                    优化了双均线策略的快慢周期参数，从(5,20)调整为(7,23)
                  </p>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-muted-foreground">收益提升:</span>
                    <span className="font-medium text-green-500">+12.3%</span>
                  </div>
                </div>

                <div className="p-3 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <RefreshCw className="w-4 h-4 text-blue-500" />
                      <span className="font-medium text-sm">机器学习模型重训练</span>
                    </div>
                    <span className="text-xs text-muted-foreground">6小时前</span>
                  </div>
                  <p className="text-xs text-muted-foreground mb-2">基于最新1000条数据重新训练了价格预测模型</p>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-muted-foreground">准确率提升:</span>
                    <span className="font-medium text-blue-500">+5.7%</span>
                  </div>
                </div>

                <div className="p-3 bg-orange-500/10 border border-orange-500/20 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <AlertTriangle className="w-4 h-4 text-orange-500" />
                      <span className="font-medium text-sm">风险参数调整</span>
                    </div>
                    <span className="text-xs text-muted-foreground">12小时前</span>
                  </div>
                  <p className="text-xs text-muted-foreground mb-2">检测到市场波动率上升，自动调整止损位从5%收紧至3%</p>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-muted-foreground">风险降低:</span>
                    <span className="font-medium text-orange-500">-8.2%</span>
                  </div>
                </div>

                <div className="p-3 bg-purple-500/10 border border-purple-500/20 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <Zap className="w-4 h-4 text-purple-500" />
                      <span className="font-medium text-sm">投资组合再平衡</span>
                    </div>
                    <span className="text-xs text-muted-foreground">1天前</span>
                  </div>
                  <p className="text-xs text-muted-foreground mb-2">根据相关性分析调整了资产配置权重，降低了组合风险</p>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-muted-foreground">夏普比率:</span>
                    <span className="font-medium text-purple-500">1.87 → 2.34</span>
                  </div>
                </div>
              </div>
            </ScrollArea>
          </TabsContent>
        </Tabs>

        <div className="flex space-x-2 mt-6">
          <Button className="flex-1" onClick={startOptimization} disabled={isOptimizing || !autoOptimization}>
            {isOptimizing ? (
              <>
                <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                优化中...
              </>
            ) : (
              <>
                <Play className="w-4 h-4 mr-2" />
                立即优化
              </>
            )}
          </Button>
          <Button variant="outline">
            <Settings className="w-4 h-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
