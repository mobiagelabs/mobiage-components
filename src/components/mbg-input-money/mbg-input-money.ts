import './mbg-input-money.scss'
import template from './mbg-input-money.html'
import { mbgInputMoneyDirective } from './mbg-input-money.directive'

class MbgInputMoneyController {
    private ngChange
    private ngModel
    private ngRequired
    private ngDisabled
    private props

    constructor(public $scope, public $element, public $attrs) {
        if ($attrs.ngRequired === '') { this.ngRequired = true }
        if ($attrs.ngDisabled === '') { this.ngDisabled = true }
        this.props = {
            placeholder: $attrs.placeholder || '',
            prefix: $attrs.prefix || 'R$ ',
            decimal: $attrs.decimal || ',',
            thousands: $attrs.decimal || '.',
            precision: $attrs.precision || 2,
            allowNegative: $attrs.allowNegative ? JSON.parse($attrs.allowNegative) : true,
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
        ngFocus: '&?',
        ngKeyup: '&?',
        ngKeypress: '&?',
        ngKeydown: '&?',
    },
    template,
    controller: MbgInputMoneyController,
}

export { mbgInputMoney }
