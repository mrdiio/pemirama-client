'use client'

import { Badge } from '@/components/ui/badge'
import { Card } from '@/components/ui/card'
import { useCalonQuery } from '@/services/calon.service'
import Image from 'next/image'

export default function CalonCard({ categoryId }) {
  const { data } = useCalonQuery(categoryId)

  data && console.log(data)

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
      {data &&
        data.map((calon) => (
          <Card
            key={calon.id}
            className="relative flex w-full h-80 sm:w-56 sm:h-96 flex-col overflow-hidden rounded-lg p-6 hover:opacity-75 xl:w-auto transition-all hover:scale-105"
          >
            <span aria-hidden="true" className="absolute inset-0">
              <Image
                src={`http://pemirama-new.test/images/${calon.image_url}`}
                alt={calon.category}
                width={300}
                height={400}
                priority
                className="aspect-[2/3] h-full w-full bg-gray-100 object-contain group-hover:opacity-80 sm:aspect-auto"
              />
            </span>
            <span
              aria-hidden="true"
              className="absolute inset-x-0 bottom-0 h-2/3 bg-linear-to-t from-gray-800 opacity-50"
            />
            <span className="relative mt-auto flex justify-end text-xl font-bold text-white">
              <div className="bg-primary w-fit p-2 px-4 rounded-lg">
                {calon.nomor_urut}
              </div>
            </span>

            <div c>
              <p>test</p>
            </div>
          </Card>
        ))}
    </div>
  )
}
