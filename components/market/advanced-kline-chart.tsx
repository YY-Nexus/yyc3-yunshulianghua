"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { BarChart3, TrendingUp, Activity, Volume2, Maximize2, Settings } from "lucide-react"
import { useEffect, useRef, useState } from "react"

// 模拟专业K线数据
const generateKlineData = () => {
  const data = []
  let basePrice = 12.34
  for (let i = 0; i < 100; i++) {
    const change = (Math.random() - 0.5) * 0.5
    const open = basePrice
    const close = open + change
    const high = Math.max(open, close) + Math.random() * 0.2
    const low = Math.min(open, close) - Math.random() * 0.2
    const volume = Math.floor(Math.random() * 2000000) + 500000

    data.push({
      time: new Date(Date.now() - (100 - i) * 60000).toLocaleTimeString("zh-CN", {
        hour: "2-digit",
        minute: "2-digit",
      }),
      timestamp: Date.now() - (100 - i) * 60000,
      open: Number(open.toFixed(2)),
      high: Number(high.toFixed(2)),
      low: Number(low.toFixed(2)),
      close: Number(close.toFixed(2)),
      volume,
      ma5: Number((basePrice + Math.random() * 0.1).toFixed(2)),
      ma10: Number((basePrice - Math.random() * 0.1).toFixed(2)),
      ma20: Number((basePrice - Math.random() * 0.2).toFixed(2)),
    })
    basePrice = close
  }
  return data
}

const technicalIndicators = [
  { name: "RSI(14)", value: "68.5", status: "neutral", description: "相对强弱指标", range: "0-100" },
  { name: "MACD", value: "0.12", status: "bullish", description: "指数平滑移动平均线", range: "-∞ to +∞" },
  { name: "KDJ", value: "75.2", status: "overbought", description: "随机指标", range: "0-100" },
  { name: "BOLL", value: "12.45", status: "neutral", description: "布林带中轨", range: "价格区间" },
  { name: "CCI", value: "-45.8", status: "bearish", description: "商品通道指标", range: "-100 to +100" },
  { name: "WR", value: "25.3", status: "bullish", description: "威廉指标", range: "0-100" },
]

export function AdvancedKlineChart() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [klineData, setKlineData] = useState(generateKlineData())
  const [selectedPeriod, setSelectedPeriod] = useState("1m")
  const [selectedIndicator, setSelectedIndicator] = useState("MA")
  const [isFullscreen, setIsFullscreen] = useState(false)

  // 绘制专业K线图
  const drawKlineChart = () => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const { width, height } = canvas
    ctx.clearRect(0, 0, width, height)

    // 设置画布样式
    ctx.fillStyle = "#0a0a0a"
    ctx.fillRect(0, 0, width, height)

    // 计算绘图区域
    const padding = 60
    const chartWidth = width - padding * 2
    const chartHeight = height - padding * 2
    const candleWidth = (chartWidth / klineData.length) * 0.8

    // 计算价格范围
    const prices = klineData.flatMap((d) => [d.open, d.high, d.low, d.close])
    const minPrice = Math.min(...prices)
    const maxPrice = Math.max(...prices)
    const priceRange = maxPrice - minPrice

    // 绘制网格线
    ctx.strokeStyle = "#1a1a1a"
    ctx.lineWidth = 1
    for (let i = 0; i <= 10; i++) {
      const y = padding + (chartHeight / 10) * i
      ctx.beginPath()
      ctx.moveTo(padding, y)
      ctx.lineTo(width - padding, y)
      ctx.stroke()
    }

    // 绘制K线
    klineData.forEach((candle, index) => {
      const x = padding + (chartWidth / klineData.length) * index + candleWidth / 2
      const openY = padding + chartHeight - ((candle.open - minPrice) / priceRange) * chartHeight
      const closeY = padding + chartHeight - ((candle.close - minPrice) / priceRange) * chartHeight
      const highY = padding + chartHeight - ((candle.high - minPrice) / priceRange) * chartHeight
      const lowY = padding + chartHeight - ((candle.low - minPrice) / priceRange) * chartHeight

      // 绘制影线
      ctx.strokeStyle = candle.close >= candle.open ? "#00ff88" : "#ff4444"
      ctx.lineWidth = 1
      ctx.beginPath()
      ctx.moveTo(x, highY)
      ctx.lineTo(x, lowY)
      ctx.stroke()

      // 绘制实体
      ctx.fillStyle = candle.close >= candle.open ? "#00ff88" : "#ff4444"
      const bodyHeight = Math.abs(closeY - openY)
      const bodyY = Math.min(openY, closeY)
      ctx.fillRect(x - candleWidth / 2, bodyY, candleWidth, Math.max(bodyHeight, 1))
    })

    // 绘制移动平均线
    const drawMA = (data: number[], color: string) => {
      ctx.strokeStyle = color
      ctx.lineWidth = 1
      ctx.beginPath()
      data.forEach((value, index) => {
        const x = padding + (chartWidth / klineData.length) * index + candleWidth / 2
        const y = padding + chartHeight - ((value - minPrice) / priceRange) * chartHeight
        if (index === 0) {
          ctx.moveTo(x, y)
        } else {
          ctx.lineTo(x, y)
        }
      })
      ctx.stroke()
    }

    drawMA(
      klineData.map((d) => d.ma5),
      "#ffaa00",
    )
    drawMA(
      klineData.map((d) => d.ma10),
      "#00aaff",
    )
    drawMA(
      klineData.map((d) => d.ma20),
      "#aa00ff",
    )

    // 绘制价格标签
    ctx.fillStyle = "#888888"
    ctx.font = "12px monospace"
    for (let i = 0; i <= 5; i++) {
      const price = minPrice + (priceRange / 5) * i
      const y = padding + chartHeight - (chartHeight / 5) * i
      ctx.fillText(price.toFixed(2), width - padding + 5, y + 4)
    }
  }

  useEffect(() => {
    drawKlineChart()
  }, [klineData])

  // 模拟实时数据更新
  useEffect(() => {
    const interval = setInterval(() => {
      setKlineData((prev) => {
        const newData = [...prev]
        const lastCandle = newData[newData.length - 1]
        const change = (Math.random() - 0.5) * 0.1
        newData[newData.length - 1] = {
          ...lastCandle,
          close: Number((lastCandle.close + change).toFixed(2)),
          high: Math.max(lastCandle.high, lastCandle.close + change),
          low: Math.min(lastCandle.low, lastCandle.close + change),
        }
        return newData
      })
    }, 2000)

    return () => clearInterval(interval)
  }, [])

  return (
    <Card className={`h-fit ${isFullscreen ? "fixed inset-4 z-50" : ""}`}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <CardTitle className="text-lg">000001 平安银行</CardTitle>
            <Badge variant="secondary" className="bg-accent/20 text-accent">
              ¥{klineData[klineData.length - 1]?.close} +0.12 (+0.98%)
            </Badge>
            <Badge variant="outline" className="text-xs">
              实时更新
            </Badge>
          </div>
          <div className="flex items-center space-x-2">
            <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
              <SelectTrigger className="w-20">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1m">1分</SelectItem>
                <SelectItem value="5m">5分</SelectItem>
                <SelectItem value="15m">15分</SelectItem>
                <SelectItem value="1h">1小时</SelectItem>
                <SelectItem value="1d">日K</SelectItem>
                <SelectItem value="1w">周K</SelectItem>
              </SelectContent>
            </Select>
            <Select value={selectedIndicator} onValueChange={setSelectedIndicator}>
              <SelectTrigger className="w-24">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="MA">均线</SelectItem>
                <SelectItem value="BOLL">布林带</SelectItem>
                <SelectItem value="SAR">抛物线</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" size="sm" onClick={() => setIsFullscreen(!isFullscreen)}>
              <Maximize2 className="w-4 h-4" />
            </Button>
            <Button variant="outline" size="sm">
              <Settings className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="kline" className="space-y-4">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="kline" className="flex items-center space-x-2">
              <BarChart3 className="w-4 h-4" />
              <span>K线图</span>
            </TabsTrigger>
            <TabsTrigger value="volume" className="flex items-center space-x-2">
              <Volume2 className="w-4 h-4" />
              <span>成交量</span>
            </TabsTrigger>
            <TabsTrigger value="indicators" className="flex items-center space-x-2">
              <Activity className="w-4 h-4" />
              <span>技术指标</span>
            </TabsTrigger>
            <TabsTrigger value="analysis" className="flex items-center space-x-2">
              <TrendingUp className="w-4 h-4" />
              <span>AI分析</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="kline" className="space-y-4">
            <div className="relative">
              <canvas
                ref={canvasRef}
                width={800}
                height={400}
                className="w-full h-96 bg-black rounded-lg border"
                style={{ imageRendering: "pixelated" }}
              />
              <div className="absolute top-4 left-4 flex items-center space-x-4 text-sm bg-black/50 p-2 rounded">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-0.5 bg-yellow-400" />
                  <span className="text-yellow-400">MA5</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-0.5 bg-blue-400" />
                  <span className="text-blue-400">MA10</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-0.5 bg-purple-400" />
                  <span className="text-purple-400">MA20</span>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-4 gap-4 text-sm">
              <div className="p-3 bg-muted/30 rounded-lg">
                <div className="text-muted-foreground">开盘</div>
                <div className="font-mono font-bold">{klineData[klineData.length - 1]?.open}</div>
              </div>
              <div className="p-3 bg-muted/30 rounded-lg">
                <div className="text-muted-foreground">最高</div>
                <div className="font-mono font-bold text-accent">{klineData[klineData.length - 1]?.high}</div>
              </div>
              <div className="p-3 bg-muted/30 rounded-lg">
                <div className="text-muted-foreground">最低</div>
                <div className="font-mono font-bold text-destructive">{klineData[klineData.length - 1]?.low}</div>
              </div>
              <div className="p-3 bg-muted/30 rounded-lg">
                <div className="text-muted-foreground">收盘</div>
                <div className="font-mono font-bold">{klineData[klineData.length - 1]?.close}</div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="volume" className="space-y-4">
            <div className="h-80 bg-black rounded-lg border p-4">
              <div className="text-white text-sm mb-4">成交量分析</div>
              <div className="grid grid-cols-10 gap-1 h-64">
                {klineData.slice(-10).map((data, index) => (
                  <div key={index} className="flex flex-col justify-end">
                    <div className="bg-accent/60 rounded-t" style={{ height: `${(data.volume / 2000000) * 100}%` }} />
                    <div className="text-xs text-muted-foreground mt-1 text-center">{data.time.split(":")[0]}</div>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="indicators" className="space-y-4">
            <div className="grid grid-cols-3 gap-4">
              {technicalIndicators.map((indicator) => (
                <div key={indicator.name} className="p-4 bg-muted/30 rounded-lg border">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium text-sm">{indicator.name}</h4>
                    <Badge
                      variant={
                        indicator.status === "bullish"
                          ? "secondary"
                          : indicator.status === "bearish"
                            ? "destructive"
                            : "outline"
                      }
                      className={
                        indicator.status === "bullish"
                          ? "bg-accent/20 text-accent"
                          : indicator.status === "overbought"
                            ? "bg-destructive/20 text-destructive"
                            : ""
                      }
                    >
                      {indicator.status === "bullish"
                        ? "看涨"
                        : indicator.status === "bearish"
                          ? "看跌"
                          : indicator.status === "overbought"
                            ? "超买"
                            : "中性"}
                    </Badge>
                  </div>
                  <div className="space-y-1">
                    <div className="font-mono text-lg font-bold">{indicator.value}</div>
                    <div className="text-xs text-muted-foreground">{indicator.description}</div>
                    <div className="text-xs text-muted-foreground">范围: {indicator.range}</div>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="analysis" className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-muted/30 rounded-lg border">
                <h4 className="font-medium mb-3 flex items-center">
                  <TrendingUp className="w-4 h-4 mr-2 text-accent" />
                  趋势分析
                </h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>短期趋势</span>
                    <Badge className="bg-accent/20 text-accent">上涨</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span>中期趋势</span>
                    <Badge variant="outline">震荡</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span>长期趋势</span>
                    <Badge className="bg-accent/20 text-accent">上涨</Badge>
                  </div>
                </div>
              </div>
              <div className="p-4 bg-muted/30 rounded-lg border">
                <h4 className="font-medium mb-3 flex items-center">
                  <Activity className="w-4 h-4 mr-2 text-blue-400" />
                  AI建议
                </h4>
                <div className="space-y-2 text-sm">
                  <div className="p-2 bg-accent/10 rounded text-accent">建议关注12.50阻力位</div>
                  <div className="p-2 bg-blue-500/10 rounded text-blue-400">成交量放大，关注突破</div>
                  <div className="p-2 bg-yellow-500/10 rounded text-yellow-400">RSI接近超买区域</div>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
