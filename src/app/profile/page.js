"use client"

import React, { useEffect, useState } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Button from "@/components/common/Button";
import styles from "./style.module.scss";

export default function ProfilePage() {
    const [locoScroll, setLocoScroll] = useState(null);

    // Mock user data
    const user = {
        name: "Pixel Artist",
        handle: "@pixelmaster",
        bio: "Passionate pixel artist and game developer. Creating assets for the community and building retro-style games.",
        stats: {
            uploads: 42,
            downloads: 1337,
            likes: 500
        }
    };

    useEffect(() => {
        (async () => {
            try {
                const LocomotiveScroll = (await import('locomotive-scroll')).default;

                const newLocoScroll = new LocomotiveScroll({
                    el: document.querySelector('[data-scroll-container]') ?? document.body,
                    smooth: true,
                });

                setLocoScroll(newLocoScroll);

                return () => {
                    if (newLocoScroll) {
                        newLocoScroll.destroy();
                    }
                };

            } catch (error) {
                console.error("Locomotive Scroll initialization failed:", error);
            }
        })();
    }, []);

    return (
        <div data-scroll-container className={styles.profilePage}>
            <Header />

            <main className={styles.container}>
                <div className={styles.profileHeader}>
                    <div className={styles.avatarContainer}>
                        <div className={styles.avatar}>
                            {user.name.charAt(0)}
                        </div>
                    </div>

                    <div className={styles.info}>
                        <h1>{user.name}</h1>
                        <div className={styles.handle}>{user.handle}</div>
                        <p className={styles.bio}>{user.bio}</p>

                        <div className={styles.stats}>
                            <div className={styles.statItem}>
                                <span className={styles.value}>{user.stats.uploads}</span>
                                <span className={styles.label}>Uploads</span>
                            </div>
                            <div className={styles.statItem}>
                                <span className={styles.value}>{user.stats.downloads}</span>
                                <span className={styles.label}>Downloads</span>
                            </div>
                            <div className={styles.statItem}>
                                <span className={styles.value}>{user.stats.likes}</span>
                                <span className={styles.label}>Likes</span>
                            </div>
                        </div>
                    </div>

                    <div className={styles.actions}>
                        <Button>Edit Profile</Button>
                    </div>
                </div>

                <div className={styles.contentGrid}>
                    <section className={styles.section}>
                        <h2>Recent Uploads</h2>
                        <div className={styles.placeholderList}>
                            {[1, 2, 3].map((i) => (
                                <div key={i} className={styles.item}>
                                    <div className={styles.icon}></div>
                                    <div className={styles.details}>
                                        <span className={styles.title}>Asset Pack #{i}</span>
                                        <span className={styles.subtitle}>Uploaded 2 days ago</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>

                    <section className={styles.section}>
                        <h2>Favorite Resources</h2>
                        <div className={styles.placeholderList}>
                            {[1, 2, 3].map((i) => (
                                <div key={i} className={styles.item}>
                                    <div className={styles.icon}></div>
                                    <div className={styles.details}>
                                        <span className={styles.title}>Cool Tool #{i}</span>
                                        <span className={styles.subtitle}>Added to favorites</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                </div>
            </main>

            <Footer />
        </div>
    );
}
