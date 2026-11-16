# 第三方组件声明

## 本站

本站为纯静态页面，**不加载任何第三方运行时依赖**：没有外部字体、CDN 脚本、分析统计、评论组件或接口调用。所有样式、脚本、图标与图片均随仓库一同提供。

| 资源 | 来源 | 说明 |
| --- | --- | --- |
| `assets/img/preview-*.webp` | YueWuBot v1.3.1 控制台截图 | 本站自行制作，画面中的账号与密钥均为测试占位数据 |
| `assets/img/logo.svg` | 本站绘制 | 品牌图标 |
| `assets/img/og-cover.png` | 本站绘制 | 社交分享预览图 |
| 系统字体栈 | 操作系统 | 不随仓库分发，不发起网络请求 |
| Noto Sans CJK | 生成分享图时的本地字体 | 仅用于生成 `og-cover.png`，不随站点加载 |

## 部署包

`downloads/` 中的两个包属于 YueWuBot 主程序分发包，其第三方依赖与许可证以各包内的 `LICENSE` 与 `THIRD-PARTY.md` 为准。纯净版为 MIT，AstrBot 完整兼容版因参考并随包附带官方源码原文，按 AGPL-3.0 分发。概要如下：

| 组件 | 用途 | 许可证 |
| --- | --- | --- |
| Python | 解释器，由使用者环境提供 | PSF License |
| aiohttp | 异步 HTTP 服务与 WebSocket 客户端，安装脚本自动安装 | Apache-2.0 |
| pip 托管包 | `pip/` 内分发 aiohttp 及依赖的预编译 wheel 与源码包，各包许可证随其发行版提供 | 见各包 METADATA |
| AstrBot（仅完整兼容版） | 插件加载机制源码参考，原文随包放在 `astrbot_official/` | AGPL-3.0 |
