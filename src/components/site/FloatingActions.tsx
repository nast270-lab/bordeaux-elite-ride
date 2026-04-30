import { Phone, MessageCircle } from "lucide-react";

export function FloatingActions() {
  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col gap-3">
      <a
        href="https://wa.me/33600000000"
        aria-label="WhatsApp"
        className="h-14 w-14 rounded-full bg-[#25D366] text-white flex items-center justify-center shadow-luxe hover:scale-105 transition-transform"
      >
        <MessageCircle className="h-6 w-6" />
      </a>
      <a
        href="tel:+33600000000"
        aria-label="Appeler"
        className="h-14 w-14 rounded-full bg-gold text-gold-foreground flex items-center justify-center shadow-gold hover:scale-105 transition-transform md:hidden"
      >
        <Phone className="h-6 w-6" />
      </a>
    </div>
  );
}
