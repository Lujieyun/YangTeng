# YangTeng

### Multi-Source Web Data Collection & Automation
**多源网页数据采集与自动化处理项目**

## 📌 项目简介（Overview）

YangTeng 是一个面向汽车零部件行业的多源网页数据采集与自动化处理项目，主要用于从不同供应商及电商平台获取、解析和整理产品信息。

项目涉及 RockAuto、Amazon、eBay、Cardone、Dorman、Four Seasons、Standard、Summit 等多个平台，主要采集产品 OE（Original Equipment）编号、产品规格、价格及相关属性信息。

针对不同网站在页面结构、动态内容加载和数据字段组织方面的差异，项目结合 Python、JavaScript、Selenium、Requests 等技术，实现多平台网页数据的自动化提取与整理。

在部分数据采集任务中，使用 **gevent 协作式并发模型**组织网络请求，通过任务队列管理待采集 URL，减少网络 I/O 等待带来的资源闲置。

本项目为团队项目，**本人主要负责 Python 爬虫开发、网页自动化及数据处理相关工作**。

本仓库主要用于展示项目中的技术实践与个人工程开发经验。

---

## 🛠 技术栈（Tech Stack）

| 技术 | 应用场景 |
|------|----------|
| Python | 网页数据采集、自动化及数据处理 |
| JavaScript | 浏览器用户脚本 |
| gevent | 协作式并发任务调度 |
| Requests | HTTP 请求与网页内容获取 |
| BeautifulSoup | HTML 文档解析 |
| lxml / XPath | 网页结构化信息提取 |
| Selenium | 浏览器自动化 |
| Pandas | 数据整理与结构化处理 |
| Jupyter Notebook | 程序开发、调试与实验记录 |
| Tampermonkey | 浏览器用户脚本管理 |
| Git / GitHub | 代码版本管理 |

---

## 🎯 核心功能（Key Features）

### 1. 多平台产品数据采集

针对不同汽车零部件网站的页面结构，开发相应的数据采集程序。

主要提取：

- 产品 OE 编号
- 产品名称及规格
- 产品价格
- 产品分类目录
- 产品详细页面信息
- 产品相关属性

通过针对不同网站设计解析逻辑，实现多来源产品信息的获取与整理。

### 2. 浏览器自动化

使用 Selenium 实现部分网页操作的自动化，包括：

- 浏览器自动化控制
- 页面元素定位
- 动态网页内容获取
- 页面交互与跳转
- 产品信息提取

同时，结合 JavaScript 和 Tampermonkey 用户脚本，辅助完成部分网页信息提取任务。

### 3. 基于 gevent 的协作式并发采集

针对数据采集过程中存在的网络 I/O 等待问题，使用 Python 的 gevent 库实现协作式并发处理。

主要技术：

- `gevent.spawn()`：创建 Greenlet
- `gevent.queue.Queue`：管理采集任务
- `gevent.joinall()`：等待任务完成
- `monkey.patch_all()`：为部分标准库 I/O 操作提供协作式调度支持

部分采集任务配置约 10～50 个 Greenlet，根据不同网站和任务特点调整并发数量。

### 4. 数据处理与整理

使用 Pandas 对采集结果进行整理，包括：

- 将网页提取结果转换为结构化数据
- 整理不同来源的产品属性
- 记录部分采集任务的执行状态
- 通过 Excel 文件完成部分任务的数据输入与输出

### 5. 公共功能模块

项目将部分通用功能封装为独立模块，主要包括：

- 代理配置与管理
- User-Agent 获取与配置
- HTTP 请求相关辅助功能

通过模块复用减少不同采集脚本之间的重复代码。

---

## ⚡ 技术亮点（Technical Highlights）

### 基于 gevent 的协作式并发数据采集

在部分网页采集任务中，采用 gevent 的 Greenlet 和任务队列实现并发调度。

#### 任务流程

```text
                  Excel 输入
                      |
                      v
                读取 URL 列表
                      |
                      v
              gevent Queue
                      |
          +-----------+-----------+
          |           |           |
          v           v           v
      Greenlet 1  Greenlet 2  Greenlet N
          |           |           |
          v           v           v
       HTTP 请求    HTTP 请求    HTTP 请求
          |           |           |
          v           v           v
       HTML 解析   HTML 解析   HTML 解析
          |           |           |
          +-----------+-----------+
                      |
                      v
               Pandas 数据整理
                      |
                      v
                 Excel 输出
```

#### 实现思路

1. 使用 Pandas 从 Excel 文件中读取待采集 URL。
2. 将 URL 放入 `gevent.queue.Queue` 任务队列。
3. 创建多个 Greenlet，从共享队列中获取采集任务。
4. 使用 Requests 获取网页内容。
5. 通过 BeautifulSoup 和 XPath 提取产品信息。
6. 将采集结果整理为 Pandas DataFrame。
7. 导出 Excel 文件，供后续处理与分析。

#### 技术特点

gevent 采用协作式任务调度机制，可以在网络 I/O 等待期间切换执行其他任务。

相比顺序采集方式，这种设计能够减少部分网络等待造成的资源闲置，适用于 I/O 密集型网页采集任务。

实际性能取决于网络条件、目标网站响应速度及并发任务数量，本项目未在此提供统一的性能基准测试结果。

---

## 👨‍💻 个人贡献（My Contributions）

本项目为团队项目，本人主要负责 Python 爬虫开发、网页自动化及相关数据处理工作。

### Python 数据采集程序开发

- 使用 Requests 获取目标网页内容。
- 根据网页结构设计信息提取逻辑。
- 使用 BeautifulSoup 和 XPath 解析 HTML。
- 提取 OE 编号、产品规格及相关属性信息。

### 并发采集任务设计

- 使用 gevent 实现协作式并发任务。
- 基于 Queue 管理待采集 URL。
- 使用 Greenlet 组织多个采集任务。
- 根据不同任务调整并发数量。

### 网页自动化

- 使用 Selenium 实现部分浏览器自动化任务。
- 处理需要浏览器交互的数据获取场景。

### 数据处理

- 使用 Pandas 组织采集结果。
- 整理不同来源的产品字段。
- 实现部分数据采集任务的 Excel 输入与输出。

### 基础异常处理

- 对部分网络请求设置重试逻辑。
- 记录部分任务的成功或失败状态。
- 对采集失败的数据进行标记，便于后续检查。

---

## 📁 项目结构（Project Structure）

```text
YangTeng/
│
├── JS/                         # JavaScript 用户脚本
│   ├── Amanzon.user.js
│   ├── Cardone.user.js
│   ├── Dormanproducts.user.js
│   ├── FourSeasons.user.js
│   ├── Summit.user.js
│   └── ...
│
├── Tampermonkey/               # 浏览器用户脚本相关文件
│
├── code/                       # Python 数据采集程序
│   ├── 01.RockAuto/            # RockAuto 数据采集
│   ├── 02.Dorman/              # Dorman 产品信息
│   ├── 03.ebay/                # eBay 数据采集
│   ├── 04.Cardone/             # Cardone 数据采集
│   ├── 05.Standard/            # Standard 产品数据
│   ├── 10.FourSeasons/         # Four Seasons 产品数据
│   ├── 11.amazon/              # Amazon 数据采集
│   └── ...
│
├── module/                     # 公共 Python 模块
│   ├── Proxy.py                # 代理管理
│   ├── Proxy-1.py              # 代理配置
│   └── UA.py                   # User-Agent 管理
│
├── .gitignore
└── README.md
```

---

## 🌐 主要数据来源（Data Sources）

| 平台 | 数据类型 |
|------|----------|
| RockAuto | 汽车零部件目录及产品信息 |
| Amazon | 电商平台汽车配件信息 |
| eBay | 汽车零配件产品信息 |
| Cardone | 汽车零部件产品数据 |
| Dorman | 汽车售后零部件信息 |
| Four Seasons | 汽车空调及制冷系统零部件 |
| Standard | 汽车零部件信息 |
| Summit | 汽车性能及改装零部件 |
| UAC | 汽车空调系统零部件 |

以上平台名称仅用于说明项目涉及的数据来源，不代表与相关企业存在合作关系。

---

## 🚀 环境配置（Installation）

### 环境要求

- Python 3.7+
- Chrome 或 Firefox
- Selenium WebDriver
- Jupyter Notebook

### 安装主要依赖

```bash
pip install requests selenium pandas beautifulsoup4 lxml gevent notebook openpyxl
```

不同脚本可能需要额外依赖或环境配置。

### 使用说明

项目中的数据采集程序主要位于 `code/` 目录。

可以通过以下命令启动 Jupyter Notebook：

```bash
jupyter notebook
```

随后根据需要打开对应网站的数据采集脚本。

部分程序需要配置：

- 输入数据路径
- 浏览器驱动
- 网络请求参数
- 数据输出路径

具体配置应根据本地环境及相关网站的访问要求进行调整。

---

## 📊 项目实践与收获（Project Experience）

通过本项目，积累了以下技术实践经验：

**1. 多源数据获取**

针对不同网页结构设计数据提取程序，获取并整理来自多个来源的产品信息。

**2. Python 并发编程**

使用 gevent 和任务队列组织 I/O 密集型数据采集任务，理解协作式并发的基本机制与应用场景。

**3. 网页解析与自动化**

结合 Requests、BeautifulSoup、XPath 和 Selenium 处理不同类型的网页采集任务。

**4. 数据整理与处理**

使用 Pandas 将网页信息转换为结构化数据，并通过 Excel 完成部分数据输入与输出。

**5. 模块化程序设计**

通过公共模块封装减少重复代码，积累程序组织和维护方面的经验。

这些技术实践为后续开展数据分析、统计建模及相关研究工作提供了编程与数据处理基础。

---

## ⚠️ 注意事项（Notes）

本仓库主要用于展示项目中的技术实践。

使用时请注意：

- 遵守相关网站的服务条款及适用法律法规。
- 尊重网站的数据访问限制。
- 合理控制请求频率，避免对目标服务器造成不必要的压力。
- 不采集或传播未经授权的敏感信息。
- 第三方网站页面结构可能发生变化，部分脚本需要调整后才能运行。
- 本仓库不提供第三方网站的数据访问授权。

---

## 📄 项目声明（Disclaimer）

本仓库用于个人技术能力展示、学习及技术交流。

项目涉及的网站名称及商标归各自权利人所有。

仓库中的部分代码来自团队项目，本 README 中的个人贡献部分仅描述本人参与的相关工作。

本仓库不提供任何第三方网站的数据访问授权，也不保证所有脚本在当前网站环境下均可直接运行。