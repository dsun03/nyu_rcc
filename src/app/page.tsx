"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import styles from "./page.module.css";
import Navbar from "../components/NavBar";
import { createClient } from '@/lib/supabaseBrowserClient';

export default function Home() {
  const [navbarOffset, setNavbarOffset] = useState(0);
  const [lastScrollY, setLastScrollY] = useState(0);
  const supabase = createClient();

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

  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [images, setImages] = useState<string[]>([]);
  
  const fetchImages = async () =>{
    const bucketName = 'club-pics';
    const folderPath = 'pictures';
    const { data: files, error: listError } = await supabase.storage
      .from(bucketName)
      .list(folderPath, {
        limit: 100, 
        offset: 0,
      });

    if (listError) {
      console.error('Error listing files:', listError.message);
      return;
    }

    if (!files || files.length === 0) {
      console.log('No files found in the "pictures" folder.');
      return;
    }
    
    const imageUrls = files?.map(file =>{
      const imageName = file.name;
      return supabase.storage.from(bucketName).getPublicUrl(`pictures/${imageName}`).data.publicUrl;
    });
    console.log(imageUrls);

  
   setImages(imageUrls);
    
  };

  useEffect(()=>{
    fetchImages();
  }, []);

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
          <h1 className={styles.heroTitle}>NYU Rubik&#39;s Cube Club</h1>
        </div>

        <section className={styles.contentSection}>
          <div className={`${styles.textBox} ${styles.leftAlign}`}> 
            <h2>About the Club</h2>
            <p>The Rubik’s Cube Club at NYU is here to bring together a community of students who love solving puzzles, especially cubes! The club is open for everyone, no matter your skill level. At our meetings, you can learn how to solve a cube, compete, and hang out with us!</p>
          </div>
        </section>

        {/* Full-width Image Slider with Arrows and Indicators */}
        <div className={styles.galleryWrapper}>
          <div className={styles.sliderContainer}>
            <button className={styles.prevButton} onClick={prevSlide}>
              &#10094;
            </button>

            <div
              className={styles.slider}
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {images.map((src, index) => (
                <div key={index} className={styles.slideWrapper}>
                  <img
                    className={styles.image}
                    src={src}
                    alt={`Club Event ${index + 1}`}
                  />
                </div>
              ))}
            </div>

            <button className={styles.nextButton} onClick={nextSlide}>
              &#10095;
            </button>
          </div>

          <div className={styles.sliderIndicators}>
            {images.map((_, index) => (
              <span
                key={index}
                className={`${styles.dot} ${
                  index === currentIndex ? styles.activeDot : ''
                }`}
                onClick={() => setCurrentIndex(index)}
              />
            ))}
          </div>
        </div>

        <section className={styles.contentSection}>
          <div className={`${styles.textBox} ${styles.rightAlign}`}>
            <h2>Why Join?</h2>
            <p>If you love twisty puzzles, the Rubik&#39;s Cube Club is the place to be. We have regular fun events, including cube and chill, cube tutorials, and our special cube art events where we build a fun image with mini cubes! Hope to see you there!</p>
          </div>
        </section>

        <div className={styles.ctas}>
          <a className={styles.primary} href="https://engage.nyu.edu/organization/rubiks-cube-club">Join Now</a>
        </div>
      </main>
    </div>
  );
}
