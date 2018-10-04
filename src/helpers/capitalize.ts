export namespace Capitalize {
    const prepositions = [
        'de', 'da', 'do', 'dos', 'de',
        'a', 'ante', 'após', 'até', 'com', 'contra', 'desde',
        'em', 'entre', 'para', 'per', 'perante', 'por', 'sem',
        'sob', 'sobre', 'trás'
    ]

    export function format(str: string) {
        return (str || '')
            .replace(/  /g, '')
            .split(' ')
            .map((w) => prepositions.filter((e) => e.toLowerCase() === w.toLowerCase()).length === 0
                ? w.charAt(0).toUpperCase() + w.slice(1)
                : w.toLowerCase())
            .join(' ')
    }
}
