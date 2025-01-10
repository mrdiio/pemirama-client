import { getServerSession } from 'next-auth'
import PemiramaCam from './pemirama-cam'
import { authOptions } from '@/lib/auth'
import { redirect } from 'next/navigation'

export default async function page() {
  const session = await getServerSession(authOptions)

  if (!!session.user.isSwafotoExist) {
    redirect('/home')
  }

  return (
    <div>
      Take Selfie Page
      <p>Foto : {session.user.foto}</p>
      <PemiramaCam />
    </div>
  )
}
