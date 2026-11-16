# YueWuBot 官方网站

YueWuBot 的官网源码，通过 GitHub Pages 托管：**https://chumianyi.github.io/**

这是一个**纯静态站点**：没有后端、没有数据库、没有登录、没有表单提交、没有统计脚本，页面不发起任何接口请求。所有交互（导航、截图切换、放大、复制命令）都在浏览器本地完成。

## 页面

| 文件 | 说明 |
| --- | --- |
| `index.html` | 首页：产品能力、接入架构、界面预览、对比、快速开始、插件、更新日志、FAQ |
| `docs.html` | 开发文档：安装、目录结构、平台接入、控制台、模型、消息规则、插件规范、排障 |
| `download.html` | 下载页：两个官方版本、SHA-256 校验、部署要求 |
| `404.html` | 自定义 404 页面 |

## 目录

```
assets/css/site.css      全站样式（沿用控制台的深色玻璃拟态设计语言）
assets/js/site.js        纯前端交互，无任何网络请求
assets/img/              产品截图（WebP）、品牌 SVG、社交分享图
downloads/               v1.3.1 两个官方版本 zip
pip/                    start.sh 首选依赖源：多架构 wheel 与通用包（静态 find-links 索引）
robots.txt / sitemap.xml 搜索引擎收录配置
.nojekyll                跳过 Jekyll 构建
```

## 本地预览

```bash
python3 -m http.server 8080
```

无需构建步骤、无需安装依赖。修改 HTML/CSS 后刷新即可看到效果。

## 更新部署包

替换 `downloads/` 下的 zip 后，请同步更新 `download.html` 中两个包的文件大小与 SHA-256 校验值。启动本地服务后浏览器打开 http://127.0.0.1:8080 ：

```bash
sha256sum downloads/*.zip
```

## 设计

配色、玻璃卡片、渐变按钮与圆角均沿用 YueWuBot v1.3.1 控制台的视觉语言，主色为紫 `#7c5cff` 与青 `#22d3ee`，背景为 `#070912`。字体使用系统字体栈，不加载外部字体资源。

## 许可证

站点内容与 YueWuBot 主程序一致，采用 [MIT License](LICENSE)。第三方说明见 [THIRD-PARTY.md](THIRD-PARTY.md)。

> 页面中的控制台画面均为截图展示；可交互的控制台运行在使用者自行部署的机器人进程中。
