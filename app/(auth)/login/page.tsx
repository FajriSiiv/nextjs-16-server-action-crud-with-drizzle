import { redirect } from 'next/navigation';
import { createSupabaseServerClient } from '@/lib/supabase';
import LoginForm from './_components/LoginForm';

export default async function LoginPage() {
  const supabase = await createSupabaseServerClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (user) {
    redirect('/dashboard');
  }

  // Server Action
  const signIn = async (formData: FormData) => {
    'use server';
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    const supabase = await createSupabaseServerClient();

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      console.error(error.message);
      return { error: error.message };
    }

    redirect('/product');
  };

  return (
    <div className="flex flex-row min-h-[100vh] max-h-[1500px]">
      <LoginForm signIn={signIn} />
      <div className='flex-1 bg-rose-400'></div>
    </div>
  );
}