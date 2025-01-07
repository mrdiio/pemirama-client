import React from 'react'
import { Card, CardHeader } from '../ui/card'
import { GraduationCap, MapPin, Settings } from 'lucide-react'
import Image from 'next/image'

export default function Header({ session }) {
  return (
    <div className="w-full bg-gradient-to-tr from-primary to-100 py-4 pb-10 relative">
      {/* Header */}
      <div className="max-w-4xl mx-auto px-4">
        <div className="flex justify-between items-center">
          <div className="flex-1">
            <span className="text-2xl uppercase font-semibold tracking-wide">
              Pemirama
            </span>
          </div>
          <div>
            <Settings size={24} />
          </div>
        </div>
        <Card className="border-none shadow-none pt-4 rounded-none bg-transparent">
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
              <span className="text-xl font-semibold">{session.user.name}</span>
              <div className="flex gap-2 items-center text-muted-foreground">
                <GraduationCap size={16} />
                {session.user.nim}
              </div>

              <div className="flex gap-2 items-center text-muted-foreground">
                <MapPin size={16} />
                {session.user.fakultas}
              </div>
            </div>
          </CardHeader>
        </Card>
      </div>
    </div>
  )
}
