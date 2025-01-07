import { Settings } from 'lucide-react'

export default function ProtectedLayout({ children }) {
  return (
    <div className="flex min-h-screen w-full flex-col justify-center ">
      <div className="w-full mx-auto flex-1 bg-gray-100 ">
        <div className="w-full bg-primary h-14">
          {/* Header */}
          <div className="max-w-4xl mx-auto h-full flex justify-between items-center px-4">
            <div className="flex-1">
              <span className="text-2xl uppercase font-semibold tracking-wide">
                Pemirama
              </span>
            </div>
            <div>
              <Settings size={24} />
            </div>
          </div>
        </div>
        <div className="max-w-4xl mx-auto flex flex-grow justify-center flex-col gap-1 bg-gray-300">
          {children}
        </div>
      </div>
    </div>
  )
}
