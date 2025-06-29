export async function uploadImageToStorage(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => {
      const base64 = reader.result?.toString().split(',')[1]
      if (base64) resolve(base64)
      else reject("Failed to read image")
    }
    reader.onerror = () => reject("Image upload error")
    reader.readAsDataURL(file)
  })
}

export async function analyzeImage(base64: string): Promise<string> {
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_VISION_API_KEY
  const res = await fetch(`https://vision.googleapis.com/v1/images:annotate?key=${apiKey}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      requests: [{
        image: { content: base64 },
        features: [{ type: "LABEL_DETECTION", maxResults: 5 }]
      }]
    })
  })

  const data = await res.json()
  const labels = data.responses?.[0]?.labelAnnotations
  return labels?.[0]?.description || "product"
}
