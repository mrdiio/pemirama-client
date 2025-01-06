'use client'
import { Button } from '@/components/ui/button'
import { uploadImageService } from '@/services/voter.service'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useCallback, useRef, useState } from 'react'
import Webcam from 'react-webcam'
import CheckFoto from '../dashboard/check-foto'

export default function PemiramaCam() {
  const queryClient = useQueryClient()
  const webcamRef = useRef(null)
  const router = useRouter()
  const { data: session, status, update } = useSession()

  const { mutate, isError, isSuccess, isPending } = useMutation({
    mutationFn: uploadImageService,
    onSuccess: () => {
      update({
        foto: 1,
      })

      queryClient.invalidateQueries('check-foto')

      // router.refresh()
      // router.push('/dashboard')

      console.log(session)
    },
    onError: (error) => {
      console.error(error)
    },
  })

  console.log(session?.user)

  const capture = useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot()
    // console.log(imageSrc) // Anda bisa mengirim gambar ini ke backend
    mutate(imageSrc)
  }, [webcamRef, mutate])

  return (
    <div className="flex flex-col items-center gap-4">
      <CheckFoto />

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
    </div>
  )
}
