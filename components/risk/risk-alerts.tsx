import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { AlertTriangle, AlertCircle, Info, CheckCircle } from "lucide-react"

const alerts = [
  {
    id: 1,
    type: "critical",
    title: "单一股票集中度超限",
    description: "000001平安银行持仓比例达到8.5%，接近10%限额",
    timestamp: "2024-01-15 14:23:45",
    action: "建议减仓",
    status: "active",
  },
  {
    id: 2,
    type: "warning",
    title: "行业集中度偏高",
    description: "金融行业配置达到25.3%，建议关注行业风险",
    timestamp: "2024-01-15 13:45:12",
    action: "监控中",
    status: "active",
  },
  {
    id: 3,
    type: "info",
    title: "VaR水平正常",
    description: "当前VaR为2.51%，处于正常范围内",
    timestamp: "2024-01-15 12:30:28",
    action: "无需操作",
    status: "resolved",
  },
  {
    id: 4,
    type: "warning",
    title: "流动性风险提醒",
    description: "小盘股持仓比例较高，注意流动性风险",
    timestamp: "2024-01-15 11:15:33",
    action: "定期评估",
    status: "active",
  },
]

const riskEvents = [
  {
    time: "14:30",
    event: "触发止损",
    details: "000002万科A触发5%止损线",
    impact: "high",
  },
  {
    time: "13:45",
    event: "风险限额预警",
    details: "单一股票集中度接近上限",
    impact: "medium",
  },
  {
    time: "12:20",
    event: "市场异常波动",
    details: "检测到异常交易量",
    impact: "low",
  },
  {
    time: "11:30",
    event: "合规检查通过",
    details: "日度合规检查完成",
    impact: "info",
  },
]

export function RiskAlerts() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <AlertTriangle className="w-5 h-5 text-destructive" />
            <span>风险预警</span>
            <Badge variant="destructive" className="bg-destructive/20 text-destructive">
              3个活跃
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {alerts.map((alert) => (
            <div
              key={alert.id}
              className={`p-3 rounded-lg border ${
                alert.type === "critical"
                  ? "bg-destructive/5 border-destructive/20"
                  : alert.type === "warning"
                    ? "bg-yellow-500/5 border-yellow-500/20"
                    : alert.type === "info"
                      ? "bg-blue-500/5 border-blue-500/20"
                      : "bg-muted/30 border-border"
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-2">
                  {alert.type === "critical" ? (
                    <AlertTriangle className="w-4 h-4 text-destructive" />
                  ) : alert.type === "warning" ? (
                    <AlertCircle className="w-4 h-4 text-yellow-500" />
                  ) : alert.type === "info" ? (
                    <Info className="w-4 h-4 text-blue-500" />
                  ) : (
                    <CheckCircle className="w-4 h-4 text-accent" />
                  )}
                  <Badge
                    variant={
                      alert.type === "critical" ? "destructive" : alert.type === "warning" ? "secondary" : "outline"
                    }
                    className={
                      alert.type === "critical"
                        ? "bg-destructive/20 text-destructive"
                        : alert.type === "warning"
                          ? "bg-yellow-500/20 text-yellow-600"
                          : alert.type === "info"
                            ? "bg-blue-500/20 text-blue-600"
                            : ""
                    }
                  >
                    {alert.type === "critical"
                      ? "严重"
                      : alert.type === "warning"
                        ? "警告"
                        : alert.type === "info"
                          ? "信息"
                          : "已解决"}
                  </Badge>
                </div>
                <Badge variant={alert.status === "active" ? "destructive" : "outline"}>
                  {alert.status === "active" ? "活跃" : "已解决"}
                </Badge>
              </div>

              <h4 className="font-medium text-sm mb-1">{alert.title}</h4>
              <p className="text-xs text-muted-foreground mb-2">{alert.description}</p>

              <div className="flex items-center justify-between">
                <span className="text-xs text-muted-foreground">{alert.timestamp}</span>
                <div className="flex items-center space-x-2">
                  <span className="text-xs font-medium text-primary">{alert.action}</span>
                  <Button size="sm" variant="outline" className="h-6 text-xs bg-transparent">
                    处理
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">风险事件日志</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          {riskEvents.map((event, index) => (
            <div key={index} className="flex items-center justify-between p-2 bg-muted/30 rounded text-sm">
              <div className="flex items-center space-x-3">
                <span className="font-mono text-xs text-muted-foreground">{event.time}</span>
                <div>
                  <div className="font-medium">{event.event}</div>
                  <div className="text-xs text-muted-foreground">{event.details}</div>
                </div>
              </div>
              <Badge
                variant={event.impact === "high" ? "destructive" : event.impact === "medium" ? "secondary" : "outline"}
                className={
                  event.impact === "high"
                    ? "bg-destructive/20 text-destructive"
                    : event.impact === "medium"
                      ? "bg-yellow-500/20 text-yellow-600"
                      : event.impact === "info"
                        ? "bg-blue-500/20 text-blue-600"
                        : ""
                }
              >
                {event.impact === "high"
                  ? "高"
                  : event.impact === "medium"
                    ? "中"
                    : event.impact === "low"
                      ? "低"
                      : "信息"}
              </Badge>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}
