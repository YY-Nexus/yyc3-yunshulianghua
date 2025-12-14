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
import { Brain, Settings, Play } from "lucide-react"
import { useState } from "react"

const abuStrategies = [
  {
    id: "abu_ma_cross",
    name: "Abu双均线策略",
    category: "趋势跟踪",
    description: "基于Abu框架的智能双均线交叉策略，支持动态参数优化",
    complexity: "简单",
    mlOptimized: true,
    parameters: {
      fastPeriod: 5,
      slowPeriod: 20,
      stopLoss: 0.05,
      takeProfit: 0.15,
    },
  },
  {
    id: "abu_rsi_reversal",
    name: "Abu RSI反转策略",
    category: "均值回归",
    description: "集成机器学习的RSI反转策略，自动识别最佳买卖点",
    complexity: "中等",
    mlOptimized: true,
    parameters: {
      rsiPeriod: 14,
      oversold: 30,
      overbought: 70,
      mlConfidence: 0.8,
    },
  },
  {
    id: "abu_breakout",
    name: "Abu突破策略",
    category: "突破跟踪",
    description: "多时间框架突破策略，结合成交量和波动率分析",
    complexity: "复杂",
    mlOptimized: true,
    parameters: {
      lookbackPeriod: 20,
      volumeThreshold: 1.5,
      volatilityFilter: true,
      timeframes: ["1h", "4h", "1d"],
    },
  },
  {
    id: "abu_ml_ensemble",
    name: "Abu机器学习集成",
    category: "AI策略",
    description: "集成多种机器学习模型的智能交易策略",
    complexity: "高级",
    mlOptimized: true,
    parameters: {
      models: ["RandomForest", "XGBoost", "LSTM"],
      ensembleMethod: "voting",
      retrainInterval: 7,
      featureCount: 50,
    },
  },
]

const technicalIndicators = [
  { id: "sma", name: "简单移动平均", category: "趋势" },
  { id: "ema", name: "指数移动平均", category: "趋势" },
  { id: "rsi", name: "相对强弱指数", category: "动量" },
  { id: "macd", name: "MACD", category: "动量" },
  { id: "bollinger", name: "布林带", category: "波动率" },
  { id: "atr", name: "平均真实波幅", category: "波动率" },
  { id: "stoch", name: "随机指标", category: "动量" },
  { id: "williams", name: "威廉指标", category: "动量" },
  { id: "cci", name: "商品通道指数", category: "动量" },
  { id: "adx", name: "平均趋向指数", category: "趋势" },
]

export function AbuStrategyEngine() {
  const [selectedStrategy, setSelectedStrategy] = useState(abuStrategies[0])
  const [mlOptimization, setMlOptimization] = useState(true)
  const [autoRebalance, setAutoRebalance] = useState(false)
  const [riskLevel, setRiskLevel] = useState([3])

  return (
    <Card className="h-fit">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Brain className="w-5 h-5 text-accent" />
          <span>Abu策略引擎</span>
          <Badge variant="secondary" className="bg-accent/20 text-accent">
            AI增强
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="strategies" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="strategies">策略选择</TabsTrigger>
            <TabsTrigger value="indicators">技术指标</TabsTrigger>
            <TabsTrigger value="optimization">AI优化</TabsTrigger>
          </TabsList>

          <TabsContent value="strategies" className="space-y-4">
            <div className="space-y-3">
              <Label>选择Abu策略</Label>
              <Select
                value={selectedStrategy.id}
                onValueChange={(value) => {
                  const strategy = abuStrategies.find((s) => s.id === value)
                  if (strategy) setSelectedStrategy(strategy)
                }}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {abuStrategies.map((strategy) => (
                    <SelectItem key={strategy.id} value={strategy.id}>
                      <div className="flex items-center space-x-2">
                        <span>{strategy.name}</span>
                        {strategy.mlOptimized && (
                          <Badge variant="outline" className="text-xs">
                            ML
                          </Badge>
                        )}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="p-4 bg-muted/30 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-medium">{selectedStrategy.name}</h4>
                <Badge variant="outline">{selectedStrategy.category}</Badge>
              </div>
              <p className="text-sm text-muted-foreground mb-3">{selectedStrategy.description}</p>
              <div className="flex items-center justify-between text-xs">
                <span className="text-muted-foreground">复杂度: {selectedStrategy.complexity}</span>
                <div className="flex items-center space-x-1">
                  {selectedStrategy.mlOptimized && (
                    <>
                      <Brain className="w-3 h-3 text-accent" />
                      <span className="text-accent">AI优化</span>
                    </>
                  )}
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <Label>策略参数配置</Label>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label className="text-xs">快速周期</Label>
                  <Input type="number" defaultValue="5" className="h-8" />
                </div>
                <div>
                  <Label className="text-xs">慢速周期</Label>
                  <Input type="number" defaultValue="20" className="h-8" />
                </div>
                <div>
                  <Label className="text-xs">止损比例</Label>
                  <Input type="number" defaultValue="0.05" step="0.01" className="h-8" />
                </div>
                <div>
                  <Label className="text-xs">止盈比例</Label>
                  <Input type="number" defaultValue="0.15" step="0.01" className="h-8" />
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="indicators" className="space-y-4">
            <div className="space-y-3">
              <Label>技术指标组合</Label>
              <div className="grid grid-cols-1 gap-2 max-h-48 overflow-y-auto">
                {technicalIndicators.map((indicator) => (
                  <div key={indicator.id} className="flex items-center justify-between p-2 bg-muted/30 rounded">
                    <div className="flex items-center space-x-2">
                      <Switch id={indicator.id} />
                      <Label htmlFor={indicator.id} className="text-sm">
                        {indicator.name}
                      </Label>
                    </div>
                    <Badge variant="outline" className="text-xs">
                      {indicator.category}
                    </Badge>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-3">
              <Label>指标权重配置</Label>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm">趋势指标权重</span>
                  <span className="text-sm font-medium">40%</span>
                </div>
                <Slider defaultValue={[40]} max={100} step={5} className="w-full" />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm">动量指标权重</span>
                  <span className="text-sm font-medium">35%</span>
                </div>
                <Slider defaultValue={[35]} max={100} step={5} className="w-full" />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm">波动率指标权重</span>
                  <span className="text-sm font-medium">25%</span>
                </div>
                <Slider defaultValue={[25]} max={100} step={5} className="w-full" />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="optimization" className="space-y-4">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label>机器学习优化</Label>
                  <p className="text-xs text-muted-foreground">启用AI参数自动优化</p>
                </div>
                <Switch checked={mlOptimization} onCheckedChange={setMlOptimization} />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label>自动再平衡</Label>
                  <p className="text-xs text-muted-foreground">根据市场条件自动调整</p>
                </div>
                <Switch checked={autoRebalance} onCheckedChange={setAutoRebalance} />
              </div>

              <div className="space-y-3">
                <Label>风险等级</Label>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">保守</span>
                    <span className="text-sm">激进</span>
                  </div>
                  <Slider value={riskLevel} onValueChange={setRiskLevel} max={5} min={1} step={1} className="w-full" />
                  <div className="text-center">
                    <Badge variant="outline">
                      等级 {riskLevel[0]} -{" "}
                      {riskLevel[0] <= 2 ? "保守" : riskLevel[0] <= 3 ? "平衡" : riskLevel[0] <= 4 ? "积极" : "激进"}
                    </Badge>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <Label>优化目标</Label>
                <Select defaultValue="sharpe">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="sharpe">最大化夏普比率</SelectItem>
                    <SelectItem value="return">最大化收益率</SelectItem>
                    <SelectItem value="drawdown">最小化回撤</SelectItem>
                    <SelectItem value="calmar">最大化卡玛比率</SelectItem>
                    <SelectItem value="sortino">最大化索提诺比率</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label className="text-xs">训练周期(天)</Label>
                  <Input type="number" defaultValue="252" className="h-8" />
                </div>
                <div>
                  <Label className="text-xs">重训练间隔(天)</Label>
                  <Input type="number" defaultValue="30" className="h-8" />
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>

        <div className="flex space-x-2 mt-6">
          <Button className="flex-1">
            <Play className="w-4 h-4 mr-2" />
            启动Abu策略
          </Button>
          <Button variant="outline">
            <Settings className="w-4 h-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
