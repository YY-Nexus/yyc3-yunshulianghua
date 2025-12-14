import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Shield, AlertTriangle, TrendingDown, Activity, Target } from "lucide-react"

const riskMetrics = [
  {
    title: "投资组合VaR",
    value: "¥125,400",
    percentage: "2.51%",
    status: "normal",
    description: "95%置信度下的日风险价值",
    icon: Shield,
  },
  {
    title: "最大回撤",
    value: "¥89,200",
    percentage: "1.78%",
    status: "good",
    description: "当前持仓最大潜在损失",
    icon: TrendingDown,
  },
  {
    title: "风险敞口",
    value: "¥4,250,000",
    percentage: "85.0%",
    status: "warning",
    description: "总资产的风险暴露比例",
    icon: Target,
  },
  {
    title: "流动性风险",
    value: "低",
    percentage: "15.2%",
    status: "good",
    description: "持仓流动性评估",
    icon: Activity,
  },
]

const riskLimits = [
  { name: "单一股票集中度", current: 8.5, limit: 10, unit: "%" },
  { name: "行业集中度", current: 25.3, limit: 30, unit: "%" },
  { name: "日内VaR限额", current: 2.51, limit: 3.0, unit: "%" },
  { name: "杠杆比率", current: 1.2, limit: 2.0, unit: "倍" },
]

export function RiskOverview() {
  return (
    <div className="space-y-6">
      {/* 风险指标卡片 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {riskMetrics.map((metric, index) => {
          const Icon = metric.icon
          return (
            <Card key={index}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{metric.title}</CardTitle>
                <Icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{metric.value}</div>
                <div className="flex items-center justify-between mt-2">
                  <p className="text-xs text-muted-foreground">{metric.description}</p>
                  <Badge
                    variant={
                      metric.status === "good" ? "secondary" : metric.status === "warning" ? "destructive" : "outline"
                    }
                    className={
                      metric.status === "good"
                        ? "bg-accent/20 text-accent"
                        : metric.status === "warning"
                          ? "bg-destructive/20 text-destructive"
                          : ""
                    }
                  >
                    {metric.percentage}
                  </Badge>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* 风险限额监控 */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <AlertTriangle className="w-5 h-5 text-destructive" />
            <span>风险限额监控</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {riskLimits.map((limit, index) => {
              const percentage = (limit.current / limit.limit) * 100
              const isWarning = percentage > 80
              const isDanger = percentage > 95

              return (
                <div key={index} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">{limit.name}</span>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm font-mono">
                        {limit.current}
                        {limit.unit} / {limit.limit}
                        {limit.unit}
                      </span>
                      {isDanger ? (
                        <Badge variant="destructive" className="bg-destructive/20 text-destructive">
                          超限
                        </Badge>
                      ) : isWarning ? (
                        <Badge variant="secondary" className="bg-yellow-500/20 text-yellow-600">
                          警告
                        </Badge>
                      ) : (
                        <Badge variant="outline">正常</Badge>
                      )}
                    </div>
                  </div>
                  <Progress
                    value={percentage}
                    className={`h-2 ${isDanger ? "bg-destructive/20" : isWarning ? "bg-yellow-500/20" : "bg-accent/20"}`}
                  />
                  <div className="text-xs text-muted-foreground">
                    使用率: {percentage.toFixed(1)}% ({isDanger ? "超出限额" : isWarning ? "接近限额" : "正常范围"})
                  </div>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
