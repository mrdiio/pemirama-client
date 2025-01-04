import SignInForm from '@/components/auth/signin-form'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { authOptions } from '@/lib/auth'
import { Vote } from 'lucide-react'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'

export default async function Home() {
  const session = await getServerSession(authOptions)

  if (session) {
    redirect('/dashboard')
  }

  return (
    <div className="w-full sm:grid sm:grid-cols-5 min-h-screen bg-primary/30 sm:bg-primary">
      <div className="sm:col-span-3 sm:bg-yellow-50 pt-12 pb-3 container flex flex-col items-center gap-6">
        <div className="w-full grid sm:grid-cols-5 gap-3 px-4">
          <Card className="sm:col-span-4 bg-primary">
            <CardHeader>
              <CardTitle className="text-3xl uppercase">
                Pemirama Online
              </CardTitle>
              <CardDescription className="text-lg uppercase sm:block hidden">
                Universitas Tanjungpura
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="sm:col-span-1 flex items-center justify-center">
            <CardHeader className="flex items-center">
              <CardDescription>Suara Masuk</CardDescription>
              <CardTitle className="text-3xl tracking-wider">1710</CardTitle>
            </CardHeader>
          </Card>
        </div>

        <div className="sm:flex flex-1 items-center justify-center h-[50vh] hidden">
          <Vote size={300} />
        </div>
      </div>

      <div className="sm:col-span-2 flex flex-col items-center justify-center py-12 gap-3 px-4 sm:mx-5">
        <Card className={'w-full border-none shadow-none'}>
          <CardHeader>
            <CardTitle className="text-4xl tracking-wide">Login</CardTitle>
            <CardDescription>
              Login menggunakan akun Satu Untan.
            </CardDescription>
          </CardHeader>

          <CardContent>
            <SignInForm />
          </CardContent>
        </Card>
        <div className="hidden sm:block">
          <small>2024 &copy; UPA. TIK UNTAN</small>
        </div>
      </div>
    </div>
  )
}
