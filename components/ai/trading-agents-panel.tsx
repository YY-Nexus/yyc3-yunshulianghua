"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  Users,
  TrendingUp,
  TrendingDown,
  BarChart3,
  Newspaper,
  Twitter,
  Gavel,
  Play,
  Pause,
  Settings,
} from "lucide-react"
import { useState } from "react"

const agents = [
  {
    id: "market_analyst",
    name: "市场技术分析师",
    role: "技术分析",
    status: "active",
    confidence: 85,
    lastUpdate: "2分钟前",
    icon: BarChart3,
    color: "text-blue-500",
    analysis: "技术指标显示强势上涨趋势，RSI未超买，MACD金叉确认",
  },
  {
    id: "fundamental_analyst",
    name: "基本面分析师",
    role: "基本面分析",
    status: "active",
    confidence: 78,
    lastUpdate: "5分钟前",
    icon: TrendingUp,
    color: "text-green-500",
    analysis: "财报数据良好，营收增长稳定，估值合理",
  },
  {
    id: "news_analyst",
    name: "新闻情绪分析师",
    role: "新闻分析",
    status: "active",
    confidence: 72,
    lastUpdate: "1分钟前",
    icon: Newspaper,
    color: "text-orange-500",
    analysis: "近期新闻整体偏正面，市场情绪乐观",
  },
  {
    id: "social_analyst",
    name: "社交媒体分析师",
    role: "情绪分析",
    status: "active",
    confidence: 68,
    lastUpdate: "3分钟前",
    icon: Twitter,
    color: "text-purple-500",
    analysis: "社交媒体讨论热度上升，投资者情绪积极",
  },
  {
    id: "bull_researcher",
    name: "看涨研究员",
    role: "多头观点",
    status: "debating",
    confidence: 82,
    lastUpdate: "刚刚",
    icon: TrendingUp,
    color: "text-green-600",
    analysis: "多项指标支持看涨观点，建议增持",
  },
  {
    id: "bear_researcher",
    name: "看跌研究员",
    role: "空头观点",
    status: "debating",
    confidence: 65,
    lastUpdate: "刚刚",
    icon: TrendingDown,
    color: "text-red-500",
    analysis: "存在潜在风险，建议谨慎观望",
  },
  {
    id: "trader",
    name: "交易决策员",
    role: "最终决策",
    status: "analyzing",
    confidence: 75,
    lastUpdate: "正在分析",
    icon: Gavel,
    color: "text-accent",
    analysis: "综合各方观点，正在制定最终交易建议...",
  },
]

const llmProviders = [
  { id: "dashscope", name: "阿里百炼", models: ["qwen-turbo", "qwen-plus", "qwen-max"] },
  { id: "deepseek", name: "DeepSeek", models: ["deepseek-chat", "deepseek-coder"] },
  { id: "google", name: "Google AI", models: ["gemini-2.5-pro", "gemini-2.0-flash", "gemini-1.5-pro"] },
  { id: "openrouter", name: "OpenRouter", models: ["gpt-4o", "claude-3.5-sonnet", "llama-3.1-405b"] },
]

export function TradingAgentsPanel() {
  const [selectedProvider, setSelectedProvider] = useState("dashscope")
  const [selectedModel, setSelectedModel] = useState("qwen-plus")
  const [analysisDepth, setAnalysisDepth] = useState("3")
  const [debateRounds, setDebateRounds] = useState("2")
  const [isRunning, setIsRunning] = useState(false)
  const [progress, setProgress] = useState(0)

  const currentProvider = llmProviders.find((p) => p.id === selectedProvider)

  const startAnalysis = () => {
    setIsRunning(true)
    setProgress(0)

    // 模拟分析进度
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          setIsRunning(false)
          return 100
        }
        return prev + Math.random() * 15
      })
    }, 1000)
  }

  return (
    <Card className="h-fit">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Users className="w-5 h-5 text-accent" />
          <span>TradingAgents多智能体</span>
          <Badge variant="secondary" className="bg-accent/20 text-accent">
            协作分析
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="agents" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="agents">智能体团队</TabsTrigger>
            <TabsTrigger value="config">模型配置</TabsTrigger>
            <TabsTrigger value="debate">辩论过程</TabsTrigger>
          </TabsList>

          <TabsContent value="agents" className="space-y-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Label>分析深度等级</Label>
                <Select value={analysisDepth} onValueChange={setAnalysisDepth}>
                  <SelectTrigger className="w-24">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">1级</SelectItem>
                    <SelectItem value="2">2级</SelectItem>
                    <SelectItem value="3">3级</SelectItem>
                    <SelectItem value="4">4级</SelectItem>
                    <SelectItem value="5">5级</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="text-xs text-muted-foreground">
                {analysisDepth === "1" && "快速分析 (2-4分钟) - 基础技术指标"}
                {analysisDepth === "2" && "标准分析 (4-6分钟) - 技术+基本面"}
                {analysisDepth === "3" && "深度分析 (6-10分钟) - 加入新闻情绪"}
                {analysisDepth === "4" && "全面分析 (10-15分钟) - 多轮智能体辩论"}
                {analysisDepth === "5" && "最深度分析 (15-25分钟) - 完整研究报告"}
              </div>
            </div>

            <ScrollArea className="h-96">
              <div className="space-y-3">
                {agents.map((agent) => {
                  const IconComponent = agent.icon
                  return (
                    <div key={agent.id} className="p-3 bg-muted/30 rounded-lg border">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center space-x-2">
                          <IconComponent className={`w-4 h-4 ${agent.color}`} />
                          <span className="font-medium text-sm">{agent.name}</span>
                          <Badge variant="outline" className="text-xs">
                            {agent.role}
                          </Badge>
                        </div>
                        <Badge
                          variant={
                            agent.status === "active"
                              ? "secondary"
                              : agent.status === "debating"
                                ? "default"
                                : "outline"
                          }
                          className={
                            agent.status === "active"
                              ? "bg-green-500/20 text-green-500"
                              : agent.status === "debating"
                                ? "bg-orange-500/20 text-orange-500"
                                : "bg-blue-500/20 text-blue-500"
                          }
                        >
                          {agent.status === "active" ? "活跃" : agent.status === "debating" ? "辩论中" : "分析中"}
                        </Badge>
                      </div>

                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-muted-foreground">置信度</span>
                          <span className="font-medium">{agent.confidence}%</span>
                        </div>
                        <Progress value={agent.confidence} className="h-1" />

                        <p className="text-xs text-muted-foreground">{agent.analysis}</p>

                        <div className="flex items-center justify-between text-xs">
                          <span className="text-muted-foreground">最后更新: {agent.lastUpdate}</span>
                          <Button variant="ghost" size="sm" className="h-6 px-2">
                            <Settings className="w-3 h-3" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </ScrollArea>
          </TabsContent>

          <TabsContent value="config" className="space-y-4">
            <div className="space-y-3">
              <div>
                <Label>LLM提供商</Label>
                <Select value={selectedProvider} onValueChange={setSelectedProvider}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {llmProviders.map((provider) => (
                      <SelectItem key={provider.id} value={provider.id}>
                        {provider.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label>模型选择</Label>
                <Select value={selectedModel} onValueChange={setSelectedModel}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {currentProvider?.models.map((model) => (
                      <SelectItem key={model} value={model}>
                        {model}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label>辩论轮数</Label>
                <Select value={debateRounds} onValueChange={setDebateRounds}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">1轮 (快速)</SelectItem>
                    <SelectItem value="2">2轮 (标准)</SelectItem>
                    <SelectItem value="3">3轮 (深度)</SelectItem>
                    <SelectItem value="4">4轮 (全面)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label className="text-xs">股票代码</Label>
                  <Input placeholder="如: AAPL, 000001" className="h-8" />
                </div>
                <div>
                  <Label className="text-xs">分析日期</Label>
                  <Input type="date" className="h-8" />
                </div>
              </div>

              <div className="p-3 bg-muted/30 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">预估成本</span>
                  <span className="text-sm text-accent">$0.15 - $0.45</span>
                </div>
                <div className="text-xs text-muted-foreground">
                  基于{selectedProvider}的{selectedModel}模型，{analysisDepth}级分析深度
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="debate" className="space-y-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Label>辩论进度</Label>
                <span className="text-sm text-muted-foreground">
                  {isRunning ? `${Math.round(progress)}%` : "待开始"}
                </span>
              </div>
              {isRunning && <Progress value={progress} className="w-full" />}
            </div>

            <ScrollArea className="h-64">
              <div className="space-y-3">
                <div className="p-3 bg-green-500/10 border border-green-500/20 rounded-lg">
                  <div className="flex items-center space-x-2 mb-2">
                    <TrendingUp className="w-4 h-4 text-green-500" />
                    <span className="font-medium text-sm">看涨研究员</span>
                    <Badge variant="outline" className="text-xs">
                      第1轮
                    </Badge>
                  </div>
                  <p className="text-sm">
                    基于技术分析，股价突破关键阻力位，成交量放大确认，建议看涨。
                    MACD金叉，RSI显示强势，目标价位上调15%。
                  </p>
                </div>

                <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg">
                  <div className="flex items-center space-x-2 mb-2">
                    <TrendingDown className="w-4 h-4 text-red-500" />
                    <span className="font-medium text-sm">看跌研究员</span>
                    <Badge variant="outline" className="text-xs">
                      第1轮
                    </Badge>
                  </div>
                  <p className="text-sm">
                    虽然技术面看涨，但基本面存在隐忧。估值偏高，行业增长放缓， 建议谨慎，可能存在回调风险。
                  </p>
                </div>

                <div className="p-3 bg-accent/10 border border-accent/20 rounded-lg">
                  <div className="flex items-center space-x-2 mb-2">
                    <Gavel className="w-4 h-4 text-accent" />
                    <span className="font-medium text-sm">交易决策员</span>
                    <Badge variant="outline" className="text-xs">
                      最终决策
                    </Badge>
                  </div>
                  <p className="text-sm">
                    综合双方观点，技术面确实强势，但需要关注基本面风险。 建议：<strong>谨慎看涨</strong>
                    ，建议仓位控制在30%，设置止损位。
                  </p>
                </div>
              </div>
            </ScrollArea>
          </TabsContent>
        </Tabs>

        <div className="flex space-x-2 mt-6">
          <Button className="flex-1" onClick={startAnalysis} disabled={isRunning}>
            {isRunning ? (
              <>
                <Pause className="w-4 h-4 mr-2" />
                分析中...
              </>
            ) : (
              <>
                <Play className="w-4 h-4 mr-2" />
                启动多智能体分析
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
