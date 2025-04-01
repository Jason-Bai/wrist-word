import Button from "@/components/ui/Button";

export default function About() {
  return (
    <main className="min-h-screen p-8 md:p-24">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">关于我们</h1>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">项目简介</h2>
          <p className="text-gray-600 mb-6">
            Wrist Word 是一个基于 Next.js 15 开发的现代化 Web
            应用。我们致力于为用户提供最佳的使用体验，采用了最新的 Web
            技术和最佳实践。
          </p>
          <div className="bg-gray-50 p-6 rounded-lg mb-8">
            <h3 className="text-xl font-semibold mb-4">技术特点</h3>
            <ul className="list-disc list-inside space-y-2 text-gray-600">
              <li>使用 Next.js 15 框架，支持服务端渲染和静态生成</li>
              <li>采用 TypeScript 确保代码类型安全</li>
              <li>使用 Tailwind CSS 构建响应式界面</li>
              <li>遵循组件化开发方案</li>
              <li>完整的中文本地化支持</li>
            </ul>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">我们的愿景</h2>
          <p className="text-gray-600 mb-6">
            我们希望通过技术创新为用户提供更好的服务，让每一个使用我们产品的人都能感受到科技带来的便利。
          </p>
          <div className="flex gap-4">
            <Button variant="primary">加入我们</Button>
            <Button variant="outline">了解更多</Button>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">联系方式</h2>
          <div className="bg-white shadow-sm rounded-lg p-6">
            <p className="text-gray-600 mb-2">邮箱：contact@example.com</p>
            <p className="text-gray-600 mb-2">地址：中国北京市朝阳区</p>
            <p className="text-gray-600">电话：+86 10 1234 5678</p>
          </div>
        </section>
      </div>
    </main>
  );
}
