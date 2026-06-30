import dynamic from "next/dynamic";
import Hero from "@/components/Hero";
import LoveLetter from "@/components/LoveLetter";
import Timeline from "@/components/Timeline";
import Reasons from "@/components/Reasons";
import Countdown from "@/components/Countdown";
import LoveMeter from "@/components/LoveMeter";
import Navigation from "@/components/Navigation";
import CursorTeddy from "@/components/CursorTeddy";
import Footer from "@/components/Footer";

// Below-the-fold, interaction-heavy sections are code-split so the
// initial bundle (Hero + Letter, what's seen first) stays lean.
const WishJar = dynamic(() => import("@/components/WishJar"));
const LuckyWheel = dynamic(() => import("@/components/LuckyWheel"));
const CatchHearts = dynamic(() => import("@/components/CatchHearts"));
const PromiseSection = dynamic(() => import("@/components/PromiseSection"));
const WeddingDream = dynamic(() => import("@/components/WeddingDream"));
const OpenWhenLetters = dynamic(() => import("@/components/OpenWhenLetters"));
const MusicPlayer = dynamic(() => import("@/components/MusicPlayer"));
const EasterEgg = dynamic(() => import("@/components/EasterEgg"));

export default function HomePage() {
  return (
    <>
      <Navigation />
      <CursorTeddy />
      <main id="main-content">
        <Hero />
        <LoveLetter />
        <Timeline />
        <Reasons />
        <Countdown />
        <LoveMeter />
        <WishJar />
        <LuckyWheel />
        <CatchHearts />
        <PromiseSection />
        <WeddingDream />
        <OpenWhenLetters />
        <MusicPlayer />
        <EasterEgg />
      </main>
      <Footer />
    </>
  );
}
