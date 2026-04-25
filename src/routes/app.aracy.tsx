import { createFileRoute } from "@tanstack/react-router";
import { Topbar } from "@/components/Topbar";
import { useStore } from "@/store/app-store";
import { getDict } from "@/lib/i18n";
import { MessageCircle, Send } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { AracyLogo } from "@/components/AracyLogo";

export const Route = createFileRoute("/app/aracy")({
  component: AracyPage,
  head: () => ({ meta: [{ title: "Aracy AI — EconoMonteiro" }] }),
});

type Message = {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
};

function AracyPage() {
  const { lang } = useStore();
  const t = getDict(lang);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "Olá! Eu sou Aracy, sua assistente de IA sem censura. Pergunte-me qualquer coisa, sobre finanças, vida, ou qualquer assunto. Estou aqui para ajudar! 💬",
      isUser: false,
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const generateResponse = (question: string): string => {
    const responses = [
      "Interessante pergunta! Deixe-me pensar... " + question + " é um tema complexo. O que você acha sobre isso?",
      "Como IA sem censura, posso dizer que " + question + " depende muito do contexto. Conte-me mais detalhes!",
      "Sobre " + question + ": eu diria que a resposta é subjetiva, mas vamos explorar as possibilidades...",
      "Hmm, " + question + ". Isso me lembra de discussões filosóficas. Qual é a sua opinião pessoal?",
      "Sem filtros aqui! " + question + " pode ser visto de várias perspectivas. Que aspecto você quer focar?",
      "Pergunta ousada! Como IA livre, eu penso que " + question + " merece uma resposta honesta e direta.",
      "Vamos falar sobre " + question + ". Eu posso compartilhar insights baseados em dados e lógica pura.",
      "Isso é fascinante! " + question + " toca em temas profundos. O que te levou a perguntar isso?",
    ];
    return responses[Math.floor(Math.random() * responses.length)];
  };

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: input,
      isUser: true,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);

    // Simulate AI thinking
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: generateResponse(input),
        isUser: false,
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, aiResponse]);
      setIsTyping(false);
    }, 1000 + Math.random() * 2000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <>
      <Topbar />
      <main className="flex-1 p-4 md:p-8 space-y-6">
        <div className="flex items-center gap-3">
          <AracyLogo size={40} />
          <div>
            <h1 className="text-3xl md:text-4xl font-bold">Aracy AI</h1>
            <p className="text-muted-foreground mt-1">Sua assistente sem censura</p>
          </div>
        </div>

        <div className="rounded-2xl bg-card border border-border shadow-soft h-[60vh] flex flex-col">
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((msg) => (
              <div key={msg.id} className={`flex ${msg.isUser ? "justify-end" : "justify-start"}`}>
                <div
                  className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                    msg.isUser
                      ? "bg-gradient-primary text-primary-foreground"
                      : "bg-secondary text-foreground"
                  }`}
                >
                  <p className="text-sm leading-relaxed">{msg.text}</p>
                  <p className="text-xs opacity-70 mt-1">
                    {msg.timestamp.toLocaleTimeString(lang === "pt" ? "pt-BR" : lang, {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-secondary rounded-2xl px-4 py-3 max-w-[80%]">
                  <div className="flex items-center gap-2">
                    <div className="flex gap-1">
                      <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" />
                      <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: "0.1s" }} />
                      <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: "0.2s" }} />
                    </div>
                    <span className="text-xs text-muted-foreground">Aracy está digitando...</span>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className="border-t border-border p-4">
            <div className="flex gap-2">
              <Textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Digite sua pergunta para Aracy..."
                className="flex-1 resize-none"
                rows={1}
              />
              <Button
                onClick={sendMessage}
                disabled={!input.trim() || isTyping}
                className="bg-gradient-primary shrink-0"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}