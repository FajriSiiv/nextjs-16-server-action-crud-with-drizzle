import { redirect } from 'next/navigation';
import { createSupabaseServerClient } from '@/lib/supabase';
import SignupForm from './_components/SignUpForm';

export default async function SignupPage() {
  const supabase = await createSupabaseServerClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (user) {
    redirect('/dashboard');
  }

  const signUp = async (formData: FormData) => {
    'use server';
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    if (!email || !password || password.length < 6) {
      return { error: "Email dan password wajib diisi (min. 6 karakter)." };
    }
    const supabase = await createSupabaseServerClient();

    const { error } = await supabase.auth.signUp({
      email,
      password,
    });
    if (error) {
      if (error.message.includes("User already registered")) {
        return { error: "Email sudah terdaftar. Silakan login." };
      }

      return { error: "Terjadi kesalahan. Coba lagi." };
    }


    redirect('/verify-email');

  };

  return (

    <div className="flex flex-row min-h-[100vh] max-h-[1500px]">
      <SignupForm signUpAction={signUp} />
      <div className='flex-1 bg-rose-400'></div>
    </div>
  );
}