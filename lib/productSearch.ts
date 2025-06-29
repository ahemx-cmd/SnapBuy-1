export async function searchProduct(query: string): Promise<any[]> {
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_SEARCH_API_KEY
  const cx = process.env.NEXT_PUBLIC_GOOGLE_SEARCH_ENGINE_ID

  const res = await fetch(
    `https://www.googleapis.com/customsearch/v1?key=${apiKey}&cx=${cx}&q=${encodeURIComponent(query)}`
  )

  const data = await res.json()

  return data.items?.map(item => ({
    title: item.title,
    link: item.link,
    price: item.snippet
  })) || []
}
