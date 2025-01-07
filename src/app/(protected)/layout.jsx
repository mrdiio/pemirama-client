import Header from '@/components/layouts/header'
import { authOptions } from '@/lib/auth'
import { getServerSession } from 'next-auth'

export default async function ProtectedLayout({ children }) {
  const session = await getServerSession(authOptions)

  return (
    <div className="flex min-h-screen bg-[#F6F8FA]">
      <div className="w-full flex-1 flex flex-col gap-4">
        <Header auth={session.user} />

        <div className="w-full mx-auto px-4 flex-grow">
          <div className="max-w-5xl mx-auto mt-auto flex flex-grow justify-center h-full">
            {children}
          </div>
        </div>

        <footer className="w-full px-4">
          <div className="max-w-5xl py-4 mx-auto text-muted-foreground text-sm flex justify-center">
            Copyrigth &copy; 2024
          </div>
        </footer>
      </div>
    </div>
  )
}
