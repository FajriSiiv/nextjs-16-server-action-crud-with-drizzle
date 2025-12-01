'use client';

import { useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { signOutAction } from '@/app/(auth)/actions';



export default function AuthButton() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const handleSignOut = () => {
    startTransition(async () => {
      await signOutAction();
      router.refresh();
    });
  };

  return (
    <button
      onClick={handleSignOut}
      disabled={isPending}
      className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded disabled:opacity-50"
    >
      {isPending ? 'Logging Out...' : 'Logout'}
    </button>
  );
}