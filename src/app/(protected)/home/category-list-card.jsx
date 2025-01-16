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
      <CardHeader>
        <CardTitle>Kategori Calon</CardTitle>
        <CardDescription>
          Daftar kategori calon yang dapat anda pilih.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4">
          {loading ? (
            <>
              <Skeleton className="w-full h-24" />
              <Skeleton className="w-full h-24" />
              <Skeleton className="w-full h-24" />
              <Skeleton className="w-full h-24" />
            </>
          ) : data.length === 0 ? (
            <p className="text-sm text-muted-foreground italic">
              Tidak ada kategori calon yang bisa dipilih.
            </p>
          ) : (
            data?.map((category) => (
              <Card
                key={category.id}
                className={`${
                  category.has_voted ? 'bg-green-50' : 'bg-red-50'
                }`}
              >
                <CardHeader>
                  <div className="flex items-center gap-2">
                    {category.has_voted ? (
                      <CheckSquare2 size={48} className="text-green-500" />
                    ) : (
                      <XSquare size={48} className="text-red-500" />
                    )}
                    <div className="">
                      <p className="text-xs">
                        {category.has_voted
                          ? 'Anda sudah memilih'
                          : 'Anda belum memilih'}
                      </p>
                      <p className=" font-medium">{category.name}</p>
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
