"use client"

import { useState } from "react"
import Nav from "./Nav"

export default function Page() {

  const [theme , setTheme] = useState("dark")
  const [idea, setIdea] = useState("")
  const [images, setImages] = useState<File[]>([])
  const [resultImage, setResultImage] = useState("")
  const [loading, setLoading] = useState(false)

  const handleFiles = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return

    const files = Array.from(e.target.files).slice(0, 3)
    setImages(files)
  }

  const toBase64 = (file: File): Promise<string> =>
    new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = () => {
        const base64 = (reader.result as string).split(",")[1]
        resolve(base64)
      }
      reader.onerror = reject
    })

  const generate = async () => {

    setLoading(true)

    const base64Images = await Promise.all(
      images.map(img => toBase64(img))
    )

    const res = await fetch("/api/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        idea,
        images: base64Images
      })
    })

    const data = await res.json()

    setResultImage(data.image)
    setLoading(false)
  }

  return (
    <div className={`${theme === "dark" ? "bg-black" : "bg-blue-50"}`}>
      <Nav theme={theme} setTheme={setTheme} />
      <div className={`h-screen hidden  ${theme === "dark" ? "bg-black" : "bg-white"} mt-16 flex flex-col lg:flex-row`}>
        <div className="w-full flex  justify-center items-center p-5">
            <div className=" w-full h-full border-2 rounded-xl flex justify-center items-center">
                hi
            </div>
        </div>
        <div className="bg-blue-500 w-full">
            hello
        </div>

      </div>

    <div className={`min-h-screen flex flex-col mt-16   items-center gap-6 p-10`}>

      <h1 className={`text-3xl font-bold ${theme === "dark" ? "text-white" : "text-black"}`}>
        AI Art Director
      </h1>

      {/* Prompt */}
      <input
        value={idea}
        onChange={(e) => setIdea(e.target.value)}
        placeholder="Describe the image you want..."
        className={`border p-3 rounded w-96 ${theme === "dark" ? "bg-black border-white text-white" : "bg-black/5 border-black text-black"}`}
      />

      {/* Upload */}
      <input
        type="file"
        accept="image/*"
        multiple
        onChange={handleFiles}
        className={`border p-2 rounded ${theme === "dark" ? "bg-black border-white text-white" : "bg-black/5 border-black text-black"}`}
      />

      <p className={` text-sm opacity-60 ${theme === "dark" ? "text-white" : "text-black"}`}>
        Upload up to 3 reference images
      </p>

      {/* Reference preview */}
      <div className="flex gap-3">
        {images.map((img, i) => (
          <img
            key={i}
            src={URL.createObjectURL(img)}
            className="w-64  object-cover rounded"
          />
        ))}
      </div>

      {/* Generate */}
      <button
        onClick={generate}
        className={` border-1 px-6 py-2 rounded ${theme === "dark" ? "bg-black border-white text-white" : "bg-black/5 border-black text-black"}`}
      >
        {loading ? "Generating..." : "Generate"}
      </button>

      {/* Result Image */}
      {resultImage && (
        <div className="mt-6">
          <h2 className={` mb-2 font-semibold ${theme === "dark" ? "text-white" : "text-black"}`}>Generated Image</h2>
          <img
            src={resultImage}
            className="w-[500px] rounded shadow"
          />
        </div>
      )}

    </div>
    </div>
  )
}