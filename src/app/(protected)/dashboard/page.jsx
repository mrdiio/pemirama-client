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
    <div className="flex flex-col flex-grow -mt-7">
      <Card className="flex-1 rounded-xl rounded-b-none border-black">
        <CardHeader>test</CardHeader>
      </Card>

      {/* {session.user.foto === 0 && <CheckFoto />} */}
    </div>
  )
}
