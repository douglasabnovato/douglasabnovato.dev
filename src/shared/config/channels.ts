    /**
 * Canais públicos.
 *
 * Um identificador — douglasabnovato — em todos os endereços. Esta lista é a
 * fonte única da faixa de contato da Home. Não existe mais página de redes
 * sociais; os canais vivem aqui.
 *
 * O campo live indica de onde sai o número que antecede a nota: "repos" vem
 * da API do GitHub, "artigos" vem de blog.data.ts. Sem live, a nota é fixa.
 *
 * active: false não renderiza — serve para deixar um canal preparado antes
 * de ele ter conteúdo que sustente o link.
 */

import type { ComponentType } from "react";
import { Mail } from "lucide-react";
import {
  FaWhatsapp,
  FaGithub,
  FaLinkedin,
  FaInstagram,
  FaMedium,
  FaXTwitter,
} from "react-icons/fa6";
import { SiLinktree } from "react-icons/si";

export type ChannelLive = "repos" | "artigos";

export interface Channel {
  id: string;
  label: string;
  url: string;
  note: string;
  icon: ComponentType<{ size?: number; className?: string }>;
  live?: ChannelLive;
  active: boolean;
}

export const HANDLE = "douglasabnovato";

export const WHATSAPP_URL =
  "https://wa.me/5532988367667?text=" +
  encodeURIComponent("Douglas. Quero conversar com você. Vi o seu site.");

export const channels: Channel[] = [
  {
    id: "whatsapp",
    label: "WhatsApp",
    url: WHATSAPP_URL,
    note: "conversa direta",
    icon: FaWhatsapp,
    active: true,
  },
  {
    id: "email",
    label: "E-mail",
    url: "mailto:douglasabnovato@gmail.com",
    note: "douglasabnovato@gmail.com",
    icon: Mail,
    active: true,
  },
  {
    id: "linkedin",
    label: "LinkedIn",
    url: "https://www.linkedin.com/in/douglasabnovato/",
    note: "trajetória profissional",
    icon: FaLinkedin,
    active: true,
  },
  {
    id: "github",
    label: "GitHub",
    url: "https://github.com/douglasabnovato",
    note: "repositórios públicos",
    icon: FaGithub,
    live: "repos",
    active: true,
  },
  {
    id: "medium",
    label: "Medium",
    url: "https://douglasabnovato.medium.com",
    note: "artigos publicados",
    icon: FaMedium,
    live: "artigos",
    active: true,
  },
  {
    id: "instagram",
    label: "Instagram",
    url: "https://www.instagram.com/douglasabnovato/",
    note: "eventos e sala de aula",
    icon: FaInstagram,
    active: true,
  },
  {
    id: "x",
    label: "X",
    url: "https://x.com/douglasabnovato",
    note: "notas curtas",
    icon: FaXTwitter,
    active: true,
  },
  {
    id: "linktree",
    label: "Linktree",
    url: "https://linktr.ee/douglasabnovato",
    note: "central de links",
    icon: SiLinktree,
    active: true,
  },
];

/** Fim dos canais públicos. */