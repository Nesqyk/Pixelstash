"use client"

import style from "./style.module.scss";
import Garden from "@/components/ui/Garden";
import Header from "@/components/layout/Header";
import { motion } from "framer-motion";

export default function Landing() {
    return (
        <main className={style.landing}>
            <Header></Header>
            <div className={style.hero}>
                <motion.h1
                    className={style.headline}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                >
                    All your pixel & dev goodies, all in one place.
                </motion.h1>
                <motion.p
                    className={style.subheadline}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
                >
                    No more endless tabs. Discover all the best pixel art and game dev resources here.
                </motion.p>
            </div>
            <Garden></Garden>
        </main>
    );
}
