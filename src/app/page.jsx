import SignInForm from '@/components/auth/signin-form'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { authOptions } from '@/lib/auth'
import { getServerSession } from 'next-auth'
import Image from 'next/image'
import { redirect } from 'next/navigation'
import kotakSuara from '@/assets/images/kotak-suara.png'
import { Separator } from '@/components/ui/separator'
import logo from '@/assets/images/logo.png'

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { Button } from '@/components/ui/button'

export default async function Home() {
  const session = await getServerSession(authOptions)

  if (session) {
    redirect('/home')
  }

  return (
    <div className="sm:grid sm:grid-cols-5 min-h-screen">
      <div className="w-full sm:col-span-3 hero text-white flex flex-col justify-between sm:rounded-r-[3rem] shadow-md">
        <div className="w-full flex flex-col gap-6 p-6 sm:p-8">
          <div className="flex place-items-center gap-3">
            <div className="w-12 sm:w-fit">
              <Image
                src={logo}
                alt="Logo Untan"
                width={80}
                height={80}
                className=""
              />
            </div>
            <div>
              <h1 className="text-2xl uppercase font-bold">Pemirama</h1>
              <p className="text-lg sm:text-2xl capitalize">
                Pemilihan Raya Mahasiswa
              </p>
            </div>
          </div>
        </div>

        <div className="w-full hidden justify-center sm:flex">
          <Image
            src={kotakSuara}
            alt="Logo Untan"
            width={787}
            height={692}
            priority
            className="object-scale-down h-full max-w-[750px]"
          />
        </div>
      </div>

      <div className="sm:col-span-2 flex flex-col items-center justify-center pt-12 px-5">
        <Card className={'w-full border-none shadow-none'}>
          <CardHeader className="space-y-3">
            <CardTitle className="text-5xl text-primary font-semibold tracking-wide">
              Haloo!,
            </CardTitle>
            <Separator className="w-20 h-1.5 bg-primary" />
            <CardDescription>
              Selamat datang di website{' '}
              <span className="font-semibold text-base">
                Pemilihan Raya Mahasiswa Universitas Tanjungpura.
              </span>{' '}
              Silahkan login menggunakan akun{' '}
              <span className="font-semibold uppercase">Satu Untan</span> untuk
              melanjutkan ke pemilihan.
            </CardDescription>

            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline">Info Login</Button>
              </PopoverTrigger>
              <PopoverContent className="w-96" side="top">
                <div className="grid gap-4">
                  <div className="space-y-2">
                    <ul className="px-4 list-disc text-muted-foreground text-sm">
                      <li>
                        <strong>Email</strong> dan <strong>password</strong>{' '}
                        yang anda gunakan harus sama dengan yang anda gunakan di
                        SATU UNTAN.
                      </li>
                      <li>
                        Pastikan anda dapat login di Satu Untan menggunakan{''}
                        <strong> Email</strong> dan <strong> Password</strong>,
                        bukan menggunakan tombol Login by Google.
                      </li>
                      <li>
                        Jika password salah, silahkan reset password di SATU
                        UNTAN, bukan reset password email anda.
                      </li>
                      <li>
                        Email yang digunakan di SATU UNTAN dapat berupa email
                        pribadi atau email institusi.
                      </li>
                    </ul>
                  </div>
                  <div className="px-4 text-muted-foreground text-sm"></div>
                </div>
              </PopoverContent>
            </Popover>
          </CardHeader>

          <CardContent>
            <SignInForm />
            <div className="w-full flex justify-center mt-3">
              <small>2024 &copy; UPA. TIK UNTAN</small>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
