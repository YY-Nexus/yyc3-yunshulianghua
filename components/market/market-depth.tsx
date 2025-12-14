import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

const buyOrders = [
  { price: "12.45", volume: "1,234", percentage: 85 },
  { price: "12.44", volume: "2,567", percentage: 92 },
  { price: "12.43", volume: "1,890", percentage: 78 },
  { price: "12.42", volume: "3,456", percentage: 95 },
  { price: "12.41", volume: "987", percentage: 65 },
]

const sellOrders = [
  { price: "12.46", volume: "876", percentage: 60 },
  { price: "12.47", volume: "1,543", percentage: 75 },
  { price: "12.48", volume: "2,109", percentage: 88 },
  { price: "12.49", volume: "1,765", percentage: 82 },
  { price: "12.50", volume: "2,987", percentage: 98 },
]

const recentTrades = [
  { time: "15:00:23", price: "12.46", volume: "100", type: "buy" },
  { time: "15:00:18", price: "12.45", volume: "200", type: "sell" },
  { time: "15:00:12", price: "12.46", volume: "150", type: "buy" },
  { time: "15:00:08", price: "12.45", volume: "300", type: "sell" },
  { time: "15:00:03", price: "12.46", volume: "250", type: "buy" },
]

export function MarketDepth() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">市场深度</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* 卖盘 */}
          <div className="space-y-2">
            <h4 className="text-sm font-medium text-destructive">卖盘</h4>
            {sellOrders.reverse().map((order, index) => (
              <div key={index} className="flex items-center justify-between text-sm">
                <div className="flex items-center space-x-2 flex-1">
                  <span className="font-mono text-destructive">¥{order.price}</span>
                  <div className="flex-1 relative">
                    <Progress value={order.percentage} className="h-2 bg-destructive/10" />
                    <div
                      className="absolute inset-0 bg-destructive/20 rounded-full"
                      style={{ width: `${order.percentage}%` }}
                    />
                  </div>
                </div>
                <span className="font-mono text-xs text-muted-foreground w-16 text-right">{order.volume}</span>
              </div>
            ))}
          </div>

          {/* 当前价格 */}
          <div className="py-2 border-y border-border">
            <div className="text-center">
              <div className="font-mono text-lg font-bold text-accent">¥12.46</div>
              <div className="text-xs text-muted-foreground">当前价格</div>
            </div>
          </div>

          {/* 买盘 */}
          <div className="space-y-2">
            <h4 className="text-sm font-medium text-accent">买盘</h4>
            {buyOrders.map((order, index) => (
              <div key={index} className="flex items-center justify-between text-sm">
                <div className="flex items-center space-x-2 flex-1">
                  <span className="font-mono text-accent">¥{order.price}</span>
                  <div className="flex-1 relative">
                    <Progress value={order.percentage} className="h-2 bg-accent/10" />
                    <div
                      className="absolute inset-0 bg-accent/20 rounded-full"
                      style={{ width: `${order.percentage}%` }}
                    />
                  </div>
                </div>
                <span className="font-mono text-xs text-muted-foreground w-16 text-right">{order.volume}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">最新成交</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {recentTrades.map((trade, index) => (
              <div key={index} className="flex items-center justify-between text-sm">
                <span className="text-xs text-muted-foreground font-mono">{trade.time}</span>
                <span className={`font-mono ${trade.type === "buy" ? "text-accent" : "text-destructive"}`}>
                  ¥{trade.price}
                </span>
                <span className="text-xs text-muted-foreground font-mono">{trade.volume}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
