'use client'

import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { Loader2 } from 'lucide-react'
import { signIn } from 'next-auth/react'
import { useToast } from '@/hooks/use-toast'
import { useInfoQuery } from '@/services/voter.service'
import moment from 'moment'
import 'moment/locale/id'
import { Card } from '../ui/card'
import { Skeleton } from '../ui/skeleton'

const formSchema = z.object({
  email: z.string().min(1, 'Email is required').email(),
  password: z.string().min(6),
})

export default function SignInForm() {
  moment.locale('id')
  const router = useRouter()
  const { toast } = useToast()

  const { data, isLoading, isFetching } = useInfoQuery()

  // check jadwal with moment between
  const start = data && moment(`${data?.jadwal.tanggal} ${data?.jadwal.mulai}`)
  const end = data && moment(`${data?.jadwal.tanggal} ${data?.jadwal.selesai}`)
  const now = moment()

  const isOnSchedule = now.isBetween(start, end)

  const [loading, setLoading] = useState(false)

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: 'dionatsir@gmail.com',
      password: '123123123',
    },
  })

  const formSubmit = async (values) => {
    setLoading(true)

    const login = await signIn('credentials', {
      email: values.email,
      password: values.password,
      redirect: false,
    })

    if (login?.error) {
      form.setError('email', {
        type: 'manual',
        message: login.error,
      })

      toast({
        title: 'Terjadi Kesalahan',
        description: login.error,
        variant: 'destructive',
      })

      setLoading(false)
    } else {
      setLoading(false)

      router.refresh()
    }
  }

  return isLoading || isFetching ? (
    <Skeleton className="w-full h-36 bg-primary/10" />
  ) : !isOnSchedule ? (
    <Card className="flex justify-center items-center py-10 bg-red-50 px-2">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold">Pemilihan Ditutup</h2>
        <p className="text-sm text-gray-500">
          Jadwal Pemilihan : {start.format('dddd, DD MMMM YYYY')} Pukul{' '}
          {start.format('HH:mm')} -{end.format('HH:mm')}
        </p>
      </div>
    </Card>
  ) : (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(formSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  autoFocus={true}
                  autoComplete="email"
                  placeholder="Input Email disini"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input
                  type="password"
                  placeholder="Input Password disini"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-end pt-4">
          <Button
            type="submit"
            size="lg"
            className="w-full uppercase tracking-wider"
            disabled={loading}
          >
            {loading && <Loader2 className="animate-spin" size={40} />}
            Login
          </Button>
        </div>
      </form>
    </Form>
  )
}
