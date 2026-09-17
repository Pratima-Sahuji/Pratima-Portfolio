import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Skills from "@/components/Skills";
import TechMarquee from "@/components/TechMarquee";
import Works from "@/components/Works";
import Stats from "@/components/Stats";
import GitHubGraph from "@/components/GitHubGraph";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import ServerLogs from "@/components/ServerLogs";

export default function Home() {
  return (
    <main
      className="min-h-screen py-6 md:py-10 flex flex-col gap-4 relative overflow-hidden"
      style={{ background: "#d6d9c1" }}
    >
      {/* Background ambient server logs */}
      <ServerLogs />

      {/* SECTION 1: Navbar */}
      <Navbar />

      {/* SECTION 2: Hero */}
      <Hero />

      {/* SECTION 3: Skills (Interactive Terminal) */}
      <Skills />

      {/* Infinite Scrolling Tech Ticker */}
      <TechMarquee />

      {/* SECTION 4: Selected Works */}
      <Works />

      {/* SECTION 5: Stats / Results Metrics */}
      <Stats />

      {/* SECTION 6: GitHub Activity Graph */}
      <GitHubGraph />

      {/* SECTION 7: Contact */}
      <Contact />

      {/* SECTION 8: Footer */}
      <Footer />
    </main>
  );
}
