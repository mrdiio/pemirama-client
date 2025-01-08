import { authOptions } from '@/lib/auth'
import { getServerSession } from 'next-auth'
import CardHome from './card'

export default async function page() {
  const session = await getServerSession(authOptions)

  return (
    <div className="flex-1 flex flex-col gap-4">
      <div className="flex flex-col px-2">
        <div className="text-xl">
          Halo, <span className="font-semibold">{session.user.name}</span>
        </div>
        <div className="text-muted-foreground">
          Selamat datang di PEMIRAMA UNTAN
        </div>
      </div>
      <CardHome />
    </div>
  )
}
