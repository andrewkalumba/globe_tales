import Link from "next/link";
import { FaFacebook, FaInstagram, FaLinkedin, FaYoutube } from "react-icons/fa";
import { MdEmail, MdLocationOn } from "react-icons/md";

const Footer = () => {
    return (
        <footer className="text-white">
            <div className="bg-gradient-to-r from-black via-blue-400 to-black">
                <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-10 p-5">

                    <div className="flex flex-col space-y-3">
                        <h3 className="text-xl font-semibold text-white mb-2">Contact</h3>
                        <p className="flex items-center gap-2">
                            <MdEmail size={20} />
                            <a href="mailto:andrewkalumba29@gmail.com" className="hover:underline">
                                andrewkalumba29@gmail.com
                            </a>
                        </p>
                        <p className="flex items-center gap-2">
                            <MdLocationOn size={20} />
                            Stockholm, Hammarby
                        </p>
                    </div>

                    <div className="hidden md:block"></div>

                    <div className="flex flex-col space-y-3">
                        <h3 className="text-xl font-semibold text-white mb-2">Follow Us</h3>
                        <div className="flex items-center gap-5 mt-1">
                            <Link href="https://www.facebook.com/" target="_blank" rel="noreferrer" className="hover:text-white transition-colors duration-200">
                                <FaFacebook size={24} />
                            </Link>
                            <Link href="https://www.instagram.com/reels/DGZoAiNTGa4/" target="_blank" rel="noreferrer" className="hover:text-white transition-colors duration-200">
                                <FaInstagram size={24} />
                            </Link>
                            <Link href="https://www.linkedin.com/in/andrew-julius-kalumba-82b02b348/" target="_blank" rel="noreferrer" className="hover:text-white transition-colors duration-200">
                                <FaLinkedin size={24} />
                            </Link>
                            <Link href="https://www.youtube.com/" target="_blank" rel="noreferrer" className="hover:text-white transition-colors duration-200">
                                <FaYoutube size={24} />
                            </Link>
                        </div>
                    </div>
                </div>
                 <div className="border-t border-gray-700 p-6 text-center text-[16px]">
                <p>© {new Date().getFullYear()} Next.js + Supabase + Tailwind</p>
            </div>
            </div>
           
        </footer>
    );
}

export default Footer