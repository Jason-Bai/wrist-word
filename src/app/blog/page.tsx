interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  date: string;
  category: string;
}

const blogPosts: BlogPost[] = [
  {
    id: 1,
    title: "Next.js 15 新特性解析",
    excerpt:
      "探索 Next.js 15 带来的重大更新，包括改进的服务器组件、更快的构建速度和更好的开发体验。",
    date: "2024-03-20",
    category: "技术",
  },
  {
    id: 2,
    title: "TypeScript 5.0 最佳实践",
    excerpt:
      "深入了解 TypeScript 5.0 的新功能，以及如何在实际项目中应用这些特性来提高代码质量。",
    date: "2024-03-18",
    category: "编程",
  },
  {
    id: 3,
    title: "现代前端开发趋势",
    excerpt:
      "探讨 2024 年前端开发的最新趋势，包括框架选择、性能优化、开发工具等多个方面。",
    date: "2024-03-15",
    category: "行业",
  },
];

export default function Blog() {
  return (
    <main className="min-h-screen p-8 md:p-24">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">博客文章</h1>

        <div className="grid gap-8">
          {blogPosts.map((post) => (
            <article
              key={post.id}
              className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow"
            >
              <div className="flex justify-between items-start mb-4">
                <h2 className="text-2xl font-semibold hover:text-primary">
                  <a href={`/blog/${post.id}`}>{post.title}</a>
                </h2>
                <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                  {post.category}
                </span>
              </div>
              <p className="text-gray-600 mb-4">{post.excerpt}</p>
              <div className="flex justify-between items-center">
                <time className="text-sm text-gray-500">{post.date}</time>
                <a
                  href={`/blog/${post.id}`}
                  className="text-primary hover:text-primary-600 font-medium"
                >
                  阅读更多 →
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </main>
  );
}
