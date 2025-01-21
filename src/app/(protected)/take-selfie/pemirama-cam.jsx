'use client'
import { Button } from '@/components/ui/button'
import { uploadImageService } from '@/services/voter.service'
import { useMutation } from '@tanstack/react-query'
import { useSession } from 'next-auth/react'
import { useCallback, useRef, useState } from 'react'
import Webcam from 'react-webcam'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { Loader2 } from 'lucide-react'

export default function PemiramaCam() {
  const webcamRef = useRef(null)
  const router = useRouter()
  const { update } = useSession()
  const [loading, setLoading] = useState(false)

  const { mutate, isPending } = useMutation({
    mutationFn: uploadImageService,
    onMutate: () => setLoading(true),
    onSuccess: async () => {
      await update({
        isSwafotoExist: true,
      })

      router.refresh()
    },
    onError: (error) => {
      setLoading(false)
    },
  })

  const [image, setImage] = useState(null)

  const capture = useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot()
    setImage(imageSrc)
  }, [webcamRef])

  return (
    <div className="flex flex-col items-center gap-4 ">
      {!image && (
        <>
          <Webcam
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            width={320}
            height={720}
            mirrored={true}
          />
          <Button onClick={capture}>Ambil Gambar</Button>
        </>
      )}

      <div>
        {image && (
          <div className="flex flex-col items-center gap-4">
            <Image src={image} width={320} height={240} alt="voter" />

            <span>Gunakan foto ini?</span>
            <div className="flex gap-2">
              <Button
                onClick={() => {
                  mutate(image)
                }}
                disabled={isPending || loading}
              >
                {(isPending || loading) && (
                  <Loader2 size={16} className="animate-spin" />
                )}
                Ya
              </Button>
              <Button
                variant="destructive"
                onClick={() => {
                  setImage(null)
                }}
                disabled={isPending || loading}
              >
                Tidak, ambil ulang
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
