import { MarketOverview } from "@/components/market/market-overview"
import { StockList } from "@/components/market/stock-list"
import { TradingChart } from "@/components/market/trading-chart"
import { MarketDepth } from "@/components/market/market-depth"
import { Header } from "@/components/header"
import { Sidebar } from "@/components/sidebar"

export default function MarketPage() {
  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-auto p-6">
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h1 className="text-2xl font-bold">实时行情</h1>
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <div className="w-2 h-2 bg-accent rounded-full animate-pulse" />
                <span>实时更新</span>
              </div>
            </div>

            <MarketOverview />

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
              <div className="lg:col-span-1">
                <StockList />
              </div>
              <div className="lg:col-span-2">
                <TradingChart />
              </div>
              <div className="lg:col-span-1">
                <MarketDepth />
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
