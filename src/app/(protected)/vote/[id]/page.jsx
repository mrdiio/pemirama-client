'use client'

import { Button } from '@/components/ui/button'
import { useCheckCategoryQuery } from '@/services/calon.service'
import { redirect, useRouter } from 'next/navigation'
import CalonCard from './calon-card'

export default function Page({ params }) {
  const router = useRouter()

  const { data, isLoading, isFetching } = useCheckCategoryQuery()

  const calonData = data?.find((category) => category.id === params.id)

  if (data && !calonData) {
    redirect('/home')
  }

  const currentIndex = data?.findIndex((category) => category.id === params.id)
  const nextCategory = data?.[currentIndex + 1]

  if (data && calonData.has_voted) {
    redirect(nextCategory ? `/vote/${nextCategory.id}` : '/home')
  }

  if (isLoading || isFetching) {
    return <div>Loading...</div>
  }

  return (
    <div className="flex-1 flex flex-col gap-4">
      <div>
        <span className="text-xl font-semibold">Calon {calonData.name}</span>
        <div className="text-muted-foreground">
          Daftar calon yang akan anda pilih
        </div>
      </div>

      <CalonCard categoryId={params.id} nextCategory={nextCategory} />
    </div>
  )
}
