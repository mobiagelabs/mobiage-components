import './mbg-input-number.scss'
import template from './mbg-input-number.html'

class MbgInputNumberController {
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
MbgInputNumberController.$inject = ['$scope', '$element', '$attrs']

const mbgInputNumber = {
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
        positive: '=?'
    },
    template,
    controller: MbgInputNumberController,
}

export { mbgInputNumber }
