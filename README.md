# Wrist Word

基于 Next.js 15 开发的现代化 Web 应用。

## 技术栈

- Next.js 15
- React
- TypeScript
- Tailwind CSS
- ESLint

## 目录结构

```
src/
├── app/                    # 核心路由目录
├── components/            # 组件目录
│   ├── ui/               # 基础 UI 组件
│   ├── shared/           # 共享业务组件
│   ├── client/           # 客户端组件
│   └── features/         # 功能模块组件
├── lib/                  # 工具函数和配置
├── hooks/                # 自定义 Hooks
├── providers/            # 上下文提供者
├── styles/               # 样式文件
├── types/                # TypeScript 类型
├── data/                # 数据层
├── assets/              # 项目资源
├── constants/           # 常量定义
├── services/            # API 服务
└── utils/               # 通用工具函数

其他目录：
├── public/              # 静态资源
├── docs/               # 项目文档
└── __tests__/          # 测试文件
```

## 开始使用

1. 安装依赖：

```bash
npm install
```

2. 运行开发服务器：

```bash
npm run dev
```

3. 构建生产版本：

```bash
npm run build
```

## 开发规范

- 使用 TypeScript 进行开发
- 遵循 ESLint 规则
- 使用 Tailwind CSS 进行样式开发
- 组件开发遵循原子设计原则

## 贡献指南

1. Fork 本仓库
2. 创建你的特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交你的改动 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 开启一个 Pull Request

## 许可证

MIT
