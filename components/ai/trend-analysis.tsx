"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { TrendingUp, BarChart3, Activity } from "lucide-react"
import { XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from "recharts"

const trendData = [
  { date: "01-10", bullish: 65, bearish: 35, neutral: 20, sentiment: 0.3 },
  { date: "01-11", bullish: 72, bearish: 28, neutral: 25, sentiment: 0.44 },
  { date: "01-12", bullish: 68, bearish: 32, neutral: 22, sentiment: 0.36 },
  { date: "01-13", bullish: 78, bearish: 22, neutral: 18, sentiment: 0.56 },
  { date: "01-14", bullish: 82, bearish: 18, neutral: 15, sentiment: 0.64 },
  { date: "01-15", bullish: 75, bearish: 25, neutral: 20, sentiment: 0.5 },
]

const sectorTrends = [
  { sector: "科技股", trend: "上涨", strength: 85, change: "+2.3%" },
  { sector: "金融股", trend: "震荡", strength: 45, change: "+0.1%" },
  { sector: "消费股", trend: "下跌", strength: 72, change: "-1.2%" },
  { sector: "医药股", trend: "上涨", strength: 68, change: "+1.8%" },
  { sector: "地产股", trend: "下跌", strength: 89, change: "-2.1%" },
]

export function TrendAnalysis() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <TrendingUp className="w-5 h-5 text-primary" />
          <span>趋势分析</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="sentiment" className="space-y-4">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="sentiment" className="flex items-center space-x-2">
              <Activity className="w-4 h-4" />
              <span>市场情绪</span>
            </TabsTrigger>
            <TabsTrigger value="sectors" className="flex items-center space-x-2">
              <BarChart3 className="w-4 h-4" />
              <span>板块趋势</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="sentiment" className="space-y-4">
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={trendData}>
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
                  <Area
                    type="monotone"
                    dataKey="bullish"
                    stackId="1"
                    stroke="hsl(var(--accent))"
                    fill="hsl(var(--accent))"
                    fillOpacity={0.6}
                  />
                  <Area
                    type="monotone"
                    dataKey="neutral"
                    stackId="1"
                    stroke="hsl(var(--muted-foreground))"
                    fill="hsl(var(--muted-foreground))"
                    fillOpacity={0.4}
                  />
                  <Area
                    type="monotone"
                    dataKey="bearish"
                    stackId="1"
                    stroke="hsl(var(--destructive))"
                    fill="hsl(var(--destructive))"
                    fillOpacity={0.6}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
            <div className="flex items-center justify-center space-x-6 text-sm">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-accent rounded-full" />
                <span>看涨情绪</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-muted-foreground rounded-full" />
                <span>中性情绪</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-destructive rounded-full" />
                <span>看跌情绪</span>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="sectors" className="space-y-4">
            <div className="space-y-3">
              {sectorTrends.map((sector, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="font-medium">{sector.sector}</div>
                    <Badge
                      variant={
                        sector.trend === "上涨" ? "secondary" : sector.trend === "下跌" ? "destructive" : "outline"
                      }
                      className={
                        sector.trend === "上涨"
                          ? "bg-accent/20 text-accent"
                          : sector.trend === "下跌"
                            ? "bg-destructive/20 text-destructive"
                            : ""
                      }
                    >
                      {sector.trend}
                    </Badge>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="text-right">
                      <div className="text-sm text-muted-foreground">强度</div>
                      <div className="font-bold">{sector.strength}%</div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm text-muted-foreground">涨跌幅</div>
                      <div
                        className={`font-bold ${sector.change.startsWith("+") ? "text-accent" : "text-destructive"}`}
                      >
                        {sector.change}
                      </div>
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
