import LoginForm from './_components/LoginForm';
import { signIn } from './actions';

export default async function LoginPage() {

  return (
    <div className="flex flex-row min-h-[100vh] max-h-[1500px]">
      <LoginForm signIn={signIn} />
      <div className='flex-1 bg-rose-400'></div>
    </div>
  );
}