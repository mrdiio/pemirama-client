'use client'

import { useCheckCategoryQuery } from '@/services/calon.service'
import { redirect } from 'next/navigation'
import CalonCard from './calon-card'
import { Skeleton } from '@/components/ui/skeleton'

export default function Page({ params }) {
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

  return (
    <div className="flex-1 flex flex-col gap-4">
      <div>
        {isLoading || isFetching ? (
          <Skeleton className="w-72 h-[40px] bg-primary/10" />
        ) : (
          <>
            <span className="text-xl font-semibold">
              Kategori {calonData?.name}
            </span>
            <div className="text-muted-foreground">
              Daftar calon yang akan anda pilih
            </div>
          </>
        )}
      </div>

      {isLoading || isFetching ? (
        <div className="px-4 py-3 flex gap-6">
          <Skeleton className="w-full sm:w-4/12 h-72 bg-primary/10" />
          <Skeleton className="w-full sm:w-4/12 h-72 bg-primary/10" />
          <Skeleton className="w-full sm:w-4/12 h-72 bg-primary/10" />
        </div>
      ) : (
        <CalonCard categoryId={params.id} nextCategory={nextCategory} />
      )}
    </div>
  )
}
