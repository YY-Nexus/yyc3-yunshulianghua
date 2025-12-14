import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, TrendingDown } from "lucide-react"

const marketIndices = [
  { name: "上证指数", code: "000001", price: "3,234.56", change: "+12.34", changePercent: "+0.38%", trend: "up" },
  { name: "深证成指", code: "399001", price: "12,345.67", change: "-23.45", changePercent: "-0.19%", trend: "down" },
  { name: "创业板指", code: "399006", price: "2,567.89", change: "+45.67", changePercent: "+1.81%", trend: "up" },
  { name: "科创50", code: "000688", price: "1,234.56", change: "+8.90", changePercent: "+0.73%", trend: "up" },
  { name: "恒生指数", code: "HSI", price: "18,234.56", change: "-67.89", changePercent: "-0.37%", trend: "down" },
  { name: "纳斯达克", code: "IXIC", price: "15,678.90", change: "+123.45", changePercent: "+0.79%", trend: "up" },
]

export function MarketOverview() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>市场概览</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
          {marketIndices.map((index) => (
            <div key={index.code} className="p-4 bg-muted/30 rounded-lg border">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-medium text-sm">{index.name}</h3>
                {index.trend === "up" ? (
                  <TrendingUp className="w-4 h-4 text-accent" />
                ) : (
                  <TrendingDown className="w-4 h-4 text-destructive" />
                )}
              </div>
              <div className="space-y-1">
                <div className="font-mono text-lg font-bold">{index.price}</div>
                <div className="flex items-center space-x-2">
                  <span className={`text-sm font-medium ${index.trend === "up" ? "text-accent" : "text-destructive"}`}>
                    {index.change}
                  </span>
                  <Badge variant={index.trend === "up" ? "secondary" : "destructive"} className="text-xs">
                    {index.changePercent}
                  </Badge>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
