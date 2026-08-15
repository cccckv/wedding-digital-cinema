# MerryMe 铭刻光影 · 线上婚庆数码影像定制平台

专注线上婚纱图片设计 · 高级数码精修 · 婚礼视频剪辑包装 · 电影级调色。

---

## 🚀 Ubuntu 服务器 Docker + Nginx 一键部署指南

本系统已包含完整的生产级 **Multi-stage Dockerfile**、**容器内 Nginx 配置**、**Docker Compose 编排** 与 **一键部署脚本**。

### 1. 登录 Ubuntu 服务器并克隆代码

```bash
# 进入您期望存放项目的目录（例如 /var/www 或 /home/ubuntu）
cd /var/www

# 克隆仓库
git clone https://github.com/cccckv/wedding-digital-cinema.git

# 进入项目目录
cd wedding-digital-cinema
```

---

### 2. 执行一键部署上线

```bash
# 赋予执行权限并执行一键部署
chmod +x deploy.sh
./deploy.sh
```

脚本将自动执行：
- 检查 Docker & Docker Compose 环境
- 执行多阶段优化构建（Node.js 打包 + Nginx Alpine 静态化分发）
- 启动容器并映射到端口 `8080`
- 自动清理无用中间层镜像以节省服务器磁盘

部署完成后，即可在浏览器直接访问：`http://<您的服务器IP>:8080`

---

### 3. 配置 Ubuntu 宿主机 Nginx 反向代理（推荐配置域名）

如果您的 Ubuntu 宿主机已安装 Nginx，希望通过域名或 80/443 端口访问：

```bash
# 1. 创建站点配置文件
sudo nano /etc/nginx/sites-available/wedding-cinema.conf
```

将以下内容粘贴进去（或参考项目根目录下的 `nginx-host.conf.example`）：

```nginx
server {
    listen 80;
    listen [::]:80;
    server_name your-domain.com www.your-domain.com; # 替换为您的域名或IP

    client_max_body_size 100M;

    location / {
        proxy_pass http://127.0.0.1:8080;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;

        # WebSocket 支持
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
    }
}
```

```bash
# 2. 启用配置并测试重载
sudo ln -sf /etc/nginx/sites-available/wedding-cinema.conf /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

> 💡 **SSL 证书一键开启（HTTPS）**：
> ```bash
> sudo certbot --nginx -d your-domain.com -d www.your-domain.com
> ```

---

### 4. 日常更新与维护

后续在本地提交代码推送到 GitHub 后，只需在 Ubuntu 服务器项目目录下执行：

```bash
./deploy.sh
```

脚本将自动拉取最新代码并平滑重新构建上线！

---

### 🛠️ 常用运维命令

```bash
# 查看实时运行日志
docker compose logs -f

# 重启容器
docker compose restart

# 停止并销毁容器
docker compose down

# 查看容器资源占用
docker stats wedding-digital-cinema-app
```
