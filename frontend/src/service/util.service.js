export const utilService = {
    sentenceToKababCase,
    sentenceToCamelCase,
    camelCaseToSentence,
}

export function sentenceToKababCase(str) {
    return str
        .match(/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g)
        .map(x => x.toLowerCase())
        .join('-');
}

export function sentenceToCamelCase(str) {
    return str.replace(/(?:^\w|[A-Z]|\b\w)/g, function (word, index) {
        return index === 0 ? word.toLowerCase() : word.toUpperCase();
    }).replace(/\s+/g, '');
}

export function camelCaseToSentence(input, isOnlyFirst = true) {
    if (!input) return;
    if (typeof input === 'string') input = [input];
    return input.map(key => key.replace(/[A-Z]/g, letter => (isOnlyFirst) ? ` ${letter.toLowerCase()}` : ` ${letter}`).replace(/[a-z]/, letter => letter.toUpperCase())).join(' » ')
}
