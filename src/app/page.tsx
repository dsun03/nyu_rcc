"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import styles from "./page.module.css";
import Navbar from "../components/NavBar";

export default function Home() {
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

  const [currentIndex, setCurrentIndex] = useState(0);
  const images = ["/image1.jpeg", "/image2.jpeg", "/image3.jpeg"];

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  return (
    <div className={styles.page}>
      <Navbar />
      <main className={styles.main}>
        <div className={styles.heroContainer}>
          <Image className={styles.heroLogo} src="/RCC_LOGO.png" alt="NYU RCC Logo" width={250} height={250} />
          <h1 className={styles.heroTitle}>NYU Rubik's Cube Club</h1>
        </div>

        <section className={styles.contentSection}>
          <div className={`${styles.textBox} ${styles.leftAlign}`}> 
            <h2>About the Club</h2>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque vel dui eu sem fringilla consequat. Vivamus nec magna a elit pharetra tincidunt.</p>
            <p>Curabitur venenatis ex non nulla cursus, ut gravida magna sollicitudin. Nulla facilisi. Ut ultricies, justo ac malesuada scelerisque, augue nisl euismod urna, sed posuere lectus purus sit amet arcu.</p>
          </div>
        </section>

        {/* Full-width Image Slider with Arrows and Indicators */}
        <div className={styles.sliderContainer}>
          <button className={styles.prevButton} onClick={prevSlide}>&#10094;</button>
          <div className={styles.slider} style={{ transform: `translateX(-${currentIndex * 100}vw)`, transition: "transform 0.5s ease-in-out" }}>
            {images.map((src, index) => (
              <Image key={index} className={styles.slide} src={src} alt={`Club Event ${index + 1}`} width={1920} height={600} objectFit="cover" />
            ))}
          </div>
          <button className={styles.nextButton} onClick={nextSlide}>&#10095;</button>
          
          {/* Slide Indicator Dots Positioned at Bottom of Image */}
          <div className={styles.sliderIndicators}>
            {images.map((_, index) => (
              <span key={index} className={`${styles.dot} ${index === currentIndex ? styles.activeDot : ""}`} onClick={() => setCurrentIndex(index)}></span>
            ))}
          </div>
        </div>

        <section className={styles.contentSection}>
          <div className={`${styles.textBox} ${styles.rightAlign}`}>
            <h2>Why Join?</h2>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse potenti. Integer dapibus suscipit justo, et congue ligula tempus id.</p>
            <p>Fusce non magna arcu. Aenean quis velit sed nisl aliquet faucibus. In hac habitasse platea dictumst. Donec sodales urna sit amet libero tincidunt, eget venenatis erat tincidunt.</p>
          </div>
        </section>

        <div className={styles.ctas}>
          <a className={styles.primary} href="https://engage.nyu.edu/organization/rubiks-cube-club">Join Now</a>
          <a href="#" className={styles.secondary}>Learn More</a>
        </div>
      </main>
    </div>
  );
}
