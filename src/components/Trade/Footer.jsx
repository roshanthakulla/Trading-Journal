export default function Footer() {
  return (
    <footer className="bg-white/70 backdrop-blur-md border-t mt-10">
      <div className="max-w-6xl mx-auto px-5 py-6 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-500">

        {/* Left */}
        <p>
          © {new Date().getFullYear()} <span className="font-semibold text-gray-700">TradeTrack</span>
        </p>

        {/* Center */}
        <div className="flex gap-6">
          <span className="hover:text-black cursor-pointer transition">Privacy</span>
          <span className="hover:text-black cursor-pointer transition">Terms</span>
          <span className="hover:text-black cursor-pointer transition">Support</span>
        </div>

        {/* Right */}
        <p className="text-xs text-gray-400">
          Built with ❤️ by You
        </p>

      </div>
    </footer>
  );
}
