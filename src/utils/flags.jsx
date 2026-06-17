
/**
 * Retorna a URL da bandeira com base na sigla do país.
 * @param {string} sigla - Ex: 'br', 'ar', 'us'
 * @returns {string} URL da imagem da bandeira
 */
export const getBandeiraUrl = (sigla) => {
  if (!sigla) return '';
  return `https://flagcdn.com/${sigla.toLowerCase()}.svg`;
};