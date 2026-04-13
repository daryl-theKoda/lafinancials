import { useState, lazy, Suspense } from "react";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import LazySection from "@/components/LazySection";
import LoadingSpinner from "@/components/LoadingSpinner";
import ChatBot from "@/components/ChatBot";

// Lazy load components that are below the fold
const About = lazy(() => import("@/components/About"));
const Services = lazy(() => import("@/components/Services"));
const Values = lazy(() => import("@/components/Values"));
const Documentation = lazy(() => import("@/components/Documentation"));
const Footer = lazy(() => import("@/components/Footer"));
const Partners = lazy(() => import("@/components/Partners"));

const Index = () => {
  const [showChatBot, setShowChatBot] = useState(false);
  const [chatBotMinimized, setChatBotMinimized] = useState(true);

  return (
    <div className="min-h-screen">
      <Header />
      <Hero />
      
      {/* Lazy load sections below the fold */}
      <LazySection>
        <Suspense fallback={<LoadingSpinner />}>
          <About />
        </Suspense>
      </LazySection>
      
      <LazySection>
        <Suspense fallback={<LoadingSpinner />}>
          <Values />
        </Suspense>
      </LazySection>
      
      <LazySection>
        <Suspense fallback={<LoadingSpinner />}>
          <Partners />
        </Suspense>
      </LazySection>
      
      <LazySection>
        <Suspense fallback={<LoadingSpinner />}>
          <Services />
        </Suspense>
      </LazySection>
      
      <LazySection>
        <Suspense fallback={<LoadingSpinner />}>
          <Documentation />
        </Suspense>
      </LazySection>
      
      <LazySection>
        <Suspense fallback={<LoadingSpinner />}>
          <Footer />
        </Suspense>
      </LazySection>
      
      {/* Floating ChatBot */}
      {!showChatBot && (
        <div className="fixed bottom-4 right-4 z-50">
          <button
            onClick={() => {
              setShowChatBot(true);
              setChatBotMinimized(false);
            }}
            className="rounded-full w-14 h-14 bg-gradient-primary shadow-lg hover:shadow-xl transition-shadow text-white flex items-center justify-center"
          >
            💬
          </button>
        </div>
      )}
      
      {showChatBot && (
        <ChatBot
          isMinimized={chatBotMinimized}
          onToggleMinimize={() => setChatBotMinimized(!chatBotMinimized)}
          onClose={() => setShowChatBot(false)}
        />
      )}
    </div>
  );
};

export default Index;
