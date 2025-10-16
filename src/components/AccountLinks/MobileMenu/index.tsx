"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import { GiHamburgerMenu } from "react-icons/gi"
import { IoIosCloseCircle } from "react-icons/io"
import { SignOutButton } from "../SignOutButton"

interface MobileMenuProps {
  user: any
}

export const MobileMenu = ({ user }: MobileMenuProps) => {
  const [open, setOpen] = useState(false)

  // Disable background scroll when menu is open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "auto"
    return () => {
      document.body.style.overflow = "auto"
    }
  }, [open])

  return (
    <>
      <button onClick={() => setOpen(!open)} className="p-2 rounded-lg  bg-gray-900/90 backdrop-blur-md shadow-lg border border-gray-700 transition"
        aria-label="Toggle menu" >
        {open ? <IoIosCloseCircle size={24} /> : <GiHamburgerMenu size={24} color="white" />}
      </button>

      <AnimatePresence>
        {open && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.4 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black backdrop-blur-sm z-40"
              onClick={() => setOpen(false)}
            />

            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 200, damping: 25 }}
              className="fixed top-0 right-0 h-[30%] w-3/4 mt-21 vmax-w-sm bg-white z-50 shadow-xl flex flex-col justify-between"  >

              <div className="flex justify-between items-center p-4 border-b border-gray-200">
                <h2 className="text-2xl font-semibold text-gray-800">Menu</h2>

              </div>

              <div className="flex flex-col p-2 gap-1">
                {user ? (
                  <>
                    <Link href="/create" onClick={() => setOpen(false)} className="px-5 py-2 rounded-xl text-sm w-fit font-semibold text-white bg-gradient-to-r from-cyan-600 to-cyan-800 hover:from-cyan-700 hover:to-cyan-900 transition-all duration-300 shadow-md hover:shadow-lg focus:ring-2 focus:ring-cyan-400 focus:outline-none" >
                      Create Post
                    </Link>
                    <div className="border-t border-gray-100 my-2" />
                    <div className="px-5 py-2 w-fit hover:bg-cyan-50 rounded-lg transition" onClick={() => setOpen(false)} >
                      <SignOutButton />
                    </div>
                  </>
                ) : (
                  <Link href="/auth/login" onClick={() => setOpen(false)} className="block px-4 py-3 rounded-lg text-gray-800 font-medium hover:bg-cyan-50 transition" >
                    Login
                  </Link>
                )}
              </div>

              <div className="p-4 text-sm text-gray-500 text-center border-t border-gray-200">
                © {new Date().getFullYear()} Global Tales
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
