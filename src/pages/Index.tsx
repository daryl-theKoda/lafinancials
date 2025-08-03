import Header from "@/components/Header";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Services from "@/components/Services";
import Values from "@/components/Values";
import Documentation from "@/components/Documentation";
import Footer from "@/components/Footer";
import Partners from "@/components/Partners";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <Hero />
      <About />
      <Services />
      <Values />
      <Partners />
      <Documentation />
      <Footer />
    </div>
  );
};

export default Index;
