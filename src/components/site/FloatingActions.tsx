import { Phone, MessageCircle } from "lucide-react";

export function FloatingActions() {
  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col gap-3">
      <a
        href="https://wa.me/33600000000"
        aria-label="WhatsApp"
        className="h-13 w-13 h-[52px] w-[52px] rounded-full bg-[#25D366] text-white flex items-center justify-center shadow-card hover:scale-105 transition-transform"
      >
        <MessageCircle className="h-5 w-5" />
      </a>
      <a
        href="tel:+33600000000"
        aria-label="Appeler"
        className="h-[52px] w-[52px] rounded-full bg-ink text-ink-foreground flex items-center justify-center shadow-card hover:scale-105 transition-transform md:hidden"
      >
        <Phone className="h-5 w-5" />
      </a>
    </div>
  );
}
