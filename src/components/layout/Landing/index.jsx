"use client"

import style from "./style.module.scss";
import Garden from "@/components/ui/Garden";
import Header from "@/components/layout/Header";
import ResourcesSection from "./ResourcesSection";

export default function Landing() {
    return (
        <main className={style.landing}>
            <Header></Header>
            <div className={style.hero}>
                <h1 className={style.headline}>
                    All your pixel & dev goodies, all in one place.
                </h1>
                <p className={style.subheadline}>
                    No more endless tabs. Discover all the best pixel art and game dev resources here.
                </p>
            </div>
            <Garden></Garden>
        </main>
    );
}