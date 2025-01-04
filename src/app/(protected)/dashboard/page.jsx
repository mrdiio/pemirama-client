import { authOptions } from '@/lib/auth'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'

export default async function page() {
  const session = await getServerSession(authOptions)

  console.log('on dashboard', session)

  if (session.user.foto === 0) {
    redirect('/take-selfie')
  }

  return (
    <div>
      <h1>Dashboard</h1>

      <div>
        <pre>{JSON.stringify(session, null, 2)}</pre>
      </div>
    </div>
  )
}
