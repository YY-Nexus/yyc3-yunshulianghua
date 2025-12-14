"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Pi as Pie, BarChart3, TrendingDown } from "lucide-react"
import { PieChart as RechartsPieChart, Cell, ResponsiveContainer, Tooltip } from "recharts"

const sectorExposure = [
  { name: "科技", value: 35, amount: 1750000, color: "hsl(var(--chart-1))" },
  { name: "金融", value: 25, amount: 1250000, color: "hsl(var(--chart-2))" },
  { name: "消费", value: 20, amount: 1000000, color: "hsl(var(--chart-3))" },
  { name: "医药", value: 15, amount: 750000, color: "hsl(var(--chart-4))" },
  { name: "其他", value: 5, amount: 250000, color: "hsl(var(--chart-5))" },
]

const riskContribution = [
  { stock: "000001", name: "平安银行", contribution: 15.2, position: 8.5, beta: 1.2 },
  { stock: "600036", name: "招商银行", contribution: 12.8, position: 7.2, beta: 1.1 },
  { stock: "000858", name: "五粮液", contribution: 11.5, position: 6.8, beta: 0.9 },
  { stock: "600519", name: "贵州茅台", contribution: 10.3, position: 5.9, beta: 0.8 },
  { stock: "000002", name: "万科A", contribution: 9.7, position: 5.5, beta: 1.4 },
]

const stressTestResults = [
  { scenario: "市场下跌10%", portfolioLoss: -8.5, var: -12.3, expectedLoss: -450000 },
  { scenario: "利率上升100bp", portfolioLoss: -3.2, var: -5.8, expectedLoss: -160000 },
  { scenario: "汇率波动5%", portfolioLoss: -1.8, var: -2.9, expectedLoss: -90000 },
  { scenario: "流动性危机", portfolioLoss: -15.2, var: -22.1, expectedLoss: -760000 },
]

export function PortfolioRisk() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Pie className="w-5 h-5 text-primary" />
          <span>投资组合风险分析</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="exposure" className="space-y-4">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="exposure" className="flex items-center space-x-2">
              <Pie className="w-4 h-4" />
              <span>风险敞口</span>
            </TabsTrigger>
            <TabsTrigger value="contribution" className="flex items-center space-x-2">
              <BarChart3 className="w-4 h-4" />
              <span>风险贡献</span>
            </TabsTrigger>
            <TabsTrigger value="stress" className="flex items-center space-x-2">
              <TrendingDown className="w-4 h-4" />
              <span>压力测试</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="exposure" className="space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <RechartsPieChart>
                    <Pie
                      data={sectorExposure}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={100}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {sectorExposure.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "hsl(var(--card))",
                        border: "1px solid hsl(var(--border))",
                        borderRadius: "8px",
                      }}
                    />
                  </RechartsPieChart>
                </ResponsiveContainer>
              </div>
              <div className="space-y-3">
                {sectorExposure.map((sector, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="w-4 h-4 rounded-full" style={{ backgroundColor: sector.color }} />
                      <span className="font-medium">{sector.name}</span>
                    </div>
                    <div className="text-right">
                      <div className="font-bold">{sector.value}%</div>
                      <div className="text-xs text-muted-foreground">¥{sector.amount.toLocaleString()}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="contribution" className="space-y-4">
            <div className="space-y-3">
              {riskContribution.map((stock, index) => (
                <div key={index} className="p-4 bg-muted/30 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <span className="font-medium">{stock.stock}</span>
                      <span className="text-sm text-muted-foreground">{stock.name}</span>
                    </div>
                    <Badge variant="outline">{stock.contribution}% 风险贡献</Badge>
                  </div>
                  <div className="grid grid-cols-3 gap-4 text-sm">
                    <div>
                      <span className="text-muted-foreground">持仓比例:</span>
                      <span className="font-medium ml-2">{stock.position}%</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Beta系数:</span>
                      <span className="font-medium ml-2">{stock.beta}</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">风险等级:</span>
                      <Badge
                        variant={
                          stock.contribution > 12 ? "destructive" : stock.contribution > 8 ? "secondary" : "outline"
                        }
                        className={
                          stock.contribution > 12
                            ? "bg-destructive/20 text-destructive ml-2"
                            : stock.contribution > 8
                              ? "bg-yellow-500/20 text-yellow-600 ml-2"
                              : "ml-2"
                        }
                      >
                        {stock.contribution > 12 ? "高" : stock.contribution > 8 ? "中" : "低"}
                      </Badge>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="stress" className="space-y-4">
            <div className="space-y-4">
              {stressTestResults.map((test, index) => (
                <div key={index} className="p-4 bg-muted/30 rounded-lg border">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-medium">{test.scenario}</h4>
                    <Badge
                      variant={
                        Math.abs(test.portfolioLoss) > 10
                          ? "destructive"
                          : Math.abs(test.portfolioLoss) > 5
                            ? "secondary"
                            : "outline"
                      }
                      className={
                        Math.abs(test.portfolioLoss) > 10
                          ? "bg-destructive/20 text-destructive"
                          : Math.abs(test.portfolioLoss) > 5
                            ? "bg-yellow-500/20 text-yellow-600"
                            : ""
                      }
                    >
                      {Math.abs(test.portfolioLoss) > 10
                        ? "高风险"
                        : Math.abs(test.portfolioLoss) > 5
                          ? "中风险"
                          : "低风险"}
                    </Badge>
                  </div>
                  <div className="grid grid-cols-3 gap-4 text-sm">
                    <div>
                      <span className="text-muted-foreground">组合损失:</span>
                      <span className="font-bold text-destructive ml-2">{test.portfolioLoss}%</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">VaR影响:</span>
                      <span className="font-bold text-destructive ml-2">{test.var}%</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">预期损失:</span>
                      <span className="font-bold text-destructive ml-2">
                        ¥{Math.abs(test.expectedLoss).toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
