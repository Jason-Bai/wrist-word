# 用户认证流程

本文档描述 Wrist Word 项目的用户注册和登录流程。

## 1. 注册流程

```mermaid
sequenceDiagram
    participant User as 用户 (浏览器)
    participant RegPage as 注册页面 (/register)
    participant AuthForm as AuthForm 组件
    participant RegAPI as 注册 API (/api/register)
    participant Prisma as Prisma Client
    participant DB as 数据库 (User 表)

    User->>RegPage: 访问 /register
    RegPage->>AuthForm: 渲染 AuthForm(variant='REGISTER')
    User->>AuthForm: 输入邮箱和密码, 点击注册
    AuthForm->>AuthForm: 设置 isLoading=true
    AuthForm->>RegAPI: 发送 POST 请求 (email, password)
    RegAPI->>Prisma: 查询用户是否存在 (findUnique({ where: { email } }))
    Prisma->>DB: SELECT * FROM User WHERE email = ?
    DB-->>Prisma: 返回查询结果
    Prisma-->>RegAPI: 返回用户数据 (null 或 existingUser)
    alt 用户已存在
        RegAPI-->>AuthForm: 返回错误响应 (409 Conflict)
        AuthForm->>AuthForm: 显示错误提示 (toast.error)
        AuthForm->>AuthForm: 设置 isLoading=false
    else 用户不存在
        RegAPI->>RegAPI: 使用 bcrypt 哈希密码
        RegAPI->>Prisma: 创建新用户 (create({ data: { email, hashedPassword } }))
        Prisma->>DB: INSERT INTO User (...)
        DB-->>Prisma: 返回新用户信息
        Prisma-->>RegAPI: 返回 user 对象
        RegAPI-->>AuthForm: 返回成功响应 (200 OK, user data without hash)
        AuthForm->>AuthForm: 显示成功提示 (toast.success)
        AuthForm->>User: 2秒后自动跳转到 /login
        AuthForm->>AuthForm: 设置 isLoading=false
    end
```

**流程说明:**

1.  用户访问注册页面。
2.  页面渲染包含邮箱和密码输入的 `AuthForm` 组件。
3.  用户填写信息并提交表单。
4.  `AuthForm` 向 `/api/register` 发送 POST 请求。
5.  API 路由首先检查该邮箱是否已被注册。
6.  如果邮箱已被注册，返回 409 错误。
7.  如果邮箱未被注册，API 使用 `bcrypt` 对密码进行哈希处理。
8.  API 通过 Prisma 在数据库中创建新用户记录。
9.  API 返回成功响应（包含用户信息，但不含密码哈希）。
10. `AuthForm` 显示成功提示，并在短暂延迟后将用户重定向到登录页面。

## 2. 登录流程

```mermaid
sequenceDiagram
    participant User as 用户 (浏览器)
    participant LoginPage as 登录页面 (/login)
    participant AuthForm as AuthForm 组件
    participant NextAuthReact as next-auth/react (signIn)
    participant NextAuthCore as NextAuth.js API Route (/api/auth/...)
    participant CredentialsProvider as CredentialsProvider (authorize)
    participant Prisma as Prisma Client
    participant DB as 数据库 (User 表)

    User->>LoginPage: 访问 /login
    LoginPage->>AuthForm: 渲染 AuthForm(variant='LOGIN')
    User->>AuthForm: 输入邮箱和密码, 点击登录
    AuthForm->>AuthForm: 设置 isLoading=true
    AuthForm->>NextAuthReact: 调用 signIn('credentials', { email, password, redirect: false })
    NextAuthReact->>NextAuthCore: 发送 POST 请求到 /api/auth/callback/credentials
    NextAuthCore->>CredentialsProvider: 调用 authorize(credentials)
    CredentialsProvider->>Prisma: 查询用户信息 (findUnique({ where: { email } }))
    Prisma->>DB: SELECT * FROM User WHERE email = ?
    DB-->>Prisma: 返回查询结果
    Prisma-->>CredentialsProvider: 返回用户数据 (null 或 user)
    alt 用户不存在或密码未设置
        CredentialsProvider->>NextAuthCore: 抛出错误
        NextAuthCore-->>NextAuthReact: 返回 { error: "..." }
        NextAuthReact-->>AuthForm: 返回 callback { error: "..." }
        AuthForm->>AuthForm: 显示错误提示 (toast.error)
    else 用户存在
        CredentialsProvider->>CredentialsProvider: 使用 bcrypt 比较密码哈希
        alt 密码错误
            CredentialsProvider->>NextAuthCore: 抛出错误 ("邮箱或密码错误")
            NextAuthCore-->>NextAuthReact: 返回 { error: "邮箱或密码错误" }
            NextAuthReact-->>AuthForm: 返回 callback { error: "邮箱或密码错误" }
            AuthForm->>AuthForm: 显示错误提示 (toast.error)
        else 密码正确
            CredentialsProvider->>NextAuthCore: 返回 user 对象 (不含密码哈希)
            NextAuthCore->>NextAuthCore: 创建 JWT 会话
            NextAuthCore-->>NextAuthReact: 返回 { ok: true, url: null }
            NextAuthReact-->>AuthForm: 返回 callback { ok: true, error: null }
            AuthForm->>AuthForm: 显示成功提示 (toast.success)
            AuthForm->>User: 跳转到 /dashboard
        end
    end
    AuthForm->>AuthForm: 设置 isLoading=false
```

**流程说明:**

1.  用户访问登录页面。
2.  页面渲染包含邮箱和密码输入的 `AuthForm` 组件。
3.  用户填写信息并提交表单。
4.  `AuthForm` 调用 `next-auth/react` 的 `signIn` 函数，使用 `credentials` 提供者。
5.  `signIn` 函数向 NextAuth.js 的 API 路由 (`/api/auth/callback/credentials`) 发送请求。
6.  NextAuth.js 核心逻辑调用我们在配置中定义的 `CredentialsProvider` 的 `authorize` 函数。
7.  `authorize` 函数通过 Prisma 查询数据库中是否存在该邮箱的用户。
8.  如果用户不存在，`authorize` 抛出错误。
9.  如果用户存在，`authorize` 使用 `bcrypt.compare` 比较用户输入的密码和数据库中存储的哈希密码。
10. 如果密码不匹配，`authorize` 抛出错误。
11. 如果密码匹配，`authorize` 返回用户信息（不包含密码哈希）。
12. NextAuth.js 核心逻辑接收到用户信息，创建 JWT 会话（可能设置 cookie）。
13. NextAuth.js API 路由向 `signIn` 函数返回成功响应。
14. `AuthForm` 接收到成功回调，显示成功提示，并将用户重定向到 `/dashboard` 页面。
