import React from 'react';
import Link from 'next/link';
import styles from './style.module.scss';

const Logo = () => {
  return (
    <Link href="/" className={styles.logoLink} aria-label="Go to home page">
      <div className={styles.logoWrapper}>
        {/* Desktop Version */}
        <img 
          src={'/full_logo.svg'} 
          alt="Pixelstash Logo" 
          className={styles.desktopLogo} 
        />

        {/* Mobile Version */}
        <img 
          src={'/logo_stash.svg'} 
          alt="Pixelstash Logo" 
          className={styles.mobileLogo} 
        />
      </div>
    </Link>
  );
};

export default Logo;