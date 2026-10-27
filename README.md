
# Auto Parts Web Scraping项目

本项目是一个用于从多个汽车零部件网站自动抓取产品数据的工具集合。主要目标网站包括 RockAuto、Amazon、eBay、Cardone、Dorman、Four Seasons、Standard、Summit 等知名汽车零配件供应商。

## 项目功能

本项目主要用于以下用途：

- **产品数据抓取**：从各大汽车配件网站提取OE编号、产品规格、价格等信息
- **目录页解析**：获取产品分类目录
- **详细页提取**：提取不同OE编号对应的产品详细页面信息
- **数据整合**：整合来自多个供应商的产品数据

## 技术栈

- **JavaScript**：用于编写浏览器用户脚本 (Greasemonkey/Tampermonkey)
- **Python**：用于后端数据处理和爬虫脚本
- **Selenium**：自动化浏览器操作
- **Requests**：HTTP请求库
- **代理模块**：支持代理轮换和请求伪装

## 项目结构

```
├── JS/                     # 用户脚本 (UserScript)
│   ├── Amanzon.user.js
│   ├── Cardone.user.js
│   ├── Dormanproducts.user.js
│   ├── FourSeasons.user.js
│   ├── Summit.user.js
│   └── ...
├── code/                   # Python爬虫代码
│   ├── 01.RockAuto/        # RockAuto数据抓取
│   ├── 02.Dorman/          # Dorman产品数据
│   ├── 03.ebay/           # eBay数据抓取
│   ├── 04.Cardone/         # Cardone数据抓取
│   ├── 05.Standard/        # Standard产品数据
│   ├── 10.FourSeasons/     # Four Seasons数据
│   ├── 11.amazon/         # Amazon数据抓取
│   └── ...
├── module/                 # 公共模块
│   ├── Proxy.py            # 代理管理
│   ├── Proxy-1.py         # 代理配置
│   └── UA.py              # User-Agent管理
└── README.md
```

## 模块说明

### 代理模块 (module/Proxy.py, Proxy-1.py)

提供代理IP管理和轮换功能，支持：

- `get_Proxy_Requests()` - 获取代理用于Requests库
- `get_Proxy_Selenium()` - 获取代理用于Selenium

### User-Agent模块 (module/UA.py)

提供浏览器User-Agent伪装：

- `get_User_Agent_Requests()` - 获取随机User-Agent用于Requests
- `get_User_Agent_Selenium()` - 获取随机User-Agent用于Selenium

## 使用说明

### 环境要求

- Python 3.7+
- Chrome/Firefox浏览器
- Selenium WebDriver

### 安装依赖

```bash
pip install requests selenium pandas
```

### 基本用法

1. **使用代理模块**

```python
from module.Proxy import get_Proxy_Requests

proxy = get_Proxy_Requests()
# 使用代理进行请求
```

2. **使用User-Agent模块**

```python
from module.UA import get_User_Agent_Selenium

ua = get_User_Agent_Selenium()
# 配置Selenium的User-Agent
```

3. **运行Jupyter爬虫脚本**

```bash
jupyter notebook code/01.RockAuto/MELLING\ Timing\ Chain-1.ipynb
```

## 主要目标网站

| 网站 | 说明 |
|------|------|
| RockAuto | 汽车零配件目录平台 |
| Amazon | 电商平台配件数据 |
| eBay | 二手/新配件数据 |
| Cardone | 汽车零部件制造商 |
| Dorman | 汽车售后零部件 |
| Four Seasons | 空调/制冷零部件 |
| Standard | 汽车标准件 |
| Summit | 赛车/性能零件 |
| UAC | 汽车空调系统 |

## 注意事项

- 请遵守目标网站的robots.txt和使用条款
- 合理设置请求间隔，避免对服务器造成压力
- 建议使用代理池分散请求，降低被封禁风险
- 内部使用，请勿用于商业目的

## 许可证

内部使用。

---



