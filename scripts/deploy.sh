#!/bin/bash

set -e

# 颜色定义
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# 日志函数
log_info() {
    echo -e "${GREEN}[INFO]${NC} $1"
}

log_warn() {
    echo -e "${YELLOW}[WARN]${NC} $1"
}

log_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# 检查Docker和Docker Compose
check_dependencies() {
    log_info "检查依赖..."
    
    if ! command -v docker &> /dev/null; then
        log_error "Docker未安装，请先安装Docker"
        exit 1
    fi
    
    if ! command -v docker-compose &> /dev/null; then
        log_error "Docker Compose未安装，请先安装Docker Compose"
        exit 1
    fi
    
    log_info "依赖检查完成"
}

# 创建必要的目录和文件
setup_environment() {
    log_info "设置环境..."
    
    # 创建必要的目录
    mkdir -p logs
    mkdir -p nginx/ssl
    mkdir -p monitoring
    mkdir -p scripts
    
    # 创建.env文件（如果不存在）
    if [ ! -f .env ]; then
        log_info "创建.env文件..."
        cat > .env << EOF
# 数据库配置
DB_PASSWORD=quantpass123
REDIS_PASSWORD=redis123
RABBITMQ_USER=quantuser
RABBITMQ_PASSWORD=rabbit123

# JWT密钥
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production

# API密钥
LLM_API_KEY=your-llm-api-key
MARKET_API_KEY=your-market-data-api-key

# 监控配置
GRAFANA_PASSWORD=admin123
EOF
        log_warn "请编辑.env文件，设置正确的API密钥和密码"
    fi
    
    log_info "环境设置完成"
}

# 构建和启动服务
deploy_services() {
    log_info "部署服务..."
    
    # 停止现有服务
    docker-compose down
    
    # 构建镜像
    log_info "构建Docker镜像..."
    docker-compose build --no-cache
    
    # 启动服务
    log_info "启动服务..."
    docker-compose up -d
    
    # 等待服务启动
    log_info "等待服务启动..."
    sleep 30
    
    # 检查服务状态
    check_services_health
}

# 检查服务健康状态
check_services_health() {
    log_info "检查服务健康状态..."
    
    services=("timescaledb" "redis" "backend" "frontend" "nginx")
    
    for service in "${services[@]}"; do
        if docker-compose ps | grep -q "${service}.*Up"; then
            log_info "✓ ${service} 运行正常"
        else
            log_error "✗ ${service} 运行异常"
            docker-compose logs "${service}"
        fi
    done
}

# 数据库初始化
init_database() {
    log_info "初始化数据库..."
    
    # 等待数据库启动
    sleep 10
    
    # 执行数据库初始化脚本
    docker-compose exec -T timescaledb psql -U quantuser -d quantdb << EOF
-- 创建时序数据表
CREATE TABLE IF NOT EXISTS market_data (
    symbol TEXT NOT NULL,
    time TIMESTAMPTZ NOT NULL,
    open DOUBLE PRECISION,
    high DOUBLE PRECISION,
    low DOUBLE PRECISION,
    close DOUBLE PRECISION,
    volume BIGINT,
    PRIMARY KEY (symbol, time)
);

-- 创建时序数据超表
SELECT create_hypertable('market_data', 'time', if_not_exists => TRUE);

-- 创建索引
CREATE INDEX IF NOT EXISTS idx_market_data_symbol_time ON market_data (symbol, time DESC);

-- 创建用户表
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 创建策略表
CREATE TABLE IF NOT EXISTS strategies (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id),
    name VARCHAR(100) NOT NULL,
    description TEXT,
    config JSONB,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

log_info "数据库初始化完成"
EOF
}

# 显示部署信息
show_deployment_info() {
    log_info "部署完成！"
    echo ""
    echo "服务访问地址："
    echo "  前端应用: http://localhost:3000"
    echo "  API服务:  http://localhost:8000"
    echo "  监控面板: http://localhost:3001 (admin/admin123)"
    echo "  消息队列: http://localhost:15672 (quantuser/rabbit123)"
    echo ""
    echo "有用的命令："
    echo "  查看日志: docker-compose logs -f [service_name]"
    echo "  重启服务: docker-compose restart [service_name]"
    echo "  停止服务: docker-compose down"
    echo "  更新服务: ./scripts/deploy.sh update"
    echo ""
}

# 更新服务
update_services() {
    log_info "更新服务..."
    
    # 拉取最新代码
    git pull origin main
    
    # 重新构建和部署
    deploy_services
    
    log_info "服务更新完成"
}

# 备份数据
backup_data() {
    log_info "备份数据..."
    
    backup_dir="backups/$(date +%Y%m%d_%H%M%S)"
    mkdir -p "$backup_dir"
    
    # 备份数据库
    docker-compose exec -T timescaledb pg_dump -U quantuser quantdb > "$backup_dir/database.sql"
    
    # 备份配置文件
    cp .env "$backup_dir/"
    cp docker-compose.yml "$backup_dir/"
    
    log_info "数据备份完成: $backup_dir"
}

# 主函数
main() {
    case "${1:-deploy}" in
        "deploy")
            check_dependencies
            setup_environment
            deploy_services
            init_database
            show_deployment_info
            ;;
        "update")
            update_services
            ;;
        "backup")
            backup_data
            ;;
        "logs")
            docker-compose logs -f "${2:-}"
            ;;
        "status")
            check_services_health
            ;;
        "stop")
            docker-compose down
            ;;
        *)
            echo "用法: $0 {deploy|update|backup|logs|status|stop}"
            echo ""
            echo "命令说明："
            echo "  deploy  - 部署所有服务"
            echo "  update  - 更新服务"
            echo "  backup  - 备份数据"
            echo "  logs    - 查看日志"
            echo "  status  - 检查服务状态"
            echo "  stop    - 停止所有服务"
            exit 1
            ;;
    esac
}

main "$@"
