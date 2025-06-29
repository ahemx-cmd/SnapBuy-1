import { useState } from 'react'
import Head from 'next/head'
import { AnimatePresence, motion } from 'framer-motion'
import { uploadImageToStorage, analyzeImage } from '@/lib/imageProcessor'
import { searchProduct } from '@/lib/productSearch'

export default function Home() {
  const [image, setImage] = useState(null)
  const [loading, setLoading] = useState(false)
  const [results, setResults] = useState([])
  const [error, setError] = useState('')

  const handleImage = async (e: any) => {
    const file = e.target.files[0]
    if (!file) return
    setLoading(true)
    setError('')
    setResults([])

    try {
      const base64 = await uploadImageToStorage(file)
      const productName = await analyzeImage(base64)
      const searchResults = await searchProduct(productName)
      setResults(searchResults)
    } catch (err) {
      console.error(err)
      setError('Failed to identify product. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <Head>
        <title>SnapBuy</title>
      </Head>
      <main className="min-h-screen bg-[#121212] text-white flex flex-col items-center justify-center p-6">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
          <img src="/logo.png" alt="SnapBuy Logo" className="w-24 h-24 mb-4" />
          <h1 className="text-3xl font-bold mb-2">Snap. Discover. Buy.</h1>
          <p className="text-sm text-gray-400 mb-4">Take or upload a photo to find the exact product online.</p>
        </motion.div>

        <input type="file" accept="image/*" onChange={handleImage} className="mb-6" />

        {loading && <p className="text-gray-400">Analyzing image...</p>}
        {error && <p className="text-red-500">{error}</p>}
        {results.length > 0 && (
          <div className="grid grid-cols-1 gap-4 mt-6 w-full max-w-md">
            {results.map((item, idx) => (
              <a key={idx} href={item.link} target="_blank" rel="noopener noreferrer" className="block bg-white text-black p-4 rounded shadow">
                <p className="font-semibold">{item.title}</p>
                <p className="text-sm">{item.price}</p>
              </a>
            ))}
          </div>
        )}
      </main>
    </>
  )
  }
