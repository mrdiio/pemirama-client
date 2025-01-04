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

const formSchema = z.object({
  email: z.string().min(1, 'Email is required').email(),
  password: z.string().min(6),
})

export default function SignInForm() {
  const router = useRouter()
  const { toast } = useToast()

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
        title: 'Error Login',
        description: login.error,
        variant: 'destructive',
      })

      setLoading(false)
    } else {
      setLoading(false)

      router.refresh()
    }
  }

  return (
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
