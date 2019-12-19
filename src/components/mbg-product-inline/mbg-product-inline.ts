import './mbg-product-inline.scss'
import template from './mbg-product-inline.html'
import * as angular from 'angular'
import { OrderPreferences } from '../../helpers/order-preferences'

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
        this.ngModel =  this.ngModel || []
        this.$scope.$watch('$ctrl.ngModel', () => this.handleModel(), true)
    }

    handleModel() {
        this.ngModel = OrderPreferences.order(this.ngModel, 'xDetail.value')
    }

    focusInput(element) {
        element.select()
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
