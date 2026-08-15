#!/usr/bin/env bash
# ==============================================================================
# MerryMe Wedding Digital Media Web App - Ubuntu 一键部署与更新脚本 (自适应权限与路径)
# 用法: chmod +x deploy.sh && ./deploy.sh (或 sudo ./deploy.sh)
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

# 扩展 PATH 确保 snap/usr/local 常用 Docker 路径可用
export PATH="/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin:/snap/bin:$PATH"

# 1. 检测是否需要 sudo 执行 docker
SUDO_PREFIX=""
if [ "$(id -u)" -ne 0 ]; then
    # 非 root 用户，先测试普通权限是否能连接 docker daemon
    if docker info &> /dev/null; then
        SUDO_PREFIX=""
    elif sudo docker info &> /dev/null; then
        echo -e "${CYAN}[环境适配] 当前用户需要 sudo 权限调用 Docker，已自动启用 sudo 模式${NC}"
        SUDO_PREFIX="sudo"
    fi
fi

# 2. 检查 Docker 执行文件
DOCKER_BIN=""
for path in $(which docker 2>/dev/null) /usr/bin/docker /usr/local/bin/docker /snap/bin/docker; do
    if [ -x "$path" ]; then
        DOCKER_BIN="$path"
        break
    fi
done

if [ -z "$DOCKER_BIN" ]; then
    echo -e "${RED}[错误] 未能定位到 docker 命令。${NC}"
    echo -e "${GOLD}请确认是否使用 sudo 运行，或执行：which docker 查看所在路径。${NC}"
    exit 1
fi

echo -e "${GREEN}[✓] 检测到 Docker 核心环境: $DOCKER_BIN${NC}"

# 3. 检查并选择 docker compose 命令
if $SUDO_PREFIX docker compose version &> /dev/null; then
    COMPOSE_CMD="$SUDO_PREFIX docker compose"
elif $SUDO_PREFIX docker-compose version &> /dev/null; then
    COMPOSE_CMD="$SUDO_PREFIX docker-compose"
elif docker compose version &> /dev/null; then
    COMPOSE_CMD="docker compose"
elif docker-compose version &> /dev/null; then
    COMPOSE_CMD="docker-compose"
else
    echo -e "${RED}[错误] 未能检测到 docker compose 插件或 docker-compose 独立程序${NC}"
    echo -e "${GOLD}您可以运行: sudo apt-get update && sudo apt-get install docker-compose-plugin -y${NC}"
    exit 1
fi

echo -e "${GREEN}[✓] 检测到编排工具: $COMPOSE_CMD${NC}"

echo -e "${CYAN}==> [1/4] 检查并同步最新 Git 仓库代码...${NC}"
if [ -d ".git" ]; then
    git pull origin main || echo -e "${GOLD}[提示] git pull 跳过或无需更新${NC}"
fi

echo -e "${CYAN}==> [2/4] 构建并启动生产级 Docker 容器...${NC}"
$COMPOSE_CMD down --remove-orphans || true
$COMPOSE_CMD build --pull
$COMPOSE_CMD up -d

echo -e "${CYAN}==> [3/4] 清理冗余未命名镜像...${NC}"
$SUDO_PREFIX docker image prune -f || true

echo -e "${CYAN}==> [4/4] 检查服务健康与运行状态...${NC}"
sleep 3
$COMPOSE_CMD ps

echo -e ""
echo -e "${GREEN}====================================================================${NC}"
echo -e "${GREEN}   🎉 部署成功！项目已在 Docker 容器中平稳运行！                   ${NC}"
echo -e "${GREEN}====================================================================${NC}"
echo -e "${GOLD}服务访问地址：${NC}"
echo -e "  ➜ 容器端口直达: ${CYAN}http://<服务器公网IP>:8080${NC}"
echo -e "  ➜ 宿主机 Nginx 反向代理配置参考: ${CYAN}cat nginx-host.conf.example${NC}"
echo -e ""
echo -e "${GOLD}常用维护命令：${NC}"
echo -e "  ➜ 查看实时运行日志: ${CYAN}$COMPOSE_CMD logs -f${NC}"
echo -e "  ➜ 重启容器服务:     ${CYAN}$COMPOSE_CMD restart${NC}"
echo -e "  ➜ 停止容器服务:     ${CYAN}$COMPOSE_CMD down${NC}"
echo -e "${GREEN}====================================================================${NC}"
