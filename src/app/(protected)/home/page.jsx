import { authOptions } from '@/lib/auth'
import { getServerSession } from 'next-auth'
import CheckFoto from './check-foto'
import { Button } from '@/components/ui/button'
import { Card, CardHeader } from '@/components/ui/card'
import Image from 'next/image'
import voters from '@/assets/images/voters.png'
import votes from '@/assets/images/bilik.png'
import calendar from '@/assets/images/calendar.png'
import { Info, Vote } from 'lucide-react'

export default async function page() {
  const session = await getServerSession(authOptions)

  // if (session.user.foto === 0) {
  //   redirect('/take-selfie')
  // }

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
      <div className="grid sm:grid-cols-3 gap-4">
        <Card className="sm:col-span-2 bg-primary text-primary-foreground card-voter">
          <div className="flex h-full">
            <div className="p-6 flex-1 flex flex-col justify-between">
              <div className="text-2xl font-bold">
                <span className="text-yellow-300">Ayo Voting</span>, Suaramu
                Menentukan <span className="text-yellow-300">Masa Depan</span>
              </div>

              <div className="space-y-1 mt-5">
                <span className="flex items-center gap-1 text-xs text-muted">
                  <Info size={12} /> Klik tombol dibawah untuk mulai memilih
                </span>
                <Button
                  variant="secondary"
                  className="w-48 uppercase bg-yellow-300 hover:bg-yellow-400"
                >
                  <Vote /> Vote
                </Button>
              </div>
            </div>
            <div className="hidden sm:flex justify-end items-end me-3 pt-3">
              <Image
                src={voters}
                alt="voters"
                width={204}
                // height={330}
                priority
                className="object-scale-down "
              />
            </div>
          </div>
        </Card>

        <div className="flex flex-col gap-4">
          <Card className="border-l-8 border-l-primary flex items-center">
            <CardHeader className="flex flex-row items-center justify-center gap-4 p-2">
              <Image src={calendar} alt="calendar" width={60} height={60} />

              <div>
                <span className="text-sm">Waktu Pelaksanaan</span>
                <h1 className="text-lg font-semibold">20 September 2025</h1>
                <span>09.00 - 16.00</span>
              </div>
            </CardHeader>
          </Card>

          <Card className="border-l-8 border-l-primary flex items-center">
            <CardHeader className="flex flex-row items-center justify-center gap-4 p-2">
              <Image src={votes} alt="calendar" width={60} height={60} />

              <div className="flex flex-col">
                <span className="text-sm">Suara Masuk</span>
                <h1 className="text-3xl font-semibold">1710</h1>
              </div>
            </CardHeader>
          </Card>
        </div>
      </div>
    </div>
  )
}
