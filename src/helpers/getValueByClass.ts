export function getValueByClass(className: string) {
    const element = document.querySelector(`.${className}`);
    if (!element) return 0;
    const textContent = element.textContent;
    if (!textContent) return 0;
    return parseFloat(textContent.trim().replace(/\s+/g, '').replace(/,/g, '.'));

}

