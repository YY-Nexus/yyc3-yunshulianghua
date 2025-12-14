export interface APIConfig {
  baseUrl: string
  apiKey: string
  timeout: number
  retryCount: number
}

export interface MarketDataAPI {
  getKlineData(symbol: string, interval: string, limit?: number): Promise<any>
  getTickerData(symbol: string): Promise<any>
  getOrderBook(symbol: string, limit?: number): Promise<any>
  getTradeHistory(symbol: string, limit?: number): Promise<any>
}

export interface AIModelAPI {
  analyzeChart(chartData: any): Promise<any>
  predictPrice(historicalData: any): Promise<any>
  detectAnomalies(data: any): Promise<any>
  generateStrategy(parameters: any): Promise<any>
}

// 大模型API集成
export class LLMIntegration {
  private config: APIConfig

  constructor(config: APIConfig) {
    this.config = config
  }

  async analyzeMarketSentiment(text: string): Promise<{
    sentiment: "bullish" | "bearish" | "neutral"
    confidence: number
    keywords: string[]
  }> {
    try {
      const response = await fetch(`${this.config.baseUrl}/analyze-sentiment`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${this.config.apiKey}`,
        },
        body: JSON.stringify({ text }),
      })
      return await response.json()
    } catch (error) {
      console.error("LLM sentiment analysis failed:", error)
      throw error
    }
  }

  async generateTradingStrategy(parameters: {
    riskLevel: "low" | "medium" | "high"
    timeframe: string
    marketCondition: string
  }): Promise<{
    strategy: string
    entryRules: string[]
    exitRules: string[]
    riskManagement: string[]
  }> {
    try {
      const response = await fetch(`${this.config.baseUrl}/generate-strategy`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${this.config.apiKey}`,
        },
        body: JSON.stringify(parameters),
      })
      return await response.json()
    } catch (error) {
      console.error("Strategy generation failed:", error)
      throw error
    }
  }

  async explainTechnicalIndicator(
    indicator: string,
    value: number,
  ): Promise<{
    explanation: string
    signal: "buy" | "sell" | "hold"
    confidence: number
  }> {
    try {
      const response = await fetch(`${this.config.baseUrl}/explain-indicator`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${this.config.apiKey}`,
        },
        body: JSON.stringify({ indicator, value }),
      })
      return await response.json()
    } catch (error) {
      console.error("Indicator explanation failed:", error)
      throw error
    }
  }
}

// 行业数据API集成
export class IndustryDataAPI {
  private config: APIConfig

  constructor(config: APIConfig) {
    this.config = config
  }

  // 获取实时行情数据
  async getRealTimeQuotes(symbols: string[]): Promise<any> {
    try {
      const response = await fetch(`${this.config.baseUrl}/quotes`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${this.config.apiKey}`,
        },
        body: JSON.stringify({ symbols }),
      })
      return await response.json()
    } catch (error) {
      console.error("Real-time quotes failed:", error)
      throw error
    }
  }

  // 获取财务数据
  async getFinancialData(symbol: string): Promise<any> {
    try {
      const response = await fetch(`${this.config.baseUrl}/financial/${symbol}`, {
        headers: {
          Authorization: `Bearer ${this.config.apiKey}`,
        },
      })
      return await response.json()
    } catch (error) {
      console.error("Financial data fetch failed:", error)
      throw error
    }
  }

  // 获取新闻数据
  async getMarketNews(category?: string, limit = 20): Promise<any> {
    try {
      const params = new URLSearchParams()
      if (category) params.append("category", category)
      params.append("limit", limit.toString())

      const response = await fetch(`${this.config.baseUrl}/news?${params}`, {
        headers: {
          Authorization: `Bearer ${this.config.apiKey}`,
        },
      })
      return await response.json()
    } catch (error) {
      console.error("Market news fetch failed:", error)
      throw error
    }
  }
}

// API管理器
export class APIManager {
  private llmIntegration: LLMIntegration
  private industryDataAPI: IndustryDataAPI

  constructor(llmConfig: APIConfig, industryConfig: APIConfig) {
    this.llmIntegration = new LLMIntegration(llmConfig)
    this.industryDataAPI = new IndustryDataAPI(industryConfig)
  }

  getLLMIntegration(): LLMIntegration {
    return this.llmIntegration
  }

  getIndustryDataAPI(): IndustryDataAPI {
    return this.industryDataAPI
  }

  // 健康检查
  async healthCheck(): Promise<{
    llm: boolean
    industryData: boolean
    timestamp: number
  }> {
    const results = {
      llm: false,
      industryData: false,
      timestamp: Date.now(),
    }

    try {
      // 检查LLM API
      await this.llmIntegration.analyzeMarketSentiment("test")
      results.llm = true
    } catch (error) {
      console.warn("LLM API health check failed:", error)
    }

    try {
      // 检查行业数据API
      await this.industryDataAPI.getRealTimeQuotes(["AAPL"])
      results.industryData = true
    } catch (error) {
      console.warn("Industry Data API health check failed:", error)
    }

    return results
  }
}

// 默认配置
export const defaultAPIConfigs = {
  llm: {
    baseUrl: process.env.NEXT_PUBLIC_LLM_API_URL || "https://api.openai.com/v1",
    apiKey: process.env.LLM_API_KEY || "",
    timeout: 30000,
    retryCount: 3,
  },
  industryData: {
    baseUrl: process.env.NEXT_PUBLIC_MARKET_API_URL || "https://api.marketdata.com/v1",
    apiKey: process.env.MARKET_API_KEY || "",
    timeout: 10000,
    retryCount: 2,
  },
}
