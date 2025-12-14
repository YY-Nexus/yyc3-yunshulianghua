"use client"

import { useState, useEffect } from "react"
import { APIManager, defaultAPIConfigs } from "@/lib/api-integration"

export function useAPIIntegration() {
  const [apiManager, setApiManager] = useState<APIManager | null>(null)
  const [isHealthy, setIsHealthy] = useState({ llm: false, industryData: false })
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const manager = new APIManager(defaultAPIConfigs.llm, defaultAPIConfigs.industryData)
    setApiManager(manager)

    // 执行健康检查
    manager
      .healthCheck()
      .then((health) => {
        setIsHealthy({ llm: health.llm, industryData: health.industryData })
        setIsLoading(false)
      })
      .catch(() => {
        setIsLoading(false)
      })
  }, [])

  const analyzeSentiment = async (text: string) => {
    if (!apiManager) throw new Error("API Manager not initialized")
    return await apiManager.getLLMIntegration().analyzeMarketSentiment(text)
  }

  const generateStrategy = async (parameters: any) => {
    if (!apiManager) throw new Error("API Manager not initialized")
    return await apiManager.getLLMIntegration().generateTradingStrategy(parameters)
  }

  const getRealTimeQuotes = async (symbols: string[]) => {
    if (!apiManager) throw new Error("API Manager not initialized")
    return await apiManager.getIndustryDataAPI().getRealTimeQuotes(symbols)
  }

  const getMarketNews = async (category?: string, limit = 20) => {
    if (!apiManager) throw new Error("API Manager not initialized")
    return await apiManager.getIndustryDataAPI().getMarketNews(category, limit)
  }

  return {
    isLoading,
    isHealthy,
    analyzeSentiment,
    generateStrategy,
    getRealTimeQuotes,
    getMarketNews,
  }
}
