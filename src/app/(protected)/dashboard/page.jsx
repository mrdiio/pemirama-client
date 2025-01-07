import { authOptions } from '@/lib/auth'
import { getServerSession } from 'next-auth'
import CheckFoto from './check-foto'
import { Button } from '@/components/ui/button'
import { Card, CardHeader } from '@/components/ui/card'
import Image from 'next/image'
import voters from '@/assets/images/voters.png'
import calendar from '@/assets/images/calendar.png'

export default async function page() {
  const session = await getServerSession(authOptions)

  // if (session.user.foto === 0) {
  //   redirect('/take-selfie')
  // }

  return (
    <div className="grid sm:grid-cols-3 gap-4">
      <Card className="col-span-2 bg-primary text-primary-foreground card-voter">
        <div className="flex h-full">
          <div className="text-2xl p-6 flex-1 font-bold flex flex-col justify-center">
            <div>
              <span className="text-yellow-400">Ayo Voting</span>, Suaramu
              Menentukan <span className="text-yellow-400">Masa Depan</span>
            </div>

            <Button variant="secondary" className="mt-10 w-48">
              Mulai Voting
            </Button>
          </div>
          <div className="sm:flex me-5 mt-3 hidden">
            <Image
              src={voters}
              alt="voters"
              width={250}
              height={100}
              priority
              className="w-auto"
            />
          </div>
        </div>
      </Card>

      <div className="col-span-1 h-full flex flex-col gap-4">
        <Card className="h-fit border-l-8 border-l-black">
          <CardHeader className="flex flex-row items-center gap-3 p-4">
            <Image src={calendar} alt="calendar" width={70} height={70} />

            <div>
              <span className="text-sm">Waktu Pelaksanaan</span>
              <h1 className="text-lg font-semibold">20 September 2025</h1>
              <span>09.00 - 16.00</span>
            </div>
          </CardHeader>
        </Card>

        <Card className="h-full">
          <CardHeader className="flex flex-col">test</CardHeader>
        </Card>
      </div>

      {/* {session.user.foto === 0 && <CheckFoto />} */}
    </div>
  )
}
