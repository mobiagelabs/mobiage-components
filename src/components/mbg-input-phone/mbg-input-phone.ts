import './mbg-input-phone.scss'
import template from './mbg-input-phone.html'

class MbgInputPhoneController {
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

MbgInputPhoneController.$inject = ['$scope', '$element', '$attrs']

const mbgInputPhone = {
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
    controller: MbgInputPhoneController,
}

export { mbgInputPhone }
