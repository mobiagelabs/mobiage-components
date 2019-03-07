import * as angular from 'angular'

export namespace AbsPosition {

    export function get(el: any) {
        const rect = el.getBoundingClientRect()
        const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft
        let y = 0
        while (el && !isNaN(el.offsetLeft) && !isNaN(el.offsetTop)) {
            if (el.nodeName === 'BODY') {
                y += el.offsetTop - Math.max(angular.element('html').scrollTop(), angular.element('body').scrollTop())
            } else {
                y += el.offsetTop - el.scrollTop
            }
            el = el.offsetParent
        }
        return { top: y, left: rect.left + scrollLeft }
    }

}
