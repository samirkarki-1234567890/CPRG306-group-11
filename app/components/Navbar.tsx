import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="w-full py-5 px-8 flex justify-between items-center bg-[#393E46]/50 backdrop-blur-md sticky top-0 z-50 border-b border-[#00ADB5]/20">
      <Link href="/" className="text-2xl font-black text-[#EEEEEE] tracking-tighter hover:text-[#00ADB5] transition-all hover:drop-shadow-[0_0_8px_rgba(0,173,181,0.8)]">
        FIT<span className="text-[#00ADB5]">TRACK</span>
      </Link>

      <div className="hidden md:flex space-x-8 items-center">
        <Link href="/features" className="text-[#EEEEEE]/70 font-medium transition-all hover:text-[#00ADB5] hover:drop-shadow-[0_0_8px_rgba(0,173,181,0.8)]">
          Membership
        </Link>
        <Link href="/blog" className="text-[#EEEEEE]/70 font-medium transition-all hover:text-[#00ADB5] hover:drop-shadow-[0_0_8px_rgba(0,173,181,0.8)]">
          Blog
        </Link>
        <Link href="/workouts" className="text-[#EEEEEE]/70 font-medium transition-all hover:text-[#00ADB5] hover:drop-shadow-[0_0_8px_rgba(0,173,181,0.8)]">
          Workouts
        </Link>
        <Link href="/exercises" className="text-[#EEEEEE]/70 font-medium transition-all hover:text-[#00ADB5] hover:drop-shadow-[0_0_8px_rgba(0,173,181,0.8)]">
          Exercises
        </Link>
        <Link href="/nutrition" className="text-[#EEEEEE]/70 font-medium transition-all hover:text-[#00ADB5] hover:drop-shadow-[0_0_8px_rgba(0,173,181,0.8)]">
          Nutrition
        </Link>
        <Link href="/health-community" className="text-[#EEEEEE]/70 font-medium transition-all hover:text-[#00ADB5] hover:drop-shadow-[0_0_8px_rgba(0,173,181,0.8)]">
          Community
        </Link>
        <Link href="/about-us" className="text-[#EEEEEE]/70 font-medium transition-all hover:text-[#00ADB5] hover:drop-shadow-[0_0_8px_rgba(0,173,181,0.8)]">
          About Us
        </Link>
        <Link href="/login" className="border border-[#00ADB5] text-[#00ADB5] px-5 py-2 rounded-md font-bold transition-all hover:bg-[#00ADB5] hover:text-[#222831] hover:shadow-[0_0_15px_rgba(0,173,181,0.8)]">
          Login
        </Link>
      </div>
    </nav>
  );
}