'use client'
import { Button } from '@/components/ui/button'
import { uploadImageService, useCheckFotoQuery } from '@/services/voter.service'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useCallback, useEffect, useRef, useState } from 'react'
import Webcam from 'react-webcam'
import CheckFoto from '../home/check-foto'
import Image from 'next/image'

export default function PemiramaCam() {
  const queryClient = useQueryClient()
  const webcamRef = useRef(null)
  const router = useRouter()
  const { data: session, status, update } = useSession()

  const cekFotoQuery = useCheckFotoQuery()

  const { mutateAsync, isError, isSuccess, isPending } = useMutation({
    mutationFn: uploadImageService,
    onSuccess: async () => {
      await update({
        foto: 1,
      })

      // queryClient.invalidateQueries('check-foto')

      // router.push('/home')
      router.refresh()

      console.log(session)
    },
    onError: (error) => {
      console.error(error)
    },
  })

  // cekFotoQuery.data && console.log(cekFotoQuery.data)

  const [image, setImage] = useState(null)

  const capture = useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot()
    // console.log(imageSrc) // Anda bisa mengirim gambar ini ke backend
    setImage(imageSrc)
    // mutate(imageSrc)
  }, [webcamRef])

  useEffect(() => {
    if (session?.user?.foto !== 1) {
      router.push('/home')
    }
  }, [session, router])

  return (
    <div className="flex flex-col items-center gap-4">
      <CheckFoto />

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
                  mutateAsync(image)
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
