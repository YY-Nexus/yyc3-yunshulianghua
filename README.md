# 云枢量化分析交易系统 (YYC-EasyVizAI)

一个基于AI驱动的现代化量化交易分析平台，集成了实时行情分析、智能策略生成、风险管理和可视化展示等功能。

## 🚀 核心特性

### 📊 数据可视化与交互
- **专业K线图表**: 基于Canvas的高性能K线图，支持实时数据更新
- **技术指标分析**: 集成RSI、MACD、KDJ、BOLL等多种技术指标
- **交互式图表**: 支持缩放、平移、数据点选择等交互功能
- **自定义仪表板**: 拖拽式组件设计个性化分析面板

### 🤖 AI智能分析
- **图表推荐引擎**: 基于数据特征智能推荐最适合的图表类型
- **异常检测**: 实时识别市场数据中的异常模式和趋势变化
- **策略优化**: AI辅助优化交易策略参数和风险控制
- **市场情绪分析**: 基于大模型的新闻和社交媒体情绪分析

### 📈 策略回测系统
- **可视化策略构建**: 图形化拖拽构建交易策略
- **历史回测**: 支持多时间周期的策略历史表现分析
- **性能指标**: 详细的收益率、夏普比率、最大回撤等指标
- **风险评估**: 全面的风险指标分析和压力测试

### 🛡️ 风险管理
- **实时风险监控**: VaR、CVaR等风险价值计算
- **预警系统**: 多层级风险预警和通知机制
- **合规监控**: 交易合规性检查和审计日志
- **投资组合分析**: 多维度投资组合风险分析

### 🔧 系统监控
- **实时性能监控**: CPU、内存、网络等系统资源监控
- **服务健康检查**: 各微服务状态监控和故障预警
- **API集成状态**: 大模型和行业数据API连接状态监控
- **部署管理**: Docker容器化部署和一键更新

## 🏗️ 技术架构

### 前端技术栈
- **Next.js 14**: React全栈框架，支持SSR和SSG
- **TypeScript**: 类型安全的JavaScript超集
- **Tailwind CSS**: 原子化CSS框架
- **Shadcn/ui**: 现代化UI组件库
- **Recharts**: 数据可视化图表库
- **Canvas API**: 高性能K线图渲染

### 后端技术栈
- **FastAPI**: 高性能Python Web框架
- **TimescaleDB**: 时序数据库，优化金融数据存储
- **Redis**: 内存缓存和实时数据推送
- **RabbitMQ**: 消息队列系统
- **PostgreSQL**: 关系型数据库

### AI集成
- **大模型API**: 支持OpenAI、Claude等主流大模型
- **行业数据API**: 集成多家金融数据提供商
- **机器学习**: 异常检测和预测模型
- **自然语言处理**: 新闻情绪分析和策略解释

### 部署运维
- **Docker**: 容器化部署
- **Docker Compose**: 多服务编排
- **Nginx**: 反向代理和负载均衡
- **Prometheus + Grafana**: 监控和可视化
- **自动化脚本**: 一键部署和更新

## 🚀 快速开始

### 环境要求
- Node.js 18+
- Docker & Docker Compose
- Git

### 本地开发
\`\`\`bash
# 克隆项目
git clone <repository-url>
cd quantitative-trading-system

# 安装依赖
npm install

# 启动开发服务器
npm run dev
\`\`\`

### Docker部署
\`\`\`bash
# 一键部署所有服务
./scripts/deploy.sh

# 查看服务状态
./scripts/deploy.sh status

# 查看日志
./scripts/deploy.sh logs

# 备份数据
./scripts/deploy.sh backup
\`\`\`

### 环境配置
复制 `.env.example` 到 `.env` 并配置以下环境变量：

\`\`\`env
# 数据库配置
DB_PASSWORD=your-db-password
REDIS_PASSWORD=your-redis-password

# API密钥
LLM_API_KEY=your-llm-api-key
MARKET_API_KEY=your-market-data-api-key

# JWT密钥
JWT_SECRET=your-jwt-secret
\`\`\`

## 📱 功能模块

### 1. 仪表板
- 系统概览和关键指标
- 实时市场数据摘要
- 投资组合表现概览
- 快速操作入口

### 2. 实时行情
- 多市场实时价格数据
- 专业K线图表分析
- 技术指标计算和展示
- 市场深度和成交明细

### 3. AI分析
- 智能图表推荐
- 异常模式检测
- 趋势预测分析
- 策略优化建议

### 4. 策略回测
- 策略构建器
- 历史回测执行
- 性能指标分析
- 风险收益评估

### 5. 风险管理
- 实时风险监控
- VaR/CVaR计算
- 压力测试
- 风险预警系统

### 6. 系统监控
- 服务健康状态
- 性能指标监控
- API集成状态
- 部署管理工具

## 🔌 API集成

### 大模型集成
支持多种大模型API：
- OpenAI GPT系列
- Anthropic Claude
- 国产大模型（通义千问、文心一言等）

### 行业数据API
集成主流金融数据提供商：
- 实时行情数据
- 历史价格数据
- 财务基本面数据
- 新闻和公告数据

## 📊 监控和运维

### 系统监控
- Prometheus指标收集
- Grafana可视化面板
- 自定义告警规则
- 性能趋势分析

### 日志管理
- 结构化日志记录
- 集中式日志收集
- 错误追踪和分析
- 审计日志管理

## 🛠️ 开发指南

### 项目结构
\`\`\`
├── app/                    # Next.js页面路由
├── components/             # React组件
├── lib/                   # 工具函数和配置
├── scripts/               # 部署和运维脚本
├── docker-compose.yml     # Docker编排配置
├── Dockerfile            # 前端容器配置
└── README.md             # 项目文档
\`\`\`

### 开发规范
- 使用TypeScript进行类型检查
- 遵循ESLint代码规范
- 组件采用函数式编程
- 使用Tailwind CSS进行样式开发

## 📄 许可证

本项目采用 MIT 许可证 - 查看 [LICENSE](LICENSE) 文件了解详情。

## 🤝 贡献

欢迎提交Issue和Pull Request来改进项目！

## 📞 联系方式

如有问题或建议，请通过以下方式联系：
- 邮箱: support@example.com
- 项目地址: https://github.com/your-org/quantitative-trading-system
