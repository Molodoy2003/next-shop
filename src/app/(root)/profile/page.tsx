import { prisma } from '@/prisma/prisma-client'
import { ProfileInfo } from '@/src/shared/components/shared/ProfileInfo'
import { getUserSession } from '@/src/shared/lib/getUserSession'
import { redirect } from 'next/navigation'

/* 
  getUserSession - так как у нас async function, нельзя использовать useSession(который вызывает useEffect) и делать компонент use client, getUserSession используем, потому что он не вызывает useEffect и не нужно делать use client component.
*/

export default async function ProfilePage() {
  const session = await getUserSession()

  if (!session) {
    return redirect('/not-auth')
  }

  const user = await prisma.user.findFirst({
    where: { id: Number(session?.id) },
  })

  if (!user) {
    return redirect('/not-auth')
  }

  return <ProfileInfo data={user} />
}
