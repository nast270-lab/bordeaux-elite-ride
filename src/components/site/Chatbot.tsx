import { useState, useRef, useEffect } from "react";
import { MessagesSquare, X, Send, Loader2 } from "lucide-react";

type Msg = { role: "user" | "assistant"; content: string };

const INITIAL: Msg = {
  role: "assistant",
  content: "Bonjour, je suis l'assistant Bordeaux Privilège. Comment puis-je vous aider : réservation, estimation tarifaire, ou information sur le service ?",
};

export function Chatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([INITIAL]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, loading]);

  async function send() {
    const text = input.trim();
    if (!text || loading) return;
    const userMsg: Msg = { role: "user", content: text };
    const next = [...messages, userMsg];
    setMessages(next);
    setInput("");
    setLoading(true);

    try {
      const resp = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: next.map(({ role, content }) => ({ role, content })) }),
      });

      if (!resp.ok || !resp.body) {
        const errMsg = resp.status === 429
          ? "Trop de demandes. Merci de patienter quelques secondes."
          : resp.status === 402
          ? "Service momentanément indisponible. Contactez-nous au +33 6 00 00 00 00."
          : "Désolé, une erreur est survenue. Vous pouvez nous joindre au +33 6 00 00 00 00.";
        setMessages((m) => [...m, { role: "assistant", content: errMsg }]);
        setLoading(false);
        return;
      }

      const reader = resp.body.getReader();
      const decoder = new TextDecoder();
      let buffer = "";
      let assistant = "";
      let started = false;
      let done = false;

      while (!done) {
        const { done: d, value } = await reader.read();
        if (d) break;
        buffer += decoder.decode(value, { stream: true });

        let nl;
        while ((nl = buffer.indexOf("\n")) !== -1) {
          let line = buffer.slice(0, nl);
          buffer = buffer.slice(nl + 1);
          if (line.endsWith("\r")) line = line.slice(0, -1);
          if (!line.startsWith("data: ")) continue;
          const data = line.slice(6).trim();
          if (data === "[DONE]") { done = true; break; }
          try {
            const parsed = JSON.parse(data);
            const delta = parsed.choices?.[0]?.delta?.content;
            if (delta) {
              assistant += delta;
              if (!started) {
                started = true;
                setMessages((m) => [...m, { role: "assistant", content: assistant }]);
              } else {
                setMessages((m) => m.map((msg, i) => i === m.length - 1 ? { ...msg, content: assistant } : msg));
              }
            }
          } catch {
            buffer = line + "\n" + buffer;
            break;
          }
        }
      }
    } catch (e) {
      console.error(e);
      setMessages((m) => [...m, { role: "assistant", content: "Erreur de connexion. Réessayez ou appelez-nous." }]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <button
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? "Fermer le chat" : "Ouvrir le chat"}
        className="h-14 w-14 rounded-full bg-foreground text-background flex items-center justify-center shadow-luxe hover:scale-105 transition-transform"
      >
        {open ? <X className="h-6 w-6" /> : <MessagesSquare className="h-6 w-6" />}
      </button>

      {open && (
        <div className="fixed bottom-24 right-6 z-50 w-[calc(100vw-3rem)] max-w-sm h-[70vh] max-h-[560px] bg-card border border-border shadow-luxe flex flex-col overflow-hidden">
          <div className="px-5 py-4 border-b border-border bg-background">
            <div className="text-xs uppercase tracking-[0.25em] text-gold">Assistant</div>
            <div className="text-sm mt-1">Bordeaux Privilège — Réservation & aide</div>
          </div>

          <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                <div
                  className={`max-w-[85%] px-3.5 py-2.5 text-sm leading-relaxed whitespace-pre-wrap ${
                    m.role === "user"
                      ? "bg-gold text-gold-foreground"
                      : "bg-background border border-border text-foreground"
                  }`}
                >
                  {m.content}
                </div>
              </div>
            ))}
            {loading && messages[messages.length - 1]?.role === "user" && (
              <div className="flex justify-start">
                <div className="bg-background border border-border px-3.5 py-2.5">
                  <Loader2 className="h-4 w-4 animate-spin text-gold" />
                </div>
              </div>
            )}
          </div>

          <form
            onSubmit={(e) => { e.preventDefault(); send(); }}
            className="border-t border-border p-3 flex items-center gap-2 bg-background"
          >
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Écrivez votre message…"
              disabled={loading}
              className="flex-1 bg-transparent text-sm px-3 py-2 outline-none border border-border focus:border-gold transition-colors"
            />
            <button
              type="submit"
              disabled={loading || !input.trim()}
              aria-label="Envoyer"
              className="h-10 w-10 bg-gold text-gold-foreground flex items-center justify-center disabled:opacity-50"
            >
              <Send className="h-4 w-4" />
            </button>
          </form>
        </div>
      )}
    </>
  );
}
