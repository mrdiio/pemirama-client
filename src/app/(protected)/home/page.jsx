import { authOptions } from '@/lib/auth'
import { getServerSession } from 'next-auth'
import CardHome from './card'
import { CheckCircle2 } from 'lucide-react'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'

export default async function page() {
  const session = await getServerSession(authOptions)

  return (
    <div className="flex-1 flex flex-col gap-4">
      <div className="flex flex-col px-2">
        <div className="text-xl flex gap-1 items-center">
          Halo,
          <span className="font-semibold"> {session.user.name}</span>
          {session.user.isSwafotoExist ? (
            <TooltipProvider delayDuration={300}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <CheckCircle2
                    size={20}
                    className=" fill-sky-500 text-white"
                  />
                </TooltipTrigger>
                <TooltipContent side="right" className="text-xs">
                  Swafoto sudah tersimpan
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          ) : (
            ''
          )}
        </div>
        <div className="text-muted-foreground">
          Selamat datang di PEMIRAMA UNTAN
        </div>
      </div>

      <CardHome />

      
    </div>
  )
}
