'use client'

import { Button } from '@/components/ui/button'
import { useCheckFotoQuery } from '@/services/voter.service'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'

export default function CheckFoto() {
  // const { data } = useCheckFotoQuery()
  const { data: session } = useSession()
  const router = useRouter()

  return (
    <div>
      {session?.user.foto === 0 && <p>Anda belum mengambil foto</p>}
      <Button
        onClick={() => {
          router.push('/take-selfie')
        }}
      >
        take selfie page
      </Button>

      <div>
        CheckFoto
        {/* <div>
          <pre>{data && JSON.stringify(data, null, 2)}</pre>
        </div> */}
      </div>
    </div>
  )
}
