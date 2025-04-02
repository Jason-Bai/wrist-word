import { NextResponse } from 'next/server';
import bcrypt from 'bcrypt';
import { prisma } from '@/lib/prisma';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, password } = body;

    if (!email || !password) {
      return new NextResponse('缺少邮箱或密码', { status: 400 });
    }

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return new NextResponse('该邮箱已被注册', { status: 409 }); // 409 Conflict
    }

    const hashedPassword = await bcrypt.hash(password, 12); // Use a salt round of 12

    const user = await prisma.user.create({
      data: {
        email,
        hashedPassword,
      },
    });

    // Return user object without the password hash
    const userToReturn = {
      id: user.id,
      email: user.email,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };

    return NextResponse.json(userToReturn);
  } catch (error) {
    console.error('[REGISTER_API_ERROR]', error);
    return new NextResponse('服务器内部错误', { status: 500 });
  }
}
