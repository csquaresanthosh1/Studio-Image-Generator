"use client"

import { useEffect , useRef, useState, type ChangeEvent } from "react"

import Nav from "../Nav"
import Loader from "../Loader"

export default function Page() {
  const [imgInfo, setImgInfo] = useState({ width: 0, height: 0 })
   const [seconds, setSeconds] = useState(0)

   

  const handleImageLoad = (
    e: React.SyntheticEvent<HTMLImageElement>
  ) => {
    const img = e.currentTarget

    setImgInfo({
      width: img.naturalWidth,
      height: img.naturalHeight
    })
  }
  const [theme , setTheme] = useState("dark")
  const [idea, setIdea] = useState("")
  const [images, setImages] = useState<Array<File | null>>([
    null,
    null,
    null
  ])
  const [resultImage, setResultImage] = useState("")
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null

    if (loading) {
      interval = setInterval(() => {
        setSeconds((prev) => prev + 1)
      }, 1000)
    } else {
      setSeconds(0)
    }

    return () => {
      if (interval) clearInterval(interval)
    }
  }, [loading])

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


      <div className="relative h-screen ">

        
        {/* Background blobs */}
        <div className={`absolute fixed  inset-0 -z-10 ${theme === "dark" ? "bg-black" : "bg-white/40"}`}>

          <div style={{animationDuration: "12s",animationDelay: "-4s" }} className="absolute blob scale-50 md:scale-100 w-[500px] h-[500px] bg-blue-500 rounded-full blur-[120px] opacity-30 top-[-200px] left-[-150px]" />
          <div style={{animationDuration: "6s",animationDelay: "-9s" }} className="absolute blob scale-50 md:scale-100 w-[450px] h-[450px] bg-purple-500 rounded-full blur-[120px] opacity-30 top-[10%] left-[60%]" />
          <div style={{animationDuration: "12s",animationDelay: "-5s" }} className="absolute blob scale-50 md:scale-100 w-[400px] h-[400px] bg-pink-500 rounded-full blur-[120px] opacity-30 bottom-[10%] left-[10%]" />
          <div style={{animationDuration: "9s",animationDelay: "-3s" }} className="absolute blob scale-50 md:scale-100 w-[500px] h-[500px] bg-cyan-400 rounded-full blur-[120px] opacity-30 bottom-[-200px] right-[-150px]" />
          <div style={{animationDuration: "5s",animationDelay: "-8s" }} className="absolute blob scale-50 md:scale-100 w-[420px] h-[420px] bg-indigo-500 rounded-full blur-[120px] opacity-30 top-[40%] right-[10%]" />
          <div style={{animationDuration: "11s",animationDelay: "-4s" }} className="absolute blob scale-50 md:scale-100 w-[380px] h-[380px] bg-sky-400 rounded-full blur-[120px] opacity-30 top-[20%] left-[20%]" />
          <div style={{animationDuration: "14s",animationDelay: "-8s" }} className="absolute blob scale-50 md:scale-100 w-[450px] h-[450px] bg-fuchsia-500 rounded-full blur-[120px] opacity-30 top-[60%] left-[50%]" />
          <div style={{animationDuration: "6s",animationDelay: "-3s" }} className="absolute blob scale-50 md:scale-100 w-[350px] h-[350px] bg-blue-400 rounded-full blur-[120px] opacity-30 bottom-[30%] right-[30%]" />
          <div style={{animationDuration: "8s",animationDelay: "-8s" }} className="absolute blob scale-50 md:scale-100 w-[500px] h-[500px] bg-violet-500 rounded-full blur-[120px] opacity-30 top-[-150px] right-[20%]" />
          <div style={{animationDuration: "4s",animationDelay: "-6s" }} className="absolute blob scale-50 md:scale-100 w-[420px] h-[420px] bg-cyan-300 rounded-full blur-[120px] opacity-30 bottom-[5%] left-[35%]" />
          <div style={{animationDuration: "12s",animationDelay: "-3s" }} className="absolute blob scale-50 md:scale-100 w-[480px] h-[480px] bg-indigo-400 rounded-full blur-[120px] opacity-30 top-[25%] right-[45%]" />
          <div style={{animationDuration: "8s",animationDelay: "-8s" }} className="absolute blob scale-50 md:scale-100 w-[350px] h-[350px] bg-purple-400 rounded-full blur-[120px] opacity-30 bottom-[40%] left-[60%]" />
          <div style={{animationDuration: "13s",animationDelay: "-5s" }} className="absolute blob scale-50 md:scale-100 w-[450px] h-[450px] bg-sky-500 rounded-full blur-[120px] opacity-30 top-[70%] right-[5%]" />
          <div style={{animationDuration: "4s",animationDelay: "-2s" }} className="absolute blob scale-50 md:scale-100 w-[420px] h-[420px] bg-pink-400 rounded-full blur-[120px] opacity-30 top-[5%] left-[40%]" />
          <div style={{animationDuration: "6s",animationDelay: "-8s" }} className="absolute blob scale-50 md:scale-100 w-[380px] h-[380px] bg-blue-300 rounded-full blur-[120px] opacity-30 bottom-[60%] right-[15%]" />
          <div style={{animationDuration: "3s",animationDelay: "-6s" }} className="absolute blob scale-50 md:scale-100 w-[500px] h-[500px] bg-violet-400 rounded-full blur-[120px] opacity-30 bottom-[-150px] left-[5%]" />
          <div style={{animationDuration: "8s",animationDelay: "-3s" }} className="absolute blob scale-50 md:scale-100 w-[420px] h-[420px] bg-fuchsia-400 rounded-full blur-[120px] opacity-30 top-[50%] left-[75%]" />
          <div style={{animationDuration: "3s",animationDelay: "-8s" }} className="absolute blob scale-50 md:scale-100 w-[360px] h-[360px] bg-indigo-300 rounded-full blur-[120px] opacity-30 bottom-[20%] right-[55%]" />
          <div style={{animationDuration: "7s",animationDelay: "-6s" }} className="absolute blob scale-50 md:scale-100 w-[470px] h-[470px] bg-cyan-500 rounded-full blur-[120px] opacity-30 top-[35%] left-[5%]" />
          <div style={{animationDuration: "12",animationDelay: "-12s" }} className="absolute blob scale-50 md:scale-100 w-[400px] h-[400px] bg-purple-600 rounded-full blur-[120px] opacity-30 bottom-[10%] right-[40%]" />

        </div>
        <div className=" top-0 left-0 w-full z-50">
          <Nav theme={theme} setTheme={setTheme} />
        </div>

        {/* Content */}
        <div className="relative z-10 mt-16  pt-20 px-[5%] md:px-[10%] w-full pb-6">

          <div className={` rounded-4xl  bg-black/50 
          overflow-hidden h-full
          flex flex-col md:flex-row
          ${theme === "dark" ? "bg-black/20" : "bg-white/30"}
          w-full`}>
            <div className={`
          ${theme === "dark" ? "bg-black/20" : "bg-white/20"}
            flex flex-col
            pb-5 w-full md:w-[40%]`}>
              
              <h1 className={`text-xl md:text-2xl font-bold 
              ${theme === "dark" ? "text-white" : "text-black"}
              mt-6 ml-10`}>
                Setup
              </h1>
              <h1 className={`font-bold text-xs opacity-75
              ${theme === "dark" ? "text-white" : "text-black"}
               ml-10`}>
                Configure visual direction before generating
              </h1>

              <div className="w-full h-full py-5 px-10">
              <div className={`
                w-full h-full
                rounded-4xl
                ${theme === "dark" ? "bg-black/20" : "bg-white/10"}
                `}>

                  <h1 className={`
                    pt-4 pl-6
                    ${theme === "dark" ? "text-white" : "text-black"}
                    `}>
                    Creative Notes
                  </h1>
                  

                  <div className="px-6 py-4">
                    <textarea
                      value={idea}
                      onChange={(e) => setIdea(e.target.value)}
                      placeholder="Describe the image you want..."
                      className={`w-full
                        ${theme === "dark" ? "text-white placeholder-gray-500" : "text-black placeholder-gray-700"}
                      h-30
                      border
                      resize-none
                      rounded-2xl
                      p-4
                      outline-none
                      overflow-y-auto
                      bg-transparent`}
                    />
                  </div>
                
                  <h1 className={`
                    pl-6
                    ${theme === "dark" ? "text-white" : "text-black"}
                    `}>
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
                            ${theme === "dark" ? "text-white" : "text-black"}
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
                <div className="flex justify-center py-6">
                  <button
                  onClick={generate}
                    className="group relative outline-0 [--sz-btn:68px] [--space:calc(var(--sz-btn)/5.5)] [--gen-sz:calc(var(--space)*2)] [--sz-text:calc(var(--sz-btn)-var(--gen-sz))] h-[var(--sz-btn)] w-[50%] border border-solid border-transparent rounded-xl flex items-center justify-center aspect-square cursor-pointer transition-transform duration-200 active:scale-[0.95] bg-purple-500 "
                  >
                    <svg
                      className="animate-pulse absolute z-10 overflow-visible transition-all duration-300 text-purple-200 group-hover:text-purple-200 top-[calc(var(--sz-text)/7)] left-[calc(var(--sz-text)/7)] h-[var(--gen-sz)] w-[var(--gen-sz)] group-hover:h-[var(--sz-text)] group-hover:w-[var(--sz-text)] group-hover:left-[calc(var(--sz-text)/4)] group-hover:top-[calc(calc(var(--gen-sz))/2)]"
                      stroke="none"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M9 4.5a.75.75 0 01.721.544l.813 2.846a3.75 3.75 0 002.576 2.576l2.846.813a.75.75 0 010 1.442l-2.846.813a3.75 3.75 0 00-2.576 2.576l-.813 2.846a.75.75 0 01-1.442 0l-.813-2.846a3.75 3.75 0 00-2.576-2.576l-2.846-.813a.75.75 0 010-1.442l2.846-.813A3.75 3.75 0 007.466 7.89l.813-2.846A.75.75 0 019 4.5zM18 1.5a.75.75 0 01.728.568l.258 1.036c.236.94.97 1.674 1.91 1.91l1.036.258a.75.75 0 010 1.456l-1.036.258c-.94.236-1.674.97-1.91 1.91l-.258 1.036a.75.75 0 01-1.456 0l-.258-1.036a2.625 2.625 0 00-1.91-1.91l-1.036-.258a.75.75 0 010-1.456l1.036-.258a2.625 2.625 0 001.91-1.91l.258-1.036A.75.75 0 0118 1.5zM16.5 15a.75.75 0 01.712.513l.394 1.183c.15.447.5.799.948.948l1.183.395a.75.75 0 010 1.422l-1.183.395c-.447.15-.799.5-.948.948l-.395 1.183a.75.75 0 01-1.422 0l-.395-1.183a1.5 1.5 0 00-.948-.948l-1.183-.395a.75.75 0 010-1.422l1.183-.395c.447-.15.799-.5.948-.948l.395-1.183A.75.75 0 0116.5 15z"
                      ></path>
                    </svg>
                    <span
                    className="font-extrabold text-2xl leading-none text-white transition-all duration-200 group-hover:translate-x-2 group-hover:scale-90"
                  >
                    Generate
                  </span>
                  </button>
                </div>
                                    



              </div>

              </div>
              
 
            </div>
            <div className=" w-full  md:w-[60%] p-5 md:p-10">
              <div className={`
                w-full
                h-full
                rounded-2xl
                
                ${theme === "dark" ? "bg-black/20" : "bg-white/20"}
                backdrop-blur-xl
                p-6 md:p-10
              `}>
                <div className={`w-full
                  h-full
                  rounded-2xl relative
                  ${theme === "dark" ? "bg-black/20" : "bg-white/20"}
                  flex
                  items-center
                  justify-center
                  min-h-60
                  p-5
                  text-center`}>

                            <div>

                              {/* Loading */}
                              {loading && (
                                <div className="flex flex-col justify-center">
                                  <Loader lod={loading} />
                                    <p className="text-sm absolute bottom-10 right-10  opacity-70">
                                       {seconds}s
                                    </p>
                                </div>
                              )}
                              {/* Generated  */}
                              {!loading && resultImage && (
                                <div className="mt-6 text-center space-y-4">

                                  <img
                                    src={resultImage}
                                    onLoad={handleImageLoad}
                                    className="w-[500px] max-w-full rounded shadow mx-auto"
                                  />

                                  {/* Download Button */}
                                  <a
                                    href={resultImage}
                                    download="generated-image.png"
                                    className="inline-block px-5 py-2  transition hover:scale-105"
                                  >
                                    <button
                                      className="cursor-pointer group/download relative flex gap-1 px-8 py-4 bg-[#5c5fe9] text-[#f1f1f1] rounded-xl hover:bg-opacity-70 font-semibold shadow-xl active:shadow-inner transition-all duration-300"
                                    >
                                      <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        height="24px"
                                        width="24px"
                                      >
                                        <g stroke-width="0" id="SVGRepo_bgCarrier"></g>
                                        <g
                                          stroke-linejoin="round"
                                          stroke-linecap="round"
                                          id="SVGRepo_tracerCarrier"
                                        ></g>
                                        <g id="SVGRepo_iconCarrier">
                                          <g id="Interface / Download">
                                            <path
                                              stroke-linejoin="round"
                                              stroke-linecap="round"
                                              stroke-width="2"
                                              stroke="#f1f1f1"
                                              d="M6 21H18M12 3V17M12 17L17 12M12 17L7 12"
                                              id="Vector"
                                            ></path>
                                          </g>
                                        </g>
                                      </svg>
                                      Download
                                      <div
                                        className="absolute text-xs uppercase scale-0 rounded-md py-2 px-2 bg-[#5c5fe9] left-2/4 mb-3 bottom-full group-hover/download:scale-100 origin-bottom transition-all duration-300 shadow-lg before:content-[''] before:absolute before:top-full before:left-2/4 before:w-3 before:h-3 before:border-solid before:bg-[#5c5fe9] before:rotate-45 before:-translate-y-2/4 before:-translate-x-2/4"
                                      >
                                        {imgInfo.width} × {imgInfo.height}
                                      </div>
                                    </button>
                                  </a>

                                </div>
                              )}

                              {/* Default */}
                              {!loading && !resultImage && (
                                <div className={`${theme === "dark" ? "text-white" : "text-black"}`}>
                                  <h1 className="md:text-xl font-bold">
                                    Studio Workspace Ready
                                  </h1>

                                  <p className="text-xs md:text-base opacity-70">
                                    Generated Image will display here...
                                  </p>
                                </div>
                              )}

                            </div>
                </div>
              </div>
            </div>
            
          </div>
        </div>

      </div>
      


   
  )
}