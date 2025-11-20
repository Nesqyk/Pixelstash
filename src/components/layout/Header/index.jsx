"use client";

import React, { useState } from "react";
import Button from "@/components/common/Button";
import Logo from "@/components/common/Logo";
import Link from "next/link";
import styles from "./style.module.scss";
import { motion, AnimatePresence } from "framer-motion";

export default function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const navItems = [
        {
            label: "ABOUT",
            cta: false,
            href: "/about",
            className: styles.hideOnMobile
        },
        {
            label: "SUBMIT RESOURCES",
            cta: true,
            href: "/submit"
        }
    ];

    return (
        <section className={styles.header}>
            <div className={styles.logoContainer}>
                <Logo/>
            </div>

            <div className={styles.nav}>
                {navItems.map((item, index) => (
                    <Link
                        key={index}
                        href={item.href}
                        className={item.className || ""}
                    >
                        <Button cta={item.cta}>
                            {item.label}
                        </Button>
                    </Link>
                ))}
            </div>

            {/* <button
                className={`${styles.hamburger} ${isMenuOpen ? styles.active : ''}`}
                onClick={toggleMenu}
                aria-label="Toggle menu"
            >
                <span></span>
                <span></span>
                <span></span>
            </button>

            <AnimatePresence>
                {isMenuOpen && (
                    <motion.div
                        className={styles.mobileMenu}
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3 }}
                    >
                        <Link href="/about" onClick={toggleMenu} className={styles.mobileLink}>ABOUT</Link>
                        <Link href="/submit" onClick={toggleMenu} className={styles.mobileLink}>SUBMIT RESOURCES</Link>
                    </motion.div>
                )}
            </AnimatePresence> */}
        </section>
    );
}