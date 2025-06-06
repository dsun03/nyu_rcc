import { createClient } from '@/lib/supabaseServerClient';
import { redirect } from 'next/navigation';
import styles from '../page.module.css';
import loginStyles from './login.module.css';


export default function LoginForm() {
  const signIn = async () => {
    'use server';

    // 1. Create a Supabase client
    const supabase= await createClient();
    
    const { error, data } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/auth/callback`, // safer
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