import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, DollarSign, Activity, Brain, AlertTriangle, ArrowUpRight, ArrowDownRight } from "lucide-react"

export function Dashboard() {
  return (
    <div className="p-6 space-y-6 bg-gradient-to-br from-background via-muted/10 to-primary/5 min-h-full">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="card-enhanced hover:scale-105 transition-transform duration-200 bg-gradient-to-br from-card to-market/5 border-2 border-market shadow-market">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-card-foreground">总资产</CardTitle>
            <div className="p-2 bg-market/10 rounded-lg">
              <DollarSign className="h-4 w-4 text-market" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-market">¥1,234,567</div>
            <p className="text-xs text-muted-foreground flex items-center mt-1">
              <ArrowUpRight className="w-3 h-3 text-strategy mr-1" />
              <span className="text-strategy font-medium">+2.5%</span> 较昨日
            </p>
          </CardContent>
        </Card>

        <Card className="card-enhanced hover:scale-105 transition-transform duration-200 bg-gradient-to-br from-card to-strategy/5 border-2 border-strategy shadow-strategy">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-card-foreground">今日收益</CardTitle>
            <div className="p-2 bg-strategy/10 rounded-lg">
              <TrendingUp className="h-4 w-4 text-strategy" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-strategy">+¥12,345</div>
            <p className="text-xs text-muted-foreground flex items-center mt-1">
              收益率 <ArrowUpRight className="w-3 h-3 text-strategy ml-1 mr-1" />
              <span className="text-strategy font-medium">+1.2%</span>
            </p>
          </CardContent>
        </Card>

        <Card className="card-enhanced hover:scale-105 transition-transform duration-200 bg-gradient-to-br from-card to-portfolio/5 border-2 border-portfolio shadow-portfolio">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-card-foreground">活跃策略</CardTitle>
            <div className="p-2 bg-portfolio/10 rounded-lg">
              <Activity className="h-4 w-4 text-portfolio" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-portfolio">8</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-strategy font-medium">3个</span> 盈利中
            </p>
          </CardContent>
        </Card>

        <Card className="card-enhanced hover:scale-105 transition-transform duration-200 bg-gradient-to-br from-card to-ai/5 border-2 border-ai shadow-ai">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-card-foreground">AI推荐</CardTitle>
            <div className="p-2 bg-ai/10 rounded-lg pulse-glow">
              <Brain className="h-4 w-4 text-ai" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-ai">5</div>
            <p className="text-xs text-muted-foreground">新的交易机会</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2 card-enhanced border-2 border-market shadow-market">
          <CardHeader className="bg-gradient-to-r from-market/10 to-market/5 rounded-t-lg">
            <CardTitle className="text-market flex items-center">
              <Activity className="w-5 h-5 mr-2 text-market" />
              市场概览
            </CardTitle>
            <CardDescription>主要指数和热门股票实时行情</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { name: "上证指数", value: "3,234.56", change: "+1.23%", trend: "up" },
                { name: "深证成指", value: "12,345.67", change: "-0.45%", trend: "down" },
                { name: "创业板指", value: "2,567.89", change: "+2.10%", trend: "up" },
                { name: "恒生指数", value: "18,234.56", change: "+0.78%", trend: "up" },
              ].map((index) => (
                <div
                  key={index.name}
                  className="flex items-center justify-between p-4 bg-gradient-to-r from-muted/30 to-transparent rounded-lg border border-border hover:shadow-md transition-all duration-200 hover:scale-[1.02]"
                >
                  <div className="flex items-center space-x-3">
                    <div
                      className={`w-3 h-3 rounded-full shadow-sm ${index.trend === "up" ? "bg-accent" : "bg-destructive"}`}
                    />
                    <span className="font-medium text-foreground">{index.name}</span>
                  </div>
                  <div className="text-right">
                    <div className="font-mono text-sm font-bold text-foreground">{index.value}</div>
                    <div
                      className={`text-xs font-medium flex items-center ${index.trend === "up" ? "text-accent" : "text-destructive"}`}
                    >
                      {index.trend === "up" ? (
                        <ArrowUpRight className="w-3 h-3 mr-1" />
                      ) : (
                        <ArrowDownRight className="w-3 h-3 mr-1" />
                      )}
                      {index.change}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <div className="space-y-6">
          <Card className="card-enhanced border-2 border-ai shadow-ai">
            <CardHeader className="bg-gradient-to-r from-ai/10 to-ai/5 rounded-t-lg">
              <CardTitle className="flex items-center space-x-2">
                <div className="p-1 bg-ai/10 rounded">
                  <Brain className="w-5 h-5 text-ai" />
                </div>
                <span className="text-ai">AI智能分析</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 pt-6">
              <div className="p-4 bg-gradient-to-r from-strategy/10 to-strategy/5 rounded-lg border-2 border-strategy shadow-strategy hover:shadow-md transition-all duration-200">
                <p className="text-sm font-medium text-strategy flex items-center">
                  <ArrowUpRight className="w-4 h-4 mr-2" />
                  买入信号
                </p>
                <p className="text-xs text-muted-foreground mt-2">检测到MACD金叉，建议关注科技股</p>
              </div>
              <div className="p-4 bg-gradient-to-r from-portfolio/10 to-portfolio/5 rounded-lg border-2 border-portfolio shadow-portfolio hover:shadow-md transition-all duration-200">
                <p className="text-sm font-medium text-portfolio flex items-center">
                  <TrendingUp className="w-4 h-4 mr-2" />
                  趋势分析
                </p>
                <p className="text-xs text-muted-foreground mt-2">市场情绪转向乐观，成交量放大</p>
              </div>
            </CardContent>
          </Card>

          <Card className="card-enhanced border-2 border-risk shadow-risk">
            <CardHeader className="bg-gradient-to-r from-risk/10 to-risk/5 rounded-t-lg">
              <CardTitle className="flex items-center space-x-2">
                <div className="p-1 bg-risk/10 rounded">
                  <AlertTriangle className="w-5 h-5 text-risk" />
                </div>
                <span className="text-risk">风险警报</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 pt-6">
              <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg border-2 border-portfolio/30 shadow-portfolio">
                <span className="text-sm font-medium">持仓集中度</span>
                <Badge variant="secondary" className="bg-portfolio/20 text-portfolio border border-portfolio/30">
                  中等
                </Badge>
              </div>
              <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg border-2 border-risk/30 shadow-risk">
                <span className="text-sm font-medium">波动率风险</span>
                <Badge variant="destructive" className="bg-risk text-white shadow-sm">
                  高
                </Badge>
              </div>
              <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg border-2 border-strategy/30 shadow-strategy">
                <span className="text-sm font-medium">流动性风险</span>
                <Badge variant="secondary" className="bg-strategy/20 text-strategy border border-strategy/30">
                  低
                </Badge>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
