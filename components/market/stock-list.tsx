import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Search, Star, TrendingUp, TrendingDown } from "lucide-react"
import { Button } from "@/components/ui/button"

const stocks = [
  {
    symbol: "000001",
    name: "平安银行",
    price: "12.34",
    change: "+0.12",
    changePercent: "+0.98%",
    volume: "1.2亿",
    trend: "up",
  },
  {
    symbol: "000002",
    name: "万科A",
    price: "23.45",
    change: "-0.23",
    changePercent: "-0.97%",
    volume: "8.9千万",
    trend: "down",
  },
  {
    symbol: "600036",
    name: "招商银行",
    price: "45.67",
    change: "+1.23",
    changePercent: "+2.77%",
    volume: "2.1亿",
    trend: "up",
  },
  {
    symbol: "600519",
    name: "贵州茅台",
    price: "1,678.90",
    change: "-12.34",
    changePercent: "-0.73%",
    volume: "3.4千万",
    trend: "down",
  },
  {
    symbol: "000858",
    name: "五粮液",
    price: "234.56",
    change: "+5.67",
    changePercent: "+2.48%",
    volume: "1.8亿",
    trend: "up",
  },
  {
    symbol: "600887",
    name: "伊利股份",
    price: "34.56",
    change: "+0.89",
    changePercent: "+2.64%",
    volume: "1.1亿",
    trend: "up",
  },
]

export function StockList() {
  return (
    <Card className="h-fit">
      <CardHeader>
        <CardTitle className="text-lg">股票列表</CardTitle>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input placeholder="搜索股票代码或名称..." className="pl-10" />
        </div>
      </CardHeader>
      <CardContent className="space-y-2">
        {stocks.map((stock) => (
          <div
            key={stock.symbol}
            className="p-3 bg-muted/30 rounded-lg border hover:bg-muted/50 cursor-pointer transition-colors"
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center space-x-2">
                <Button variant="ghost" size="icon" className="w-6 h-6">
                  <Star className="w-3 h-3" />
                </Button>
                <div>
                  <div className="font-medium text-sm">{stock.symbol}</div>
                  <div className="text-xs text-muted-foreground">{stock.name}</div>
                </div>
              </div>
              {stock.trend === "up" ? (
                <TrendingUp className="w-4 h-4 text-accent" />
              ) : (
                <TrendingDown className="w-4 h-4 text-destructive" />
              )}
            </div>
            <div className="space-y-1">
              <div className="flex items-center justify-between">
                <span className="font-mono text-sm font-bold">¥{stock.price}</span>
                <Badge variant={stock.trend === "up" ? "secondary" : "destructive"} className="text-xs">
                  {stock.changePercent}
                </Badge>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className={`${stock.trend === "up" ? "text-accent" : "text-destructive"}`}>{stock.change}</span>
                <span className="text-muted-foreground">成交量: {stock.volume}</span>
              </div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
