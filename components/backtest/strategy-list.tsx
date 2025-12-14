import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, Play, Pause, TrendingUp, TrendingDown, Brain, Zap } from "lucide-react"

const strategies = [
  {
    id: 1,
    name: "双均线策略",
    description: "基于5日和20日移动平均线的交叉信号",
    status: "running",
    returns: "+12.5%",
    sharpe: "1.85",
    maxDrawdown: "-3.2%",
    trades: 45,
    winRate: "68%",
    type: "classic",
  },
  {
    id: 2,
    name: "RSI反转策略",
    description: "利用RSI超买超卖信号进行反向交易",
    status: "stopped",
    returns: "+8.3%",
    sharpe: "1.42",
    maxDrawdown: "-5.1%",
    trades: 32,
    winRate: "62%",
    type: "classic",
  },
  {
    id: 3,
    name: "MACD金叉策略",
    description: "MACD指标金叉死叉信号交易",
    status: "running",
    returns: "+15.7%",
    sharpe: "2.13",
    maxDrawdown: "-2.8%",
    trades: 28,
    winRate: "75%",
    type: "classic",
  },
  {
    id: 4,
    name: "布林带突破",
    description: "布林带上下轨突破策略",
    status: "paused",
    returns: "-2.1%",
    sharpe: "0.65",
    maxDrawdown: "-8.3%",
    trades: 18,
    winRate: "44%",
    type: "classic",
  },
  {
    id: 5,
    name: "Abu智能双均线",
    description: "AI优化的双均线策略，动态调整参数",
    status: "running",
    returns: "+18.9%",
    sharpe: "2.45",
    maxDrawdown: "-2.1%",
    trades: 52,
    winRate: "73%",
    type: "abu",
    mlOptimized: true,
  },
  {
    id: 6,
    name: "Abu机器学习集成",
    description: "多模型集成的AI交易策略",
    status: "running",
    returns: "+22.3%",
    sharpe: "2.78",
    maxDrawdown: "-1.8%",
    trades: 38,
    winRate: "79%",
    type: "abu",
    mlOptimized: true,
  },
  {
    id: 7,
    name: "Abu量化因子模型",
    description: "基于多因子模型的量化选股策略",
    status: "running",
    returns: "+16.4%",
    sharpe: "2.21",
    maxDrawdown: "-3.5%",
    trades: 67,
    winRate: "71%",
    type: "abu",
    mlOptimized: true,
  },
]

export function StrategyList() {
  return (
    <Card className="h-fit">
      <CardHeader>
        <CardTitle className="text-lg">策略列表</CardTitle>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input placeholder="搜索策略..." className="pl-10" />
        </div>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="all" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-4">
            <TabsTrigger value="all">全部</TabsTrigger>
            <TabsTrigger value="classic">经典策略</TabsTrigger>
            <TabsTrigger value="abu">Abu策略</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-3">
            {strategies.map((strategy) => (
              <StrategyCard key={strategy.id} strategy={strategy} />
            ))}
          </TabsContent>

          <TabsContent value="classic" className="space-y-3">
            {strategies
              .filter((s) => s.type === "classic")
              .map((strategy) => (
                <StrategyCard key={strategy.id} strategy={strategy} />
              ))}
          </TabsContent>

          <TabsContent value="abu" className="space-y-3">
            {strategies
              .filter((s) => s.type === "abu")
              .map((strategy) => (
                <StrategyCard key={strategy.id} strategy={strategy} />
              ))}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}

function StrategyCard({ strategy }: { strategy: any }) {
  return (
    <div className="p-4 bg-muted/30 rounded-lg border hover:bg-muted/50 cursor-pointer">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center space-x-2">
          <h3 className="font-medium text-sm">{strategy.name}</h3>
          <Badge
            variant={
              strategy.status === "running" ? "secondary" : strategy.status === "stopped" ? "destructive" : "outline"
            }
            className={
              strategy.status === "running"
                ? "bg-accent/20 text-accent"
                : strategy.status === "stopped"
                  ? "bg-destructive/20 text-destructive"
                  : ""
            }
          >
            {strategy.status === "running" ? "运行中" : strategy.status === "stopped" ? "已停止" : "暂停"}
          </Badge>
          {strategy.type === "abu" && (
            <Badge variant="outline" className="text-xs bg-accent/10 text-accent border-accent/30">
              Abu
            </Badge>
          )}
          {strategy.mlOptimized && (
            <Badge variant="outline" className="text-xs bg-blue-500/10 text-blue-500 border-blue-500/30">
              <Brain className="w-2 h-2 mr-1" />
              AI
            </Badge>
          )}
        </div>
        <Button variant="ghost" size="icon" className="w-6 h-6">
          {strategy.status === "running" ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3" />}
        </Button>
      </div>

      <p className="text-xs text-muted-foreground mb-3">{strategy.description}</p>

      <div className="grid grid-cols-2 gap-2 text-xs">
        <div className="flex items-center justify-between">
          <span className="text-muted-foreground">收益率:</span>
          <span className={`font-bold ${strategy.returns.startsWith("+") ? "text-accent" : "text-destructive"}`}>
            {strategy.returns}
          </span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-muted-foreground">夏普比:</span>
          <span className="font-bold">{strategy.sharpe}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-muted-foreground">最大回撤:</span>
          <span className="font-bold text-destructive">{strategy.maxDrawdown}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-muted-foreground">胜率:</span>
          <span className="font-bold">{strategy.winRate}</span>
        </div>
      </div>

      <div className="flex items-center justify-between mt-3 pt-2 border-t border-border">
        <span className="text-xs text-muted-foreground">交易次数: {strategy.trades}</span>
        <div className="flex items-center space-x-1">
          {strategy.returns.startsWith("+") ? (
            <TrendingUp className="w-3 h-3 text-accent" />
          ) : (
            <TrendingDown className="w-3 h-3 text-destructive" />
          )}
          {strategy.type === "abu" && <Zap className="w-3 h-3 text-accent" />}
        </div>
      </div>
    </div>
  )
}
