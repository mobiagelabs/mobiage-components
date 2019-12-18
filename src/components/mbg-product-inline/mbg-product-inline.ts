import './mbg-product-inline.scss'
import template from './mbg-product-inline.html'
import * as angular from 'angular'

class MbgProductInlineController {
    private ngModel: Array<any>
    private details: Array<any>
    private transcludeTemplate
    private x: { key: string, label: string }
    private y: { key: string, label: string }
    private grid: {
        x?: Array<any>,
        y?: Array<any>,
    }
    private gridValues: any

    constructor(
        public $scope,
        public $element,
        public $attrs,
        public $timeout,
        public $transclude) { }

    $onInit() {
        this.grid = {}
        this.gridValues = {}
        this.$scope.$c = this.$scope.$parent
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
                if (xItem && ((xItem && xItem.id === item.xDetail.id) || angular.equals(xItem, item.xDetail))) {
                    this.grid.y.forEach((yItem, yIndex) => {
                        if (yItem && ((yItem && yItem.id === item.yDetail.id) || angular.equals(yItem, item.yDetail))) {
                            this.gridValues[xIndex] = this.gridValues[xIndex] || {}
                            this.gridValues[xIndex][yIndex] = this.gridValues[xIndex][yIndex] || {}
                            this.gridValues[xIndex][yIndex] = Object.assign({}, item)
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

    handleInlineValues() {
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
}

MbgProductInlineController.$inject = [
    '$scope',
    '$element',
    '$attrs',
    '$timeout',
    '$transclude'
]

const mbgProductInline = {
    transclude: true,
    bindings: {
        x: '=?',
        y: '=?',
        details: '=?',
        ngModel: '=?',
        maxHeight: '=?'
    },
    template,
    controller: MbgProductInlineController,
}

export { mbgProductInline }
