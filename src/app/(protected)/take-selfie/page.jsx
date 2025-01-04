import { authOptions } from '@/lib/auth'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'

export default async function page() {
  const session = await getServerSession(authOptions)

  if (session.user.foto === 1) {
    redirect('/dashboard')
  }

  return <div>page</div>
}
