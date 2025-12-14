import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Brain, TrendingUp, AlertTriangle, Target, Lightbulb } from "lucide-react"

const recommendations = [
  {
    id: 1,
    type: "buy",
    title: "买入信号：科技股反弹机会",
    description: "基于MACD金叉和成交量放大，检测到科技板块短期反弹信号",
    confidence: 85,
    timeframe: "1-3天",
    stocks: ["000001", "600036", "000858"],
    reasoning: "技术指标显示超卖反弹，资金流入明显",
  },
  {
    id: 2,
    type: "sell",
    title: "减仓建议：房地产板块风险",
    description: "政策面利空叠加技术面破位，建议减持房地产相关标的",
    confidence: 78,
    timeframe: "即时",
    stocks: ["000002", "600048"],
    reasoning: "政策压制+技术破位双重利空",
  },
  {
    id: 3,
    type: "hold",
    title: "持有观望：银行股震荡整理",
    description: "银行板块处于震荡区间，建议持有等待方向选择",
    confidence: 72,
    timeframe: "1-2周",
    stocks: ["600036", "000001"],
    reasoning: "基本面稳健但缺乏催化剂",
  },
]

export function AIRecommendations() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Brain className="w-5 h-5 text-primary" />
          <span>AI投资建议</span>
          <Badge variant="secondary" className="bg-primary/20 text-primary">
            实时更新
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {recommendations.map((rec) => (
            <div key={rec.id} className="p-4 bg-muted/30 rounded-lg border">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-2">
                  {rec.type === "buy" ? (
                    <TrendingUp className="w-4 h-4 text-accent" />
                  ) : rec.type === "sell" ? (
                    <AlertTriangle className="w-4 h-4 text-destructive" />
                  ) : (
                    <Target className="w-4 h-4 text-muted-foreground" />
                  )}
                  <Badge
                    variant={rec.type === "buy" ? "secondary" : rec.type === "sell" ? "destructive" : "outline"}
                    className={
                      rec.type === "buy"
                        ? "bg-accent/20 text-accent"
                        : rec.type === "sell"
                          ? "bg-destructive/20 text-destructive"
                          : ""
                    }
                  >
                    {rec.type === "buy" ? "买入" : rec.type === "sell" ? "卖出" : "持有"}
                  </Badge>
                </div>
                <div className="text-right">
                  <div className="text-sm font-medium">置信度</div>
                  <div className="text-lg font-bold text-primary">{rec.confidence}%</div>
                </div>
              </div>

              <h3 className="font-medium mb-2">{rec.title}</h3>
              <p className="text-sm text-muted-foreground mb-3">{rec.description}</p>

              <div className="space-y-2 mb-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-muted-foreground">时间框架:</span>
                  <span>{rec.timeframe}</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-muted-foreground">相关股票:</span>
                  <span className="font-mono">{rec.stocks.join(", ")}</span>
                </div>
              </div>

              <div className="p-2 bg-muted/50 rounded text-xs text-muted-foreground mb-3">
                <Lightbulb className="w-3 h-3 inline mr-1" />
                {rec.reasoning}
              </div>

              <Button size="sm" className="w-full">
                查看详情
              </Button>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
