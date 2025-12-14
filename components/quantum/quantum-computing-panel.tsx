"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { Slider } from "@/components/ui/slider"
import { Progress } from "@/components/ui/progress"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Atom, Cpu, Zap, Settings, Play, Pause, BarChart3, AlertTriangle, CheckCircle } from "lucide-react"
import { useState } from "react"

const quantumAlgorithms = [
  {
    id: "vqe",
    name: "变分量子本征求解器 (VQE)",
    category: "优化算法",
    description: "用于投资组合优化和风险最小化的量子算法",
    complexity: "中等",
    useCase: "投资组合优化",
    qubits: "10-50",
    estimatedTime: "5-15分钟",
    accuracy: "高",
  },
  {
    id: "qaoa",
    name: "量子近似优化算法 (QAOA)",
    category: "组合优化",
    description: "解决复杂约束条件下的资产配置问题",
    complexity: "高",
    useCase: "约束优化",
    qubits: "20-100",
    estimatedTime: "10-30分钟",
    accuracy: "很高",
  },
  {
    id: "qml",
    name: "量子机器学习",
    category: "机器学习",
    description: "量子增强的价格预测和模式识别",
    complexity: "高",
    useCase: "预测建模",
    qubits: "16-64",
    estimatedTime: "15-45分钟",
    accuracy: "极高",
  },
  {
    id: "qmc",
    name: "量子蒙特卡洛",
    category: "风险计算",
    description: "加速风险评估和衍生品定价计算",
    complexity: "中等",
    useCase: "风险计算",
    qubits: "8-32",
    estimatedTime: "3-10分钟",
    accuracy: "高",
  },
]

const gpuResources = [
  { id: "rtx4090", name: "RTX 4090", memory: "24GB", cores: "16384", status: "available" },
  { id: "a100", name: "A100", memory: "80GB", cores: "6912", status: "busy" },
  { id: "h100", name: "H100", memory: "80GB", cores: "14592", status: "available" },
  { id: "v100", name: "V100", memory: "32GB", cores: "5120", status: "maintenance" },
]

export function QuantumComputingPanel() {
  const [selectedAlgorithm, setSelectedAlgorithm] = useState(quantumAlgorithms[0])
  const [quantumEnabled, setQuantumEnabled] = useState(false)
  const [hybridMode, setHybridMode] = useState(true)
  const [qubits, setQubits] = useState([16])
  const [iterations, setIterations] = useState([100])
  const [isRunning, setIsRunning] = useState(false)
  const [progress, setProgress] = useState(0)

  const startQuantumComputation = () => {
    setIsRunning(true)
    setProgress(0)

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          setIsRunning(false)
          return 100
        }
        return prev + Math.random() * 10
      })
    }, 1500)
  }

  return (
    <Card className="h-fit">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Atom className="w-5 h-5 text-purple-500" />
          <span>量子计算引擎</span>
          <Badge variant="secondary" className="bg-purple-500/20 text-purple-500">
            CUDA-Q
          </Badge>
          {!quantumEnabled && (
            <Badge variant="outline" className="text-xs">
              预留接口
            </Badge>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="algorithms" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="algorithms">量子算法</TabsTrigger>
            <TabsTrigger value="resources">GPU资源</TabsTrigger>
            <TabsTrigger value="config">配置</TabsTrigger>
            <TabsTrigger value="results">结果</TabsTrigger>
          </TabsList>

          <TabsContent value="algorithms" className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label>启用量子计算</Label>
                <p className="text-xs text-muted-foreground">需要NVIDIA GPU和CUDA-Q环境</p>
              </div>
              <Switch checked={quantumEnabled} onCheckedChange={setQuantumEnabled} />
            </div>

            {!quantumEnabled && (
              <div className="p-3 bg-orange-500/10 border border-orange-500/20 rounded-lg">
                <div className="flex items-center space-x-2 mb-2">
                  <AlertTriangle className="w-4 h-4 text-orange-500" />
                  <span className="text-sm font-medium">量子计算环境未配置</span>
                </div>
                <p className="text-xs text-muted-foreground">
                  当前为预留接口模式。要启用量子计算，请安装NVIDIA CUDA-Q框架和配置GPU环境。
                </p>
              </div>
            )}

            <div className="space-y-3">
              <Label>选择量子算法</Label>
              <Select
                value={selectedAlgorithm.id}
                onValueChange={(value) => {
                  const algorithm = quantumAlgorithms.find((a) => a.id === value)
                  if (algorithm) setSelectedAlgorithm(algorithm)
                }}
                disabled={!quantumEnabled}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {quantumAlgorithms.map((algorithm) => (
                    <SelectItem key={algorithm.id} value={algorithm.id}>
                      <div className="flex items-center space-x-2">
                        <span>{algorithm.name}</span>
                        <Badge variant="outline" className="text-xs">
                          {algorithm.category}
                        </Badge>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="p-4 bg-muted/30 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-medium">{selectedAlgorithm.name}</h4>
                <Badge variant="outline">{selectedAlgorithm.category}</Badge>
              </div>
              <p className="text-sm text-muted-foreground mb-3">{selectedAlgorithm.description}</p>
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">应用场景:</span>
                  <span className="font-medium">{selectedAlgorithm.useCase}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">复杂度:</span>
                  <span className="font-medium">{selectedAlgorithm.complexity}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">量子比特:</span>
                  <span className="font-medium">{selectedAlgorithm.qubits}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">预计时间:</span>
                  <span className="font-medium">{selectedAlgorithm.estimatedTime}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">精度:</span>
                  <span className="font-medium text-accent">{selectedAlgorithm.accuracy}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">加速比:</span>
                  <span className="font-medium text-green-500">10-100x</span>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="resources" className="space-y-4">
            <div className="space-y-3">
              <Label>GPU资源状态</Label>
              <ScrollArea className="h-48">
                <div className="space-y-2">
                  {gpuResources.map((gpu) => (
                    <div key={gpu.id} className="p-3 bg-muted/30 rounded-lg border">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center space-x-2">
                          <Cpu className="w-4 h-4 text-blue-500" />
                          <span className="font-medium text-sm">{gpu.name}</span>
                        </div>
                        <Badge
                          variant={
                            gpu.status === "available" ? "secondary" : gpu.status === "busy" ? "destructive" : "outline"
                          }
                          className={
                            gpu.status === "available"
                              ? "bg-green-500/20 text-green-500"
                              : gpu.status === "busy"
                                ? "bg-red-500/20 text-red-500"
                                : "bg-orange-500/20 text-orange-500"
                          }
                        >
                          {gpu.status === "available" ? "可用" : gpu.status === "busy" ? "忙碌" : "维护中"}
                        </Badge>
                      </div>
                      <div className="grid grid-cols-2 gap-2 text-xs">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">显存:</span>
                          <span className="font-medium">{gpu.memory}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">CUDA核心:</span>
                          <span className="font-medium">{gpu.cores}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </div>

            <div className="p-3 bg-muted/30 rounded-lg">
              <div className="flex items-center space-x-2 mb-2">
                <Zap className="w-4 h-4 text-accent" />
                <span className="text-sm font-medium">量子-经典混合计算</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted-foreground">自动在GPU和QPU间分配任务</span>
                <Switch checked={hybridMode} onCheckedChange={setHybridMode} disabled={!quantumEnabled} />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="config" className="space-y-4">
            <div className="space-y-4">
              <div className="space-y-3">
                <Label>量子比特数量</Label>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">8</span>
                    <span className="text-sm font-medium">{qubits[0]}</span>
                    <span className="text-sm">64</span>
                  </div>
                  <Slider
                    value={qubits}
                    onValueChange={setQubits}
                    max={64}
                    min={8}
                    step={2}
                    className="w-full"
                    disabled={!quantumEnabled}
                  />
                </div>
              </div>

              <div className="space-y-3">
                <Label>优化迭代次数</Label>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">50</span>
                    <span className="text-sm font-medium">{iterations[0]}</span>
                    <span className="text-sm">500</span>
                  </div>
                  <Slider
                    value={iterations}
                    onValueChange={setIterations}
                    max={500}
                    min={50}
                    step={25}
                    className="w-full"
                    disabled={!quantumEnabled}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label className="text-xs">收敛阈值</Label>
                  <Input type="number" defaultValue="1e-6" step="1e-6" className="h-8" disabled={!quantumEnabled} />
                </div>
                <div>
                  <Label className="text-xs">最大运行时间(分钟)</Label>
                  <Input type="number" defaultValue="30" className="h-8" disabled={!quantumEnabled} />
                </div>
              </div>

              <div className="space-y-3">
                <Label>优化目标</Label>
                <Select defaultValue="portfolio" disabled={!quantumEnabled}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="portfolio">投资组合优化</SelectItem>
                    <SelectItem value="risk">风险最小化</SelectItem>
                    <SelectItem value="return">收益最大化</SelectItem>
                    <SelectItem value="sharpe">夏普比率优化</SelectItem>
                    <SelectItem value="var">VaR最小化</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="results" className="space-y-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Label>量子计算进度</Label>
                <span className="text-sm text-muted-foreground">
                  {isRunning ? `${Math.round(progress)}%` : "待启动"}
                </span>
              </div>
              {isRunning && <Progress value={progress} className="w-full" />}
            </div>

            <ScrollArea className="h-64">
              <div className="space-y-3">
                {quantumEnabled ? (
                  <>
                    <div className="p-3 bg-green-500/10 border border-green-500/20 rounded-lg">
                      <div className="flex items-center space-x-2 mb-2">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        <span className="font-medium text-sm">量子优化完成</span>
                      </div>
                      <div className="grid grid-cols-2 gap-2 text-xs">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">优化收益:</span>
                          <span className="font-medium text-green-500">+23.7%</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">风险降低:</span>
                          <span className="font-medium text-green-500">-15.2%</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">夏普比率:</span>
                          <span className="font-medium">2.84</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">计算时间:</span>
                          <span className="font-medium">8.3分钟</span>
                        </div>
                      </div>
                    </div>

                    <div className="p-3 bg-muted/30 rounded-lg">
                      <div className="flex items-center space-x-2 mb-2">
                        <BarChart3 className="w-4 h-4 text-accent" />
                        <span className="font-medium text-sm">量子vs经典对比</span>
                      </div>
                      <div className="space-y-2 text-xs">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">计算速度提升:</span>
                          <span className="font-medium text-accent">47x</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">解质量提升:</span>
                          <span className="font-medium text-accent">+12.3%</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">能耗降低:</span>
                          <span className="font-medium text-green-500">-68%</span>
                        </div>
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="p-3 bg-muted/30 rounded-lg text-center">
                    <Atom className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                    <p className="text-sm text-muted-foreground">量子计算环境未启用</p>
                    <p className="text-xs text-muted-foreground mt-1">启用后可查看量子优化结果和性能对比</p>
                  </div>
                )}
              </div>
            </ScrollArea>
          </TabsContent>
        </Tabs>

        <div className="flex space-x-2 mt-6">
          <Button className="flex-1" onClick={startQuantumComputation} disabled={!quantumEnabled || isRunning}>
            {isRunning ? (
              <>
                <Pause className="w-4 h-4 mr-2" />
                量子计算中...
              </>
            ) : (
              <>
                <Play className="w-4 h-4 mr-2" />
                启动量子优化
              </>
            )}
          </Button>
          <Button variant="outline" disabled={!quantumEnabled}>
            <Settings className="w-4 h-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
