"use client";

import Navbar from "../../components/NavBar";
import Link from "next/link";
import Image from "next/image";
import styles from "../page.module.css";

export default function ContactPage() {
  const contacts = [
    {
      name: 'Instagram',
      description: 'Follow us for updates and event photos!',
      href: 'https://instagram.com/nyu_rcc',
      image: '/instagram.png',
      handle: '@nyu_rcc',
    },
    {
      name: 'NYU Engage',
      description: 'Contact us on Engage!',
      href: 'https://nyu.campuslabs.com/engage/organization/rubiks-cube-club/contact',
      image: '/email.png',
      handle: 'Here',
    },
    {
      name: 'Discord',
      description: 'Join our community to chat and get involved!',
      href: 'https://discord.com/invite/H7R67vTeK8',
      image: '/discord.png',
      handle: 'Join Here',
    },
  ];


  return (
    <div className={styles.page}>
      <Navbar />
      <main className={styles.mainContent}>
        <h1 className={styles.title}>Contact Us</h1>
        <p className={styles.description}>Reach out to us through our social media platforms:</p>
        
        <div className={styles.cardContainer}>
          {contacts.map((contact, index) => (
            <Link
              key={index}
              href={contact.href}
              target="_blank"
              rel="noopener noreferrer"
              passHref
              className={styles.cardLinkWrapper}
            >
              <div className={styles.card}>
                <Image src={contact.image} alt={`${contact.name} Logo`} width={100} height={100} />
                <h2>{contact.name}</h2>
                <p>{contact.description}</p>
                <span className={styles.handle}>{contact.handle}</span>
              </div>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}
