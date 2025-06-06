"use client";

import Navbar from "../../components/NavBar";
import Image from "next/image";
import styles from "../page.module.css";

export default function MeetEBoardPage() {
  const eboardMembers = [
    { name: "President", image: "/image1.jpeg" },
    { name: "Vice President", image: "/image1.jpeg" },
    { name: "Secretary", image: "/image1.jpeg" },
    { name: "Treasurer", image: "/image1.jpeg" },
    { name: "Events Coordinator", image: "/image1.jpeg" }
  ];

  return (
    <div className={styles.page}>
      <Navbar />
      <main className={styles.mainContent}>
        <h1 className={styles.title}>Meet the E-Board</h1>
        <p className={styles.description}>Get to know our club&#39;s executive board members!</p>
        
        <div className={styles.cardContainer} style={{ display: "flex", justifyContent: "center", gap: "30px", flexWrap: "wrap" }}>
          {eboardMembers.map((member, index) => (
            <div key={index} className={styles.cardBox} style={{ flex: "1", minWidth: "250px", maxWidth: "300px", textAlign: "center" }}>
              <Image src={member.image} alt={member.name} width={150} height={150} style={{ borderRadius: "50%" }} />
              <h2>{member.name}</h2>
              <p>Bio coming soon...</p>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
