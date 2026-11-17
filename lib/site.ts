/** Single source of truth for who to contact. Used by the contact page, footer and error copy. */
export const CONTACT = {
  name: "Hailee Rogers",
  firstName: "Hailee",
  phone: "780-283-0251",
  phoneHref: "tel:+17802830251",
  email: "westlockyouthgroup@hotmail.com",
  emailHref: "mailto:westlockyouthgroup@hotmail.com",
} as const;

/** Mail-app link that BCCs a list of parents from the youth group inbox. */
export function mailtoEveryone(emails: string[], subject: string) {
  const unique = Array.from(
    new Set(emails.map((e) => e.trim().toLowerCase()).filter(Boolean)),
  );
  const params = new URLSearchParams({ subject });
  if (unique.length > 0) params.set("bcc", unique.join(","));
  return `mailto:${CONTACT.email}?${params.toString()}`;
}
