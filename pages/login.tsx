import { useState } from 'react'
import { useRouter } from 'next/router'
import { useUser } from '@/lib/useUser'

export default function LoginPage() {
  const { user, supabase } = useUser()
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  if (user) router.push('/')

  const handleLogin = async () => {
    setError('')
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) setError(error.message)
  }

  const handleSignup = async () => {
    setError('')
    const { error } = await supabase.auth.signUp({ email, password })
    if (error) setError(error.message)
  }

  const loginWithGoogle = async () => {
    await supabase.auth.signInWithOAuth({ provider: 'google' })
  }

  return (
    <main className="bg-[#121212] text-white min-h-screen flex flex-col items-center justify-center p-6">
      <h1 className="text-3xl font-bold mb-6">Welcome to SnapBuy</h1>
      
      <input
        type="email"
        placeholder="Email"
        className="bg-gray-800 rounded p-2 mb-2 w-full max-w-sm"
        value={email}
        onChange={e => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        className="bg-gray-800 rounded p-2 mb-4 w-full max-w-sm"
        value={password}
        onChange={e => setPassword(e.target.value)}
      />

      {error && <p className="text-red-500 mb-2">{error}</p>}

      <div className="flex gap-4 mb-4">
        <button onClick={handleLogin} className="bg-white text-black px-4 py-2 rounded">Log In</button>
        <button onClick={handleSignup} className="bg-gray-700 px-4 py-2 rounded">Sign Up</button>
      </div>

      <button onClick={loginWithGoogle} className="bg-blue-600 px-4 py-2 rounded">Continue with Google</button>
    </main>
  )
}
