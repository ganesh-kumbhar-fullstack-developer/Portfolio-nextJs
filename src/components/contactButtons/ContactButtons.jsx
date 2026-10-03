import { FaWhatsapp } from "react-icons/fa";
import { profile } from "@/data/portfolio";

// Single floating WhatsApp shortcut — the phone number is already in the Contact section.
export default function ContactButtons() {
  const text = encodeURIComponent("Hi Ganesh, I came across your portfolio and would like to connect.");
  return (
    <a
      href={`https://wa.me/${profile.whatsapp}?text=${text}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with Ganesh on WhatsApp"
      className="fixed bottom-5 right-5 z-40 grid h-12 w-12 place-items-center rounded-full bg-[#25d366] text-white shadow-lg shadow-black/40 transition-transform hover:scale-105 active:scale-95 sm:h-14 sm:w-14"
    >
      <FaWhatsapp className="h-6 w-6 sm:h-7 sm:w-7" aria-hidden />
    </a>
  );
}
