import './mbg-input-money.scss'
import template from './mbg-input-money.html'

class MbgInputMoneyController {
    private ngChange
    private ngModel
    private ngRequired
    private ngDisabled
    private props
    private ngKeyup: Function

    constructor(public $scope, public $element, public $attrs) {
        if ($attrs.ngRequired === '') { this.ngRequired = true }
        if ($attrs.ngDisabled === '') { this.ngDisabled = true }
        this.props = {
            placeholder: $attrs.placeholder || '',
            prefix: $attrs.prefix || 'R$ ',
            decimal: $attrs.decimal || ',',
            thousands: $attrs.decimal || '.',
            precision: this.$scope.$parent.$eval($attrs.precision) || 2,
            allowNegative: $attrs.allowNegative ? JSON.parse($attrs.allowNegative) : true,
            allowZero: $attrs.allowZero ? JSON.parse($attrs.allowZero) : false,
            allowEmpty: $attrs.allowEmpty ? JSON.parse($attrs.allowEmpty) : false,
        }
    }

    onChange() {
        if (this.ngChange) {
            this.ngChange({})
        }
    }

    selectInput() {
        this.$element.find('input').select()
    }

}

MbgInputMoneyController.$inject = ['$scope', '$element', '$attrs']

const mbgInputMoney = {
    bindings: {
        ngModel: '=',
        ngChange: '&?',
        ngRequired: '=?',
        ngDisabled: '=?',
        ngBlur: '&?',
        ngFocus: '&?'
    },
    template,
    controller: MbgInputMoneyController,
}

export { mbgInputMoney }
