# 系统架构概述

本文档描述了 Wrist Word 项目的技术选型和高层系统架构。

## 1. 技术栈

- **框架**: [Next.js](https://nextjs.org/) (v15, App Router)
- **语言**: [TypeScript](https://www.typescriptlang.org/)
- **UI 库**: 自定义组件 + [Tailwind CSS](https://tailwindcss.com/) (v3) + [shadcn/ui](https://ui.shadcn.com/) (风格与部分组件逻辑借鉴)
- **状态管理 (客户端)**: React Context (通过 `next-auth/react` 的 `SessionProvider`)
- **认证**: [NextAuth.js (Auth.js v4)](https://next-auth.js.org/)
- **数据库 ORM**: [Prisma](https://www.prisma.io/)
- **数据库**: [SQLite](https://www.sqlite.org/index.html) (开发环境)
- **样式**: Tailwind CSS + CSS Modules (如有需要)
- **Linting/Formatting**: ESLint, Prettier (需要配置)

## 2. 核心组件与交互

```mermaid
graph LR
    A[用户浏览器] --> B(Next.js 服务器);
    B --> C{App Router};
    C -- 请求页面 --> D[页面组件 (RSC/Client)];
    C -- API 请求 --> E[API 路由 (NextAuth, Register)];
    D -- 客户端渲染/交互 --> A;
    D -- 数据获取/变更 (客户端) --> E;
    E -- 认证逻辑 --> F(NextAuth.js 核心);
    E -- 数据库操作 --> G(Prisma Client);
    F -- 会话管理 --> B;
    G -- SQL --> H[(SQLite 数据库)];

    subgraph "客户端 (Browser)"
        A
        D
    end

    subgraph "服务器端 (Server)"
        B
        C
        E
        F
        G
        H
    end
```

**交互流程简介:**

1.  **页面请求**: 用户浏览器向 Next.js 服务器请求页面。
2.  **路由处理**: App Router 根据 URL 匹配对应的页面组件。
3.  **组件渲染**:
    - 服务器组件 (RSC) 在服务器上渲染，可能直接访问数据库 (通过 Prisma) 或调用 API 路由。
    - 客户端组件初始在服务器渲染（或仅骨架），然后在浏览器中水合 (hydrate) 并处理交互。
4.  **API 请求**:
    - 客户端组件（如 `AuthForm`）通过 `fetch` 调用 API 路由 (如 `/api/register` 或 NextAuth 的 `/api/auth/...` 路由)。
    - API 路由处理业务逻辑，如用户注册、密码验证等。
5.  **认证处理**: `/api/auth/...` 路由由 NextAuth.js 处理，负责登录验证、会话创建/管理。
    - NextAuth.js 使用 Prisma Adapter 与数据库交互，验证用户凭证或存储会话信息。
6.  **数据库交互**: Prisma Client 作为 ORM，将 API 路由或服务器组件的数据库操作转换为 SQL 语句，与 SQLite 数据库交互。
7.  **响应**: Next.js 服务器将渲染好的 HTML 或 API 响应返回给浏览器。

## 3. 关键目录职责

- `src/app`: 核心应用代码，包含路由、页面、布局和 API。
- `src/components`: 可复用的 UI 组件 (包括基础 UI、共享业务组件)。
- `src/lib`: 核心库代码和工具函数 (如 Prisma Client 实例、utils)。
- `prisma`: 数据库 schema 定义和迁移文件。
- `public`: 全局静态资源。
- `docs`: 项目文档。
