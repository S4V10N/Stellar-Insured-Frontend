import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#0A0F1F] px-4">
      <div className="w-full max-w-[400px] rounded-xl bg-[#1A1F35] p-8 text-center">
        <h1 className="text-[72px] font-bold leading-none text-white">
          404
        </h1>

        <h2 className="mt-4 text-xl font-semibold text-white">
          Page Not Found
        </h2>

        <p className="mt-3 text-sm text-[#94A3B8]">
          The page you are looking for does not exist.
        </p>

        <Link
          href="/"
          className="mt-8 inline-flex h-[37px] min-w-[141px] items-center justify-center rounded-[5px] bg-[#22BBF9] px-[6px] py-[9px] text-[20px] font-bold leading-none text-[#0A0F1F] transition-opacity hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-[#22BBF9] focus:ring-offset-2 focus:ring-offset-[#1A1F35]"
        >
          Dashboard
        </Link>
      </div>
    </main>
  );
}
