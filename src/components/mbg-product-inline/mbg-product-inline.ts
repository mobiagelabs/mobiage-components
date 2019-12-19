import './mbg-product-inline.scss'
import template from './mbg-product-inline.html'
import * as angular from 'angular'
import { OrderPreferences } from '../../helpers/order-preferences'

class MbgProductInlineController {
    private ngModel: Array<any>
    private x: { key: string, label: string }
    private y: { key: string, label: string }
    private gridValues: any
    private errorCallBackBarCode: Function

    constructor(
        public $scope,
        public $element,
        public $attrs,
        public $timeout,
        public $transclude) { }

    $onInit() {
        this.gridValues = {}
        this.$scope.$c = this.$scope.$parent
        this.ngModel = this.ngModel || []
        this.$scope.$watch('$ctrl.ngModel', () => this.handleModel(), true)
    }

    handleModel() {
        this.ngModel = OrderPreferences.order(this.ngModel, 'xDetail.value')
    }

    focusInput(element) {
        element.select()
    }

    changeBarCode(item) {
        if (this.errorCallBackBarCode) {
            const callBack = this.errorCallBackBarCode({ barCode: item.barCode })
            if (callBack && callBack.then) {
                callBack.then((response) => {
                    this.$timeout(() => {
                        item.inputError = !!response
                    })
                })
            } else {
                this.$timeout(() => item.inputError = !!callBack)
            }
        }
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
        ngModel: '=?',
        maxHeight: '=?',
        errorCallBackBarCode: '&?'
    },
    template,
    controller: MbgProductInlineController,
}

export { mbgProductInline }
