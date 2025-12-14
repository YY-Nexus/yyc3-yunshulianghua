import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { TrendingUp, TrendingDown, Target, Shield, DollarSign, Activity } from "lucide-react"

const performanceData = {
  totalReturn: "+38.5%",
  annualizedReturn: "+28.3%",
  sharpeRatio: "1.85",
  maxDrawdown: "-5.2%",
  winRate: "68.5%",
  profitFactor: "2.34",
  totalTrades: 156,
  avgHoldingPeriod: "3.2天",
  volatility: "15.3%",
  beta: "0.87",
  alpha: "+12.1%",
  informationRatio: "1.42",
}

const riskMetrics = [
  { label: "VaR (95%)", value: "-2.8%", status: "good" },
  { label: "CVaR", value: "-4.1%", status: "medium" },
  { label: "卡尔马比率", value: "5.44", status: "excellent" },
  { label: "索提诺比率", value: "2.67", status: "good" },
]

const monthlyStats = [
  { month: "正收益月份", count: 9, total: 12, percentage: 75 },
  { month: "负收益月份", count: 3, total: 12, percentage: 25 },
  { month: "最佳月份", value: "+8.7%", date: "2024年5月" },
  { month: "最差月份", value: "-3.1%", date: "2024年7月" },
]

export function PerformanceMetrics() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* 核心指标 */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <TrendingUp className="w-5 h-5 text-primary" />
            <span>核心指标</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center p-3 bg-muted/30 rounded-lg">
              <div className="flex items-center justify-center mb-1">
                <DollarSign className="w-4 h-4 text-accent mr-1" />
                <span className="text-sm text-muted-foreground">总收益</span>
              </div>
              <div className="text-xl font-bold text-accent">{performanceData.totalReturn}</div>
            </div>
            <div className="text-center p-3 bg-muted/30 rounded-lg">
              <div className="flex items-center justify-center mb-1">
                <Activity className="w-4 h-4 text-primary mr-1" />
                <span className="text-sm text-muted-foreground">年化收益</span>
              </div>
              <div className="text-xl font-bold text-primary">{performanceData.annualizedReturn}</div>
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">夏普比率</span>
              <div className="flex items-center space-x-2">
                <span className="font-bold">{performanceData.sharpeRatio}</span>
                <Badge variant="secondary" className="bg-accent/20 text-accent">
                  优秀
                </Badge>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">最大回撤</span>
              <span className="font-bold text-destructive">{performanceData.maxDrawdown}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">胜率</span>
              <span className="font-bold">{performanceData.winRate}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">盈亏比</span>
              <span className="font-bold">{performanceData.profitFactor}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">总交易次数</span>
              <span className="font-bold">{performanceData.totalTrades}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">平均持仓</span>
              <span className="font-bold">{performanceData.avgHoldingPeriod}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 风险指标 */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Shield className="w-5 h-5 text-destructive" />
            <span>风险指标</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">波动率</span>
              <span className="font-bold">{performanceData.volatility}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Beta系数</span>
              <span className="font-bold">{performanceData.beta}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Alpha</span>
              <span className="font-bold text-accent">{performanceData.alpha}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">信息比率</span>
              <span className="font-bold">{performanceData.informationRatio}</span>
            </div>
          </div>

          <div className="space-y-3 pt-2 border-t border-border">
            {riskMetrics.map((metric, index) => (
              <div key={index} className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">{metric.label}</span>
                <div className="flex items-center space-x-2">
                  <span className="font-bold">{metric.value}</span>
                  <Badge
                    variant={
                      metric.status === "excellent" ? "secondary" : metric.status === "good" ? "outline" : "destructive"
                    }
                    className={
                      metric.status === "excellent"
                        ? "bg-accent/20 text-accent"
                        : metric.status === "good"
                          ? "bg-primary/20 text-primary"
                          : "bg-destructive/20 text-destructive"
                    }
                  >
                    {metric.status === "excellent" ? "优秀" : metric.status === "good" ? "良好" : "一般"}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* 月度统计 */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Target className="w-5 h-5 text-muted-foreground" />
            <span>月度统计</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">正收益月份</span>
              <div className="flex items-center space-x-2">
                <Progress value={75} className="w-16 h-2" />
                <span className="font-bold text-accent">9/12</span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">负收益月份</span>
              <div className="flex items-center space-x-2">
                <Progress value={25} className="w-16 h-2" />
                <span className="font-bold text-destructive">3/12</span>
              </div>
            </div>
          </div>

          <div className="space-y-3 pt-2 border-t border-border">
            <div className="p-3 bg-accent/10 rounded-lg border border-accent/20">
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm font-medium text-accent">最佳月份</span>
                <TrendingUp className="w-4 h-4 text-accent" />
              </div>
              <div className="text-lg font-bold text-accent">+8.7%</div>
              <div className="text-xs text-muted-foreground">2024年5月</div>
            </div>

            <div className="p-3 bg-destructive/10 rounded-lg border border-destructive/20">
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm font-medium text-destructive">最差月份</span>
                <TrendingDown className="w-4 h-4 text-destructive" />
              </div>
              <div className="text-lg font-bold text-destructive">-3.1%</div>
              <div className="text-xs text-muted-foreground">2024年7月</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
