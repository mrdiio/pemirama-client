export default function ProtectedLayout({ children }) {
  return (
    <div className="flex min-h-screen w-full flex-col justify-center">
      <div className="w-full mx-auto p-4 flex-1">
        <div className="max-w-4xl mx-auto flex flex-1 justify-center flex-col gap-1 p-4">
          {children}
        </div>
      </div>
    </div>
  )
}
