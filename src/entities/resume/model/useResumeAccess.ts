export const useResumeAccess = () => {
  const isAuthorized = () => {
    return localStorage.getItem('curriculum_authorized') === 'true';
  };

  const grantAccess = (firstName: string, company: string) => {
    localStorage.setItem('curriculum_authorized', 'true');
    localStorage.setItem('visitor_name', firstName);
    localStorage.setItem('visitor_company', company);
  };

  return { isAuthorized, grantAccess };
};