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
import { CheckCircle2, GraduationCap, MapPin } from 'lucide-react'

export default async function page() {
  const session = await getServerSession(authOptions)

  // if (session.user.foto === 0) {
  //   redirect('/take-selfie')
  // }

  return (
    <div className="flex flex-col flex-grow gap-4">
      <Card className="border-none shadow-none pt-4 rounded-none">
        <CardHeader className="p-1 flex justify-center items-center gap-3">
          <Image
            src="https://satu.untan.ac.id/uploads/untan/fotomhs/F1012241002.jpg"
            width={100}
            height={100}
            alt="Logo UNTAN"
            className="w-32 h-32 object-cover rounded-full"
          />

          <div className="flex flex-col justify-center items-center">
            <span className="text-xl font-semibold">{session.user.name}</span>
            <div className="flex gap-2 items-center text-muted-foreground">
              <GraduationCap size={16} />
              {session.user.nim}
            </div>

            <div className="flex gap-2 items-center text-muted-foreground">
              <MapPin size={16} />
              {session.user.fakultas}
            </div>
          </div>
        </CardHeader>
      </Card>

      <Card className="flex-1 bg-primary/50 rounded-2xl">
        <CardHeader>test</CardHeader>
      </Card>

      {/* {session.user.foto === 0 && <CheckFoto />} */}
    </div>
  )
}
