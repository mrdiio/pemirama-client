import { Card, CardHeader } from '@/components/ui/card'
import Image from 'next/image'
import vote from '@/assets/images/vote.png'
import calendar from '@/assets/images/calendar.png'
import { Skeleton } from '@/components/ui/skeleton'
import { useInfoQuery } from '@/services/voter.service'

export default function InfoCard() {
  const { data, isLoading, isFetching } = useInfoQuery()
  const loading = isLoading || isFetching

  return (
    <div className="flex flex-col gap-4">
      <Card className="border-l-8 border-l-primary flex items-center">
        <CardHeader className="flex flex-row items-center justify-center gap-4 p-2">
          <Image src={calendar} alt="calendar" width={60} height={60} />

          <div>
            <span className="text-sm">Waktu Pelaksanaan</span>
            {loading ? (
              <div className="flex flex-col gap-2">
                <Skeleton className="w-48 h-[20px] bg-primary/10" />
                <Skeleton className="w-48 h-[20px] bg-primary/10" />
              </div>
            ) : data?.jadwal ? (
              <>
                <h1 className="font-semibold">
                  {data.jadwal.hari}, {data.jadwal.tanggal_format}
                </h1>
                <span className="text-sm">09.00 - 16.00</span>
              </>
            ) : (
              <p className="text-sm">Belum ada jadwal</p>
            )}
          </div>
        </CardHeader>
      </Card>

      <Card className="border-l-8 border-l-primary flex items-center">
        <CardHeader className="flex flex-row items-center justify-center gap-4 p-2">
          <Image src={vote} alt="calendar" width={60} height={60} />

          <div className="flex flex-col">
            <span className="text-sm">Suara Masuk</span>
            <h1 className="text-2xl font-semibold">
              {loading ? (
                <Skeleton className="w-48 h-[32px] bg-primary/10" />
              ) : (
                data.total_vote || 0
              )}
            </h1>
          </div>
        </CardHeader>
      </Card>
    </div>
  )
}
