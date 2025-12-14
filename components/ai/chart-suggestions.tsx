import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { BarChart3, LineChart, PieChart, Activity } from "lucide-react"

const chartSuggestions = [
  {
    id: 1,
    type: "line",
    title: "价格趋势分析",
    description: "适合展示股价长期走势和技术指标",
    icon: LineChart,
    confidence: 92,
    dataTypes: ["价格", "技术指标", "移动平均"],
    useCase: "趋势分析",
    recommended: true,
  },
  {
    id: 2,
    type: "candlestick",
    title: "K线图分析",
    description: "最适合短期交易决策和形态识别",
    icon: BarChart3,
    confidence: 88,
    dataTypes: ["开高低收", "成交量", "技术形态"],
    useCase: "短线交易",
    recommended: true,
  },
  {
    id: 3,
    type: "volume",
    title: "成交量分析",
    description: "识别资金流向和市场情绪变化",
    icon: Activity,
    confidence: 85,
    dataTypes: ["成交量", "资金流", "换手率"],
    useCase: "资金分析",
    recommended: false,
  },
  {
    id: 4,
    type: "correlation",
    title: "相关性热力图",
    description: "发现股票间的关联关系和板块轮动",
    icon: PieChart,
    confidence: 78,
    dataTypes: ["相关系数", "板块分类", "收益率"],
    useCase: "组合优化",
    recommended: false,
  },
]

export function ChartSuggestions() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <BarChart3 className="w-5 h-5 text-primary" />
          <span>智能图表推荐</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {chartSuggestions.map((suggestion) => {
          const Icon = suggestion.icon
          return (
            <div
              key={suggestion.id}
              className={`p-4 rounded-lg border transition-colors ${
                suggestion.recommended
                  ? "bg-primary/5 border-primary/20"
                  : "bg-muted/30 border-border hover:bg-muted/50"
              }`}
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <div className={`p-2 rounded-lg ${suggestion.recommended ? "bg-primary/20" : "bg-muted"}`}>
                    <Icon className={`w-4 h-4 ${suggestion.recommended ? "text-primary" : "text-muted-foreground"}`} />
                  </div>
                  <div>
                    <h3 className="font-medium">{suggestion.title}</h3>
                    <p className="text-sm text-muted-foreground">{suggestion.description}</p>
                  </div>
                </div>
                {suggestion.recommended && (
                  <Badge variant="secondary" className="bg-primary/20 text-primary">
                    推荐
                  </Badge>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4 mb-3 text-sm">
                <div>
                  <span className="text-muted-foreground">适用数据:</span>
                  <div className="mt-1">
                    {suggestion.dataTypes.map((type, index) => (
                      <Badge key={index} variant="outline" className="mr-1 mb-1 text-xs">
                        {type}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div>
                  <span className="text-muted-foreground">使用场景:</span>
                  <div className="mt-1 font-medium">{suggestion.useCase}</div>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-muted-foreground">匹配度:</span>
                  <span className="font-bold text-primary">{suggestion.confidence}%</span>
                </div>
                <Button size="sm" variant={suggestion.recommended ? "default" : "outline"}>
                  {suggestion.recommended ? "立即应用" : "了解更多"}
                </Button>
              </div>
            </div>
          )
        })}
      </CardContent>
    </Card>
  )
}
