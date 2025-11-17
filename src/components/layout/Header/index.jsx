"use client"

import Button from "@/components/common/Button";
import Logo from "@/components/common/Logo";
import Link from "next/link";
import style from "./style.module.scss"

export default function Header() {
    const navItems = [
        {
            label: "ABOUT",
            cta: false,
            href: "/about",
            className: style.hideOnMobile
        },
        {
            label: "SUBMIT RESOURCES",
            cta: true,
            href: "/submit" 
        }
    ];

    return (
        <section className={style.header}>
            <div className={style.logoContainer}>
                <Logo full/>
            </div>

            <div className={style.nav}>
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
        </section>
    );
}