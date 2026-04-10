
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSelector , useDispatch} from "react-redux";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "sonner";
import { logout } from "@/store/reducer/authReducer";
import { CLIENT_LOGIN, CLIENT_REGISTER } from "@/routes/websitePanelRoute";
import { useEffect, useState } from "react";
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


     useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuOpen && !event.target.closest('.mobile-menu-container')) {
        setMenuOpen(false);
      }
    };
        document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [menuOpen]);

    useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [menuOpen]);

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
  
    // <header className="sticky top-0 z-50 bg-white/70 backdrop-blur-md border-b shadow-sm">
    //   <div className="max-w-6xl mx-auto px-5 py-3 flex justify-between items-center">
        
    //     {/* Logo */}
    //     <Link href="/">
    //       <h1 className="text-xl font-bold tracking-tight cursor-pointer">
    //         📊 <span className="text-blue-600">Trade</span>Track
    //       </h1>
    //     </Link>

    //     {/* Hamburger */}
    //     <button
    //       className="md:hidden text-gray-700 focus:outline-none z-50"
    //       onClick={() => setMenuOpen(!menuOpen)}
    //     >
    //       {menuOpen ? <IoMdClose size={24}/> : <CiMenuBurger size={22}/>}
    //     </button>

    //     {/* Nav Links */}
    //     <nav
    //       className={`${
    //         menuOpen ? "flex" : "hidden"
    //       } md:flex flex-col md:flex-row absolute md:static top-14 left-0 w-full md:w-auto bg-white md:bg-transparent border-t md:border-none md:items-center gap-6 text-sm text-gray-600 px-5 py-4 md:py-0 transition-all`}
    //     >
    //       <Link href="/">Home</Link>
    //       <Link href="/dashboard">Dashboard</Link>
    //       <Link href="/analytics">Analytics</Link>
    //       <Link href="/history">History</Link>
    //     </nav>

    //     {/* Right Section */}
    //     <div
    //       className={`${
    //         menuOpen ? "flex flex-col gap-3 mt-4" : "hidden"
    //       } md:flex items-center gap-5`}
    //     >
    //       {isAuthenticated ? (
    //         <>
    //           <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm">
    //             {user?.name?.charAt(0)}
    //           </div>
    //           <span className="text-sm font-medium text-gray-700">
    //             Hi, {user?.name}
    //           </span>
    //           <button
    //             onClick={handleLogout}
    //             className="px-3 py-1.5 rounded-lg bg-red-500 text-white text-sm hover:bg-red-600"
    //           >
    //             Logout
    //           </button>
    //         </>
    //       ) : (
    //         <>
    //           <Link href={CLIENT_LOGIN}>
    //             <button className="px-3 py-1.5 rounded-lg bg-gray-200 hover:bg-gray-300 text-sm">
    //               Login
    //             </button>
    //           </Link>
    //           <Link href={CLIENT_REGISTER}>
    //             <button className="px-3 py-1.5 rounded-lg bg-blue-600 text-white text-sm hover:bg-blue-700">
    //               Signup
    //             </button>
    //           </Link>
    //         </>
    //       )}
    //     </div>
    //   </div>
    // </header>
  <header className="sticky top-0 z-50 bg-white/70 backdrop-blur-md border-b shadow-sm">
      <div className="max-w-6xl mx-auto px-5 py-3 flex justify-between items-center">
        
        {/* Logo */}
        <Link href="/">
          <h1 className="text-xl font-bold tracking-tight cursor-pointer hover:opacity-80 transition-opacity">
            📊 <span className="text-blue-600">Trade</span>Track
          </h1>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6 text-sm text-gray-600">
          <Link href="/" className="hover:text-blue-600 transition-colors">Home</Link>
          <Link href="/dashboard" className="hover:text-blue-600 transition-colors">Dashboard</Link>
          <Link href="/analytics" className="hover:text-blue-600 transition-colors">Analytics</Link>
          <Link href="/history" className="hover:text-blue-600 transition-colors">History</Link>
        </nav>

        {/* Desktop Right Section */}
        <div className="hidden md:flex items-center gap-5">
          {isAuthenticated ? (
            <>
              <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-medium">
                {user?.name?.charAt(0).toUpperCase()}
              </div>
              <span className="text-sm font-medium text-gray-700">
                Hi, {user?.name}
              </span>
              <button
                onClick={handleLogout}
                className="px-4 py-1.5 rounded-lg bg-red-500 text-white text-sm font-medium hover:bg-red-600 transition-colors"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link href={CLIENT_LOGIN}>
                <button className="px-4 py-1.5 rounded-lg bg-gray-200 hover:bg-gray-300 text-sm font-medium transition-colors">
                  Login
                </button>
              </Link>
              <Link href={CLIENT_REGISTER}>
                <button className="px-4 py-1.5 rounded-lg bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 transition-colors">
                  Signup
                </button>
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-gray-700 focus:outline-none z-50 relative"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
        >
          {menuOpen ? <IoMdClose size={24} /> : <CiMenuBurger size={22} />}
        </button>

        {/* Mobile Menu Overlay */}
        {menuOpen && (
          <div 
            className="fixed inset-0 bg-black/50 z-55 md:hidden transition-opacity duration-300"
            onClick={() => setMenuOpen(false)}
          />
        )}

        {/* Mobile Menu */}
        <div className={`mobile-menu-container fixed top-0 right-0 h-full w-64 bg-white shadow-xl z-50 transform transition-transform duration-300 ease-in-out md:hidden ${
          menuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}>
          <div className="flex flex-col h-full bg-gray-100">
            {/* Mobile Menu Header */}
            <div className="flex justify-between items-center  p-5 border-b bg-gray-100">
              <h2 className="text-lg font-bold text-black ">Menu</h2>
              <button
                onClick={() => setMenuOpen(false)}
                className="text-gray-500 hover:text-gray-700"
                aria-label="Close menu"
              >
                <IoMdClose size={24} />
              </button>
            </div>

            {/* Mobile Navigation Links */}
            <nav className="flex flex-col p-5 gap-4 bg-gray-100">
              <Link 
                href="/" 
                className="text-gray-700 hover:text-blue-600 transition-colors py-2"
                onClick={() => setMenuOpen(false)}
              >
                Home
              </Link>
              <Link 
                href="/dashboard" 
                className="text-gray-700 hover:text-blue-600 transition-colors py-2"
                onClick={() => setMenuOpen(false)}
              >
                Dashboard
              </Link>
              <Link 
                href="/analytics" 
                className="text-gray-700 hover:text-blue-600 transition-colors py-2"
                onClick={() => setMenuOpen(false)}
              >
                Analytics
              </Link>
              <Link 
                href="/history" 
                className="text-gray-700 hover:text-blue-600 transition-colors py-2"
                onClick={() => setMenuOpen(false)}
              >
                History
              </Link>
            </nav>

            {/* Mobile Auth Section */}
            <div className="mt-auto p-5 border-t bg-gray-100">
              {isAuthenticated ? (
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-medium">
                      {user?.name?.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-700">Hi, {user?.name}</p>
                      <p className="text-xs text-gray-500">Welcome back!</p>
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      handleLogout();
                      setMenuOpen(false);
                    }}
                    className="w-full px-4 py-2 rounded-lg bg-red-500 text-white text-sm font-medium hover:bg-red-600 transition-colors"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <div className="space-y-3">
                  <Link href={CLIENT_LOGIN} onClick={() => setMenuOpen(false)}>
                    <button className="w-full px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 text-sm font-medium transition-colors">
                      Login
                    </button>
                  </Link>
                  <Link href={CLIENT_REGISTER} onClick={() => setMenuOpen(false)}>
                    <button className="w-full px-4 py-2 rounded-lg bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 transition-colors">
                      Signup
                    </button>
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
