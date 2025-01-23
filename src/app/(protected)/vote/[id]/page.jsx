'use client'

import { useCheckCategoryQuery } from '@/services/candidate.service'
import { redirect } from 'next/navigation'
import { Skeleton } from '@/components/ui/skeleton'
import CandidateCard from './candidate-card'

export default function Page({ params }) {
  const { data, isLoading, isFetching } = useCheckCategoryQuery()

  const candidateData = data?.find((category) => category.id === params.id)

  if (data && !candidateData) {
    redirect('/home')
  }

  const currentIndex = data?.findIndex((category) => category.id === params.id)
  const nextCategory = data?.[currentIndex + 1]

  if (data && candidateData.has_voted) {
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
              Kategori {candidateData?.name}
            </span>
            <div className="text-muted-foreground">
              Daftar kandidat yang akan anda pilih
            </div>
          </>
        )}
      </div>

      {isLoading || isFetching ? (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 px-4">
          <Skeleton className="w-full h-72 bg-primary/10" />
          <Skeleton className="w-full h-72 bg-primary/10" />
          <Skeleton className="w-full h-72 bg-primary/10" />
        </div>
      ) : (
        <CandidateCard categoryId={params.id} nextCategory={nextCategory} />
      )}
    </div>
  )
}
