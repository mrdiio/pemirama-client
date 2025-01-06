'use client'

import { Button } from '@/components/ui/button'
import { useCheckFotoQuery } from '@/services/voter.service'
import { useRouter } from 'next/navigation'

export default function CheckFoto() {
  const { data, refetch } = useCheckFotoQuery()
  const router = useRouter()

  data && console.log(data)

  return (
    <div>
      CheckFoto
      <Button
        onClick={() => {
          refetch()
          router.refresh()
        }}
      >
        Refresh
      </Button>
      <div>
        <pre>{data && JSON.stringify(data, null, 2)}</pre>
      </div>
    </div>
  )
}
