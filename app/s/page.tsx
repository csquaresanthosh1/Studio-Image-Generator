"use client"

import { useRef, useState, type ChangeEvent } from "react"

import Nav from "../Nav"
import Loader from "../Loader"

export default function Page() {

  const [theme , setTheme] = useState("dark")
  const [idea, setIdea] = useState("")
  const [images, setImages] = useState<Array<File | null>>([
    null,
    null,
    null
  ])
  const [resultImage, setResultImage] = useState("")
  const [loading, setLoading] = useState(false)

  const inputs = [
    useRef<HTMLInputElement | null>(null),
    useRef<HTMLInputElement | null>(null),
    useRef<HTMLInputElement | null>(null)
  ]

    function handleFile(
  e: ChangeEvent<HTMLInputElement>,
  index: number
) {
  const file = e.target.files?.[0]
  if (!file) return

  const newImages = [...images]
  newImages[index] = file
  setImages(newImages)
}

  function openPicker(index: number) {
    if (index === 0 || images[index - 1] !== null) {
      inputs[index].current?.click()
    }
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
    const validImages = images.filter(
      (img): img is File => img !== null
    )

    if (!idea && validImages.length === 0) return

    setLoading(true)

    try {
      const base64Images = await Promise.all(
        validImages.map((img) => toBase64(img))
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
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  return (

    <div className="relative min-h-screen overflow-hidden">

      <Nav theme={theme} setTheme={setTheme} />

      {/* Background */}
      <div className={`absolute inset-0 -z-10 ${theme === "dark" ? "bg-black" : "bg-white/40"}`} />

      {/* Content */}
      <div className="relative z-10 mt-16 pt-20 px-[5%] md:px-[10%] w-full">

        <div className={`rounded-4xl overflow-hidden flex flex-col
        ${theme === "dark" ? "bg-black/20" : "bg-white/30"}
        w-full`}>

          <div className={`flex flex-col
          ${theme === "dark" ? "bg-black/20" : "bg-white/20"}
          w-full md:w-[40%]`}>

            <h1 className="text-xl md:text-2xl font-bold mt-6 ml-10">
              Setup
            </h1>

            <h1 className="font-bold text-xs opacity-75 ml-10">
              Configure visual direction before generating
            </h1>

            <div className="w-full py-5 px-10">

              <div className={`w-full rounded-4xl
              ${theme === "dark" ? "bg-black/20" : "bg-white/10"}`}>

                {/* Creative Notes */}
                <h1 className="pt-4 pl-6">
                  Creative Notes
                </h1>

                <div className="px-6 py-4">
                  <textarea
                    value={idea}
                    onChange={(e) => setIdea(e.target.value)}
                    placeholder="Describe the image you want..."
                    className="
                    w-full
                    h-32
                    border
                    resize-none
                    rounded-2xl
                    p-4
                    outline-none
                    overflow-y-auto
                    bg-transparent
                    "
                  />
                </div>

                {/* Reference Images */}
                <h1 className="pl-6">
                  Reference Images
                </h1>

                <div className="px-6 py-4 flex flex-col md:flex-row gap-3 md:gap-6 justify-center flex-wrap">

                  {[0,1,2].map((i) => {

                    const enabled = i === 0 || images[i-1]

                    return (
                      <div key={i} className="relative md:w-[40%]">

                        <input
                          ref={inputs[i]}
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={(e)=>handleFile(e,i)}
                        />

                        <div
                          onClick={()=> enabled && openPicker(i)}
                          className={`
                          border
                          h-[120px]
                          rounded-2xl
                          flex
                          justify-center
                          items-center
                          text-4xl
                          cursor-pointer
                          transition
                          overflow-hidden
                          ${enabled ? "hover:scale-105" : "opacity-40 cursor-not-allowed"}
                          `}
                        >

                          {images[i] ? (
                            <img
                              src={URL.createObjectURL(images[i])}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            "+"
                          )}

                        </div>

                      </div>
                    )
                  })}

                </div>

                {/* Generate */}
                <div className="px-6 pb-6">

                  <button
                    onClick={generate}
                    className="w-full border py-2 rounded-xl hover:scale-[1.02] transition"
                  >
                    {loading ? "Generating..." : "Generate"}
                  </button>

                  <div className="mt-4 flex justify-center">
                    <Loader lod={loading} />
                  </div>

                </div>

              </div>

            </div>

          </div>

        </div>

        {/* Result */}
        {resultImage && (
          <div className="mt-10 flex justify-center">
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