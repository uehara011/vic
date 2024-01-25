const urlParams = new URLSearchParams(window.location.search);
export const value1: string = urlParams.get('value1') || "";
export const value2: string = urlParams.get('value2') || "";
export const value3: string = urlParams.get('value3') || "";
console.log('受け取った値:', value1, value2, value3);