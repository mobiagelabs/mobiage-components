export namespace AbsPosition {

    function getTransformCoords(item) {
        const transArr = []
        if (!window.getComputedStyle) { return }
        const style = getComputedStyle(item),
            transform = style.transform || style.webkitTransform || style['mozTransform'] || style['msTransform']
        let mat = transform.match(/^matrix3d\((.+)\)$/)
        if (mat) { return parseFloat(mat[1].split(', ')[13]) }
        mat = transform.match(/^matrix\((.+)\)$/)
        mat ? transArr.push(parseFloat(mat[1].split(', ')[4])) : transArr.push(0)
        mat ? transArr.push(parseFloat(mat[1].split(', ')[5])) : transArr.push(0)
        return { left: transArr[0] || 0, top: transArr[1] || 0 }
    }

    export function get(el: any) {
        let x = 0, y = 0
        while (el && !isNaN(el.offsetLeft) && !isNaN(el.offsetTop)) {
            const coords: any = getTransformCoords(el)
            x += coords.left
            y += coords.top
            x += el.offsetLeft - el.scrollLeft + el.clientLeft
            y += el.offsetTop - el.scrollTop + el.clientTop
            el = el.offsetParent
        }
        return { top: y, left: x }
    }

}
