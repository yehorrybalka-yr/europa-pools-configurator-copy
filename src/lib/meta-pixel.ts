export const META_PIXEL_ID = "2410638155777448";

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
  }
}

export function trackMetaLead() {
  if (typeof window !== "undefined" && typeof window.fbq === "function") {
    window.fbq("track", "Lead");
  }
}

export function trackMetaInitiateCheckout(contentId: string, contentName?: string) {
  if (typeof window !== "undefined" && typeof window.fbq === "function") {
    window.fbq("track", "InitiateCheckout", {
      content_ids: [contentId],
      content_name: contentName,
      content_type: "product",
    });
  }
}

export function trackMetaContact(method?: string) {
  if (typeof window !== "undefined" && typeof window.fbq === "function") {
    window.fbq("track", "Contact", method ? { contact_method: method } : undefined);
  }
}
