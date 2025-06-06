import { createClient } from '@/lib/supabaseServerClient';
import { redirect } from 'next/navigation';
import { headers } from 'next/headers';
import styles from '../page.module.css';
import loginStyles from './login.module.css';


export default function LoginForm() {
  const signIn = async () => {
    'use server';

    // 1. Create a Supabase client
    const supabase= await createClient();
    const origin = (await headers()).get('origin');
    // 2. Sign in with GitHub
    const { error, data } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${origin}/auth/callback`,
      },
    });

    if (error) {
      console.log(error);
    } else {
      return redirect(data.url);
    }
    // 3. Redirect to landing page
  };


  return (<>
    <div className={styles.page}>
            <main className={loginStyles.main}>
              <form action={signIn}>
                <button type="submit" className={loginStyles.googleButton}>
                  <img
                    src="/google-icon.svg"
                    alt="Google logo"
                    className="googleIcon"
                  />
                  <span>Sign in with Google</span>
                </button>
              </form>
            </main>
        </div>
    </>
  );
}