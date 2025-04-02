import Button from '@/components/ui/Button';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
        <h1 className="text-4xl font-bold text-center mb-8">
          欢迎来到 Wrist Word
        </h1>
        <p className="text-lg text-gray-600 text-center mb-8">
          这是一个使用 Next.js 15 构建的现代化 Web 应用
        </p>
        <div className="flex gap-4 justify-center">
          <Button variant="primary">开始使用</Button>
          <Button variant="outline">了解更多</Button>
        </div>
      </div>
    </main>
  );
}
