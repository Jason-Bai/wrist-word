'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useSession, signOut } from 'next-auth/react';
import Button from '@/components/ui/Button';

const Header = () => {
  const pathname = usePathname();
  const { data: session, status } = useSession();

  const navigation = [
    { name: '首页', href: '/' },
    { name: '关于', href: '/about' },
    { name: '博客', href: '/blog' },
    { name: '联系', href: '/contact' },
  ];

  return (
    <header className="bg-white shadow">
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 justify-between">
          <div className="flex">
            <div className="flex flex-shrink-0 items-center">
              <Link href="/" className="text-xl font-bold text-gray-900">
                Wrist Word
              </Link>
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              {navigation.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`inline-flex items-center border-b-2 px-1 pt-1 text-sm font-medium ${
                    pathname === item.href
                      ? 'border-primary text-gray-900'
                      : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                  }`}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
          <div className="hidden sm:ml-6 sm:flex sm:items-center sm:space-x-4">
            {status === 'loading' ? (
              <div className="h-5 w-20 animate-pulse rounded bg-gray-200"></div>
            ) : session ? (
              <>
                <Link
                  href="/dashboard"
                  className={`inline-flex items-center border-b-2 px-1 pt-1 text-sm font-medium ${
                    pathname === '/dashboard'
                      ? 'border-primary text-gray-900'
                      : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                  }`}
                >
                  仪表盘
                </Link>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => signOut({ callbackUrl: '/' })}
                >
                  退出登录
                </Button>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  className={`inline-flex items-center border-b-2 px-1 pt-1 text-sm font-medium ${
                    pathname === '/login'
                      ? 'border-primary text-gray-900'
                      : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                  }`}
                >
                  登录
                </Link>
                <Link
                  href="/register"
                  className={`inline-flex items-center border-b-2 px-1 pt-1 text-sm font-medium ${
                    pathname === '/register'
                      ? 'border-primary text-gray-900'
                      : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                  }`}
                >
                  注册
                </Link>
              </>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
