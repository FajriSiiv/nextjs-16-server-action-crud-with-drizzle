// app/(auth)/verify-email/page.tsx

import Link from "next/link";

export default function VerifyEmailPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 flex items-center justify-center p-6">
      <div className="relative w-full max-w-md">
        <div className="backdrop-blur-xl bg-white/70 border border-white/40 rounded-2xl shadow-xl p-10 animate-fade-in">
          <div className="flex justify-center mb-6">
            <div className="h-16 w-16 rounded-full bg-green-100 flex items-center justify-center">
              <svg
                className="h-8 w-8 text-green-600"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>
          </div>

          <h1 className="text-2xl font-bold text-gray-900 text-center mb-2">
            Email Verification Sent
          </h1>

          <p className="text-gray-600 text-center mb-1">
            Kami telah mengirimkan tautan verifikasi ke email Anda.
          </p>

          <p className="text-gray-500 text-sm text-center mb-8">
            Periksa kotak masuk atau folder spam Anda dan klik link yang diberikan.
          </p>

          <div className="flex justify-center">
            <Link
              href="/login"
              className="text-sm font-medium text-blue-600 hover:text-blue-800 transition-colors border-b border-blue-600 pb-0.5"
            >
              Kembali ke Login
            </Link>
          </div>
        </div>

        <div className="absolute inset-0 blur-3xl bg-green-300/20 -z-10 rounded-full" />
      </div>
    </div>
  );
}
