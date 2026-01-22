
import React, { useState, useRef, useEffect } from 'react';
import { Send, Sparkles, User, Bot, ArrowLeft, MoreVertical } from 'lucide-react';
import { GoogleGenAI } from '@google/genai';

export const AfyaBot: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const [messages, setMessages] = useState<{role: 'user' | 'bot', text: string}[]>([
    { role: 'bot', text: 'Jambo! Je suis AfyaBot, votre assistant de santé maternelle. Comment puis-je vous aider aujourd\'hui ?' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;
    
    const userMsg = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setIsLoading(true);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: userMsg,
        config: {
          systemInstruction: "Tu es AfyaBot, un assistant médical expert en santé maternelle pour la RDC (Comfort ASBL). Sois empathique, utilise des termes simples et conseille toujours de consulter un médecin en cas de danger. Réponds en Français ou Swahili si nécessaire.",
        }
      });
      setMessages(prev => [...prev, { role: 'bot', text: response.text || "Je n'ai pas compris, pouvez-vous reformuler ?" }]);
    } catch (e) {
      setMessages(prev => [...prev, { role: 'bot', text: "Erreur de connexion. Veuillez réessayer." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-[#F8FAF7] animate-in slide-in-from-bottom duration-500 overflow-hidden">
      {/* Header */}
      <div className="bg-white border-b border-gray-100 px-6 py-4 flex items-center justify-between shadow-sm z-10 shrink-0">
        <div className="flex items-center gap-4">
          <button onClick={onBack} className="p-2 text-gray-400 hover:text-[#7BAE7F] transition-all"><ArrowLeft size={20} /></button>
          <div className="flex items-center gap-3">
             <div className="w-10 h-10 bg-[#7BAE7F] text-white rounded-2xl flex items-center justify-center shadow-lg shadow-[#7BAE7F]/20">
                <Sparkles size={20} />
             </div>
             <div>
                <h2 className="text-base font-black text-gray-900 leading-none">AFYABOT</h2>
                <p className="text-[9px] font-black text-[#7BAE7F] uppercase tracking-widest mt-1">Assistant Comfort ASBL</p>
             </div>
          </div>
        </div>
        <button className="p-2 text-gray-300"><MoreVertical size={20} /></button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        {messages.map((m, i) => (
          <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'} animate-in fade-in slide-in-from-bottom-2`}>
            <div className={`flex items-end gap-3 max-w-[85%] ${m.role === 'user' ? 'flex-row-reverse' : ''}`}>
              <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 ${m.role === 'user' ? 'bg-gray-900 text-white' : 'bg-white border border-gray-100 text-[#7BAE7F]'}`}>
                {m.role === 'user' ? <User size={14} /> : <Bot size={14} />}
              </div>
              <div className={`p-5 rounded-[24px] text-sm font-medium leading-relaxed shadow-sm ${
                m.role === 'user' ? 'bg-gray-900 text-white rounded-tr-none' : 'bg-white text-gray-800 rounded-tl-none border border-gray-100'
              }`}>
                {m.text}
              </div>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-white p-5 rounded-[24px] border border-gray-100 flex gap-2">
               <div className="w-2 h-2 bg-[#7BAE7F] rounded-full animate-bounce"></div>
               <div className="w-2 h-2 bg-[#7BAE7F] rounded-full animate-bounce [animation-delay:0.2s]"></div>
               <div className="w-2 h-2 bg-[#7BAE7F] rounded-full animate-bounce [animation-delay:0.4s]"></div>
            </div>
          </div>
        )}
        <div ref={scrollRef} />
      </div>

      {/* Input */}
      <div className="bg-white p-6 border-t border-gray-100 shrink-0">
        <div className="max-w-4xl mx-auto flex items-center gap-3 bg-[#F8FAF7] p-2 rounded-[24px] border border-gray-100 focus-within:border-[#7BAE7F] transition-all">
          <input 
            type="text" 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Posez votre question sur la grossesse..." 
            className="flex-1 bg-transparent px-4 py-3 outline-none text-sm font-bold text-gray-700"
          />
          <button 
            onClick={handleSend}
            disabled={!input.trim() || isLoading}
            className="w-12 h-12 bg-[#7BAE7F] text-white rounded-[20px] flex items-center justify-center shadow-xl shadow-[#7BAE7F]/20 active:scale-95 transition-all disabled:opacity-30"
          >
            <Send size={20} strokeWidth={2.5} />
          </button>
        </div>
      </div>
    </div>
  );
};
