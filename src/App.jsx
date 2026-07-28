import React, { useState, useRef, useEffect } from 'react';
import { Sparkles, ArrowUp, Paperclip, Smile, School } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function ChatDashboard() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef(null);

  // Auto-scroll to the latest message
  useEffect(() => {
    if (messages.length > 0) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  const handleSend = (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');

    // Simulate AI response
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          role: 'assistant',
          content: "This is a sleek mock response matching the minimal UI layout.",
        },
      ]);
    }, 1000);
  };

  const isHomeState = messages.length === 0;

  return (
    <div className="flex h-screen w-screen flex-col bg-zinc-50 font-sans text-zinc-900 dark:bg-zinc-950 dark:text-zinc-50 overflow-hidden">
      

      {/* Main Workspace Layout */}
      {/* Framer Motion switches this flex layout smoothly between centered and bottom-heavy alignments */}
      <div className={`flex flex-1 flex-col overflow-hidden transition-colors duration-500 ${
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
              className="mx-auto w-full max-w-2xl text-center space-y-4 px-4 mb-8 overflow-hidden"
            >
              <h1 className="text-4xl font-semibold tracking-tight text-zinc-800 dark:text-zinc-100">
                What can I help you with today?
              </h1>
              <p className="text-sm text-zinc-500 max-w-md mx-auto">
                You can ask me anything in education and psychology!
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Conversational Timeline Feed */}
        {/* Takes up the remaining upper page space only when messages exist */}
        {!isHomeState && (
          <main className="flex-1 overflow-y-auto px-4 py-8">
            <div className="mx-auto max-w-2xl space-y-6">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex w-full ${
                    msg.role === 'user' ? 'justify-end' : 'justify-start'
                  }`}
                >
                  <div
                    className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed shadow-sm ${
                      msg.role === 'user'
                        ? 'bg-zinc-900 text-zinc-50 dark:bg-zinc-100 dark:text-zinc-900'
                        : 'bg-white border border-zinc-200/60 dark:bg-zinc-900 dark:border-zinc-800/60'
                    }`}
                  >
                    {msg.content}
                  </div>
                </div>
              ))}
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
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask anything..."
                className="flex-1 bg-transparent px-3 py-2 text-sm outline-none placeholder:text-zinc-400"
              />

              <div className="flex items-center gap-1">
                <button
                  type="button"
                  className="flex h-9 w-9 items-center justify-center rounded-xl text-zinc-400 hover:bg-zinc-100 hover:text-zinc-600 dark:hover:bg-zinc-800 dark:hover:text-zinc-300"
                >
                </button>
                
                <button
                  type="submit"
                  disabled={!input.trim()}
                  className="flex h-9 w-9 items-center justify-center rounded-xl bg-zinc-900 text-zinc-50 transition-all hover:bg-zinc-800 disabled:opacity-30 dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-200"
                >
                  <ArrowUp className="h-4 w-4 stroke-[2.5]" />
                </button>
              </div>
            </form>
            
            <p className="mt-2 text-center text-xs text-zinc-400 dark:text-zinc-500">
              Assistant may display inaccurate info. Verify important details.
            </p>
          </div>
        </motion.footer>

      </div>
    </div>
  );
}