import Nav from "@/components/Nav";
import Fx from "@/components/Fx";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import Manifesto from "@/components/Manifesto";
import Classes from "@/components/Classes";
import Founder from "@/components/Founder";
import Garba from "@/components/Garba";
import Voices from "@/components/Voices";
import Moments from "@/components/Moments";
import Gallery from "@/components/Gallery";
import FirstClass from "@/components/FirstClass";
import Schedule from "@/components/Schedule";
import Plans from "@/components/Plans";
import Faq from "@/components/Faq";
import Visit from "@/components/Visit";
import Footer from "@/components/Footer";
import Dock from "@/components/Dock";

export default function Page() {
  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <div className="ambient" aria-hidden="true" />
      <Nav />
      <main id="main">
        <Hero />
        <Marquee />
        <Manifesto />
        <Classes />
        <Founder />
        <Garba />
        <Voices />
        <Moments />
        <Gallery />
        <FirstClass />
        <Schedule />
        <Plans />
        <Faq />
        <Visit />
      </main>
      <Footer />
      <Dock />
      <Fx />
    </>
  );
}
