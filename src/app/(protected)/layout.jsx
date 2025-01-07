import Header from '@/components/layouts/header'
import { authOptions } from '@/lib/auth'
import { getServerSession } from 'next-auth'

export default async function ProtectedLayout({ children }) {
  const session = await getServerSession(authOptions)

  return (
    <div className="flex min-h-screen bg-[#F6F8FA]">
      <div className="w-full flex-1 flex flex-col  gap-4">
        <Header auth={session.user} />

        <div className="w-full mx-auto p-4 flex-1">
          <div className="max-w-5xl mx-auto flex flex-1 justify-center flex-col gap-1">
            {children}
          </div>
        </div>
      </div>
    </div>
  )
}
