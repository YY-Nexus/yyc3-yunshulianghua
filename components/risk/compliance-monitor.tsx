import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { CheckCircle, XCircle, Clock, FileText } from "lucide-react"

const complianceChecks = [
  {
    name: "持仓限制检查",
    status: "passed",
    lastCheck: "2024-01-15 15:00:00",
    details: "所有持仓均符合监管要求",
    score: 100,
  },
  {
    name: "交易行为监控",
    status: "warning",
    lastCheck: "2024-01-15 14:45:00",
    details: "检测到1笔可疑交易，需要审查",
    score: 85,
  },
  {
    name: "风险敞口合规",
    status: "passed",
    lastCheck: "2024-01-15 14:30:00",
    details: "风险敞口在监管范围内",
    score: 95,
  },
  {
    name: "报告提交状态",
    status: "pending",
    lastCheck: "2024-01-15 09:00:00",
    details: "日报待提交，截止时间17:00",
    score: 75,
  },
]

const regulatoryLimits = [
  { name: "单一股票持仓上限", current: 8.5, limit: 10, unit: "%" },
  { name: "行业集中度上限", current: 25.3, limit: 30, unit: "%" },
  { name: "杠杆比率上限", current: 1.2, limit: 2.0, unit: "倍" },
  { name: "流动性覆盖率", current: 125, limit: 100, unit: "%" },
]

const auditTrail = [
  {
    time: "15:00:23",
    action: "风险检查",
    user: "系统",
    result: "通过",
    details: "日度风险合规检查完成",
  },
  {
    time: "14:30:15",
    action: "交易审批",
    user: "风控员A",
    result: "批准",
    details: "大额交易申请审批通过",
  },
  {
    time: "13:45:08",
    action: "限额调整",
    user: "管理员",
    result: "执行",
    details: "调整单一股票持仓限额",
  },
  {
    time: "12:20:33",
    action: "异常报告",
    user: "系统",
    result: "记录",
    details: "记录异常交易行为",
  },
]

export function ComplianceMonitor() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <FileText className="w-5 h-5 text-primary" />
          <span>合规监控</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* 合规检查状态 */}
        <div className="space-y-3">
          <h4 className="font-medium text-sm">合规检查状态</h4>
          {complianceChecks.map((check, index) => (
            <div key={index} className="p-3 bg-muted/30 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-2">
                  {check.status === "passed" ? (
                    <CheckCircle className="w-4 h-4 text-accent" />
                  ) : check.status === "warning" ? (
                    <XCircle className="w-4 h-4 text-yellow-500" />
                  ) : (
                    <Clock className="w-4 h-4 text-muted-foreground" />
                  )}
                  <span className="font-medium text-sm">{check.name}</span>
                </div>
                <Badge
                  variant={
                    check.status === "passed" ? "secondary" : check.status === "warning" ? "destructive" : "outline"
                  }
                  className={
                    check.status === "passed"
                      ? "bg-accent/20 text-accent"
                      : check.status === "warning"
                        ? "bg-yellow-500/20 text-yellow-600"
                        : ""
                  }
                >
                  {check.status === "passed" ? "通过" : check.status === "warning" ? "警告" : "待处理"}
                </Badge>
              </div>
              <p className="text-xs text-muted-foreground mb-2">{check.details}</p>
              <div className="flex items-center justify-between text-xs">
                <span className="text-muted-foreground">最后检查: {check.lastCheck}</span>
                <div className="flex items-center space-x-2">
                  <Progress value={check.score} className="w-16 h-1" />
                  <span className="font-medium">{check.score}%</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* 监管限额 */}
        <div className="space-y-3">
          <h4 className="font-medium text-sm">监管限额</h4>
          {regulatoryLimits.map((limit, index) => {
            const percentage = (limit.current / limit.limit) * 100
            const isCompliant = percentage <= 100

            return (
              <div key={index} className="flex items-center justify-between">
                <span className="text-sm">{limit.name}</span>
                <div className="flex items-center space-x-2">
                  <span className="text-sm font-mono">
                    {limit.current}
                    {limit.unit} / {limit.limit}
                    {limit.unit}
                  </span>
                  <Badge
                    variant={isCompliant ? "secondary" : "destructive"}
                    className={isCompliant ? "bg-accent/20 text-accent" : "bg-destructive/20 text-destructive"}
                  >
                    {isCompliant ? "合规" : "超限"}
                  </Badge>
                </div>
              </div>
            )
          })}
        </div>

        {/* 审计日志 */}
        <div className="space-y-3">
          <h4 className="font-medium text-sm">审计日志</h4>
          <div className="space-y-2 max-h-40 overflow-y-auto">
            {auditTrail.map((log, index) => (
              <div key={index} className="flex items-center justify-between text-xs p-2 bg-muted/20 rounded">
                <div className="flex items-center space-x-2">
                  <span className="font-mono text-muted-foreground">{log.time}</span>
                  <span className="font-medium">{log.action}</span>
                  <span className="text-muted-foreground">by {log.user}</span>
                </div>
                <Badge
                  variant={
                    log.result === "通过" || log.result === "批准" || log.result === "执行" ? "secondary" : "outline"
                  }
                >
                  {log.result}
                </Badge>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
