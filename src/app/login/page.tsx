import { createClient } from '@/lib/supabaseServerClient';
import { redirect } from 'next/navigation';
import styles from '../page.module.css';
import loginStyles from './login.module.css';


export default function LoginForm() {
  const signIn = async () => {
  'use server';
  console.log('[SERVER] signIn called');

  const supabase = await createClient();
  console.log('[SERVER] Supabase client created');

  const { error, data } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/auth/callback`,
    },
  });

  if (error) {
    console.error('[SERVER] OAuth error:', error.message);
  } else {
    console.log('[SERVER] Redirecting to:', data.url);
    return redirect(data.url);
  }
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