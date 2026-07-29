import { waLink, telLink, HAS_WHATSAPP, HAS_PHONE } from "@/lib/config";

const ext = !HAS_WHATSAPP ? { target: "_blank", rel: "noopener" } : {};

export default function Dock() {
  return (
    <div className="dock" data-dock hidden>
      <a className="dock__wa" href={waLink()} {...ext} aria-label="Chat on WhatsApp">
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2Zm5.4 14.1c-.2.6-1.3 1.2-1.8 1.2-.5.1-1 .2-3.4-.7-2.9-1.1-4.7-4-4.9-4.2-.1-.2-1.1-1.5-1.1-2.9s.7-2 1-2.3c.2-.3.5-.3.7-.3h.5c.2 0 .4 0 .6.5l.9 2.1c.1.2.1.4 0 .6l-.4.6-.5.5c-.2.2-.3.4-.1.7.2.3.9 1.4 1.9 2.3 1.3 1.1 2.3 1.5 2.6 1.6.3.2.5.1.7-.1l.8-1c.2-.3.4-.2.7-.1l2.1 1c.3.2.6.3.6.5s.1.5-.1 1Z" />
        </svg>
      </a>
      {HAS_PHONE && (
        <a className="dock__call" href={telLink()} aria-label="Call the studio">
          Call
        </a>
      )}
      <a className="dock__trial" href={waLink()} {...ext}>
        Book free trial
      </a>
    </div>
  );
}
