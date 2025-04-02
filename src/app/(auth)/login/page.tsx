'use client';

import AuthForm from '@/components/AuthForm';
import Link from 'next/link';

export default function LoginPage() {
  return (
    <div className="flex min-h-screen flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h1 className="text-center text-4xl font-bold text-foreground">
          Wrist Word
        </h1>
        <h2 className="mt-6 text-center text-2xl font-semibold tracking-tight text-muted-foreground">
          登录您的账户
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-card text-card-foreground px-6 py-8 shadow-xl rounded-lg sm:px-10">
          <AuthForm variant="LOGIN" />

          <div className="mt-6 text-center text-sm text-muted-foreground">
            还没有账户？{' '}
            <Link
              href="/register"
              className="font-semibold text-primary hover:text-primary/90 underline underline-offset-2"
            >
              立即注册
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
