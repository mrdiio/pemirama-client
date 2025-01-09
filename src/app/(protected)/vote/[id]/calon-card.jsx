'use client'

import { Badge } from '@/components/ui/badge'
import { Card } from '@/components/ui/card'
import { useCalonQuery } from '@/services/calon.service'
import { Check } from 'lucide-react'
import Image from 'next/image'
import { useState } from 'react'

export default function CalonCard({ categoryId }) {
  const { data } = useCalonQuery(categoryId)

  const [selectedCalon, setSelectedCalon] = useState(null)

  const dummyImage = [
    'https://dummyimage.com/500',
    'https://dummyimage.com/720x400',
    'https://dummyimage.com/300x400',
  ]

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 px-4">
      {data &&
        data.map((calon, i) => (
          <Card
            key={calon.id}
            className={`group relative flex flex-col 
                        overflow-hidden rounded-lg bg-white cursor-pointer 
                        transition-all hover:scale-105 hover:border-primary hover:border-3`}
            onClick={() => setSelectedCalon(calon.id)}
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
                  <span aria-hidden="true" className="absolute inset-0" />
                  {calon.nama}{' '}
                  {!calon.category_is_single ? ` - ${calon.nama_pasangan}` : ''}
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
        ))}
    </div>
  )
}
