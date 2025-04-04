'use client';

import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import Button from '@/components/ui/Button';

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'loading') return;
    if (!session) {
      router.push('/auth/login');
    }
  }, [session, status, router]);

  if (status === 'loading') {
    return <p className="text-center mt-10 text-muted-foreground">加载中...</p>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-card p-6 rounded-lg shadow-md border border-border">
        <h1 className="text-3xl font-bold mb-4 text-foreground">
          欢迎来到仪表盘
        </h1>
        {session?.user && (
          <p className="mb-4 text-muted-foreground">
            您已使用邮箱登录:{' '}
            <strong className="text-foreground">{session.user.email}</strong>
          </p>
        )}
        <Button
          onClick={() => signOut({ callbackUrl: '/' })}
          variant="destructive"
        >
          退出登录
        </Button>
      </div>
    </div>
  );
}
