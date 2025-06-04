"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import Link from "next/link";
import styles from "./NavBar.module.css";

export default function NavBar() {
  const [navbarOffset, setNavbarOffset] = useState(0);
  const [lastScrollY, setLastScrollY] = useState(0);

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
        </div>
      </nav>
    </header>
  );
}
