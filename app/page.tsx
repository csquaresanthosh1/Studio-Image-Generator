"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"

export default function Home() {

  const router = useRouter()

  // Soft entry delay for environment transition
  useEffect(() => {
    const t = setTimeout(() => {
      router.replace("/studio")
    }, 3000)
    return () => clearTimeout(t)
  }, [router])

  return (

      <div className="relative h-screen overflow-hidden">
      
              {/* Background blobs */}
              <div className={`absolute  inset-0 -z-10 bg-black`}>
      
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
      
              {/* Content */}
              <div className="relative z-10 mt-16  pt-20 px-[5%] md:px-[10%] w-full flex justify-center items-center">
      
                Entering Studio...

              </div>
      
            </div>

  )
}