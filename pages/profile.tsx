import { useUser } from '@/lib/useUser'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

export default function ProfilePage() {
  const { user, supabase } = useUser()
  const router = useRouter()

  useEffect(() => {
    if (!user) router.push('/login')
  }, [user])

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push('/login')
  }

  if (!user) return null

  return (
    <main className="min-h-screen bg-[#121212] text-white flex flex-col items-center justify-center p-6">
      <h1 className="text-3xl font-bold mb-4">Your Profile</h1>
      <p className="text-gray-400 mb-4">Logged in as: {user.email}</p>
      <button
        onClick={handleLogout}
        className="bg-white text-black px-4 py-2 rounded hover:bg-gray-200"
      >
        Log Out
      </button>
    </main>
  )
}
