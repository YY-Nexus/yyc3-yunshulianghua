import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { AlertTriangle, TrendingDown, TrendingUp, Activity } from "lucide-react"

const anomalies = [
  {
    id: 1,
    type: "price",
    severity: "high",
    title: "异常价格波动",
    description: "000001平安银行出现异常大幅波动",
    timestamp: "2024-01-15 14:23:45",
    details: {
      stock: "000001",
      change: "+5.67%",
      volume: "3.2倍平均值",
      trigger: "突发利好消息",
    },
    confidence: 94,
  },
  {
    id: 2,
    type: "volume",
    severity: "medium",
    title: "成交量异常放大",
    description: "科技板块整体成交量异常增加",
    timestamp: "2024-01-15 13:45:12",
    details: {
      sector: "科技股",
      volumeIncrease: "+180%",
      affectedStocks: 15,
      trigger: "板块轮动",
    },
    confidence: 87,
  },
  {
    id: 3,
    type: "correlation",
    severity: "low",
    title: "相关性异常",
    description: "银行股与地产股相关性突然降低",
    timestamp: "2024-01-15 12:30:28",
    details: {
      correlation: "从0.75降至0.32",
      duration: "2小时",
      impact: "组合风险变化",
      trigger: "政策分化",
    },
    confidence: 73,
  },
]

export function AnomalyDetection() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <AlertTriangle className="w-5 h-5 text-destructive" />
          <span>异常检测</span>
          <Badge variant="destructive" className="bg-destructive/20 text-destructive">
            3个异常
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {anomalies.map((anomaly) => (
          <div
            key={anomaly.id}
            className={`p-4 rounded-lg border ${
              anomaly.severity === "high"
                ? "bg-destructive/5 border-destructive/20"
                : anomaly.severity === "medium"
                  ? "bg-yellow-500/5 border-yellow-500/20"
                  : "bg-muted/30 border-border"
            }`}
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-2">
                {anomaly.type === "price" ? (
                  <TrendingUp className="w-4 h-4 text-destructive" />
                ) : anomaly.type === "volume" ? (
                  <Activity className="w-4 h-4 text-yellow-500" />
                ) : (
                  <TrendingDown className="w-4 h-4 text-muted-foreground" />
                )}
                <Badge
                  variant={
                    anomaly.severity === "high"
                      ? "destructive"
                      : anomaly.severity === "medium"
                        ? "secondary"
                        : "outline"
                  }
                  className={
                    anomaly.severity === "high"
                      ? "bg-destructive/20 text-destructive"
                      : anomaly.severity === "medium"
                        ? "bg-yellow-500/20 text-yellow-600"
                        : ""
                  }
                >
                  {anomaly.severity === "high" ? "高风险" : anomaly.severity === "medium" ? "中风险" : "低风险"}
                </Badge>
              </div>
              <div className="text-right">
                <div className="text-sm font-medium">置信度</div>
                <div className="text-lg font-bold text-primary">{anomaly.confidence}%</div>
              </div>
            </div>

            <h3 className="font-medium mb-1">{anomaly.title}</h3>
            <p className="text-sm text-muted-foreground mb-3">{anomaly.description}</p>

            <div className="grid grid-cols-2 gap-2 mb-3 text-xs">
              {Object.entries(anomaly.details).map(([key, value]) => (
                <div key={key} className="flex justify-between">
                  <span className="text-muted-foreground capitalize">{key}:</span>
                  <span className="font-medium">{value}</span>
                </div>
              ))}
            </div>

            <div className="flex items-center justify-between">
              <span className="text-xs text-muted-foreground">{anomaly.timestamp}</span>
              <Button size="sm" variant="outline">
                查看详情
              </Button>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
