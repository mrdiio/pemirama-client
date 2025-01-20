'use client'

import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Form, FormField, FormItem, FormMessage } from '@/components/ui/form'
import { Skeleton } from '@/components/ui/skeleton'
import { toast } from '@/hooks/use-toast'
import { useCalonQuery } from '@/services/calon.service'
import { storeVoteService } from '@/services/voter.service'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Check, Loader2 } from 'lucide-react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const formSchema = z.object({
  calon_id: z.string().min(1, 'Anda harus memilih calon'),
})

export default function CalonCard({ categoryId, nextCategory }) {
  const router = useRouter()
  const { data, isLoading, isFetching } = useCalonQuery(categoryId)
  const queryClient = useQueryClient()

  const [selectedCalon, setSelectedCalon] = useState(null)

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      calon_id: '',
    },
  })

  const { mutate, isPending } = useMutation({
    mutationFn: storeVoteService,
    onSuccess: async () => {
      toast({
        title: 'Success',
        description: 'Berhasil memilih calon',
      })

      queryClient.invalidateQueries('checkCategory')
      queryClient.invalidateQueries('info')

      if (nextCategory) {
        router.push(`/vote/${nextCategory.id}`)
      } else {
        router.push('/home')
      }
    },
    onError: (error) => {
      router.push('/home')
      toast({
        title: 'Tidak dapat memilih calon',
        description: error.response.data.message,
        variant: 'destructive',
      })
    },
  })

  useEffect(() => {
    if (form.formState.errors?.calon_id) {
      toast({
        title: 'Terjadi Kesalahan',
        description: form.formState.errors.calon_id.message,
        variant: 'destructive',
      })
    }
  }, [form.formState.errors?.calon_id])

  return (
    <div className="flex-1">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(mutate)}
          className="flex flex-col gap-4 h-full"
        >
          <FormField
            control={form.control}
            name="calon_id"
            render={() => (
              <FormItem>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 px-4">
                  {isLoading || isFetching ? (
                    <>
                      <Skeleton className="w-full h-72 bg-primary/10" />
                      <Skeleton className="w-full h-72 bg-primary/10" />
                      <Skeleton className="w-full h-72 bg-primary/10" />
                    </>
                  ) : (
                    data &&
                    data.map((calon) => (
                      <Card
                        key={calon.id}
                        className={`group relative flex flex-col 
                          overflow-hidden rounded-lg bg-white cursor-pointer 
                          transition-all hover:scale-105 hover:border-primary hover:border-3`}
                        onClick={() => {
                          setSelectedCalon(calon.id)
                          form.setValue('calon_id', calon.id)
                        }}
                      >
                        <div className="relative">
                          <Image
                            src={`http://pemirama-new.test/images/${calon.image_url}`}
                            alt={calon.category}
                            width={500}
                            height={500}
                            priority
                            className="aspect-square w-full object-cover group-hover:opacity-75 sm:aspect-square"
                          />
                          <span className="absolute top-0 left-0 m-3 rounded-lg bg-primary px-4 py-2 text-center font-semibold text-white">
                            {calon.nomor_urut}
                          </span>
                          {selectedCalon === calon.id && (
                            <span className="absolute top-0 right-0 m-3 rounded-lg bg-primary px-3 py-3 text-white">
                              <Check size={18} />
                            </span>
                          )}
                        </div>
                        <div className="flex flex-1 flex-col space-y-2 p-4 bg-primary/5">
                          <h3 className="text-sm font-medium text-gray-900">
                            <div>
                              <span
                                aria-hidden="true"
                                className="absolute inset-0"
                              />
                              {calon.nama}{' '}
                              {!calon.category_is_single
                                ? ` - ${calon.nama_pasangan}`
                                : ''}
                            </div>
                          </h3>
                          <p className="text-sm text-gray-500">{calon.unit}</p>
                          <div className="flex flex-1 flex-col justify-end">
                            <p className="text-base font-medium text-gray-900">
                              {calon.partai}
                            </p>
                          </div>
                        </div>
                      </Card>
                    ))
                  )}
                </div>
              </FormItem>
            )}
          />

          <div className="w-full mt-auto flex flex-col gap-2">
            {form.formState.errors?.calon_id && (
              <FormMessage type="error" className="px-2 text-center">
                {form.formState.errors.calon_id.message}
              </FormMessage>
            )}
            <Button
              type="submit"
              disabled={isPending || isLoading || isFetching}
            >
              {isPending && <Loader2 className="animate-spin" />}
              Pilih
            </Button>
          </div>
        </form>
      </Form>
    </div>
  )
}
