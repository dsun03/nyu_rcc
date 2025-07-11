"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import Link from "next/link";
import styles from "./NavBar.module.css";
import { createClient } from "@/lib/supabaseBrowserClient";
import type { User } from '@supabase/supabase-js';

export default function NavBar() {
  const [navbarOffset, setNavbarOffset] = useState(0);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [user, setUser] = useState<User | null>(null);
  const supabase = createClient();

  const handleSignOut = async (e: { preventDefault: () => void; })=>{
    e.preventDefault();
    const { error } = await supabase.auth.signOut();
    if (error){
      console.log(error);
    }
  };
  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
      //console.log(user);
      //console.log(document.cookie);
    };

    getUser();
    

    // Optional: listen for auth changes
    const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user || null);
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const difference = currentScrollY - lastScrollY;
      setNavbarOffset(Math.max(-100, Math.min(0, navbarOffset - difference * 0.3))); // Smooth transition
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [navbarOffset, lastScrollY]);

  return (
    <header className={styles.header} style={{ transform: `translateY(${navbarOffset}px)`, transition: "transform 0.4s ease-out" }}>
      <nav className={styles.navbar}>
        <Link href="/" className={styles.logoLink}>
          <Image className={styles.navLogo} src="/CUBERT.png" alt="Cubert Logo" width={50} height={50} />
        </Link>
        <div className={styles.navLinks}>
          <Link href="/meet-eboard" className={styles.navItem}>Meet EBoard</Link>
          <Link href="/calendar" className={styles.navItem}>Events/Calendar</Link>
          <Link href="/contact" className={styles.navItem}>Contact</Link>
          <Link href="/leaderboard" className={styles.navItem}>Leaderboard</Link>
          {user && (
            <div className={styles.dropdownWrapper}>
              <Link href="/leaderboard" className={styles.navItem} >{user.user_metadata.full_name} &#x25BC;</Link>
              <div className={styles.dropdownMenu}>
                <div className={styles.dropdownItem} onClick={handleSignOut}>
                  Sign Out
                </div>
              </div>
            </div>
          )}
        </div>
      </nav>
    </header>
  );
}
