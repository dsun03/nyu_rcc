"use client";

import Navbar from "../../components/NavBar";
import styles from "../page.module.css";

export default function MeetEBoardPage() {
  const profilePicBaseURL = process.env.NEXT_PUBLIC_PROFILE_PIC?? "";
  const eboardMembers = [
    { position: "President", name: 'Ethan Elizar', imageURL: `${profilePicBaseURL}/Ethan.jpg`, bio: "Hi everyone! I am a senior majoring in Data Science and Math. I'm from Marlboro which is in central Jersey. I love playing the piano and I produce music in my spare time! "},
    { position: "Vice President", name:"Precilla Choe", imageURL: `${profilePicBaseURL}/Precilla.jpeg`, bio: "Hey fellow Cuberz 👋 I'm a senior majoring in Real Estate Finance (so if you need someone to calculate your mortgage, I got you). I'm from Ellicott City, Maryland, and I like the shape of these beans🫘" },
    { position: "Treasurer", name:"Raj Pal", imageURL: `${profilePicBaseURL}/Raj.jpeg`, bio: "Hello I am class of 2028 CS originally from Colorado. I like to laugh with others."},
    { position: "Secretary", name: "AnMei Deck", imageURL: `${profilePicBaseURL}/AnMei.jpeg`, bio: "I am a sophomore in LS planning to study Economics with a minor in Chinese. I’m from St. Louis, MO, and I am an identical twin!" },
    { position: "Events Coordinator", name:"Saher Prakash", imageURL: `${profilePicBaseURL}/Saher.jpeg`, bio: "I am a 4th year Gallatin Student studying Linguistics and Music. I’m from Seattle, WA and a fun fact about me is that I’m learning drums!" },
    { position: "Social Media Coordinator", name:"Marlyn Li", imageURL: `${profilePicBaseURL}/Marlyn.jpeg`, bio: "I’m a senior studying neural science with a minor in data science. I’m from Brookline, a town right outside of Boston. A fun fact about me is that I like doing obstacle course races!"},
    { position: "Software Engineer", name:"Dylan Wase-Bailey", imageURL: `${profilePicBaseURL}/Dylan.jpg`, bio: "Hi! I'm from Shanghai, Class of '28 doing Computer Science at Tandon, and I like video games, travelling, frisbee, and F1 (and ofc cubing)!" },
    { position: "Cube", name: "Cubert", imageURL: `${profilePicBaseURL}/CUBERT.png`, bio: "Hi, I'm the club mascot Cubert! :)"}
  ];

  return (
    <div className={styles.page}>
      <Navbar />
      <main className={styles.mainContent}>
        <h1 className={styles.title}>Meet the E-Board</h1>
        <p className={styles.description}>Get to know our club&#39;s executive board members!</p>
        
        <div className={`${styles.cardContainer} ${styles.eboard}`}>
          {eboardMembers.map((member, index) => (
            <div key={index} className={styles.cardBox}>
              <img
                src={member.imageURL}
                alt={member.name}
                width={150}
                height={150}
                style={{
                  borderRadius: "50%",
                  objectFit: "cover",
                  boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
                  border: "2px solid #eee",
                }}
              />
              <h2>{member.name}</h2>
              <h3>{member.position}</h3>
              <p>{member.bio}</p>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
