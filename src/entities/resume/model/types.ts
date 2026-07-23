export type ExperienceTier = "atual" | "recente" | "condensado";

export interface Experience {
  id: string;
  company: string;
  role: string;
  period: string;
  tier: ExperienceTier;
  highlights?: string[];
  status?: "confirmado" | "a confirmar";
}

export interface Education {
  id: string;
  institution: string;
  degree: string;
  period: string;
  completed: boolean;
}

export interface ResumeData {
  name: string;
  headline: string;
  summary: string;
  experiences: Experience[];
  education: Education[];
}