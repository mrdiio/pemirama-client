import { authOptions } from '@/lib/auth'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import CheckFoto from './check-foto'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import Image from 'next/image'
import { Badge } from '@/components/ui/badge'
import { CheckCircle2 } from 'lucide-react'

export default async function page() {
  const session = await getServerSession(authOptions)

  // if (session.user.foto === 0) {
  //   redirect('/take-selfie')
  // }

  return (
    <div className="flex flex-col gap-4">
      <Card className="bg-primary">
        <CardHeader>
          <CardTitle>PEMIRAMA - Universitas Tanjungpura</CardTitle>
          <CardDescription>Pemilihan Raya Mahasiswa</CardDescription>
        </CardHeader>
      </Card>

      <div className="flex flex-col sm:flex-row gap-4">
        <Card className="">
          <CardHeader className="p-1 flex justify-center items-center">
            <Image
              src="https://satu.untan.ac.id/uploads/untan/fotomhs/D1041131014.jpg"
              width={100}
              height={100}
              alt="Logo UNTAN"
              className="w-48 object-cover rounded-sm"
            />
          </CardHeader>
        </Card>

        <Card className="w-full">
          <CardHeader className="flex flex-col gap-4">
            <div>
              <div className="text-xl">
                Halo, <span className="font-semibold">{session.user.name}</span>
              </div>
              <span className="text-muted-foreground">
                {session.user.fakultas}
              </span>
            </div>

            <Badge className="w-fit hidden md:block bg-green-600 text-white hover:bg-green-700">
              <div className="flex gap-2">
                Swafoto
                <CheckCircle2 className="w-4 h-4 ml-1" />
              </div>
            </Badge>
          </CardHeader>
        </Card>
      </div>

      <div>{/* <pre>{JSON.stringify(session, null, 2)}</pre> */}</div>

      {session.user.foto === 0 && <CheckFoto />}
    </div>
  )
}
