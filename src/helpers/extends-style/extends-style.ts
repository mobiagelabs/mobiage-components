import * as angular from 'angular'

export class NgExtendsStyle {
    private restrict: string
    private replace: boolean
    private scope: any

    constructor() {
        this.restrict = 'A'
        this.replace = true
        this.scope = false
    }

    link(scope, elm, attrs) {
        const handleSize = () => {
            if (attrs.extendsStyle) {
                const elmToExtends: any = angular.element(attrs.mbgExtendsStyle)
                const style = {}
                const extendsStyle = (attrs.extendsStyle || '').split(',')
                extendsStyle.forEach((attrToExtends) => {
                    switch (attrToExtends) {
                        case 'max-height':
                            style['max-height'] = `${elmToExtends.height()}px`
                            break
                        case 'height':
                            style['height'] = `${elmToExtends.height()}px`
                            break
                        case 'width':
                            style['width'] = `${elmToExtends.width()}px`
                            break
                        case 'max-width':
                            style['max-width'] = `${elmToExtends.width()}px`
                            break
                        default:
                            style[attrToExtends] = elmToExtends[0].style[attrToExtends]
                            break
                    }
                })
                elm.css(style)
            }
        }
        scope.$watch(handleSize)
    }

}

NgExtendsStyle['$inject'] = []
