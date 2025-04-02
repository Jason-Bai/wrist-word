# 项目规范

本文档定义了 Wrist Word 项目遵循的主要开发规范。

## 1. 目录结构

项目采用基于功能和类型的混合目录结构：

```
.vscode/                # VSCode 编辑器配置
docs/
├── architecture.md     # 系统架构文档
├── auth_flow.md        # 认证流程文档
├── README.md           # 文档说明
└── standards.md        # 本文档 (项目规范)
node_modules/           # 项目依赖
prisma/
├── migrations/         # 数据库迁移历史
└── schema.prisma       # Prisma Schema 定义
public/                 # 全局静态资源 (如 favicon.ico, images)
src/
├── app/
│   ├── (auth)/         # 认证相关路由组 (不影响 URL)
│   │   ├── login/
│   │   │   └── page.tsx
│   │   └── register/
│   │       └── page.tsx
│   ├── (main)/         # 主要应用内容路由组 (示例，可省略)
│   │   ├── about/
│   │   │   └── page.tsx
│   │   ├── blog/
│   │   │   └── page.tsx
│   │   ├── contact/
│   │   │   └── page.tsx
│   │   └── dashboard/
│   │       └── page.tsx
│   ├── api/
│   │   ├── auth/
│   │   │   └── [...nextauth]/ # NextAuth.js 动态路由
│   │   │       └── route.ts
│   │   └── register/        # 用户注册 API
│   │       └── route.ts
│   ├── layout.tsx        # 根布局 (包含 <html>, <body>, Providers)
│   ├── page.tsx          # 首页
│   └── globals.css       # 全局样式 (Tailwind 指令, CSS 变量)
├── components/
│   ├── ui/               # 通用基础 UI 组件 (Button, Input, Label...)
│   ├── shared/           # 应用共享的业务组件 (Header, Footer...)
│   └── AuthForm.tsx      # 特定功能的复合组件 (认证表单)
│   └── SessionProvider.tsx # 客户端 Provider 包装器
├── lib/
│   ├── prisma.ts         # Prisma Client 实例
│   └── utils.ts          # 通用工具函数 (如 cn)
├── styles/             # (可选) 更复杂的全局样式或主题文件
└── types/              # (可选) 全局 TypeScript 类型定义
.env                    # 环境变量 (数据库链接, NextAuth Secret)
.eslintrc.json          # ESLint 配置
.gitignore              # Git 忽略文件
next-env.d.ts           # Next.js 类型定义
next.config.mjs         # Next.js 配置文件 (如果是 mjs)
package.json            # 项目依赖和脚本
postcss.config.js       # PostCSS 配置文件 (用于 Tailwind)
README.md               # 项目根 README
tsconfig.json           # TypeScript 配置
```

**说明:**

- **`src/app`**: 使用 App Router 约定。路由组 `(auth)` 和 `(main)` 用于组织文件，不影响 URL 路径。
- **`src/components`**:
  - `ui/`: 放置原子化的、可复用的基础 UI 组件。
  - `shared/`: 放置由基础组件构成、在应用中多处使用的业务组件。
  - 直接放在 `components/` 下的可以是特定于某个复杂功能（如认证）的复合组件。
- **`src/lib`**: 放置非 React 的纯逻辑代码、工具函数和第三方库的封装。

## 2. 命名约定

- **文件名/目录名**: 使用 `kebab-case` (例如 `auth-flow.md`) 或 `PascalCase` (例如 `AuthForm.tsx`, `SessionProvider.tsx`)。
  - 组件文件推荐使用 `PascalCase`。
  - 路由目录和非组件代码文件可使用 `kebab-case`。
- **React 组件**: 使用 `PascalCase` (例如 `function MyComponent() {}`)。
- **变量/函数**: 使用 `camelCase` (例如 `const userSession = ...; function getUserData() {}`)。
- **常量**: 使用 `UPPER_SNAKE_CASE` (例如 `const MAX_RETRIES = 3;`)。
- **类型/接口**: 使用 `PascalCase` (例如 `interface UserProps {}`)。

## 3. 代码风格

- 遵循项目配置的 ESLint 和 Prettier 规则。
- 优先使用 TypeScript，尽可能提供明确的类型定义。
- 组件优先使用函数组件和 Hooks。
- 合理拆分组件，保持组件的单一职责。
- 优先使用 Tailwind CSS 进行样式定义。对于复杂或可复用的样式组合，可以考虑在组件内部使用 `@apply` 或提取到 `globals.css` 的 `@layer components` 中。
- 重要逻辑或复杂函数应添加 JSDoc 注释。

## 4. Git 提交规范 (建议)

建议遵循 Conventional Commits 规范，例如：

- `feat: Add user profile page`
- `fix: Correct login form validation`
- `docs: Update architecture diagram`
- `style: Improve button component styling`
- `refactor: Simplify session handling logic`
- `chore: Update dependencies`
