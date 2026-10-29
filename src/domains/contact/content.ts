import { links } from "@/shared/config/links"
import type { Platform } from "./model"

// Lista de plataformas (os links vêm de shared/config/links.ts).
// Plataforma com link vazio não aparece. Para adicionar uma nova:
// 1) crie o link em links.ts, 2) adicione a chave em model.ts, 3) inclua uma linha aqui.
export const platforms: Platform[] = [
  { key: "youtube", label: "YouTube", url: links.platforms.youtube, tone: "pink" },
  { key: "spotify", label: "Spotify", url: links.platforms.spotify, tone: "cyan" },
  { key: "amazonMusic", label: "Amazon Music", url: links.platforms.amazonMusic, tone: "sand" },
  { key: "instagram", label: "Instagram", url: links.platforms.instagram, tone: "pink" },
  { key: "tiktok", label: "TikTok", url: links.platforms.tiktok, tone: "cyan" },
]

export const contactCopy = {
  eyebrow: "Contato",
  title: "Fala com a gente!",
  text: "Dúvidas, sugestões de tema, parcerias ou convite para o papo? É só chamar por onde for mais fácil.",
}

// Contatos diretos (aparecem só se o link estiver preenchido em links.ts).
export const directContacts = [
  { label: "Enviar e-mail", href: links.contact.email ? `mailto:${links.contact.email}` : "" },
  { label: "Chamar no WhatsApp", href: links.contact.whatsapp },
].filter((c) => c.href)
