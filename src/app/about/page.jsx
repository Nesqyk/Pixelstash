'use client'

import Header from "../../components/layout/Header";
import Footer from "../../components/layout/Footer";
import Link from "next/link";
import style from "./style.module.scss";

const ABOUT_CONTENT = {
  title: "ABOUT",
  author: "Tyrone Tabornal",
  authorImage: "/profile.jpg",
  linkedinUrl: "https://linkedin.com/in/tyrone",
  text: [
    "Hey, I'm Tyrone Tabornal. As a freelance pixel artist and IT student, I spent so much time hunting for good tools, asset packs, and tutorials. I was tired of sifting through hundreds of links just to find one or two good resources.",
    "I built Pixelstash to solve my own problem—to create the one place I could always go to find high-quality, curated resources without the endless searching. This site is for you, and I hope it helps you create something amazing.",
    "Inspired by Huy Nguyen's pillarstack.com"
  ]
};

export default function About() {
  return (
    <div className={style.aboutPage}>
      <Header />
      <main className={style.mainContent}>
        <div className={style.contentWrapper}>
          <section className={style.headerSection}>
            <div className={style.titleContainer}>
              <h1>{ABOUT_CONTENT.title}</h1>
              <img 
                src="/plant-icon.svg" 
                alt="" 
                className={style.plantIcon}
                aria-hidden="true"
              />
            </div>
          </section>

          <section className={style.contentSection}>
            <aside className={style.profileImage}>
              <div className={style.imageWrapper}>
                <img
                  src={ABOUT_CONTENT.authorImage}
                  alt={ABOUT_CONTENT.author}
                  className={style.image}
                />
                <Link 
                  href={ABOUT_CONTENT.linkedinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={style.linkedinButton}
                  aria-label="Visit Tyrone Tabornal's LinkedIn"
                >
                  <img 
                    src="/linkedin.svg" 
                    alt="LinkedIn" 
                    className={style.linkedinIcon}
                  />
                </Link>
              </div>
            </aside>

            <article className={style.textContent}>
              {ABOUT_CONTENT.text.map((paragraph, index) => {
                if (index === ABOUT_CONTENT.text.length - 1) {
                  // Last paragraph with inspiration link
                  const parts = paragraph.split("Huy Nguyen's pillarstack.com");
                  return (
                    <p key={index}>
                      {parts[0]}
                      <a
                        href="https://pillarstack.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className={style.inspirationLink}
                      >
                        Huy Nguyen&apos;s pillarstack.com
                      </a>
                    </p>
                  );
                }
                return <p key={index}>{paragraph}</p>;
              })}
            </article>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}