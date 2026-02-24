type Props = {
  theme: string
  setTheme: React.Dispatch<React.SetStateAction<string>>
}

export default function Nav({ theme, setTheme }: Props) {

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark")
  }

  return (
    <div className="relative flex flex-row justify-center">
      <div className={`absolute  ${theme === "dark" ? " border-black bg-black/20" : " border-white bg-white/20"} backdrop-blur-[5px] lg:border top-10  rounded-[10px] flex flex-row w-[90%] lg:w-[80%] justify-center h-13 items-center`}>

        <div className="h-full w-full flex flex-row items-center">
          <h1 className={`mx-5 font-bold ${theme === "dark" ? "text-white" : "text-black"}`} >Studio Image Editor</h1>
        </div>

        <div className="mx-5 flex items-center">
          <label className="relative inline-flex items-center cursor-pointer scale-80">

            <input
              type="checkbox"
              className="sr-only peer"
              checked={theme === "dark"}
              onChange={toggleTheme}
            />

            <div
              className="w-20 h-10 rounded-full bg-gradient-to-r 
              from-gray-100 to-gray-400 
              peer-checked:from-gray-500 peer-checked:to-gray-900
              transition-all duration-500
              after:content-['☀️'] after:absolute after:top-1 after:left-1 
              after:bg-white/50 after:rounded-full after:h-8 after:w-8 
              after:flex after:items-center after:justify-center 
              after:transition-all after:duration-500 
              peer-checked:after:translate-x-10 
              peer-checked:after:content-['🌙']
              after:shadow-md after:text-lg"
            ></div>

          </label>
        </div>

      </div>
    </div>
  )
}