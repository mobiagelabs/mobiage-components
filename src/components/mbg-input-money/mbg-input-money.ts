import './mbg-input-money.scss'
import template from './mbg-input-money.html'
import { mbgInputMoneyDirective } from './mbg-input-money.directive'

class MbgInputMoneyController {
    private ngChange
    private ngModel
    private ngRequired
    private ngDisabled
    private props

    constructor($scope, $element, $attrs) {
        if ($attrs.ngRequired === '') { this.ngRequired = true }
        if ($attrs.ngDisabled === '') { this.ngDisabled = true }
        this.props = {
            placeholder: $attrs.placeholder || '',
        }
    }
    onChange() {
        if (this.ngChange) {
            this.ngChange({})
        }
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
