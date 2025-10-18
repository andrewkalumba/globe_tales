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

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "auto"
    return () => {
      document.body.style.overflow = "auto"
    }
  }, [open])

  return (
    <>
      <button
        onClick={() => setOpen(!open)}
        className="p-2 rounded-lg bg-gray-900/90 backdrop-blur-md shadow-lg border border-gray-700/50 transition"
        aria-label="Toggle menu"
      >
        {open ? <IoIosCloseCircle size={24} /> : <GiHamburgerMenu size={24} color="white" />}
      </button>

      <AnimatePresence>
        {open && (
          <>
            <motion.div
              initial={{ opacity: 0.9 }}
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
              className="fixed top-0 right-0 h-[30%] w-4/5 max-w-sm bg-white z-50 shadow-xl flex flex-col justify-between rounded-bl-3xl border-l border-gray-300/40"
            >
              <button onClick={() => setOpen(false)} className="absolute top-3 right-3 text-gray-700 hover:text-gray-900 transition" aria-label="Close menu" >
                <IoIosCloseCircle size={26} />
              </button>

              <div className="flex justify-between items-center p-4 border-b border-gray-200/40">
                <h2 className="text-2xl font-semibold text-gray-800">Menu</h2>
              </div>

              <div className="flex flex-col p-4 gap-3 items-end text-right">
                {user ? (
                  <>
                    <Link
                      href="/create"
                      onClick={() => setOpen(false)}
                      className="px-5 py-2 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-cyan-600 to-cyan-800 hover:from-cyan-700 hover:to-cyan-900 transition-all duration-300 shadow-md hover:shadow-lg focus:ring-2 focus:ring-cyan-400 focus:outline-none"
                    >
                      Create Post
                    </Link>
                    <div className="border-t border-gray-200/40 my-1 w-full" />
                    <div onClick={() => setOpen(false)}>
                      <SignOutButton />
                    </div>
                  </>
                ) : (
                  <Link href="/auth/login" onClick={() => setOpen(false)} className="block px-4 py-3 rounded-lg text-gray-900 font-medium hover:bg-cyan-50 transition  bg-gradient-to-r from-[#767B91] via-[#C7CCDB] to-[#E1E5EE]"  >
                    Login
                  </Link>
                )}
              </div>

              <div className="p-4 text-sm text-gray-700 text-center border-t border-gray-200/40">
                © {new Date().getFullYear()} Global Tales
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
