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
  const [navOpen, setNavOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const supabase = createClient();

  const handleSignOut = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const { error } = await supabase.auth.signOut();
    if (error) {console.log(error);}
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
    <header
      className={`${styles.header} ${navOpen ? styles.navOpen : ""}`}
      style={{ transform: `translateY(${navbarOffset}px)`, transition: "transform 0.4s ease-out" }}
    >
      <nav className={styles.navbar}>
        <Link href="/" className={styles.logoLink} onClick={() => setNavOpen(false)}>
          <Image className={styles.navLogo} src="/CUBERT.png" alt="Cubert Logo" width={50} height={50} />
        </Link>

        {/* NEW: hamburger (shown only on mobile via CSS) */}
        <button
          className={styles.menuButton}
          aria-label={navOpen ? "Close menu" : "Open menu"}
          aria-expanded={navOpen}
          aria-controls="primary-navigation"
          onClick={() => setNavOpen(o => !o)}
          type="button"
        >
          <span />
        </button>

        <div id="primary-navigation" className={styles.navLinks}>
          <Link href="/meet-eboard" className={styles.navItem} onClick={() => setNavOpen(false)}>Meet EBoard</Link>
          <Link href="/calendar" className={styles.navItem} onClick={() => setNavOpen(false)}>Events/Calendar</Link>
          <Link href="/contact" className={styles.navItem} onClick={() => setNavOpen(false)}>Contact</Link>
          <Link href="/leaderboard" className={styles.navItem} onClick={() => setNavOpen(false)}>Leaderboard</Link>

          {user && (
          <div className={`${styles.dropdownWrapper} ${dropdownOpen ? styles.open : ""}`}>
            {/* Trigger: use a button, not Link */}
            <button
              type="button"
              className={styles.navItem}
              aria-haspopup="menu"
              aria-expanded={dropdownOpen}
              onClick={() => setDropdownOpen(o => !o)}
            >
              {user.user_metadata?.full_name ?? "Account"} &#x25BC;
            </button>

            <div className={styles.dropdownMenu} role="menu">
              <button
                type="button"
                className={styles.dropdownItem}
                role="menuitem"
                onClick={(e) => {
                  e.preventDefault();
                  setDropdownOpen(false);
                  setNavOpen(false);
                  handleSignOut(e);
                }}
              >
                Sign Out
              </button>
            </div>
          </div>
        )}
        </div>
      </nav>
    </header>
  );
}
