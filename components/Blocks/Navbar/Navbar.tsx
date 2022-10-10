import { useState } from "react"

const Navbar = () => {
  const [ toggle, setToggle ] = useState(false)

  return (
    <div className="h-16 flex justify-between items-center px-4 md:hidden">
      <div className={`${toggle && "delay-75 rotate-45"}`} onClick={() => setToggle(!toggle)}>
        <span className={`block w-6 h-[1px] rounded-full bg-black mb-[6px] transition-all ${toggle && "delay-[400] translate-y-[7px]"}`}></span>
        <span className={`block w-6 h-[1px] rounded-full bg-black mb-[6px] ${toggle && "w-0"}`}></span>
        <span className={`block w-6 h-[1px] rounded-full bg-black ${toggle && "delay-[400] rotate-90 -translate-y-[7px]"}`}></span>
      </div>
      <h1>INTOUCH</h1>
      <h1>계정</h1>
    </div>
  )
}

export default Navbar