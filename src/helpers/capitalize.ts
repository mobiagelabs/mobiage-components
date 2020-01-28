export namespace Capitalize {
    const prepositions = [
        'de', 'da', 'do', 'dos', 'de',
        'a', 'ante', 'após', 'até', 'com', 'contra', 'desde',
        'em', 'entre', 'para', 'per', 'perante', 'por', 'sem',
        'sob', 'sobre', 'trás'
    ]

    export function format(str: string) {
        return (str || '')
            .toLowerCase()
            .replace(/  /g, '')
            .split(' ')
            .map((w, index) => prepositions.filter((e) => e.toLowerCase() === w.toLowerCase()).length === 0
                ? w.charAt(0).toUpperCase() + w.slice(1)
                : lowerCase(w, index))
            .join(' ')
    }

    const lowerCase = (string, index) => {
        const lowerCaseString = (string || '').toLowerCase()
        return index === 0 ? lowerCaseString.charAt(0).toUpperCase() + lowerCaseString.slice(1) : lowerCaseString
    }
}
