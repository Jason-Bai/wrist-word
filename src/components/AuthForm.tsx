'use client';

import { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import Label from '@/components/ui/Label';
import { toast } from 'sonner';

interface AuthFormProps {
  variant: 'LOGIN' | 'REGISTER';
}

export default function AuthForm({ variant }: AuthFormProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    if (variant === 'REGISTER') {
      try {
        const response = await fetch('/api/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email, password }),
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || '注册失败');
        }

        toast.success('注册成功！即将跳转到登录页面...');
        setTimeout(() => router.push('/login'), 2000);
      } catch (error: unknown) {
        const message =
          error instanceof Error ? error.message : '注册过程中发生未知错误';
        toast.error(message);
      } finally {
        setIsLoading(false);
      }
    } else {
      signIn('credentials', {
        redirect: false,
        email,
        password,
      })
        .then((callback) => {
          if (callback?.error) {
            toast.error(callback.error);
          }

          if (callback?.ok && !callback?.error) {
            toast.success('登录成功！');
            router.push('/dashboard');
          }
        })
        .finally(() => setIsLoading(false));
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-1.5">
        <Label htmlFor="email" className="text-foreground">
          邮箱
        </Label>
        <Input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          disabled={isLoading}
        />
      </div>
      <div className="space-y-1.5">
        <Label htmlFor="password" className="text-foreground">
          密码
        </Label>
        <Input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          disabled={isLoading}
        />
      </div>
      <div className="pt-4">
        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? '处理中...' : variant === 'LOGIN' ? '登录' : '注册'}
        </Button>
      </div>
    </form>
  );
}
