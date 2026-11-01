import { gravarItem, lerItem } from '@/shared/lib/storage';

export const useResumeAccess = () => {
  const isAuthorized = () => {
    return lerItem('curriculum_authorized') === 'true';
  };

  const grantAccess = (firstName: string, company: string) => {
    gravarItem('curriculum_authorized', 'true');
    gravarItem('visitor_name', firstName);
    gravarItem('visitor_company', company);
  };

  return { isAuthorized, grantAccess };
};