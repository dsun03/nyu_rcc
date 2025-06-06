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
        
        <div className={`${styles.cardContainer} ${styles.flexContainer}`} style={{ display: "flex", flexWrap: "wrap", gap: "4rem", marginTop: "3rem" }}>
          {/* Instagram Card */}
            <div className={`${styles.textBox} ${styles.leftAlign}`} style={{ flex: "1", minWidth: "300px", maxWidth: "400px" }}>
                <Image src="/instagram.png" alt="Instagram Logo" width={100} height={100} />
                <h2>Instagram</h2>
                <p>Follow us for updates and event photos!</p>
                <Link href="#"><span className={styles.cardLink}>@nyu_rcc</span></Link>
            </div>

          {/* Email Card */}
            <div className={`${styles.textBox} ${styles.rightAlign}`} style={{ flex: "1", minWidth: "300px", maxWidth: "400px" }}>
                <Image src="/email.png" alt="Email Logo" width={100} height={100} />
                <h2>NYU Engage</h2>
                <p>Contact us on Engage!</p>
                <Link href="https://nyu.campuslabs.com/engage/organization/rubiks-cube-club/contact"><span className={styles.cardLink}></span>Here</Link>
            </div>
          
          {/* Discord Card */}
            <div className={`${styles.textBox} ${styles.rightAlign}`} style={{ flex: "1", minWidth: "300px", maxWidth: "400px" }}>
                <Image src="/discord.png" alt="Discord Logo" width={100} height={100} />
                <h2>Discord</h2>
                <p>Join our community to chat and get involved!</p>
                <Link href="https://discord.com/invite/H7R67vTeK8"><span className={styles.cardLink}>Join Here</span></Link>
            </div>
        </div>
      </main>
    </div>
  );
}
