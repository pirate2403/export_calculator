export function getValueByClass(className: string) {
    const element = document.querySelector(`.${className}`);
    if (!element) return null;
    const textContent = element.textContent;
    if (!textContent) return null;
    return parseFloat(textContent.trim().replace(/\s+/g, '').replace(/,/g, '.'));

}

