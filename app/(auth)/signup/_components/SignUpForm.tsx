'use client';

import { useTransition, useState } from 'react';
import Link from 'next/link';
import { Card } from '@/components/ui/card';

interface SignupFormProps {
  signUpAction: (formData: FormData) => Promise<{ error?: string }>;
}

export default function SignupForm({ signUpAction }: SignupFormProps) {
  const [isPending, startTransition] = useTransition();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErrorMessage(null);
    const formData = new FormData(event.currentTarget);

    startTransition(async () => {
      const result = await signUpAction(formData);
      if (result?.error) {
        setErrorMessage(result.error);
      }
    });
  };

  return (
    <div className="flex-1 flex justify-center items-center">
      <form onSubmit={handleSubmit} className="h-[500px]">
        <div className="relative w-[450px] mx-auto">
          <Card className="p-10 max-h-[420px] rounded-b-none shadow-none relative">
            <div className="flex flex-col gap-1">
              <h2 className="text-xl font-bold text-center">Create your account</h2>
              <p className="text-sm text-center text-gray-700">Welcome! Please fill in the details to get started.</p>
            </div>

            {errorMessage && <p className="text-red-500 mb-4">{errorMessage}</p>}

            <div>
              <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="email">Email Address</label>
              <input
                id="email"
                name="email"
                type="email"
                required
                className="appearance-none border rounded-sm py-2 px-3 text-gray-700 h-8 w-full placeholder:text-gray-600 text-sm"
                placeholder="Enter your email address"
              />
            </div>

            <div>
              <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="password">Password</label>
              <input
                id="password"
                name="password"
                type="password"
                required
                className="appearance-none border rounded-sm py-2 px-3 text-gray-700 h-8 w-full placeholder:text-gray-600 text-sm"
                placeholder="Enter your password"
              />
            </div>

            <div className='flex flex-col gap-2 '>
              {errorMessage && <p className="text-red-500 text-sm text-center">{errorMessage}</p>}
              <button
                type="submit"
                disabled={isPending}
                className="relative bg-[#2f3037] after:absolute after:-z-10 after:inset-0 after:bg-[linear-gradient(rgba(255,255,255,0.11)_0%,transparent_100%)] after:content-[''] font-bold py-2 px-4 rounded-xl w-full disabled:opacity-50 text-white"
              >
                {isPending ? "Logging In..." : "Sign In"}
              </button>
            </div>
          </Card>
          <div className="h-10 w-full bg-gray-100/50 border flex flex-col justify-end items-center py-2 rounded-b-xl text-gray-700">
            <p className="text-sm">
              Already have an account?
              <Link href="/login" className="underline cursor-pointer ml-1">
                Sign in
              </Link>
            </p>
          </div>

        </div>
      </form>




    </div>
  );
}