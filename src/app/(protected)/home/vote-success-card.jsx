import { Card, CardHeader } from '@/components/ui/card'
import Image from 'next/image'
import kotakSuara2 from '@/assets/images/kotak-suara-2.png'

export default function VoteSuccessCard() {
  return (
    <Card className="border-t-8 border-t-primary flex items-center">
      <CardHeader className="flex flex-row items-center gap-4">
        <Image src={kotakSuara2} alt="kotak suara" />
        <div className="flex flex-col">
          <span className="text-xl font-semibold">
            Terima kasih telah memilih
          </span>
          <span className="text-muted-foreground">
            Suara anda telah tercatat, hasil pemilihan akan diumumkan setelah
            pemilihan selesai.
          </span>
        </div>
      </CardHeader>
    </Card>
  )
}
