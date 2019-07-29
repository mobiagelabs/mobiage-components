export namespace AbsPosition {

    export function get(el: any) {
        const rect = el.getBoundingClientRect()
        return {
            top: rect.top + window.pageYOffset,
            left: rect.left + window.pageXOffset,
        }
    }

}
