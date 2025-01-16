import { getServerSession } from 'next-auth'
import PemiramaCam from './pemirama-cam'
import { authOptions } from '@/lib/auth'
import { redirect } from 'next/navigation'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'

export default async function page() {
  const session = await getServerSession(authOptions)

  if (!!session.user.isSwafotoExist) {
    redirect('/home')
  }

  return (
    <div>
      <Card className="flex flex-col gap-4">
        <CardHeader>
          <CardTitle>Swafoto</CardTitle>
          <CardDescription>
            Silahkan ambil swafoto anda untuk keperluan verifikasi.
          </CardDescription>
          <Separator />
        </CardHeader>
        <CardContent>
          <PemiramaCam />
        </CardContent>
      </Card>
    </div>
  )
}
