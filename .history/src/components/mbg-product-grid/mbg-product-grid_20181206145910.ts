import './mbg-product-grid.scss'
import template from './mbg-product-grid.html'
import * as angular from 'angular'

class MbgProductGridController {
    private ngModel: Array<any>
    private details: Array<any>

    private x: { key: string, label: string }
    private y: { key: string, label: string }
    private grid: {
        x: Array<any>,
        y: Array<any>,
    }
    private gridValues

    constructor(public $scope, public $element, public $attrs, public $timeout) { }

    $onInit() {
        this.gridValues = {}
        this.$scope.$watch('$ctrl.ngModel', () => this.handleModel(), true)
        this.$scope.$watch('$ctrl.details', () => this.handleModel(), true)
    }

    handleModel() {
        this.gridValues = {}
        this.ngModel = this.ngModel || []
        this.ngModel.forEach((item) => {
            const xItems = this.getItemX()
            const yItems = this.getItemY()
            xItems.forEach((xItem, xIndex) => {
                if (xItem && ((xItem.id && xItem.id === item.xDetail.id) || angular.equals(xItem, item.xDetail))) {
                    yItems.forEach((yItem, yIndex) => {
                        if (yItem && ((yItem.id && yItem.id === item.yDetail.id) || angular.equals(yItem, item.yDetail))) {
                            this.gridValues[xIndex] = this.gridValues[xIndex] || {}
                            this.gridValues[xIndex][yIndex] = this.gridValues[xIndex][yIndex] || {}
                            this.gridValues[xIndex][yIndex] = {
                                stock: item.stock,
                                enable: item.enable,
                                price: item.price,
                            }
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
                            return {
                                xDetail: this.getItemX()[xIndex],
                                yDetail: this.getItemY()[yIndex],
                                stock: this.gridValues[xIndex][yIndex].stock,
                                enable: this.gridValues[xIndex][yIndex].enable,
                                price: this.gridValues[xIndex][yIndex].price,
                            }
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

}

MbgProductGridController.$inject = ['$scope', '$element', '$attrs', '$timeout']

const mbgProductGrid = {
    bindings: {
        x: '=?',
        y: '=?',
        details: '=?',
        ngModel: '=?',
        activeAddOrRemove: '=?',
        extraButtonLabel: '@?',
        onClickExtraButton: '&?',
        onClickEditButton: '&?',
    },
    template,
    controller: MbgProductGridController,
}

export { mbgProductGrid }
