// app/auth/callback/route.ts
import { createClient } from "@/lib/supabaseServerClient"; // Adjust path as needed
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  console.log('[ROUTE HANDLER] /auth/callback GET request received');
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get('code');
  //const error = requestUrl.searchParams.get('error');
  //const errorDescription = requestUrl.searchParams.get('error_description');

  // Handle potential errors from Supabase
  /*if (error) {
    console.error('[ROUTE HANDLER] Supabase callback error:', error, errorDescription);
    // Redirect to an error page or show a message
    //const redirectUrl = requestUrl.origin + '/auth/error?message=' + encodeURIComponent(error_description || error);
    return NextResponse.redirect(redirectUrl);
  }*/

  if (code) {
    console.log('[ROUTE HANDLER] Code detected. Attempting to exchange for session.');
    const supabase = await createClient(); // Use your server-side client
    const { error: sessionError } = await supabase.auth.exchangeCodeForSession(String(code));

    if (!sessionError) {
      console.log('[ROUTE HANDLER] Session exchanged successfully. Redirecting to /leaderboard');
      const redirectUrl = requestUrl.origin + '/leaderboard';
      return NextResponse.redirect(redirectUrl); // Redirect to your protected route
    } else {
      console.error('[ROUTE HANDLER] Error exchanging code for session:', sessionError);
      const redirectUrl = requestUrl.origin + '/auth/error?message=' + encodeURIComponent(sessionError.message);
      return NextResponse.redirect(redirectUrl);
    }
  }

  // Fallback in case no code is present but no error either
  console.log('[ROUTE HANDLER] No code or error in callback URL. Redirecting to home or login.');
  const redirectUrl = requestUrl.origin + '/';
  return NextResponse.redirect(redirectUrl);
}