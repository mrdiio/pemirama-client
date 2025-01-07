import Header from '@/components/layouts/header'
import { authOptions } from '@/lib/auth'
import { getServerSession } from 'next-auth'

export default async function ProtectedLayout({ children }) {
  const session = await getServerSession(authOptions)

  return (
    <div className="flex min-h-screen w-full flex-col justify-center ">
      <div className="w-full mx-auto flex-1 flex flex-col">
        <Header session={session} />

        <div className="w-full max-w-4xl mx-auto flex flex-grow gap-1 px-4 relative">
          {children}
        </div>
      </div>
    </div>
  )
}
