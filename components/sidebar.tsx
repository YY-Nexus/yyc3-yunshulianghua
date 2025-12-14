"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  BarChart3,
  TrendingUp,
  Brain,
  Shield,
  Settings,
  Database,
  Activity,
  PieChart,
  Monitor,
  ChevronLeft,
  ChevronRight,
} from "lucide-react"

const navigation = [
  { name: "仪表板", href: "/", icon: BarChart3, current: false, color: "text-primary" },
  { name: "实时行情", href: "/market", icon: Activity, current: false, color: "text-market" },
  { name: "AI分析", href: "/ai-analysis", icon: Brain, current: false, color: "text-ai" },
  { name: "策略回测", href: "/backtest", icon: TrendingUp, current: false, color: "text-strategy" },
  { name: "投资组合", href: "/portfolio", icon: PieChart, color: "text-portfolio" },
  { name: "风险管理", href: "/risk", icon: Shield, current: false, color: "text-risk" },
  { name: "数据管理", href: "/data", icon: Database, color: "text-data" },
  { name: "系统监控", href: "/system", icon: Monitor, color: "text-system" },
  { name: "系统设置", href: "/settings", icon: Settings, color: "text-settings" },
]

export function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false)

  return (
    <div
      className={cn(
        "flex-shrink-0 flex flex-col bg-sidebar border-r-2 border-sidebar-border transition-all duration-300 ease-in-out shadow-lg relative",
        isCollapsed ? "w-16" : "w-64",
      )}
      onMouseEnter={() => setIsCollapsed(false)}
      onMouseLeave={() => setIsCollapsed(true)}
    >
      <div className="flex items-center justify-between h-16 px-4 border-b-2 border-sidebar-border bg-gradient-to-r from-primary/5 to-accent/5">
        <div className={cn("flex items-center space-x-3 transition-opacity duration-200", isCollapsed && "opacity-0")}>
          <div className="w-8 h-8 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center shadow-md">
            <BarChart3 className="w-5 h-5 text-primary-foreground" />
          </div>
          <div>
            <h1 className="text-lg font-semibold text-sidebar-foreground">云枢量化</h1>
            <p className="text-xs text-muted-foreground">EasyVizAI</p>
          </div>
        </div>

        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="p-1 hover:bg-sidebar-accent/10 transition-colors duration-200"
        >
          {isCollapsed ? (
            <ChevronRight className="w-4 h-4 text-sidebar-foreground" />
          ) : (
            <ChevronLeft className="w-4 h-4 text-sidebar-foreground" />
          )}
        </Button>
      </div>

      <nav className="flex-1 px-2 py-6 space-y-1">
        {navigation.map((item) => {
          const Icon = item.icon
          return (
            <Button
              key={item.name}
              variant={item.current ? "default" : "ghost"}
              className={cn(
                "w-full justify-start text-left transition-all duration-200 hover:scale-105 hover:shadow-md",
                isCollapsed ? "px-2" : "px-3",
                item.current
                  ? "bg-gradient-to-r from-sidebar-primary to-sidebar-accent text-sidebar-primary-foreground shadow-md"
                  : "text-sidebar-foreground hover:bg-gradient-to-r hover:from-sidebar-accent/10 hover:to-primary/10 hover:text-sidebar-accent-foreground hover:border hover:border-sidebar-accent/20",
              )}
            >
              <Icon className={cn("w-5 h-5", isCollapsed ? "mr-0" : "mr-3", item.color)} />
              <span className={cn("transition-opacity duration-200", isCollapsed && "opacity-0 w-0 overflow-hidden")}>
                {item.name}
              </span>
            </Button>
          )
        })}
      </nav>

      <div className="p-4 border-t-2 border-sidebar-border bg-gradient-to-r from-muted/30 to-accent/5">
        <div className={cn("flex items-center space-x-3 transition-all duration-200", isCollapsed && "justify-center")}>
          <div className="w-8 h-8 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center shadow-md">
            <span className="text-sm font-medium text-white">用</span>
          </div>
          <div
            className={cn(
              "flex-1 min-w-0 transition-opacity duration-200",
              isCollapsed && "opacity-0 w-0 overflow-hidden",
            )}
          >
            <p className="text-sm font-medium text-sidebar-foreground truncate">量化交易员</p>
            <p className="text-xs text-muted-foreground truncate">trader@example.com</p>
          </div>
        </div>
      </div>
    </div>
  )
}
