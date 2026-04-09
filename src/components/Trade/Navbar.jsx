
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSelector , useDispatch} from "react-redux";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "sonner";
import { logout } from "@/store/reducer/authReducer";
import { CLIENT_LOGIN, CLIENT_REGISTER } from "@/routes/websitePanelRoute";
import { useState } from "react";
import { IoMdClose } from "react-icons/io";
import { CiMenuBurger } from "react-icons/ci";


export default function Navbar() {

  const { user, isAuthenticated } = useSelector(
  (state) => state.authStore
);

    const pathname = usePathname();

  const dispatch = useDispatch()
    const router = useRouter();
    
    const [menuOpen, setMenuOpen] = useState(false)

const handleLogout = async () => {
  try {
    const response = await axios.post("/api/auth/logout");

    dispatch(logout());

    toast.success(response.data.message);
    router.replace(CLIENT_LOGIN);

  } catch (error) {
    toast.error("Logout failed");
  }
};

  const linkClass = (path) =>
    `transition ${
      pathname === path
        ? "text-blue-600 font-semibold"
        : "text-gray-600 hover:text-black"
    }`;
  return (
//   
    <header className="sticky top-0 z-50 bg-white/70 backdrop-blur-md border-b shadow-sm">
      <div className="max-w-6xl mx-auto px-5 py-3 flex justify-between items-center">
        
        {/* Logo */}
        <Link href="/">
          <h1 className="text-xl font-bold tracking-tight cursor-pointer">
            📊 <span className="text-blue-600">Trade</span>Track
          </h1>
        </Link>

        {/* Hamburger */}
        <button
          className="md:hidden text-gray-700 focus:outline-none z-50"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <IoMdClose size={24}/> : <CiMenuBurger size={22}/>}
        </button>

        {/* Nav Links */}
        <nav
          className={`${
            menuOpen ? "flex" : "hidden"
          } md:flex flex-col md:flex-row absolute md:static top-14 left-0 w-full md:w-auto bg-white md:bg-transparent border-t md:border-none md:items-center gap-6 text-sm text-gray-600 px-5 py-4 md:py-0 transition-all`}
        >
          <Link href="/">Home</Link>
          <Link href="/dashboard">Dashboard</Link>
          <Link href="/analytics">Analytics</Link>
          <Link href="/history">History</Link>
        </nav>

        {/* Right Section */}
        <div
          className={`${
            menuOpen ? "flex flex-col gap-3 mt-4" : "hidden"
          } md:flex items-center gap-5`}
        >
          {isAuthenticated ? (
            <>
              <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm">
                {user?.name?.charAt(0)}
              </div>
              <span className="text-sm font-medium text-gray-700">
                Hi, {user?.name}
              </span>
              <button
                onClick={handleLogout}
                className="px-3 py-1.5 rounded-lg bg-red-500 text-white text-sm hover:bg-red-600"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link href="/login">
                <button className="px-3 py-1.5 rounded-lg bg-gray-200 hover:bg-gray-300 text-sm">
                  Login
                </button>
              </Link>
              <Link href="/register">
                <button className="px-3 py-1.5 rounded-lg bg-blue-600 text-white text-sm hover:bg-blue-700">
                  Signup
                </button>
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  
  );
}
