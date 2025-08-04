import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { 
  MessageCircle, 
  Send, 
  Bot, 
  User,
  X,
  Minimize2 
} from "lucide-react";

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

interface ChatBotProps {
  isMinimized?: boolean;
  onToggleMinimize?: () => void;
  onClose?: () => void;
}

const ChatBot = ({ isMinimized = false, onToggleMinimize, onClose }: ChatBotProps) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Hello! I'm here to help you with your loan questions. How can I assist you today?",
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const quickReplies = [
    "What loan types do you offer?",
    "How long does approval take?",
    "What documents do I need?",
    "Check my application status",
    "Payment information"
  ];

  const getBotResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase();
    
    if (lowerMessage.includes('loan type') || lowerMessage.includes('what loan')) {
      return "We offer several types of loans:\n\n• Personal Loans - For individual needs\n• Business Loans - For entrepreneurs\n• Student Loans - For educational expenses\n• Agricultural Loans - For farming ventures\n• Emergency Loans - For urgent situations\n\nEach loan has different requirements and terms. Would you like details about a specific type?";
    }
    
    if (lowerMessage.includes('approval') || lowerMessage.includes('how long')) {
      return "Our loan approval process typically takes:\n\n• Initial Review: 24-48 hours\n• Document Verification: 2-3 business days\n• Final Approval: 1-2 business days\n\nTotal processing time is usually 5-7 business days. We'll keep you updated throughout the process via email and SMS.";
    }
    
    if (lowerMessage.includes('document') || lowerMessage.includes('need')) {
      return "Required documents vary by loan type, but generally include:\n\n• Valid ID/Passport\n• Proof of income (payslips/bank statements)\n• Proof of residence\n• Employment letter (if employed)\n• Business registration (for business loans)\n\nYou can upload documents during the application process or visit our office.";
    }
    
    if (lowerMessage.includes('application status') || lowerMessage.includes('status')) {
      return "You can check your application status in several ways:\n\n• Dashboard - View real-time updates\n• Email notifications - Automatic updates\n• SMS alerts - Key milestone notifications\n• Call our hotline: +263 XXX XXXX\n\nYour client number helps us locate your application quickly.";
    }
    
    if (lowerMessage.includes('payment') || lowerMessage.includes('pay')) {
      return "Payment options include:\n\n• Mobile Money (EcoCash, OneMoney)\n• Bank Transfer\n• Direct Debit\n• Cash at our offices\n\nPayment schedules are available in your dashboard. We send reminders 3 days before due dates.";
    }
    
    if (lowerMessage.includes('contact') || lowerMessage.includes('office')) {
      return "Contact us:\n\n📞 Phone: +263 XXX XXXX\n📧 Email: info@lafinservices.com\n📍 Address: Your Office Address\n🕒 Hours: Mon-Fri 8AM-5PM\n\nWhatsApp: Click the WhatsApp button for instant support!";
    }
    
    return "Thank you for your question! For specific inquiries, please contact our support team at +263 XXX XXXX or use our WhatsApp support. Our team is available Mon-Fri 8AM-5PM to assist you.";
  };

  const sendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputMessage,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage("");
    setIsTyping(true);

    // Simulate bot typing delay
    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: getBotResponse(inputMessage),
        sender: 'bot',
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const handleQuickReply = (reply: string) => {
    setInputMessage(reply);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      sendMessage();
    }
  };

  if (isMinimized) {
    return (
      <div className="fixed bottom-4 right-4 z-50">
        <Button
          onClick={onToggleMinimize}
          className="rounded-full w-14 h-14 bg-gradient-primary shadow-lg hover:shadow-xl transition-shadow"
        >
          <MessageCircle className="w-6 h-6" />
        </Button>
        <Badge className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs">
          !
        </Badge>
      </div>
    );
  }

  return (
    <div className="fixed bottom-4 right-4 z-50 w-80 h-96">
      <Card className="h-full shadow-xl border-2 border-finance-blue/20">
        <CardHeader className="bg-gradient-primary text-white p-3">
          <CardTitle className="flex items-center justify-between text-sm">
            <div className="flex items-center">
              <Bot className="w-4 h-4 mr-2" />
              LAFin Assistant
            </div>
            <div className="flex space-x-1">
              <Button
                variant="ghost"
                size="sm"
                className="h-6 w-6 p-0 text-white hover:bg-white/20"
                onClick={onToggleMinimize}
              >
                <Minimize2 className="w-3 h-3" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="h-6 w-6 p-0 text-white hover:bg-white/20"
                onClick={onClose}
              >
                <X className="w-3 h-3" />
              </Button>
            </div>
          </CardTitle>
        </CardHeader>

        <CardContent className="p-0 flex flex-col h-full">
          <ScrollArea className="flex-1 p-3">
            <div className="space-y-3">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`flex items-start space-x-2 max-w-[80%] ${
                      message.sender === 'user' ? 'flex-row-reverse space-x-reverse' : ''
                    }`}
                  >
                    <div
                      className={`w-6 h-6 rounded-full flex items-center justify-center ${
                        message.sender === 'user' 
                          ? 'bg-finance-blue text-white' 
                          : 'bg-finance-light text-finance-navy'
                      }`}
                    >
                      {message.sender === 'user' ? (
                        <User className="w-3 h-3" />
                      ) : (
                        <Bot className="w-3 h-3" />
                      )}
                    </div>
                    <div
                      className={`p-2 rounded-lg text-xs whitespace-pre-line ${
                        message.sender === 'user'
                          ? 'bg-finance-blue text-white'
                          : 'bg-finance-light text-finance-navy'
                      }`}
                    >
                      {message.text}
                    </div>
                  </div>
                </div>
              ))}
              
              {isTyping && (
                <div className="flex justify-start">
                  <div className="flex items-center space-x-2">
                    <div className="w-6 h-6 rounded-full bg-finance-light text-finance-navy flex items-center justify-center">
                      <Bot className="w-3 h-3" />
                    </div>
                    <div className="bg-finance-light text-finance-navy p-2 rounded-lg text-xs">
                      <div className="flex space-x-1">
                        <div className="w-1 h-1 bg-finance-navy rounded-full animate-bounce"></div>
                        <div className="w-1 h-1 bg-finance-navy rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                        <div className="w-1 h-1 bg-finance-navy rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </ScrollArea>

          {/* Quick Replies */}
          <div className="p-2 border-t">
            <div className="flex flex-wrap gap-1 mb-2">
              {quickReplies.slice(0, 3).map((reply, index) => (
                <Button
                  key={index}
                  variant="outline"
                  size="sm"
                  className="text-xs h-6 px-2"
                  onClick={() => handleQuickReply(reply)}
                >
                  {reply}
                </Button>
              ))}
            </div>
          </div>

          {/* Input Area */}
          <div className="p-3 border-t">
            <div className="flex space-x-2">
              <Input
                placeholder="Type your message..."
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                className="text-xs"
              />
              <Button size="sm" onClick={sendMessage} className="bg-gradient-primary">
                <Send className="w-3 h-3" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ChatBot;