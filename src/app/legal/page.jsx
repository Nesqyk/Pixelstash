'use client'

import Header from "../../components/layout/Header";
import Footer from "../../components/layout/Footer";
import Link from "next/link";
import style from "./style.module.scss";

const LEGAL_CONTENT = {
  title: "LEGAL",
  sections: [
    {
      id: "terms",
      title: "Terms of Service",
      content: [
        "By using Pixelstash, you agree to these terms. Pixelstash is a curated resource directory for pixel art tools, assets, and tutorials.",
        "All resources listed on Pixelstash are provided by third parties. We do not host or distribute the actual resources—we only provide links and information.",
        "You are responsible for reviewing and complying with the terms and licenses of any resources you download or use from linked sites.",
        "Pixelstash makes no warranties about the quality, safety, or legality of resources linked on this site. Use resources at your own risk.",
        "We reserve the right to modify or remove any content on Pixelstash at any time without notice."
      ]
    },
    {
      id: "privacy",
      title: "Privacy Policy",
      content: [
        "Pixelstash respects your privacy. We do not collect personal information unless you voluntarily provide it.",
        "We may use cookies or similar technologies to improve your browsing experience. You can disable cookies in your browser settings.",
        "We use Google Analytics (GA4) to collect aggregated usage and demographic insights so we can understand which resources are most helpful. Google Analytics stores this data in an anonymized form and does not give us access to personal information.",
        "We do not sell or share your personal information with third parties.",
        "If you contact us through the site, we may use your contact information to respond to your inquiry.",
        "This privacy policy may be updated from time to time. Continued use of the site constitutes acceptance of any changes."
      ]
    },
    {
      id: "attribution",
      title: "Attribution & Credits",
      content: [
        "Pixelstash is created and curated by Tyrone Tabornal.",
        "This site is inspired by Huy Nguyen's pillarstack.com—a similar curated resource directory.",
        "All resources featured on Pixelstash belong to their respective creators and are subject to their own licenses and terms.",
        "If you are a resource creator and would like your resource removed or updated, please contact us.",
        "The Pixelstash logo and branding are the property of Tyrone Tabornal."
      ]
    }
  ]
};

export default function Legal() {
  return (
    <div className={style.legalPage}>
      <Header />
      <main className={style.mainContent}>
        <div className={style.contentWrapper}>
          <section className={style.headerSection}>
            <h1>{LEGAL_CONTENT.title}</h1>
          </section>

          <div className={style.sectionsContainer}>
            {LEGAL_CONTENT.sections.map((section) => (
              <section key={section.id} className={style.legalSection}>
                <h2 className={style.sectionTitle}>{section.title}</h2>
                <div className={style.sectionContent}>
                  {section.content.map((paragraph, index) => (
                    <p key={index}>{paragraph}</p>
                  ))}
                </div>
              </section>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

