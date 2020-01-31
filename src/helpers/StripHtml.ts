export const stripHtml = (html: any) => {
  let temporalDivElement = document.createElement('div');
  temporalDivElement.innerHTML = html;
  return temporalDivElement.textContent || temporalDivElement.innerText || '';
};
