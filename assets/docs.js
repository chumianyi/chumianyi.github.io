/* YueWuBot 文档 · 交互（纯前端，无网络请求） */
(function () {
  "use strict";

  var $ = function (sel, root) { return (root || document).querySelector(sel); };
  var $$ = function (sel, root) { return Array.prototype.slice.call((root || document).querySelectorAll(sel)); };

  var year = $("#year");
  if (year) year.textContent = String(new Date().getFullYear());

  /* 移动端目录 */
  var sidebar = $("#sidebar");
  var menuBtn = $("#menuBtn");
  if (menuBtn && sidebar) {
    menuBtn.addEventListener("click", function () {
      var open = sidebar.classList.toggle("open");
      menuBtn.setAttribute("aria-expanded", open ? "true" : "false");
    });
    sidebar.addEventListener("click", function (e) {
      if (e.target.closest("a")) {
        sidebar.classList.remove("open");
        menuBtn.setAttribute("aria-expanded", "false");
      }
    });
  }

  /* 代码复制 */
  $$(".code-head .copy").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var box = btn.closest(".codebox");
      var pre = box && box.querySelector("pre");
      if (!pre) return;
      var text = pre.innerText;
      var done = function () {
        var old = btn.innerHTML;
        btn.innerHTML = "已复制";
        setTimeout(function () { btn.innerHTML = old; }, 1400);
      };
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(done, function () {});
      } else {
        var ta = document.createElement("textarea");
        ta.value = text;
        document.body.appendChild(ta);
        ta.select();
        try { document.execCommand("copy"); done(); } catch (e) {}
        document.body.removeChild(ta);
      }
    });
  });

  /* 滚动高亮：侧栏 + 右侧目录 */
  var heads = $$(".prose h2[id]");
  var sideLinks = $$(".side-link");
  var tocLinks = $$(".toc-aside a");

  function mark(id) {
    sideLinks.forEach(function (a) {
      a.classList.toggle("active", a.getAttribute("href") === "#" + id);
    });
    tocLinks.forEach(function (a) {
      a.classList.toggle("active", a.getAttribute("href") === "#" + id);
    });
  }

  if ("IntersectionObserver" in window && heads.length) {
    var visible = {};
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) { visible[en.target.id] = en.isIntersecting; });
      var current = null;
      for (var i = 0; i < heads.length; i++) {
        if (visible[heads[i].id]) { current = heads[i].id; break; }
      }
      if (current) mark(current);
    }, { rootMargin: "-72px 0px -70% 0px", threshold: 0 });
    heads.forEach(function (h) { io.observe(h); });
    // 首次加载时给一个默认定位，避免侧栏完全没有高亮
    mark(heads[0].id);
  }

  /* 搜索 */
  var INDEX = [
    { t: "快速开始", a: "#start", k: "安装 上手 三步 环境 python 版本 纯净版 astrbot 兼容版" },
    { t: "安装与运行", a: "#install", k: "start.sh unzip windows powershell 免责声明 依赖 镜像 环境变量 端口 令牌" },
    { t: "管理命令", a: "#install", k: "fg deps doctor stop restart status logs token uninstall" },
    { t: "环境变量", a: "#install", k: "YW_PORT YW_HOST YW_ACCEPT YW_MIRROR PIP_MIRROR YW_MARKET_URL" },
    { t: "目录结构", a: "#structure", k: "yuewubot.py start.sh web plugins data venv" },
    { t: "平台接入", a: "#platform", k: "onebot v11 websocket snowluma napcat server client access_token 容器 docker" },
    { t: "连接配置项", a: "#platform", k: "id name direction url access_token enabled 多路" },
    { t: "控制台", a: "#console", k: "登录 概览 试聊 模型 平台 插件 日志 #YueWu 令牌" },
    { t: "模型配置", a: "#model", k: "openai anthropic deepseek base_url api_key model temperature max_tokens retries timeout vision" },
    { t: "消息规则", a: "#message", k: "at 斜杠 井号 触发词 triggers 免@" },
    { t: "插件市场", a: "#market", k: "p.json 索引 安装 克隆 codeload 加速补丁 YW_MARKET_URL" },
    { t: "插件开发", a: "#plugin", k: "zip main.py m.json icon.png commands hooks triggers config" },
    { t: "插件 API", a: "#ctx", k: "ctx.text reply send_image api segments is_admin send_rich cfg user_id group_id" },
    { t: "发布插件", a: "#publish", k: "仓库 索引 icon 版本 敏感信息 管理员" },
    { t: "常见问题", a: "#faq", k: "打不开 离线 模型失败 插件不生效 403 内存" },
    { t: "更新日志", a: "#changelog", k: "1.3.2 1.3.1 1.3.0 1.2.0 版本历史" },
    { t: "许可证", a: "#license", k: "MIT LICENSE 第三方 aiohttp Apache" }
  ];

  var mask = $("#searchMask");
  var input = $("#searchInput");
  var results = $("#searchResults");
  var openBtn = $("#searchOpen");
  var sel = 0;

  function render(q) {
    var kw = (q || "").trim().toLowerCase();
    var list = INDEX.filter(function (it) {
      if (!kw) return true;
      return (it.t + " " + it.k).toLowerCase().indexOf(kw) > -1;
    }).slice(0, 12);
    sel = 0;
    if (!list.length) {
      results.innerHTML = '<div class="search-empty">没有找到相关内容，换个关键词试试</div>';
      return;
    }
    results.innerHTML = list.map(function (it, i) {
      return '<a class="sr' + (i === 0 ? " sel" : "") + '" href="' + it.a + '">' +
        '<span>' + it.t + "</span><small>跳转 →</small></a>";
    }).join("");
    $$(".sr", results).forEach(function (a) {
      a.addEventListener("click", function () { close(); });
    });
  }

  function open() {
    if (!mask) return;
    mask.classList.add("open");
    render("");
    setTimeout(function () { input && input.focus(); }, 30);
  }
  function close() {
    if (!mask) return;
    mask.classList.remove("open");
    if (input) input.value = "";
  }

  if (openBtn) openBtn.addEventListener("click", open);
  if (mask) {
    mask.addEventListener("click", function (e) { if (e.target === mask) close(); });
  }
  if (input) {
    input.addEventListener("input", function () { render(input.value); });
    input.addEventListener("keydown", function (e) {
      var items = $$(".sr", results);
      if (!items.length) return;
      if (e.key === "ArrowDown" || e.key === "ArrowUp") {
        e.preventDefault();
        items[sel] && items[sel].classList.remove("sel");
        sel = (sel + (e.key === "ArrowDown" ? 1 : -1) + items.length) % items.length;
        items[sel].classList.add("sel");
        items[sel].scrollIntoView({ block: "nearest" });
      } else if (e.key === "Enter") {
        items[sel] && items[sel].click();
      }
    });
  }
  document.addEventListener("keydown", function (e) {
    if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
      e.preventDefault();
      open();
    } else if (e.key === "Escape") {
      close();
      if (sidebar) sidebar.classList.remove("open");
    } else if (e.key === "/" && !/input|textarea/i.test((document.activeElement || {}).tagName || "")) {
      e.preventDefault();
      open();
    }
  });
})();
