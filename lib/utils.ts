import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { getServerSession } from 'next-auth';
import { prisma } from '@/lib/prisma';
import { redirect } from 'next/navigation';

export function formatPrice(price: number): string {
  return price.toLocaleString('kr-KR');
}

export async function getUserId() {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    redirect('/api/auth/signin');
  } else {
    // console.log({ session: session });
    const name = session.user.name ? session.user.name : '';
    const user = await prisma.user.findFirst({
      where: {
        name,
      },
    });

    if (user) return user.id;
  }
}
