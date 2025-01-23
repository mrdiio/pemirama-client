import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { CheckSquare2, XSquare } from 'lucide-react'

export default function CategoryListCard({ data, loading }) {
  return (
    <Card className="border-t-8 border-t-primary">
      <CardHeader className="space-y-0">
        <CardTitle className="text-xl">Kategori Kandidat</CardTitle>
        <CardDescription className="text-xs">
          Daftar kategori kandidat yang dapat anda pilih.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
          {loading ? (
            <>
              <Skeleton className="w-full h-16" />
              <Skeleton className="w-full h-16" />
              <Skeleton className="w-full h-16" />
              <Skeleton className="w-full h-16" />
            </>
          ) : data && data.length === 0 ? (
            <p className="text-sm text-muted-foreground italic">
              Tidak ada kategori kandidat yang bisa dipilih.
            </p>
          ) : (
            data?.map((category) => (
              <Card
                key={category.id}
                className={`${
                  category.has_voted ? 'bg-green-50' : 'bg-red-50'
                }`}
              >
                <CardHeader className="p-3">
                  <div className="flex items-center gap-2">
                    {category.has_voted ? (
                      <CheckSquare2 size={24} className="text-green-500" />
                    ) : (
                      <XSquare size={26} className="text-red-500" />
                    )}
                    <div className="">
                      <p className="text-xs">
                        {category.has_voted
                          ? 'Anda sudah memilih'
                          : 'Anda belum memilih'}
                      </p>
                      <p className="text-sm font-medium">{category.name}</p>
                    </div>
                  </div>
                </CardHeader>
              </Card>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  )
}
