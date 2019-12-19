import * as _get from 'lodash.get'

export namespace OrderPreferences {
    const preferenceSize = [
        'PP', 'P', 'M', 'G', 'GG', 'EG', 'XG', 'G1', 'G2', 'G3', 'G4', 'G5', 'G6', 'UN'
    ]

    for (let i = 1; i < 100; i++) {
        preferenceSize.push(i + '')
    }

    const containsInPreference = (item, preference) => preference.filter((pre) => pre.trim().toLowerCase() === item.trim().toLowerCase()).length > 0

    const getIndexOf = (item, preference) => {
        let index = -1
        preference.forEach((pre, i) => {
            if (pre.trim().toLowerCase() === item.trim().toLowerCase()) {
                index = i
            }
        })
        return index
    }

    export function order(arr, label) {
        const finalPreference = preferenceSize.map((pre) => pre.trim().toLowerCase())
        const orderItems = (arr || []).filter((i) => {
            return containsInPreference(_get(i, label), finalPreference)
        }),
            ignoreItems = (arr || []).filter((i) => !containsInPreference(_get(i, label), finalPreference)),
            ordened = orderItems.sort((a, b) => getIndexOf(_get(a, label), finalPreference) - getIndexOf(_get(b, label), finalPreference))
        return ordened.concat(ignoreItems)
    }

}
