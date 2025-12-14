import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Separator } from "@/components/ui/separator"
import { Settings, Play, Save } from "lucide-react"

export function StrategyBuilder() {
  return (
    <Card className="h-fit">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Settings className="w-5 h-5 text-primary" />
          <span>策略构建器</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="strategy-name">策略名称</Label>
          <Input id="strategy-name" placeholder="输入策略名称..." />
        </div>

        <div className="space-y-2">
          <Label htmlFor="strategy-type">策略类型</Label>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="选择策略类型" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="trend">趋势跟踪</SelectItem>
              <SelectItem value="mean-reversion">均值回归</SelectItem>
              <SelectItem value="momentum">动量策略</SelectItem>
              <SelectItem value="arbitrage">套利策略</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Separator />

        <div className="space-y-3">
          <h4 className="font-medium text-sm">技术指标参数</h4>

          <div className="grid grid-cols-2 gap-2">
            <div className="space-y-1">
              <Label className="text-xs">短期均线</Label>
              <Input placeholder="5" className="h-8" />
            </div>
            <div className="space-y-1">
              <Label className="text-xs">长期均线</Label>
              <Input placeholder="20" className="h-8" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div className="space-y-1">
              <Label className="text-xs">RSI周期</Label>
              <Input placeholder="14" className="h-8" />
            </div>
            <div className="space-y-1">
              <Label className="text-xs">RSI阈值</Label>
              <Input placeholder="70/30" className="h-8" />
            </div>
          </div>
        </div>

        <Separator />

        <div className="space-y-3">
          <h4 className="font-medium text-sm">风险控制</h4>

          <div className="grid grid-cols-2 gap-2">
            <div className="space-y-1">
              <Label className="text-xs">止损比例</Label>
              <Input placeholder="5%" className="h-8" />
            </div>
            <div className="space-y-1">
              <Label className="text-xs">止盈比例</Label>
              <Input placeholder="10%" className="h-8" />
            </div>
          </div>

          <div className="space-y-1">
            <Label className="text-xs">最大仓位</Label>
            <Input placeholder="80%" className="h-8" />
          </div>
        </div>

        <Separator />

        <div className="space-y-3">
          <h4 className="font-medium text-sm">回测设置</h4>

          <div className="space-y-1">
            <Label className="text-xs">初始资金</Label>
            <Input placeholder="1000000" className="h-8" />
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div className="space-y-1">
              <Label className="text-xs">手续费率</Label>
              <Input placeholder="0.1%" className="h-8" />
            </div>
            <div className="space-y-1">
              <Label className="text-xs">滑点</Label>
              <Input placeholder="0.05%" className="h-8" />
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="strategy-desc">策略描述</Label>
          <Textarea id="strategy-desc" placeholder="描述策略逻辑和预期效果..." className="h-20 resize-none" />
        </div>

        <div className="flex space-x-2">
          <Button size="sm" className="flex-1">
            <Save className="w-4 h-4 mr-2" />
            保存策略
          </Button>
          <Button size="sm" variant="outline" className="flex-1 bg-transparent">
            <Play className="w-4 h-4 mr-2" />
            开始回测
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
