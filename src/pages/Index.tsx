import { useState } from "react";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Services from "@/components/Services";
import Values from "@/components/Values";
import Documentation from "@/components/Documentation";
import Footer from "@/components/Footer";
import Partners from "@/components/Partners";
import ChatBot from "@/components/ChatBot";

const Index = () => {
  const [showChatBot, setShowChatBot] = useState(false);
  const [chatBotMinimized, setChatBotMinimized] = useState(true);

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
