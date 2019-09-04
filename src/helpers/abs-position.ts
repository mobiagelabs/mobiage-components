export namespace AbsPosition {
    export function get(el: any) {
        const rect = el.getBoundingClientRect()
        let zooms = []
        while (el) {
            const style = window.getComputedStyle(el)
            zooms.push(style.getPropertyValue('zoom'))
            el = el.offsetParent
        }
        zooms = zooms.filter((zoom) => zoom && Number(zoom) !== 1)
        const value = zooms.reduce((v, zoom) => v + parseFloat(zoom), 0) / zooms.length * 100
        if (!isNaN(value)) {
            return {
                top: (rect.top + window.pageYOffset) * (value / 100),
                left: (rect.left + window.pageXOffset) * (value / 100),
            }
        }
        return {
            top: (rect.top + window.pageYOffset),
            left: (rect.left + window.pageXOffset),
        }
    }
 }