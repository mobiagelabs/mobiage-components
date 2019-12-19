import './mbg-product-grid.scss'
import template from './mbg-product-grid.html'
import * as angular from 'angular'

class MbgProductGridController {
    private ngModel: Array<any>
    private details: Array<any>
    private showStock
    private enablePrice: boolean
    private ngDisabled: boolean
    private enableCurrentStock: boolean
    private x: { key: string, label: string }
    private y: { key: string, label: string }
    private grid: {
        x?: Array<any>,
        y?: Array<any>,
    }
    private gridValues
    private transcludeTemplate

    constructor(public $scope, public $element, public $attrs, public $timeout, public $transclude) { }

    $onInit() {
        this.grid = {}
        this.gridValues = {}
        this.$scope.$c = this.$scope.$parent
        this.enableCurrentStock = this.enableCurrentStock === undefined ? false : this.enableCurrentStock
        this.enablePrice = this.enablePrice === undefined ? true : this.enablePrice
        this.showStock = this.showStock === undefined ? true : this.showStock
        this.findTransclude()
        this.$scope.$watch('$ctrl.ngModel', () => this.handleModel(), true)
        this.$scope.$watch('$ctrl.details', () => this.handleModel(), true)
    }

    findTransclude() {
        this.$transclude(this.$scope, (cloneEl) => {
            angular.forEach(cloneEl, cl => {
                let element = angular.element(cl)[0]
                if (element.nodeName && element.nodeName === 'TEMPLATE') {
                    this.transcludeTemplate = element.innerHTML
                }
            })
        })
    }

    handleModel() {
        this.gridValues = {}
        this.ngModel = this.ngModel || []
        this.grid.x = this.getItemX()
        this.grid.y = this.getItemY()
        this.ngModel.forEach((item) => {
            this.grid.x.forEach((xItem, xIndex) => {
                if (xItem && ((xItem.id && xItem.id === item.xDetail.id) || JSON.stringify(xItem) ===  JSON.stringify(item.xDetail))) {
                    this.grid.y.forEach((yItem, yIndex) => {
                        if (yItem && ((yItem.id && yItem.id === item.yDetail.id) || JSON.stringify(xItem) ===  JSON.stringify(item.yDetail))) {
                            this.gridValues[xIndex] = this.gridValues[xIndex] || {}
                            this.gridValues[xIndex][yIndex] = this.gridValues[xIndex][yIndex] || {}
                            this.gridValues[xIndex][yIndex] = JSON.parse(JSON.stringify(item))
                        }
                    })
                }
            })
        })
    }

    getItemX() {
        return (this.details || []).filter((d) => d.type === this.x.key)
    }

    getItemY() {
        return (this.details || []).filter((d) => d.type === this.y.key)
    }

    handleGridValues() {
        this.$timeout(() => {
            this.ngModel = []
            Object.keys(this.gridValues)
                .forEach((xIndex) => {
                    Object.keys(this.gridValues[xIndex])
                        .map((yIndex) => {
                            return Object.assign({xDetail: this.grid.x[xIndex],
                                yDetail: this.grid.y[yIndex]}, this.gridValues[xIndex][yIndex])
                        })
                        .forEach((item) => this.ngModel.push(item))
                })
        })
    }

    toogleEnableItem(xIndex, yIndex) {
        this.gridValues[xIndex] = this.gridValues[xIndex] || {}
        this.gridValues[xIndex][yIndex] = this.gridValues[xIndex][yIndex] || {}
        this.gridValues[xIndex][yIndex].enable = !this.gridValues[xIndex][yIndex].enable
        this.handleGridValues()
    }

    focusInput(element) {
        element.select()
    }

}

MbgProductGridController.$inject = ['$scope', '$element', '$attrs', '$timeout', '$transclude']

const mbgProductGrid = {
    transclude: true,
    bindings: {
        x: '=?',
        y: '=?',
        details: '=?',
        ngModel: '=?',
        ngDisabled: '=?',
        activeAddOrRemove: '=?',
        activeEdit: '=?',
        extraButtonLabel: '@?',
        onClickExtraButton: '&?',
        onClickEditButton: '&?',
        inputLabel: '=?',
        showStock: '=?',
        enablePrice: '=?',
        enableCurrentStock: '=?'
    },
    template,
    controller: MbgProductGridController,
}

export { mbgProductGrid }
