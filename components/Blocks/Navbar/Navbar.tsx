import React, { useState } from "react"
import { motion } from "framer-motion"


const Navbar = () => {
  const [ isOpen, setIsOpen ] = useState(false)

  const variants = {
    open: { 
      opacity: 1, 
      x: 0, 
      transition: {
        type: "spring",
        stiffness: 20,
        restDelta: 1
      } 
    },
    closed: { 
      opacity: 0, 
      x: "-100%", 
      transition: {
        delay: 0.5,
        type: "spring",
        stiffness: 400,
        damping: 40
      }
    },
  }

  return (
    <>
      <div className="h-16 flex justify-between items-center px-4 md:hidden">
        <div className={`${isOpen && "delay-75 rotate-45"}`} onClick={() => setIsOpen(!isOpen)}>
          <span className={`block w-6 h-[1px] rounded-full bg-black mb-[6px] transition-all ${isOpen && "delay-[400] translate-y-[7px]"}`}></span>
          <span className={`block w-6 h-[1px] rounded-full bg-black mb-[6px] ${isOpen && "w-0"}`}></span>
          <span className={`block w-6 h-[1px] rounded-full bg-black ${isOpen && "delay-[400] rotate-90 -translate-y-[7px]"}`}></span>
        </div>
        <h1>INTOUCH</h1>
        <h1>계정</h1>
      </div>
      <motion.div 
        className={`h-full w-full absolute top-16 left-0 bg-black z-[2000] flex md:hidden`}
        variants={variants}
        animate={isOpen ? "open" : "closed"}
      >
        <h1>화면</h1>
      </motion.div>
    </>
  )
}

export default Navbar