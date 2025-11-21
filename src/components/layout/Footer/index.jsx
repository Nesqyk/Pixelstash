"use client"
import Link from "next/link";
import style from "./style.module.scss"
import StaggerTextButton from "@/components/common/StaggerButton";

const FOOTER_LINKS = [
    { label: "ABOUT", href: "/about", external: false },
    { label: "LEGAL", href: "/legal", external: false },
    { label: "SUPPORT", href: "https://ko-fi.com/nesqyk", external: true },
    { label: "FEEDBACK", href: "https://forms.gle/CnJfJofFVNYtFfcF8", external: true },
    { label: "CONTRIBUTE", href: "https://github.com/Nesqyk/Pixelstash", external: true }
];

export default function Footer() {
    return (
        <section className={style.footer}>
            <Link href="/" className={style.logoLink}>
                <img 
                    src="/word_logo.svg" 
                    alt="Pixelstash Logo" 
                    className={style.logo}
                />
            </Link>

            <div className={style.content}>
                <div className={style.copyright}>
                    <p>MADE AND CURATED BY <span>TYRONE</span></p>
                </div>
                
                <nav className={style.nav}>
                    {FOOTER_LINKS.map((link, index) => {
                        if (link.external) {
                            return (
                                <a
                                    key={index}
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
                                key={index}
                                href={link.href}
                                className={style.footerButton}
                            >
                                <StaggerTextButton cta={false}>
                                    {link.label}
                                </StaggerTextButton>
                            </Link>
                        );
                    })}
                </nav>
            </div>
        </section>
    );
}
