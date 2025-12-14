"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { GitBranch, Search, Database, TrendingUp, Users, FileText, Zap, BarChart3, Network } from "lucide-react"

interface GraphEntity {
  id: string
  type: "stock" | "concept" | "shareholder" | "announcement" | "news"
  name: string
  properties: Record<string, any>
  connections: number
}

interface CorrelationData {
  stock1: string
  stock2: string
  correlation: number
  pValue: number
}

interface GraphAlgorithm {
  id: string
  name: string
  description: string
  category: string
  params: Record<string, any>
}

export default function FinancialKGPanel() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedAlgorithm, setSelectedAlgorithm] = useState("pagerank")
  const [dataSource, setDataSource] = useState("tushare")
  const [isBuilding, setIsBuilding] = useState(false)

  const [entities] = useState<GraphEntity[]>([
    {
      id: "stock_000001",
      type: "stock",
      name: "平安银行",
      properties: {
        code: "000001.SZ",
        market: "深交所",
        sector: "银行",
        industry: "银行",
        list_date: "1991-04-03",
        market_cap: "2.1万亿",
      },
      connections: 156,
    },
    {
      id: "stock_000002",
      type: "stock",
      name: "万科A",
      properties: {
        code: "000002.SZ",
        market: "深交所",
        sector: "房地产",
        industry: "房地产开发",
        list_date: "1991-01-29",
        market_cap: "2850亿",
      },
      connections: 134,
    },
    {
      id: "concept_fintech",
      type: "concept",
      name: "金融科技",
      properties: { category: "概念板块", stocks_count: 89, avg_pe: 25.6 },
      connections: 89,
    },
    {
      id: "concept_realestate",
      type: "concept",
      name: "房地产",
      properties: { category: "行业板块", stocks_count: 156, avg_pe: 8.9 },
      connections: 156,
    },
    {
      id: "shareholder_001",
      type: "shareholder",
      name: "中国平安保险",
      properties: { type: "机构", holding_ratio: "58.37%", holding_shares: "19.1亿股" },
      connections: 23,
    },
  ])

  const [correlationData] = useState<CorrelationData[]>([
    { stock1: "平安银行", stock2: "招商银行", correlation: 0.85, pValue: 0.001 },
    { stock1: "万科A", stock2: "保利发展", correlation: 0.78, pValue: 0.002 },
    { stock1: "平安银行", stock2: "兴业银行", correlation: 0.82, pValue: 0.001 },
    { stock1: "万科A", stock2: "金地集团", correlation: 0.73, pValue: 0.005 },
  ])

  const [graphAlgorithms] = useState<GraphAlgorithm[]>([
    {
      id: "pagerank",
      name: "PageRank中心性",
      description: "识别图中最重要的节点，发现核心股票",
      category: "中心性算法",
      params: { iterations: 20, dampingFactor: 0.85 },
    },
    {
      id: "betweenness",
      name: "介数中心性",
      description: "找出连接不同群体的关键节点",
      category: "中心性算法",
      params: { normalized: true },
    },
    {
      id: "louvain",
      name: "Louvain社区检测",
      description: "发现紧密相关的股票群组和板块",
      category: "社区检测",
      params: { resolution: 1.0, randomSeed: 42 },
    },
    {
      id: "label_propagation",
      name: "标签传播算法",
      description: "基于邻居标签的社区检测",
      category: "社区检测",
      params: { maxIterations: 10 },
    },
    {
      id: "jaccard",
      name: "Jaccard相似性",
      description: "计算股票间的相似度",
      category: "相似性算法",
      params: { topK: 10 },
    },
    {
      id: "cosine",
      name: "余弦相似性",
      description: "基于特征向量的相似性计算",
      category: "相似性算法",
      params: { topK: 10 },
    },
    {
      id: "shortest_path",
      name: "最短路径",
      description: "找出实体间的最短关联路径",
      category: "路径查找",
      params: { maxDepth: 5 },
    },
    {
      id: "adamic_adar",
      name: "Adamic-Adar链接预测",
      description: "预测潜在的关联关系",
      category: "预测算法",
      params: { topK: 20 },
    },
  ])

  const [queryTemplates] = useState([
    {
      name: "查找概念板块的所有股票",
      query:
        "MATCH (s:Stock)-[:BELONGS_TO]->(c:Concept) WHERE c.name = '金融科技' RETURN s.name, s.code, s.market_cap ORDER BY s.market_cap DESC LIMIT 20",
    },
    {
      name: "查找股票的主要股东",
      query:
        "MATCH (s:Stock)<-[:HOLDS]-(sh:Shareholder) WHERE s.code = '000001.SZ' RETURN sh.name, sh.holding_ratio ORDER BY sh.holding_ratio DESC LIMIT 10",
    },
    {
      name: "查找相关性最高的股票对",
      query:
        "MATCH (s1:Stock)-[r:CORRELATES_WITH]->(s2:Stock) WHERE r.correlation > 0.8 RETURN s1.name, s2.name, r.correlation ORDER BY r.correlation DESC LIMIT 15",
    },
    {
      name: "查找股票的最新公告",
      query:
        "MATCH (s:Stock)-[:HAS_ANNOUNCEMENT]->(a:Announcement) WHERE s.code = '000001.SZ' RETURN a.title, a.date, a.type ORDER BY a.date DESC LIMIT 10",
    },
  ])

  const [selectedTemplate, setSelectedTemplate] = useState("")
  const [customQuery, setCustomQuery] = useState("")

  const getEntityIcon = (type: string) => {
    switch (type) {
      case "stock":
        return <TrendingUp className="h-4 w-4 text-emerald-500" />
      case "concept":
        return <GitBranch className="h-4 w-4 text-blue-500" />
      case "shareholder":
        return <Users className="h-4 w-4 text-purple-500" />
      case "announcement":
        return <FileText className="h-4 w-4 text-yellow-500" />
      case "news":
        return <FileText className="h-4 w-4 text-orange-500" />
      default:
        return <Database className="h-4 w-4 text-gray-500" />
    }
  }

  const getEntityColor = (type: string) => {
    switch (type) {
      case "stock":
        return "bg-emerald-500/10 text-emerald-500 border-emerald-500/20"
      case "concept":
        return "bg-blue-500/10 text-blue-500 border-blue-500/20"
      case "shareholder":
        return "bg-purple-500/10 text-purple-500 border-purple-500/20"
      case "announcement":
        return "bg-yellow-500/10 text-yellow-500 border-yellow-500/20"
      case "news":
        return "bg-orange-500/10 text-orange-500 border-orange-500/20"
      default:
        return "bg-gray-500/10 text-gray-500 border-gray-500/20"
    }
  }

  const filteredEntities = entities.filter(
    (entity) =>
      entity.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      entity.properties.code?.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const handleBuildGraph = async () => {
    setIsBuilding(true)
    setTimeout(() => {
      setIsBuilding(false)
    }, 3000)
  }

  const handleRunAlgorithm = (algorithmId: string) => {
    console.log(`[v0] Running algorithm: ${algorithmId}`)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white">金融知识图谱</h2>
          <p className="text-gray-400">基于Neo4j的金融实体关系分析与图算法应用</p>
        </div>
        <div className="flex space-x-2">
          <Select value={dataSource} onValueChange={setDataSource}>
            <SelectTrigger className="w-32 bg-gray-700 border-gray-600">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-gray-800 border-gray-700">
              <SelectItem value="tushare">Tushare</SelectItem>
              <SelectItem value="jointquant">JointQuant</SelectItem>
              <SelectItem value="akshare">AKShare</SelectItem>
            </SelectContent>
          </Select>
          <Button className="bg-emerald-600 hover:bg-emerald-700" onClick={handleBuildGraph} disabled={isBuilding}>
            <Database className="mr-2 h-4 w-4" />
            {isBuilding ? "构建中..." : "构建图谱"}
          </Button>
        </div>
      </div>

      <Tabs defaultValue="entities" className="space-y-4">
        <TabsList className="grid w-full grid-cols-5 bg-gray-800/50">
          <TabsTrigger value="entities">实体管理</TabsTrigger>
          <TabsTrigger value="algorithms">图算法</TabsTrigger>
          <TabsTrigger value="query">图查询</TabsTrigger>
          <TabsTrigger value="correlation">相关性分析</TabsTrigger>
          <TabsTrigger value="analysis">关系分析</TabsTrigger>
        </TabsList>

        <TabsContent value="entities" className="space-y-4">
          <Card className="bg-gray-800/50 border-gray-700">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-white">实体搜索</CardTitle>
                  <CardDescription>搜索和管理知识图谱中的金融实体</CardDescription>
                </div>
                <div className="flex items-center space-x-2">
                  <Search className="h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="搜索股票、概念、股东..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-64 bg-gray-700 border-gray-600"
                  />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid gap-3">
                {filteredEntities.map((entity) => (
                  <div key={entity.id} className="flex items-center justify-between p-3 bg-gray-700/50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      {getEntityIcon(entity.type)}
                      <div>
                        <div className="flex items-center space-x-2">
                          <span className="font-medium text-white">{entity.name}</span>
                          <Badge className={getEntityColor(entity.type)}>
                            {entity.type === "stock"
                              ? "股票"
                              : entity.type === "concept"
                                ? "概念"
                                : entity.type === "shareholder"
                                  ? "股东"
                                  : entity.type === "announcement"
                                    ? "公告"
                                    : "新闻"}
                          </Badge>
                        </div>
                        <div className="flex items-center space-x-4 text-sm text-gray-400 mt-1">
                          {Object.entries(entity.properties)
                            .slice(0, 3)
                            .map(([key, value]) => (
                              <span key={key}>
                                {key}: {value}
                              </span>
                            ))}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-gray-400">连接数:</span>
                      <span className="font-medium text-white">{entity.connections}</span>
                      <Button size="sm" variant="outline" className="border-gray-600 bg-transparent">
                        查看关系
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="algorithms" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {graphAlgorithms.map((algorithm) => (
              <Card key={algorithm.id} className="bg-gray-800/50 border-gray-700">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-white text-lg">{algorithm.name}</CardTitle>
                      <Badge variant="outline" className="mt-1 border-gray-600 text-gray-400">
                        {algorithm.category}
                      </Badge>
                    </div>
                    <Zap className="h-5 w-5 text-yellow-500" />
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <p className="text-sm text-gray-400">{algorithm.description}</p>
                  <div className="text-xs text-gray-500">
                    参数:{" "}
                    {Object.entries(algorithm.params)
                      .map(([key, value]) => `${key}=${value}`)
                      .join(", ")}
                  </div>
                  <Button
                    size="sm"
                    className="w-full bg-emerald-600 hover:bg-emerald-700"
                    onClick={() => handleRunAlgorithm(algorithm.id)}
                  >
                    运行算法
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="query" className="space-y-4">
          <Card className="bg-gray-800/50 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white">Cypher查询</CardTitle>
              <CardDescription>使用Cypher语言查询知识图谱</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label className="text-white">查询模板</Label>
                <Select
                  value={selectedTemplate}
                  onValueChange={(value) => {
                    setSelectedTemplate(value)
                    const template = queryTemplates.find((t) => t.name === value)
                    if (template) {
                      setCustomQuery(template.query)
                    }
                  }}
                >
                  <SelectTrigger className="bg-gray-700 border-gray-600">
                    <SelectValue placeholder="选择查询模板" />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-800 border-gray-700">
                    {queryTemplates.map((template) => (
                      <SelectItem key={template.name} value={template.name}>
                        {template.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label className="text-white">查询语句</Label>
                <textarea
                  className="w-full h-32 p-3 bg-gray-700 border border-gray-600 rounded-md text-white font-mono text-sm"
                  placeholder="MATCH (s:Stock)-[:BELONGS_TO]->(c:Concept) WHERE c.name = '金融科技' RETURN s.name, s.code LIMIT 10"
                  value={customQuery}
                  onChange={(e) => setCustomQuery(e.target.value)}
                />
              </div>
              <div className="flex space-x-2">
                <Button className="bg-emerald-600 hover:bg-emerald-700">执行查询</Button>
                <Button variant="outline" className="border-gray-600 bg-transparent">
                  保存查询
                </Button>
                <Button variant="outline" className="border-gray-600 bg-transparent">
                  查询历史
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="correlation" className="space-y-4">
          <Card className="bg-gray-800/50 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <BarChart3 className="mr-2 h-5 w-5" />
                股票相关性分析
              </CardTitle>
              <CardDescription>基于皮尔逊相关系数的股票关联度分析</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {correlationData.map((item, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-700/50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <Network className="h-4 w-4 text-blue-500" />
                      <div>
                        <div className="text-white font-medium">
                          {item.stock1} ↔ {item.stock2}
                        </div>
                        <div className="text-sm text-gray-400">P值: {item.pValue.toFixed(3)}</div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="text-right">
                        <div className="text-white font-bold">{item.correlation.toFixed(3)}</div>
                        <div className="text-xs text-gray-400">相关系数</div>
                      </div>
                      <div
                        className={`w-2 h-8 rounded ${
                          item.correlation > 0.8
                            ? "bg-green-500"
                            : item.correlation > 0.6
                              ? "bg-yellow-500"
                              : "bg-red-500"
                        }`}
                      />
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-4 pt-4 border-t border-gray-700">
                <Button className="w-full bg-emerald-600 hover:bg-emerald-700">计算更多相关性</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analysis" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card className="bg-gray-800/50 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white">关系强度分析</CardTitle>
                <CardDescription>分析实体间的关联强度</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-400">股票-概念关联</span>
                    <span className="text-white font-medium">0.85</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-400">股东-股票关联</span>
                    <span className="text-white font-medium">0.72</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-400">新闻-股价关联</span>
                    <span className="text-white font-medium">0.63</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gray-800/50 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white">图谱统计</CardTitle>
                <CardDescription>知识图谱的基本统计信息</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-gray-400">节点总数</p>
                    <p className="text-xl font-bold text-white">12,456</p>
                  </div>
                  <div>
                    <p className="text-gray-400">关系总数</p>
                    <p className="text-xl font-bold text-white">45,789</p>
                  </div>
                  <div>
                    <p className="text-gray-400">股票数量</p>
                    <p className="text-xl font-bold text-white">4,123</p>
                  </div>
                  <div>
                    <p className="text-gray-400">概念数量</p>
                    <p className="text-xl font-bold text-white">567</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
