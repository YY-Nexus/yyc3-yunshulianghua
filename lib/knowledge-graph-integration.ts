export interface KnowledgeGraphConfig {
  neo4jUrl: string
  username: string
  password: string
  database: string
}

export interface GraphEntity {
  id: string
  type: "stock" | "concept" | "shareholder" | "announcement" | "news"
  name: string
  properties: Record<string, any>
  connections: number
}

export interface GraphRelation {
  from: string
  to: string
  type: string
  weight: number
  properties?: Record<string, any>
}

export interface GraphAlgorithmResult {
  algorithm: string
  nodes: Array<{
    id: string
    name: string
    score: number
    rank?: number
  }>
  execution_time: number
  parameters: Record<string, any>
}

export interface CorrelationData {
  stock1: string
  stock2: string
  correlation: number
  pValue: number
  method: "pearson" | "spearman" | "kendall"
}

export interface DataSourceConfig {
  tushare: {
    token: string
    baseUrl: string
  }
  jointquant: {
    username: string
    password: string
    baseUrl: string
  }
  akshare: {
    baseUrl: string
  }
}

export class KnowledgeGraphService {
  private config: KnowledgeGraphConfig
  private dataSourceConfig: DataSourceConfig

  constructor(config: KnowledgeGraphConfig, dataSourceConfig?: DataSourceConfig) {
    this.config = config
    this.dataSourceConfig = dataSourceConfig || {
      tushare: {
        token: process.env.TUSHARE_TOKEN || "",
        baseUrl: "http://api.tushare.pro",
      },
      jointquant: {
        username: process.env.JOINTQUANT_USERNAME || "",
        password: process.env.JOINTQUANT_PASSWORD || "",
        baseUrl: "https://www.joinquant.com/api",
      },
      akshare: {
        baseUrl: "http://akshare.akfamily.xyz",
      },
    }
  }

  // 连接Neo4j数据库
  async connect(): Promise<boolean> {
    try {
      // 模拟连接逻辑
      console.log("[v0] Connecting to Neo4j database...")
      await new Promise((resolve) => setTimeout(resolve, 1000))
      return true
    } catch (error) {
      console.error("[v0] Failed to connect to Neo4j:", error)
      return false
    }
  }

  // 执行Cypher查询
  async executeCypher(query: string, parameters?: Record<string, any>): Promise<any[]> {
    try {
      console.log("[v0] Executing Cypher query:", query)
      // 模拟查询结果
      return [{ stock: { name: "平安银行", code: "000001" } }, { stock: { name: "招商银行", code: "600036" } }]
    } catch (error) {
      console.error("[v0] Cypher query failed:", error)
      throw error
    }
  }

  // 运行图算法
  async runGraphAlgorithm(algorithm: string, parameters: Record<string, any> = {}): Promise<GraphAlgorithmResult> {
    try {
      console.log("[v0] Running graph algorithm:", algorithm, "with parameters:", parameters)

      const mockResults: Record<string, GraphAlgorithmResult> = {
        pagerank: {
          algorithm: "PageRank",
          nodes: [
            { id: "stock_000001", name: "平安银行", score: 0.0856, rank: 1 },
            { id: "stock_600036", name: "招商银行", score: 0.0723, rank: 2 },
            { id: "stock_601166", name: "兴业银行", score: 0.0689, rank: 3 },
            { id: "concept_fintech", name: "金融科技", score: 0.0634, rank: 4 },
          ],
          execution_time: 1.2,
          parameters: { iterations: parameters.iterations || 20, dampingFactor: parameters.dampingFactor || 0.85 },
        },
        betweenness: {
          algorithm: "Betweenness Centrality",
          nodes: [
            { id: "concept_fintech", name: "金融科技", score: 0.924, rank: 1 },
            { id: "stock_000001", name: "平安银行", score: 0.782, rank: 2 },
            { id: "concept_banking", name: "银行", score: 0.756, rank: 3 },
          ],
          execution_time: 2.1,
          parameters: { normalized: parameters.normalized || true },
        },
        louvain: {
          algorithm: "Louvain Community Detection",
          nodes: [
            { id: "community_1", name: "银行板块", score: 0.89 },
            { id: "community_2", name: "房地产板块", score: 0.76 },
            { id: "community_3", name: "科技板块", score: 0.82 },
          ],
          execution_time: 3.5,
          parameters: { resolution: parameters.resolution || 1.0, randomSeed: parameters.randomSeed || 42 },
        },
        label_propagation: {
          algorithm: "Label Propagation",
          nodes: [
            { id: "community_1", name: "金融集群", score: 0.91 },
            { id: "community_2", name: "地产集群", score: 0.78 },
          ],
          execution_time: 1.8,
          parameters: { maxIterations: parameters.maxIterations || 10 },
        },
        jaccard: {
          algorithm: "Jaccard Similarity",
          nodes: [
            { id: "pair_1", name: "平安银行-招商银行", score: 0.67 },
            { id: "pair_2", name: "万科A-保利发展", score: 0.59 },
          ],
          execution_time: 0.9,
          parameters: { topK: parameters.topK || 10 },
        },
        cosine: {
          algorithm: "Cosine Similarity",
          nodes: [
            { id: "pair_1", name: "平安银行-招商银行", score: 0.73 },
            { id: "pair_2", name: "万科A-金地集团", score: 0.68 },
          ],
          execution_time: 1.1,
          parameters: { topK: parameters.topK || 10 },
        },
        shortest_path: {
          algorithm: "Shortest Path",
          nodes: [
            { id: "path_1", name: "平安银行→金融科技→招商银行", score: 2 },
            { id: "path_2", name: "万科A→房地产→保利发展", score: 2 },
          ],
          execution_time: 0.7,
          parameters: { maxDepth: parameters.maxDepth || 5 },
        },
        adamic_adar: {
          algorithm: "Adamic-Adar Link Prediction",
          nodes: [
            { id: "prediction_1", name: "平安银行-中信银行", score: 0.84 },
            { id: "prediction_2", name: "万科A-华夏幸福", score: 0.71 },
          ],
          execution_time: 2.3,
          parameters: { topK: parameters.topK || 20 },
        },
      }

      await new Promise((resolve) => setTimeout(resolve, mockResults[algorithm]?.execution_time * 1000 || 1500))
      return mockResults[algorithm] || mockResults.pagerank
    } catch (error) {
      console.error("[v0] Graph algorithm failed:", error)
      throw error
    }
  }

  // 获取实体详情
  async getEntityDetails(entityId: string): Promise<GraphEntity | null> {
    try {
      // 模拟实体详情查询
      const mockEntity: GraphEntity = {
        id: entityId,
        type: "stock",
        name: "平安银行",
        properties: {
          code: "000001",
          market: "深交所",
          sector: "银行",
          market_cap: "2.1万亿",
          pe_ratio: 5.2,
        },
        connections: 156,
      }

      return mockEntity
    } catch (error) {
      console.error("[v0] Failed to get entity details:", error)
      return null
    }
  }

  // 获取实体关系
  async getEntityRelations(entityId: string, limit = 10): Promise<GraphRelation[]> {
    try {
      // 模拟关系查询
      const mockRelations: GraphRelation[] = [
        {
          from: entityId,
          to: "concept_fintech",
          type: "BELONGS_TO",
          weight: 0.85,
          properties: { confidence: 0.92 },
        },
        {
          from: "shareholder_001",
          to: entityId,
          type: "HOLDS",
          weight: 0.58,
          properties: { holding_ratio: "58.37%" },
        },
      ]

      return mockRelations.slice(0, limit)
    } catch (error) {
      console.error("[v0] Failed to get entity relations:", error)
      return []
    }
  }

  // 构建知识图谱
  async buildKnowledgeGraph(dataSource: "tushare" | "jointquant" | "akshare" = "tushare"): Promise<boolean> {
    try {
      console.log("[v0] Building comprehensive knowledge graph from:", dataSource)

      // 1. 数据预处理
      const preprocessedData = await this.preprocessFinancialData(dataSource)

      // 2. 创建实体
      const entities: GraphEntity[] = [
        ...preprocessedData.stocks.map((stock) => ({
          id: `stock_${stock.code}`,
          type: "stock" as const,
          name: stock.name,
          properties: stock,
          connections: 0,
        })),
        ...preprocessedData.concepts.map((concept) => ({
          id: `concept_${concept.name}`,
          type: "concept" as const,
          name: concept.name,
          properties: concept,
          connections: 0,
        })),
        ...preprocessedData.shareholders.map((sh, idx) => ({
          id: `shareholder_${idx}`,
          type: "shareholder" as const,
          name: sh.name,
          properties: sh,
          connections: 0,
        })),
      ]

      await this.createGraphEntities(entities)

      // 3. 创建关系
      const relations: GraphRelation[] = []

      // 股票-概念关系
      preprocessedData.concepts.forEach((concept) => {
        concept.stocks.forEach((stockCode: string) => {
          relations.push({
            from: `stock_${stockCode}`,
            to: `concept_${concept.name}`,
            type: "BELONGS_TO",
            weight: 1.0,
          })
        })
      })

      // 股东-股票关系
      preprocessedData.shareholders.forEach((sh, idx) => {
        relations.push({
          from: `shareholder_${idx}`,
          to: `stock_${sh.stock_code}`,
          type: "HOLDS",
          weight: sh.holding_ratio / 100,
          properties: { holding_ratio: sh.holding_ratio },
        })
      })

      await this.createGraphRelations(relations)

      // 4. 计算股票相关性并创建关系
      const stockCodes = preprocessedData.stocks.map((s) => s.code)
      const correlations = await this.calculateStockCorrelation(stockCodes)

      const correlationRelations = correlations
        .filter((c) => c.correlation > 0.5) // 只保留相关性较高的关系
        .map((c) => ({
          from: `stock_${c.stock1}`,
          to: `stock_${c.stock2}`,
          type: "CORRELATES_WITH",
          weight: c.correlation,
          properties: { correlation: c.correlation, pValue: c.pValue, method: c.method },
        }))

      await this.createGraphRelations(correlationRelations)

      console.log("[v0] Knowledge graph built successfully!")
      console.log(
        `[v0] Created ${entities.length} entities and ${relations.length + correlationRelations.length} relations`,
      )

      return true
    } catch (error) {
      console.error("[v0] Failed to build knowledge graph:", error)
      return false
    }
  }

  async calculateStockCorrelation(
    stocks: string[],
    period = "1y",
    method: "pearson" | "spearman" | "kendall" = "pearson",
  ): Promise<CorrelationData[]> {
    try {
      console.log("[v0] Calculating stock correlations using", method, "method")

      // 模拟相关性计算结果
      const correlations: CorrelationData[] = [
        { stock1: "000001.SZ", stock2: "600036.SH", correlation: 0.856, pValue: 0.001, method },
        { stock1: "000001.SZ", stock2: "601166.SH", correlation: 0.823, pValue: 0.002, method },
        { stock1: "600036.SH", stock2: "601166.SH", correlation: 0.789, pValue: 0.003, method },
        { stock1: "000002.SZ", stock2: "600048.SH", correlation: 0.734, pValue: 0.005, method },
        { stock1: "000002.SZ", stock2: "000069.SZ", correlation: 0.698, pValue: 0.008, method },
      ]

      await new Promise((resolve) => setTimeout(resolve, 2000))
      return correlations.filter((c) => stocks.includes(c.stock1) || stocks.includes(c.stock2))
    } catch (error) {
      console.error("[v0] Failed to calculate correlations:", error)
      return []
    }
  }

  async preprocessFinancialData(dataSource: "tushare" | "jointquant" | "akshare"): Promise<{
    stocks: any[]
    shareholders: any[]
    concepts: any[]
    announcements: any[]
    news: any[]
  }> {
    try {
      console.log("[v0] Preprocessing financial data from:", dataSource)

      const steps = [
        "获取股票基本信息",
        "获取股东持股数据",
        "获取概念板块数据",
        "获取公告信息",
        "获取新闻数据",
        "数据清洗和标准化",
        "计算对数收益率",
        "生成特征向量",
      ]

      for (let i = 0; i < steps.length; i++) {
        console.log(`[v0] Preprocessing step ${i + 1}: ${steps[i]}`)
        await new Promise((resolve) => setTimeout(resolve, 600))
      }

      // 模拟预处理后的数据
      return {
        stocks: [
          { code: "000001.SZ", name: "平安银行", industry: "银行", list_date: "1991-04-03" },
          { code: "000002.SZ", name: "万科A", industry: "房地产", list_date: "1991-01-29" },
        ],
        shareholders: [{ name: "中国平安保险", stock_code: "000001.SZ", holding_ratio: 58.37 }],
        concepts: [{ name: "金融科技", stocks: ["000001.SZ", "600036.SH"], count: 89 }],
        announcements: [{ stock_code: "000001.SZ", title: "2024年第三季度报告", date: "2024-10-30" }],
        news: [{ stock_code: "000001.SZ", title: "平安银行数字化转型成效显著", date: "2024-11-15" }],
      }
    } catch (error) {
      console.error("[v0] Data preprocessing failed:", error)
      throw error
    }
  }

  async createGraphEntities(entities: GraphEntity[]): Promise<boolean> {
    try {
      console.log("[v0] Creating graph entities:", entities.length)

      for (const entity of entities) {
        const cypherQuery = `
          MERGE (n:${entity.type.charAt(0).toUpperCase() + entity.type.slice(1)} {id: $id})
          SET n.name = $name, n += $properties
          RETURN n
        `
        await this.executeCypher(cypherQuery, {
          id: entity.id,
          name: entity.name,
          properties: entity.properties,
        })
      }

      return true
    } catch (error) {
      console.error("[v0] Failed to create graph entities:", error)
      return false
    }
  }

  async createGraphRelations(relations: GraphRelation[]): Promise<boolean> {
    try {
      console.log("[v0] Creating graph relations:", relations.length)

      for (const relation of relations) {
        const cypherQuery = `
          MATCH (a {id: $from}), (b {id: $to})
          MERGE (a)-[r:${relation.type}]->(b)
          SET r.weight = $weight, r += $properties
          RETURN r
        `
        await this.executeCypher(cypherQuery, {
          from: relation.from,
          to: relation.to,
          weight: relation.weight,
          properties: relation.properties || {},
        })
      }

      return true
    } catch (error) {
      console.error("[v0] Failed to create graph relations:", error)
      return false
    }
  }
}

// 默认配置
export const defaultKGConfig: KnowledgeGraphConfig = {
  neo4jUrl: process.env.NEO4J_URL || "bolt://localhost:7687",
  username: process.env.NEO4J_USERNAME || "neo4j",
  password: process.env.NEO4J_PASSWORD || "password",
  database: process.env.NEO4J_DATABASE || "neo4j",
}

// 全局知识图谱服务实例
export const knowledgeGraphService = new KnowledgeGraphService(defaultKGConfig)
