import './mbg-product-grid.scss'
import template from './mbg-product-grid.html'

class MbgProductGridController {

    private details: Array<any>

    private x: { key: string, label: string }
    private y: { key: string, label: string }

    private grid: {
        x: Array<any>,
        y: Array<any>,
    }

    constructor(public $scope, public $element, public $attrs) { }

    getItemX() {
        return (this.details || []).filter((d) => d.type === this.x.key)
    }

    getItemY() {
        return (this.details || []).filter((d) => d.type === this.y.key)
    }

}

MbgProductGridController.$inject = ['$scope', '$element', '$attrs']

const mbgProductGrid = {
    bindings: {
        x: '=?',
        y: '=?',
        details: '=?'
    },
    template,
    controller: MbgProductGridController,
}

export { mbgProductGrid }
