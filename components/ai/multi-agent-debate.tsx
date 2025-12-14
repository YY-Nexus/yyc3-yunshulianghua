"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Progress } from "@/components/ui/progress"
import { MessageSquare, TrendingUp, TrendingDown, Gavel, Clock, CheckCircle, AlertCircle } from "lucide-react"

const debateHistory = [
  {
    id: 1,
    round: 1,
    agent: "bull_researcher",
    name: "看涨研究员",
    type: "bull",
    timestamp: "14:32:15",
    confidence: 85,
    message:
      "技术指标显示强烈的看涨信号。MACD金叉确认，RSI处于健康区间，布林带上轨突破。成交量放大验证了突破的有效性。建议目标价位上调20%。",
    keyPoints: ["MACD金叉", "成交量放大", "布林带突破", "目标价+20%"],
  },
  {
    id: 2,
    round: 1,
    agent: "bear_researcher",
    name: "看跌研究员",
    type: "bear",
    timestamp: "14:33:42",
    confidence: 72,
    message:
      "技术面确实强势，但基本面存在担忧。当前估值已达历史高位，行业增长率连续三个季度下滑。宏观经济不确定性增加，建议保持谨慎态度。",
    keyPoints: ["估值偏高", "行业增长放缓", "宏观风险", "建议谨慎"],
  },
  {
    id: 3,
    round: 2,
    agent: "bull_researcher",
    name: "看涨研究员",
    type: "bull",
    timestamp: "14:35:18",
    confidence: 88,
    message:
      "虽然估值较高，但公司基本面依然强劲。最新财报显示营收增长15%，净利润增长22%。新产品线预期将带来额外增长动力。相对于同行，估值仍在合理区间。",
    keyPoints: ["营收增长15%", "净利润+22%", "新产品线", "估值合理"],
  },
  {
    id: 4,
    round: 2,
    agent: "bear_researcher",
    name: "看跌研究员",
    type: "bear",
    timestamp: "14:36:55",
    confidence: 68,
    message:
      "财报数据确实不错，但需要关注前瞻性指标。管理层下调了下季度指引，竞争对手推出了颠覆性产品。市场情绪虽然乐观，但可能存在过度乐观的风险。",
    keyPoints: ["指引下调", "竞争加剧", "市场过热", "风险提示"],
  },
  {
    id: 5,
    round: 3,
    agent: "trader",
    name: "交易决策员",
    type: "decision",
    timestamp: "14:38:30",
    confidence: 76,
    message:
      "综合分析双方观点，技术面确实呈现强势突破格局，基本面短期内仍然稳健。考虑到潜在风险，建议采取分批建仓策略。初始仓位30%，突破确认后可增至50%。设置8%止损位。",
    keyPoints: ["分批建仓", "初始30%仓位", "最大50%仓位", "8%止损"],
    decision: {
      action: "谨慎看涨",
      confidence: 76,
      targetPrice: "+15%",
      stopLoss: "-8%",
      positionSize: "30-50%",
      timeHorizon: "3-6个月",
    },
  },
]

export function MultiAgentDebate() {
  const currentRound = Math.max(...debateHistory.map((d) => d.round))
  const totalRounds = 3
  const progress = (currentRound / totalRounds) * 100

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <MessageSquare className="w-5 h-5 text-accent" />
          <span>多智能体辩论过程</span>
          <Badge variant="secondary" className="bg-accent/20 text-accent">
            第{currentRound}轮/共{totalRounds}轮
          </Badge>
        </CardTitle>
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">辩论进度</span>
            <span className="font-medium">{Math.round(progress)}%</span>
          </div>
          <Progress value={progress} className="w-full" />
        </div>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-96">
          <div className="space-y-4">
            {debateHistory.map((entry) => (
              <div
                key={entry.id}
                className={`p-4 rounded-lg border ${
                  entry.type === "bull"
                    ? "bg-green-500/5 border-green-500/20"
                    : entry.type === "bear"
                      ? "bg-red-500/5 border-red-500/20"
                      : "bg-accent/5 border-accent/20"
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-2">
                    {entry.type === "bull" && <TrendingUp className="w-4 h-4 text-green-500" />}
                    {entry.type === "bear" && <TrendingDown className="w-4 h-4 text-red-500" />}
                    {entry.type === "decision" && <Gavel className="w-4 h-4 text-accent" />}
                    <span className="font-medium text-sm">{entry.name}</span>
                    <Badge variant="outline" className="text-xs">
                      第{entry.round}轮
                    </Badge>
                  </div>
                  <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                    <Clock className="w-3 h-3" />
                    <span>{entry.timestamp}</span>
                    <span>置信度: {entry.confidence}%</span>
                  </div>
                </div>

                <p className="text-sm mb-3 leading-relaxed">{entry.message}</p>

                <div className="flex flex-wrap gap-1 mb-3">
                  {entry.keyPoints.map((point, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {point}
                    </Badge>
                  ))}
                </div>

                {entry.decision && (
                  <div className="mt-4 p-3 bg-muted/30 rounded-lg">
                    <div className="flex items-center space-x-2 mb-2">
                      <CheckCircle className="w-4 h-4 text-accent" />
                      <span className="font-medium text-sm">最终决策</span>
                    </div>
                    <div className="grid grid-cols-2 gap-3 text-xs">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">操作建议:</span>
                        <span className="font-medium text-accent">{entry.decision.action}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">置信度:</span>
                        <span className="font-medium">{entry.decision.confidence}%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">目标价位:</span>
                        <span className="font-medium text-green-500">{entry.decision.targetPrice}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">止损位:</span>
                        <span className="font-medium text-red-500">{entry.decision.stopLoss}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">建议仓位:</span>
                        <span className="font-medium">{entry.decision.positionSize}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">时间周期:</span>
                        <span className="font-medium">{entry.decision.timeHorizon}</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </ScrollArea>

        <div className="mt-4 p-3 bg-muted/30 rounded-lg">
          <div className="flex items-center space-x-2 mb-2">
            <AlertCircle className="w-4 h-4 text-orange-500" />
            <span className="font-medium text-sm">风险提示</span>
          </div>
          <p className="text-xs text-muted-foreground">
            以上分析仅供参考，不构成投资建议。投资有风险，决策需谨慎。 建议结合个人风险承受能力和投资目标做出最终决策。
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
