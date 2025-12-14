"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Bell, Search, Wifi, WifiOff, Sun, Moon } from "lucide-react"

export function Header() {
  const isConnected = true // 模拟连接状态
  const [isDarkMode, setIsDarkMode] = useState(false)

  return (
    <header className="flex-shrink-0 h-16 bg-gradient-to-r from-card via-card to-muted/30 border-b-2 border-border flex items-center justify-between px-6 shadow-md">
      <div className="flex items-center space-x-4 flex-1 min-w-0">
        <div className="relative group max-w-md w-full">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4 transition-colors group-focus-within:text-primary" />
          <Input
            placeholder="搜索股票、策略或指标..."
            className="pl-10 w-full bg-input border-2 border-transparent focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all duration-200 hover:shadow-md focus:shadow-lg"
          />
        </div>
      </div>

      <div className="flex items-center space-x-6 flex-shrink-0">
        <div className="flex items-center space-x-2">
          {isConnected ? (
            <>
              <div className="relative">
                <Wifi className="w-4 h-4 text-primary" />
                <div className="absolute -top-1 -right-1 w-2 h-2 bg-primary rounded-full pulse-glow"></div>
              </div>
              <Badge
                variant="secondary"
                className="bg-gradient-to-r from-primary/20 to-accent/20 text-primary border border-primary/30 shadow-sm"
              >
                实时连接
              </Badge>
            </>
          ) : (
            <>
              <WifiOff className="w-4 h-4 text-destructive" />
              <Badge variant="destructive" className="shadow-sm">
                连接断开
              </Badge>
            </>
          )}
        </div>

        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsDarkMode(!isDarkMode)}
          className="hover:bg-primary/10 hover:text-primary transition-all duration-200 hover:scale-105"
        >
          {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
        </Button>

        <div className="relative">
          <Button
            variant="ghost"
            size="icon"
            className="hover:bg-accent/10 hover:text-accent transition-all duration-200 hover:scale-105"
          >
            <Bell className="w-5 h-5" />
          </Button>
          <div className="absolute -top-1 -right-1 w-3 h-3 bg-destructive rounded-full flex items-center justify-center">
            <span className="text-xs text-white font-bold">3</span>
          </div>
        </div>

        <div className="text-right bg-gradient-to-br from-muted/50 to-primary/5 p-3 rounded-lg border border-border shadow-sm">
          <p className="text-sm font-medium text-foreground">市场状态</p>
          <p className="text-xs text-muted-foreground">{new Date().toLocaleString("zh-CN")}</p>
        </div>
      </div>
    </header>
  )
}
