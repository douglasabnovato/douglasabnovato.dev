import { gravarItem, lerItem } from '@/shared/lib/storage';

/*
 * Liberação do currículo nesta aba. Com cookies bloqueados ou em janela
 * anônima, o localStorage falha e a liberação não fica gravada; sem esta
 * variável, o formulário voltava a cada recarga, num laço sem saída.
 */
let liberadoNestaSessao = false;

export const useResumeAccess = () => {
  const isAuthorized = () => {
    return liberadoNestaSessao || lerItem('curriculum_authorized') === 'true';
  };

  const grantAccess = (firstName: string, company: string) => {
    liberadoNestaSessao = true;
    gravarItem('curriculum_authorized', 'true');
    gravarItem('visitor_name', firstName);
    gravarItem('visitor_company', company);
  };

  return { isAuthorized, grantAccess };
};
