import { getServerSession } from 'next-auth'
import PemiramaCam from './pemirama-cam'
import { authOptions } from '@/lib/auth'

export default async function page() {
  const session = await getServerSession(authOptions)
  return (
    <div>
      Take Selfie Page
      <p>Foto : {session.user.foto}</p>
      <PemiramaCam />
    </div>
  )
}
