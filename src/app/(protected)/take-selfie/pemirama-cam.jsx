'use client'
import { Button } from '@/components/ui/button'
import { uploadImageService } from '@/services/voter.service'
import { useMutation } from '@tanstack/react-query'
import { useSession } from 'next-auth/react'
import { useCallback, useRef, useState } from 'react'
import Webcam from 'react-webcam'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

export default function PemiramaCam() {
  const webcamRef = useRef(null)
  const router = useRouter()
  const { update } = useSession()

  const { mutate, isError, isSuccess, isPending } = useMutation({
    mutationFn: uploadImageService,
    onSuccess: async () => {
      await update({
        isSwafotoExist: true,
      })

      router.refresh()
    },
    onError: (error) => {
      console.error(error)
    },
  })

  const [image, setImage] = useState(null)

  const capture = useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot()
    setImage(imageSrc)
  }, [webcamRef])

  return (
    <div className="flex flex-col items-center gap-4">
      {!image && (
        <>
          <Webcam
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            width={320}
            height={720}
            mirrored={true}
          />
          <Button onClick={capture}>Capture</Button>
          {isError && <p>Error</p>}
          {isSuccess && <p>Success</p>}
          {isPending && <p>Loading...</p>}
        </>
      )}

      <div>
        {image && (
          <>
            <Image src={image} width={320} height={240} alt="voter" />

            <span>pakai foto ini?</span>
            <div>
              <Button
                onClick={() => {
                  mutate(image)
                }}
              >
                Ya
              </Button>
              <Button
                onClick={() => {
                  setImage(null)
                }}
              >
                Tidak, ambil ulang
              </Button>
            </div>
          </>
        )}
      </div>

      {/* <div>
        {cekFotoQuery.data && cekFotoQuery.data.fotoUrl !== null && (
          <Image
            src={cekFotoQuery?.data?.fotoUrl}
            width={320}
            height={240}
            alt="voter"
            priority
          />
        )}
      </div> */}
    </div>
  )
}
