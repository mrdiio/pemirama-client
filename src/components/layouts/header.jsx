'use client'
import React from 'react'
import { Card, CardHeader } from '../ui/card'
import { GraduationCap, MapPin } from 'lucide-react'
import Image from 'next/image'
import logo from '@/assets/images/logo.png'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu'
import { Button } from '../ui/button'
import { signOut } from 'next-auth/react'

export default function Header({ auth }) {
  return (
    <div className="w-full py-4 bg-white shadow-sm">
      {/* Header */}
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Image
              src={logo}
              alt="Logo Untan"
              width={45}
              height={45}
              className=""
            />
            <div className="-space-y-1.5">
              <div className="uppercase font-bold text-primary">Pemirama</div>
              <div>Pemilihan Raya Mahasiswa</div>
            </div>
          </div>
          <div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="secondary"
                  size="icon"
                  className="rounded-full"
                >
                  <Image
                    src={`https://ui-avatars.com/api/?name=${auth.name}?length=2&background=243184&color=fff`}
                    alt="Logo"
                    width={50}
                    height={50}
                    className="rounded-full m-4"
                  />
                  <span className="sr-only">Toggle user menu</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>
                  <div className="w-72 flex items-center gap-4 border rounded-xl">
                    <Image
                      // src="https://satu.untan.ac.id/uploads/untan/fotomhs/F1012241002.jpg"
                      src="https://satu.untan.ac.id/uploads/untan/fotomhs/D1041131014.jpg"
                      width={100}
                      height={100}
                      alt="Foto Siakad"
                      className="rounded-xl"
                    />
                    <div className="flex flex-col space-y-0.5 font-normal pr-4">
                      <span>Hi, {auth.name.split(' ')[0]} </span>
                      <span className="text-muted-foreground">{auth.nim}</span>
                      <span>{auth.fakultas}</span>
                    </div>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <Button
                  variant="destructive"
                  className="w-full"
                  onClick={() => {
                    signOut({ callbackUrl: '/' })
                  }}
                >
                  Sign Out
                </Button>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        {/* <Card className="border-none shadow-none pt-4 rounded-none bg-transparent">
          <CardHeader className="p-1 flex justify-center items-center gap-3">
            <Image
              // src="https://satu.untan.ac.id/uploads/untan/fotomhs/F1012241002.jpg"
              src="https://satu.untan.ac.id/uploads/untan/fotomhs/D1041131014.jpg"
              width={100}
              height={100}
              alt="Logo UNTAN"
              className="w-32 h-32 object-cover rounded-full"
            />

            <div className="flex flex-col justify-center items-center">
              <span className="text-xl font-semibold">{auth.name}</span>
              <div className="flex gap-2 items-center ">
                <GraduationCap size={16} />
                {auth.nim}
              </div>

              <div className="flex gap-2 items-center ">
                <MapPin size={16} />
                {auth.fakultas}
              </div>
            </div>
          </CardHeader>
        </Card> */}
      </div>
    </div>
  )
}
