'use client'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Check, Info, Vote } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import voters from '@/assets/images/voters.png'

import { useCheckCategoryQuery } from '@/services/calon.service'
import { Skeleton } from '@/components/ui/skeleton'
import { Badge } from '@/components/ui/badge'
import VoteSuccessCard from './vote-success-card'
import CategoryListCard from './category-list-card'
import InfoCard from './info-card'
import { signOut, useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import { useState } from 'react'

export default function HomeCard() {
  const router = useRouter()
  const { data, isLoading, isFetching } = useCheckCategoryQuery()
  const { data: session } = useSession()
  const [loading, setLoading] = useState(false)

  if (session && !session.user.isSwafotoExist) {
    return (
      <AlertDialog open={true}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Maaf, Swafoto Anda Belum Ada.</AlertDialogTitle>
            <AlertDialogDescription>
              Silahkan ambil swafoto terlebih dahulu sebelum melakukan
              pemilihan.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel
              onClick={() => {
                signOut()
              }}
            >
              Logout
            </AlertDialogCancel>
            <AlertDialogAction
              disabled={loading}
              onClick={() => {
                setLoading(true)
                setTimeout(() => {
                  router.refresh()
                }, 1500)
                router.push('/take-selfie')
              }}
            >
              Ambil Swafoto
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    )
  }

  const isVoted = data && !data.some((category) => !category.has_voted)

  return (
    <>
      <div className="grid sm:grid-cols-3 gap-4">
        <Card className="sm:col-span-2 bg-primary text-primary-foreground card-voter">
          <div className="flex h-full">
            <div className="p-6 flex-1 flex flex-col justify-between">
              <div className="text-2xl font-bold">
                <span className="text-yellow-300">Ayo Voting</span>, Suaramu
                Menentukan <span className="text-yellow-300">Masa Depan</span>
              </div>

              <div className="mt-5">
                <div className="space-y-1">
                  {isLoading || isFetching ? (
                    <div>
                      <Skeleton className="w-48 h-[40px]" />
                    </div>
                  ) : isVoted ? (
                    <Badge
                      variant={'destructive'}
                      className={'py-3 px-4 rounded-md w-48'}
                    >
                      <Check size={16} className="me-2" />
                      Anda Sudah Memilih
                    </Badge>
                  ) : (
                    <>
                      <span className="flex items-center gap-1 text-xs text-muted italic">
                        <Info size={12} />
                        Klik tombol dibawah untuk mulai memilih
                      </span>

                      <Button
                        asChild
                        variant="secondary"
                        className="w-48 bg-yellow-300 hover:bg-yellow-300/90"
                      >
                        <Link href={`/vote/${data?.[0]?.id}`}>
                          <Vote /> Vote
                        </Link>
                      </Button>
                    </>
                  )}
                </div>
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

        <InfoCard />
      </div>

      {isVoted && <VoteSuccessCard />}

      <CategoryListCard data={data} loading={isLoading || isFetching} />
    </>
  )
}
