import { links } from "@/shared/config/links"

// ✏️ Textos da seção "Participe" (atrair convidados e espectadores).
export const joinCopy = {
  eyebrow: "Participe",
  title: "Bora fazer parte?",
  note: "o microfone é de todo mundo!",
}

// Abre a composição de um e-mail no Gmail com destinatário e assunto preenchidos.
const guestHref = links.contact.email
  ? `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(links.contact.email)}&su=${encodeURIComponent("Quero ser convidado do RevoCast")}`
  : ""

export const joinCards = [
  {
    id: "guest",
    tone: "pink" as const,
    title: "Quer ser convidado?",
    text: "Tem um projeto, uma história ou um conhecimento para compartilhar? Chama a gente e vamos bater esse papo.",
    cta: "Quero ser convidado",
    href: guestHref,
  },
  {
    id: "audience",
    tone: "cyan" as const,
    title: "Quer assistir e participar?",
    text: "Se inscreva no canal, comente e mande sugestões de tema. O próximo episódio pode ser sobre o que você quer ouvir.",
    cta: "Seguir no YouTube",
    href: links.platforms.youtube,
  },
]
