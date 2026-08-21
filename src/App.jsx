import React, { useState, useRef, useEffect, useContext } from 'react';
import { AuthContext } from './contexts/AuthContext';
import { AiResponse } from './axiosServices/axiosHelper';
import { Sparkles, ArrowUp, Paperclip, Smile, School } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import logo from "../src/assets/Screenshot_2026-08-05_155526-removebg-preview.png"
import { Button } from './components/ui/button';
import { Skeleton } from "@/components/ui/skeleton";
import ReactMarkdown from 'react-markdown';
import Markdown from 'react-markdown';

export default function ChatDashboard() {
  const [messages, setMessages] = useState([]);
  const [sessions, setSessions] = useState([]);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef(null);
  const [loading, setLoading] = useState(false);

  const {name} = useContext(AuthContext);

  // Auto-scroll to the latest message
  useEffect(() => {
    if (messages.length > 0) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  const handleSend = async (e) => {
    e.preventDefault();


    setLoading(true);
    const request = input;
    if (!request.trim()) return;
    const userMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: request,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    
    const currentid = (Date.now() + 1).toString();
    setMessages((prev) => [
      ...prev,
      {
        id: currentid,
        role: 'assistant',
        content: "انتظر قليلا...",
      },
    ]);

    AiResponse(request)
      .then(({data}) => {
        console.log(data);
        setMessages(prev => 
          prev.map(msg => 
            msg.id === currentid
          ? { ...msg, content: data.answer } // adjust to your response shape
          : msg
          )
        )
      }).catch(e => {
          setMessages(prev => 
          prev.map(msg => 
            msg.id === currentid
          ? { ...msg, content: "عذرا، حدث خطأ ما. يرجى المحاولة لاحقاً" } // adjust to your response shape
          : msg
          )
        )
      }).finally(() => {
        setLoading(false)
      })

    // Simulate AI response
  };

  const isHomeState = messages.length === 0;

  return (
    <div className="flex h-[calc(100vh-theme(spacing.14))] w-screen flex-col bg-zinc-50 font-sans text-zinc-900 dark:bg-zinc-950 dark:text-zinc-50 overflow-hidden" dir='rtl'>
      

      {/* Main Workspace Layout */}
      {/* Framer Motion switches this flex layout smoothly between centered and bottom-heavy alignments */}
      <div className={`flex flex-1 flex-col overflow-hidden transition-colors duration-500 font-['Noto_Sans_Arabic_Variable'] ${
        isHomeState ? 'justify-center pb-[10vh]' : 'justify-end'
      }`}>
        
        {/* Welcoming Header */}
        {/* AnimatePresence handles the clean fade-and-collapse exit animation */}
        <AnimatePresence>
          {isHomeState && (
            <motion.div 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, height: 0, marginBottom: 0 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className="mx-auto w-full max-w-2xl text-center px-4 overflow-hidden"
            >
              <div className='flex justify-center'>
              <img src={logo} className='w-[150px] mb-2'></img>
              </div>
                <div className="w-full flex-col flex flex-wrap gap-1 p-3 rounded-t-2xl text-right
                  bg-[#e6f0fa] dark:bg-zinc-900
                  border-2 border-b-0 border-zinc-300 dark:border-zinc-700">

                  <h2 className="text-xl font-semibold tracking-tight leading-[1.35]
                    text-gray-700 dark:text-zinc-100">
                    أهلا بك أستاذ {name}👋
                  </h2>

                  <p className="text-gray-700 dark:text-zinc-300">
                    المعلم الخبير جاهز لدعمك فوراً 🫡
                  </p>

                  <p className="text-sm w-full mx-auto
                    text-zinc-500 dark:text-zinc-400">
                    لتوفير وقتك الثمين، هل يتعلق استفسارك بأحد الأمور التالية؟
                  </p>
                </div>

                <div className="flex-wrap flex gap-2 justify-center w-full py-4
                  bg-white dark:bg-zinc-950
                  border-2 border-t-0
                  border-zinc-300 dark:border-zinc-700
                  rounded-b-2xl">

                  <Button
                    variant="outline"
                    className="rounded-full border-green-300 dark:border-green-700 dark:text-green-300"
                  >
                    الإدارة الصفية 🏫
                  </Button>

                  <Button
                    variant="outline"
                    className="rounded-full border-blue-300 dark:border-blue-700 dark:text-blue-300"
                  >
                    النظام الوزاري 🏛️
                  </Button>

                  <Button
                    variant="outline"
                    className="rounded-full border-purple-400 dark:border-purple-700 dark:text-purple-300"
                  >
                    الشراكة المجتمعية 🤝
                  </Button>

                  <Button
                    variant="outline"
                    className="rounded-full border-gray-400 dark:border-zinc-600 dark:text-zinc-300"
                  >
                    علم النفس التربوي 🧠
                  </Button>
                </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Conversational Timeline Feed */}
        {/* Takes up the remaining upper page space only when messages exist */}
        {!isHomeState && (
          <main className="flex-1 overflow-y-auto px-4 py-8">
            <div className="mx-auto max-w-2xl space-y-6">
              {messages.map((msg, index) => {
                // Check if this specific item is the current pending message
                const isLatestLoadingMessage = 
                  loading && 
                  index === messages.length - 1 && 
                  msg.role === 'assistant';

                return (
                  <div
                    key={msg.id}
                    className={`flex w-full ${
                      msg.role === 'user' ? 'justify-end' : 'justify-start'
                    }`}
                  >
                    <div
                      className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed shadow-sm ${
                        msg.role === 'user'
                          ? 'bg-[#059669] text-zinc-50 dark:bg-zinc-100 dark:text-zinc-900'
                          : 'bg-white border border-zinc-200/60 dark:bg-zinc-900 dark:border-zinc-800/60'
                      }`}
                    >
                      {isLatestLoadingMessage ? (
                        /* Shimmer loading layout for the active assistant message */
                        <div className="space-y-2 py-1 w-48 sm:w-64">
                          <Skeleton className="h-3.5 w-full bg-zinc-200 dark:bg-zinc-800" />
                          <Skeleton className="h-3.5 w-[20%] bg-zinc-200 dark:bg-zinc-800" />
                          <Skeleton className="h-3.5 w-[40%] bg-zinc-200 dark:bg-zinc-800" />
                        </div>
                      ) : msg.role === 'assistant' ? (
                        <ReactMarkdown>{msg.content}</ReactMarkdown>
                      ) : (
                        msg.content
                      )}
                    </div>
                  </div>
                );
              })}
              <div ref={messagesEndRef} />
            </div>
          </main>
        )}

        {/* Floating Input Tray Section */}
        {/* The "layout" prop forces Framer Motion to automatically slide this element smoothly across the screen */}
        <motion.footer 
          layout 
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="p-4 flex-shrink-0 w-full"
        >
          <div className="mx-auto max-w-2xl">
            <form
              onSubmit={handleSend}
              className="relative flex items-center rounded-2xl border border-zinc-200 bg-white p-2 shadow-md transition-all focus-within:border-zinc-400 dark:border-zinc-800 dark:bg-zinc-900 dark:focus-within:border-zinc-700"
            >

              <input
                dir='rtl'
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="إسالني..."
                className="flex-1 bg-transparent px-3 py-2 text-sm outline-none placeholder:text-zinc-400"
              />

              <div className="flex items-center gap-1">
                
                <button
                  type="submit"
                  disabled={!input.trim() || loading === true}
                  className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#1E3A8A] text-zinc-50 transition-all disabled:opacity-30 dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-200 cursor-pointer disabled:cursor-default"
                >
                  <ArrowUp className="h-4 w-4 stroke-[2.5]" />
                </button>
              </div>
            </form>
            
            <p className="mt-2 text-center text-xs text-zinc-400 dark:text-zinc-500">
              يرجى مراجعة الأجوبة الناتجة من النموذج
            </p>
          </div>
        </motion.footer>

      </div>
    </div>
  );
}