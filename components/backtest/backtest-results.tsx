"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { TrendingUp, BarChart3, Activity, Calendar } from "lucide-react"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from "recharts"

const equityCurve = [
  { date: "2024-01", portfolio: 100000, benchmark: 100000, drawdown: 0 },
  { date: "2024-02", portfolio: 102500, benchmark: 101200, drawdown: -1.2 },
  { date: "2024-03", portfolio: 108300, benchmark: 103800, drawdown: -0.8 },
  { date: "2024-04", portfolio: 105600, benchmark: 102100, drawdown: -2.5 },
  { date: "2024-05", portfolio: 112400, benchmark: 105600, drawdown: -1.1 },
  { date: "2024-06", portfolio: 118900, benchmark: 108200, drawdown: -0.3 },
  { date: "2024-07", portfolio: 115200, benchmark: 106800, drawdown: -3.1 },
  { date: "2024-08", portfolio: 122800, benchmark: 109500, drawdown: -0.9 },
  { date: "2024-09", portfolio: 128600, benchmark: 112300, drawdown: -0.5 },
  { date: "2024-10", portfolio: 125400, benchmark: 110800, drawdown: -2.5 },
  { date: "2024-11", portfolio: 132100, benchmark: 114200, drawdown: -0.7 },
  { date: "2024-12", portfolio: 138500, benchmark: 117600, drawdown: -0.2 },
]

const monthlyReturns = [
  { month: "1月", returns: 2.5, benchmark: 1.2 },
  { month: "2月", returns: 5.7, benchmark: 2.6 },
  { month: "3月", returns: -2.5, benchmark: -1.6 },
  { month: "4月", returns: 6.4, benchmark: 3.4 },
  { month: "5月", returns: 5.8, benchmark: 2.5 },
  { month: "6月", returns: -3.1, benchmark: -1.3 },
  { month: "7月", returns: 6.6, benchmark: 2.5 },
  { month: "8月", returns: 4.7, benchmark: 2.6 },
  { month: "9月", returns: -2.5, benchmark: -1.4 },
  { month: "10月", returns: 5.3, benchmark: 3.1 },
  { month: "11月", returns: 4.9, benchmark: 2.9 },
  { month: "12月", returns: 4.8, benchmark: 3.0 },
]

export function BacktestResults() {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <CardTitle className="text-lg">双均线策略 - 回测结果</CardTitle>
            <Badge variant="secondary" className="bg-accent/20 text-accent">
              2024年度
            </Badge>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm">
              <Calendar className="w-4 h-4 mr-2" />
              时间范围
            </Button>
            <Button variant="outline" size="sm">
              导出报告
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="equity" className="space-y-4">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="equity" className="flex items-center space-x-2">
              <TrendingUp className="w-4 h-4" />
              <span>权益曲线</span>
            </TabsTrigger>
            <TabsTrigger value="returns" className="flex items-center space-x-2">
              <BarChart3 className="w-4 h-4" />
              <span>月度收益</span>
            </TabsTrigger>
            <TabsTrigger value="drawdown" className="flex items-center space-x-2">
              <Activity className="w-4 h-4" />
              <span>回撤分析</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="equity" className="space-y-4">
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={equityCurve}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="date" stroke="hsl(var(--muted-foreground))" />
                  <YAxis stroke="hsl(var(--muted-foreground))" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "8px",
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="portfolio"
                    stroke="hsl(var(--primary))"
                    strokeWidth={2}
                    dot={false}
                    name="策略收益"
                  />
                  <Line
                    type="monotone"
                    dataKey="benchmark"
                    stroke="hsl(var(--muted-foreground))"
                    strokeWidth={2}
                    strokeDasharray="5 5"
                    dot={false}
                    name="基准收益"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
            <div className="flex items-center space-x-4 text-sm">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-0.5 bg-primary" />
                <span>策略收益</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-0.5 bg-muted-foreground border-dashed" />
                <span>基准收益</span>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="returns" className="space-y-4">
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={monthlyReturns}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" />
                  <YAxis stroke="hsl(var(--muted-foreground))" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "8px",
                    }}
                  />
                  <Bar dataKey="returns" fill="hsl(var(--primary))" name="策略收益" />
                  <Bar dataKey="benchmark" fill="hsl(var(--muted-foreground))" name="基准收益" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </TabsContent>

          <TabsContent value="drawdown" className="space-y-4">
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={equityCurve}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="date" stroke="hsl(var(--muted-foreground))" />
                  <YAxis stroke="hsl(var(--muted-foreground))" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "8px",
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="drawdown"
                    stroke="hsl(var(--destructive))"
                    strokeWidth={2}
                    dot={false}
                    name="回撤幅度"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
