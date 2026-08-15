#!/usr/bin/env bash
# ==============================================================================
# MerryMe Wedding Digital Media Web App - Ubuntu 一键部署与更新脚本
# 用法: chmod +x deploy.sh && ./deploy.sh
# ==============================================================================

set -e

# 颜色输出
GREEN="\033[0;32m"
GOLD="\033[1;33m"
CYAN="\033[0;36m"
RED="\033[0;31m"
NC="\033[0m"

echo -e "${GOLD}====================================================================${NC}"
echo -e "${GOLD}   MerryMe 铭刻光影 · 线上婚庆数码影像定制平台 一键部署脚本       ${NC}"
echo -e "${GOLD}====================================================================${NC}"

# 1. 检查 Docker 是否安装
if ! command -v docker &> /dev/null; then
    echo -e "${RED}[错误] 未检测到 Docker，请先安装 Docker: curl -fsSL https://get.docker.com | bash${NC}"
    exit 1
fi

# 2. 检查 docker compose 命令
if docker compose version &> /dev/null; then
    DOCKER_COMPOSE_CMD="docker compose"
elif command -v docker-compose &> /dev/null; then
    DOCKER_COMPOSE_CMD="docker-compose"
else
    echo -e "${RED}[错误] 未检测到 docker compose 或 docker-compose 插件${NC}"
    exit 1
fi

echo -e "${CYAN}==> [1/4] 检查并拉取最新 Git 代码...${NC}"
if [ -d ".git" ]; then
    git pull origin main || echo -e "${GOLD}[提示] git pull 跳过或无需更新${NC}"
fi

echo -e "${CYAN}==> [2/4] 构建并启动 Docker 容器...${NC}"
$DOCKER_COMPOSE_CMD down --remove-orphans || true
$DOCKER_COMPOSE_CMD build --pull
$DOCKER_COMPOSE_CMD up -d

echo -e "${CYAN}==> [3/4] 清理悬空冗余镜像以释放磁盘空间...${NC}"
docker image prune -f || true

echo -e "${CYAN}==> [4/4] 验证服务运行状态...${NC}"
sleep 3
$DOCKER_COMPOSE_CMD ps

echo -e ""
echo -e "${GREEN}====================================================================${NC}"
echo -e "${GREEN}   🎉 部署成功！项目已在 Docker 容器中平稳运行！                   ${NC}"
echo -e "${GREEN}====================================================================${NC}"
echo -e "${GOLD}服务访问地址：${NC}"
echo -e "  ➜ 容器直接访问: ${CYAN}http://<服务器公网IP>:8080${NC}"
echo -e "  ➜ 宿主机 Nginx 代理配置参考: ${CYAN}cat nginx-host.conf.example${NC}"
echo -e ""
echo -e "${GOLD}常用维护命令：${NC}"
echo -e "  ➜ 查看实时日志: ${CYAN}$DOCKER_COMPOSE_CMD logs -f${NC}"
echo -e "  ➜ 重启服务:     ${CYAN}$DOCKER_COMPOSE_CMD restart${NC}"
echo -e "  ➜ 停止服务:     ${CYAN}$DOCKER_COMPOSE_CMD down${NC}"
echo -e "${GREEN}====================================================================${NC}"
