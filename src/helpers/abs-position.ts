export namespace AbsPosition {

    export function get(el: any) {
        const box = el.getBoundingClientRect()
        const body = document.body
        const docElem = document.documentElement
        const scrollTop = window.pageYOffset || docElem.scrollTop || body.scrollTop
        const scrollLeft = window.pageXOffset || docElem.scrollLeft || body.scrollLeft
        const clientTop = docElem.clientTop
        const clientLeft = docElem.clientLeft
        const top = box.top + scrollTop - clientTop
        const left = box.left + scrollLeft - clientLeft
        return { top: top, left: left }
    }

}
