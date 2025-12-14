import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Lightbulb, TrendingUp, AlertCircle, Target } from "lucide-react"

const insights = [
  {
    id: 1,
    type: "opportunity",
    title: "套利机会",
    description: "A股与港股同一标的价差扩大",
    impact: "高",
    timeframe: "1-2天",
    action: "关注AH股价差",
  },
  {
    id: 2,
    type: "risk",
    title: "流动性风险",
    description: "小盘股成交量持续萎缩",
    impact: "中",
    timeframe: "持续",
    action: "减少小盘股配置",
  },
  {
    id: 3,
    type: "trend",
    title: "板块轮动",
    description: "资金从消费转向科技",
    impact: "高",
    timeframe: "1-2周",
    action: "调整行业配置",
  },
  {
    id: 4,
    type: "signal",
    title: "技术信号",
    description: "大盘突破关键阻力位",
    impact: "中",
    timeframe: "即时",
    action: "增加仓位",
  },
]

const aiMetrics = [
  { label: "预测准确率", value: "87.3%", trend: "up" },
  { label: "信号成功率", value: "82.1%", trend: "up" },
  { label: "风险识别率", value: "91.5%", trend: "stable" },
  { label: "收益优化", value: "+15.2%", trend: "up" },
]

export function AIInsights() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Lightbulb className="w-5 h-5 text-primary" />
            <span>AI洞察</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {insights.map((insight) => (
            <div key={insight.id} className="p-3 bg-muted/30 rounded-lg border">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-2">
                  {insight.type === "opportunity" ? (
                    <Target className="w-4 h-4 text-accent" />
                  ) : insight.type === "risk" ? (
                    <AlertCircle className="w-4 h-4 text-destructive" />
                  ) : insight.type === "trend" ? (
                    <TrendingUp className="w-4 h-4 text-primary" />
                  ) : (
                    <Lightbulb className="w-4 h-4 text-muted-foreground" />
                  )}
                  <Badge
                    variant={
                      insight.impact === "高" ? "destructive" : insight.impact === "中" ? "secondary" : "outline"
                    }
                    className={
                      insight.impact === "高"
                        ? "bg-destructive/20 text-destructive"
                        : insight.impact === "中"
                          ? "bg-primary/20 text-primary"
                          : ""
                    }
                  >
                    {insight.impact}影响
                  </Badge>
                </div>
              </div>
              <h4 className="font-medium text-sm mb-1">{insight.title}</h4>
              <p className="text-xs text-muted-foreground mb-2">{insight.description}</p>
              <div className="flex items-center justify-between text-xs">
                <span className="text-muted-foreground">时效: {insight.timeframe}</span>
                <span className="font-medium text-primary">{insight.action}</span>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">AI性能指标</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {aiMetrics.map((metric, index) => (
            <div key={index} className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">{metric.label}</span>
              <div className="flex items-center space-x-2">
                <span className="font-bold">{metric.value}</span>
                {metric.trend === "up" ? (
                  <TrendingUp className="w-3 h-3 text-accent" />
                ) : metric.trend === "down" ? (
                  <TrendingUp className="w-3 h-3 text-destructive rotate-180" />
                ) : (
                  <div className="w-3 h-0.5 bg-muted-foreground" />
                )}
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}
