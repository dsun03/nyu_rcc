"use client";

import Navbar from "../../components/NavBar";
import Link from "next/link";
import Image from "next/image";
import styles from "../page.module.css";

export default function ContactPage() {
  return (
    <div className={styles.page}>
      <Navbar />
      <main className={styles.mainContent}>
        <h1 className={styles.title}>Contact Us</h1>
        <p className={styles.description}>Reach out to us through our social media platforms:</p>
        
        <div className={`${styles.cardContainer}`} style={{ display: "flex", flexWrap: "wrap", gap: "4rem", marginTop: "3rem" }}>
          {/* Instagram Card */}
            <Link
              href='https://www.instagram.com/nyu_rcc'
              target="_blank"
              rel="noopener noreferrer"
              passHref
              className={styles.cardLinkWrapper}
            >
              <div className={`${styles.textBox} ${styles.leftAlign}`} style={{ flex: "1", minWidth: "300px", maxWidth: "400px" }}>
                  <Image src="/instagram.png" alt="Instagram Logo" width={100} height={100} />
                  <h2>Instagram</h2>
                  <p>Follow us for updates and event photos!</p>
              </div>
            </Link>

          {/* Email Card */}
          <Link
              href='https://nyu.campuslabs.com/engage/organization/rubiks-cube-club/contact'
              target="_blank"
              rel="noopener noreferrer"
              passHref
              className={styles.cardLinkWrapper}
            >
            <div className={`${styles.textBox} ${styles.middleAlign}`} style={{ flex: "1", minWidth: "300px", maxWidth: "400px" }}>
                <Image src="/email.png" alt="Email Logo" width={100} height={100} />
                <h2>NYU Engage</h2>
                <p>Contact us on Engage!</p>
            </div>
            </Link>
          
          {/* Discord Card */}
          <Link
              href='https://discord.com/invite/H7R67vTeK8'
              target="_blank"
              rel="noopener noreferrer"
              passHref
              className={styles.cardLinkWrapper}
            >
            <div className={`${styles.textBox} ${styles.rightAlign}`} style={{ flex: "1", minWidth: "300px", maxWidth: "400px" }}>
                <Image src="/discord.png" alt="Discord Logo" width={100} height={100} />
                <h2>Discord</h2>
                <p>Join our community to chat and get involved!</p>
            </div>
            </Link>
        </div>
      </main>
    </div>
  );
}
