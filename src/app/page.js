"use client"

import ResourceCard from "@/components/common/Card";
import Footer from "@/components/layout/Footer";
import Landing from "@/components/layout/Landing";
import ResourcesSection from "@/components/layout/Landing/ResourcesSection";
import { useState, useEffect } from "react";


export default function Home() {

  const [locoScroll, setLocoScroll] = useState(null);
  
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
    <div data-scroll-container > 
      <Landing/>
      <ResourcesSection></ResourcesSection>
      <Footer></Footer>
    </div>
  );
}