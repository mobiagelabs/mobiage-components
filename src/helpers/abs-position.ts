export namespace AbsPosition {

    export function get(el: any) {
        let xPos = 0
        let yPos = 0
        let zooms = []

        while (el) {
            const style = window.getComputedStyle(el)
            zooms.push(style.getPropertyValue('zoom'))
            if (el.tagName === 'BODY') {
                // deal with browser quirks with body/window/document and page scroll
                const xScroll = el.scrollLeft || document.documentElement.scrollLeft
                const yScroll = el.scrollTop || document.documentElement.scrollTop
                xPos += (el.offsetLeft - xScroll + el.clientLeft)
                yPos += (el.offsetTop - yScroll + el.clientTop)
            } else {
                // for all other non-BODY elements
                xPos += (el.offsetLeft - el.scrollLeft + el.clientLeft)
                yPos += (el.offsetTop - el.scrollTop + el.clientTop)
            }
            el = el.offsetParent
        }
        zooms = zooms.filter((zoom) => zoom && Number(zoom) !== 1)
        const value = zooms.reduce((v, zoom) => v + parseFloat(zoom), 0) / zooms.length * 100
        if (!isNaN(value)) {
            xPos = xPos * value / 100
            // 15 px padding
            yPos = (yPos - 15) * value / 100
        }
        return {
            left: xPos,
            top: yPos
        }
    }

}
