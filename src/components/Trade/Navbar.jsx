
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@base-ui/react";
import { useSelector , useDispatch} from "react-redux";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "sonner";
import { logout } from "@/store/reducer/authReducer";
import { CLIENT_LOGIN, CLIENT_REGISTER } from "@/routes/websitePanelRoute";


export default function Navbar() {

  const { user, isAuthenticated } = useSelector(
  (state) => state.authStore
);

    const pathname = usePathname();

  const dispatch = useDispatch()
    const router = useRouter();

const handleLogout = async () => {
  try {
    const response = await axios.post("/api/auth/logout");

    console.log("Logout Response:", response.data); // 🔍 debug

    dispatch(logout());

    toast.success(response.data.message);

    // router.replace("/api/auth/login");
    router.replace({CLIENT_LOGIN});

  } catch (error) {
    console.log("Logout Error:", error);
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
    <header className="sticky top-0 z-50 bg-white/70 backdrop-blur-md border-b shadow-sm">
      <div className="max-w-6xl mx-auto px-5 py-3 flex justify-between items-center">

        {/* Logo */}
        <Link href="/">
          <h1 className="text-xl font-bold tracking-tight cursor-pointer">
            📊 <span className="text-blue-600">Trade</span>Track
          </h1>
        </Link>

        {/* Nav Links */}
        <nav className="hidden md:flex items-center gap-6 text-sm text-gray-600">
          <Link href="/" className={linkClass("/")}>
            Dashboard
          </Link>

          <Link href="/analytics"  className={linkClass("/analytics")}>
            Analytics
          </Link>

          <Link href="/history" className={linkClass("/history")}>
            History
          </Link>
        </nav>

        {/* Right */}
     <div className="flex items-center gap-5">
  {isAuthenticated ? (
    <>
      {/* 👤 Avatar */}
      <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm">
        {user?.name?.charAt(0)}
      </div>

      {/* 👋 Name */}
      <span className="text-sm font-medium text-gray-700">
        Hi, {user?.name}
      </span>

      {/* ➕ Add Trade */}
      <Link href="/">
        <button className="px-3 py-1.5 rounded-lg bg-blue-600 text-white text-sm hover:bg-blue-700">
          + Add Trade
        </button>
      </Link>

      {/* 🚪 Logout */}
      <button
        onClick={handleLogout}
        className="px-3 py-1.5 rounded-lg bg-red-500 text-white text-sm hover:bg-red-600"
      >
        Logout
      </button>
    </>
  ) : (
    <>
      {/* 🔐 Login */}
      <Link href={CLIENT_LOGIN}>
        <button className="px-3 py-1.5 rounded-lg bg-gray-200 hover:bg-gray-300 text-sm">
          Login
        </button>
      </Link>

      {/* 📝 Signup */}
      <Link href={CLIENT_REGISTER}>
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
