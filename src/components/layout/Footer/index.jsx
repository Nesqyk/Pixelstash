"use client"
import Logo from "@/components/common/Logo";
import Button from "@/components/common/Button";
import Link from "next/link";
import style from "./style.module.scss"
import StaggerTextButton from "@/components/common/StaggerButton";

// Easily configurable footer links array
// Simply add/edit links here - they will automatically render in the footer
const FOOTER_LINKS = [
    {
        category: "ABOUT",
        links: [
            { label: "ABOUT", href: "/about", external: false },
            { label: "LEGAL", href: "/legal", external: false }
        ]
    },
    {
        category: "SUPPORT",
        links: [
            { label: "SUPPORT", href: "/support", external: false },
            { label: "FEEDBACK", href: "/feedback", external: false }
        ]
    },
    {
        category: "SOCIAL",
        links: [
            { label: "DISCORD", href: "https://discord.gg/pixelstash", external: true },
            { label: "TWITTER", href: "https://twitter.com/pixelstash", external: true }
        ]
    }
];

export default function Footer() {
    return (
        <section className={style.footer}>
            <Logo full={false}/>

            <div className={style.content}>
                <div className={style.copyright}>
                    <p>MADE AND CURATED BY <span>TYRONE</span></p>
                </div>
                
                <nav className={style.nav}>
                    {FOOTER_LINKS.map((group, groupIndex) => (
                        <div key={group.category} className={style.linkGroup}>
                            {group.links.map((link, linkIndex) => {
                                if (link.external) {
                                    return (
                                        <a
                                            key={`${group.category}-${linkIndex}`}
                                            href={link.href}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className={style.footerButton}
                                        >
                                            <StaggerTextButton cta={false}>
                                                {link.label}
                                            </StaggerTextButton>
                                        </a>
                                    );
                                }
                                
                                return (
                                    <Link
                                        key={`${group.category}-${linkIndex}`}
                                        href={link.href}
                                        className={style.footerButton}
                                    >
                                        <StaggerTextButton cta={false}>
                                            {link.label}
                                        </StaggerTextButton>
                                    </Link>
                                );
                            })}
                        </div>
                    ))}
                </nav>
            </div>
        </section>
    );
}
