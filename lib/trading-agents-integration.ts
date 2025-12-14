export interface Agent {
  id: string
  name: string
  role: string
  status: "active" | "inactive" | "debating" | "analyzing"
  confidence: number
  lastUpdate: string
  analysis: string
}

export interface DebateEntry {
  id: number
  round: number
  agent: string
  name: string
  type: "bull" | "bear" | "decision"
  timestamp: string
  confidence: number
  message: string
  keyPoints: string[]
  decision?: {
    action: string
    confidence: number
    targetPrice: string
    stopLoss: string
    positionSize: string
    timeHorizon: string
  }
}

export interface TradingAgentsConfig {
  llmProvider: string
  model: string
  analysisDepth: number
  debateRounds: number
  symbol: string
  analysisDate: string
}

export class TradingAgentsEngine {
  private agents: Map<string, Agent> = new Map()
  private debateHistory: DebateEntry[] = []
  private config: TradingAgentsConfig

  constructor(config: TradingAgentsConfig) {
    this.config = config
    this.initializeAgents()
  }

  private initializeAgents() {
    const defaultAgents: Agent[] = [
      {
        id: "market_analyst",
        name: "市场技术分析师",
        role: "技术分析",
        status: "active",
        confidence: 0,
        lastUpdate: "",
        analysis: "",
      },
      {
        id: "fundamental_analyst",
        name: "基本面分析师",
        role: "基本面分析",
        status: "active",
        confidence: 0,
        lastUpdate: "",
        analysis: "",
      },
      {
        id: "news_analyst",
        name: "新闻情绪分析师",
        role: "新闻分析",
        status: "active",
        confidence: 0,
        lastUpdate: "",
        analysis: "",
      },
      {
        id: "social_analyst",
        name: "社交媒体分析师",
        role: "情绪分析",
        status: "active",
        confidence: 0,
        lastUpdate: "",
        analysis: "",
      },
      {
        id: "bull_researcher",
        name: "看涨研究员",
        role: "多头观点",
        status: "inactive",
        confidence: 0,
        lastUpdate: "",
        analysis: "",
      },
      {
        id: "bear_researcher",
        name: "看跌研究员",
        role: "空头观点",
        status: "inactive",
        confidence: 0,
        lastUpdate: "",
        analysis: "",
      },
      {
        id: "trader",
        name: "交易决策员",
        role: "最终决策",
        status: "inactive",
        confidence: 0,
        lastUpdate: "",
        analysis: "",
      },
    ]

    defaultAgents.forEach((agent) => {
      this.agents.set(agent.id, agent)
    })
  }

  async runAnalysis(): Promise<DebateEntry[]> {
    // 阶段1: 分析师收集信息
    await this.runAnalystsPhase()

    // 阶段2: 研究员辩论
    await this.runDebatePhase()

    // 阶段3: 交易员决策
    await this.runDecisionPhase()

    return this.debateHistory
  }

  private async runAnalystsPhase(): Promise<void> {
    const analysts = ["market_analyst", "fundamental_analyst", "news_analyst", "social_analyst"]

    for (const analystId of analysts) {
      const agent = this.agents.get(analystId)
      if (agent) {
        agent.status = "analyzing"
        // 模拟分析过程
        await this.simulateAnalysis(agent)
        agent.status = "active"
      }
    }
  }

  private async runDebatePhase(): Promise<void> {
    const bullAgent = this.agents.get("bull_researcher")
    const bearAgent = this.agents.get("bear_researcher")

    if (bullAgent && bearAgent) {
      bullAgent.status = "debating"
      bearAgent.status = "debating"

      for (let round = 1; round <= this.config.debateRounds; round++) {
        // 看涨研究员发言
        await this.simulateDebateEntry(bullAgent, "bull", round)

        // 看跌研究员回应
        await this.simulateDebateEntry(bearAgent, "bear", round)
      }

      bullAgent.status = "active"
      bearAgent.status = "active"
    }
  }

  private async runDecisionPhase(): Promise<void> {
    const trader = this.agents.get("trader")
    if (trader) {
      trader.status = "analyzing"
      await this.simulateDecision(trader)
      trader.status = "active"
    }
  }

  private async simulateAnalysis(agent: Agent): Promise<void> {
    return new Promise((resolve) => {
      setTimeout(
        () => {
          agent.confidence = Math.floor(Math.random() * 30 + 60) // 60-90%
          agent.lastUpdate = new Date().toLocaleTimeString()
          agent.analysis = this.generateAnalysis(agent.role)
          resolve()
        },
        Math.random() * 2000 + 1000,
      ) // 1-3秒
    })
  }

  private async simulateDebateEntry(agent: Agent, type: "bull" | "bear", round: number): Promise<void> {
    return new Promise((resolve) => {
      setTimeout(
        () => {
          const entry: DebateEntry = {
            id: this.debateHistory.length + 1,
            round,
            agent: agent.id,
            name: agent.name,
            type,
            timestamp: new Date().toLocaleTimeString(),
            confidence: Math.floor(Math.random() * 30 + 60),
            message: this.generateDebateMessage(type, round),
            keyPoints: this.generateKeyPoints(type),
          }

          this.debateHistory.push(entry)
          resolve()
        },
        Math.random() * 3000 + 2000,
      ) // 2-5秒
    })
  }

  private async simulateDecision(trader: Agent): Promise<void> {
    return new Promise((resolve) => {
      setTimeout(
        () => {
          const decision = {
            action: Math.random() > 0.3 ? "谨慎看涨" : "保持观望",
            confidence: Math.floor(Math.random() * 20 + 70),
            targetPrice: `+${Math.floor(Math.random() * 20 + 10)}%`,
            stopLoss: `-${Math.floor(Math.random() * 10 + 5)}%`,
            positionSize: `${Math.floor(Math.random() * 30 + 20)}-${Math.floor(Math.random() * 20 + 50)}%`,
            timeHorizon: Math.random() > 0.5 ? "3-6个月" : "1-3个月",
          }

          const entry: DebateEntry = {
            id: this.debateHistory.length + 1,
            round: this.config.debateRounds + 1,
            agent: trader.id,
            name: trader.name,
            type: "decision",
            timestamp: new Date().toLocaleTimeString(),
            confidence: decision.confidence,
            message: this.generateDecisionMessage(decision),
            keyPoints: ["分批建仓", "风险控制", "动态调整"],
            decision,
          }

          this.debateHistory.push(entry)
          resolve()
        },
        Math.random() * 4000 + 3000,
      ) // 3-7秒
    })
  }

  private generateAnalysis(role: string): string {
    const analyses = {
      技术分析: "技术指标显示强势上涨趋势，RSI未超买，MACD金叉确认",
      基本面分析: "财报数据良好，营收增长稳定，估值合理",
      新闻分析: "近期新闻整体偏正面，市场情绪乐观",
      情绪分析: "社交媒体讨论热度上升，投资者情绪积极",
    }
    return analyses[role] || "分析中..."
  }

  private generateDebateMessage(type: "bull" | "bear", round: number): string {
    const bullMessages = [
      "技术指标显示强烈的看涨信号。MACD金叉确认，RSI处于健康区间，布林带上轨突破。",
      "虽然估值较高，但公司基本面依然强劲。最新财报显示营收增长15%，净利润增长22%。",
    ]

    const bearMessages = [
      "技术面确实强势，但基本面存在担忧。当前估值已达历史高位，行业增长率连续三个季度下滑。",
      "财报数据确实不错，但需要关注前瞻性指标。管理层下调了下季度指引，竞争对手推出了颠覆性产品。",
    ]

    return type === "bull" ? bullMessages[round - 1] || bullMessages[0] : bearMessages[round - 1] || bearMessages[0]
  }

  private generateKeyPoints(type: "bull" | "bear"): string[] {
    const bullPoints = ["MACD金叉", "成交量放大", "布林带突破", "目标价+20%"]
    const bearPoints = ["估值偏高", "行业增长放缓", "宏观风险", "建议谨慎"]

    return type === "bull" ? bullPoints : bearPoints
  }

  private generateDecisionMessage(decision: any): string {
    return `综合分析双方观点，技术面确实呈现强势突破格局，基本面短期内仍然稳健。考虑到潜在风险，建议采取分批建仓策略。初始仓位${decision.positionSize.split("-")[0]}，突破确认后可增至${decision.positionSize.split("-")[1]}。设置${decision.stopLoss}止损位。`
  }

  getAgents(): Agent[] {
    return Array.from(this.agents.values())
  }

  getDebateHistory(): DebateEntry[] {
    return this.debateHistory
  }

  updateConfig(newConfig: Partial<TradingAgentsConfig>) {
    this.config = { ...this.config, ...newConfig }
  }
}

// 导出单例实例
export const tradingAgentsEngine = new TradingAgentsEngine({
  llmProvider: "dashscope",
  model: "qwen-plus",
  analysisDepth: 3,
  debateRounds: 2,
  symbol: "",
  analysisDate: new Date().toISOString().split("T")[0],
})
