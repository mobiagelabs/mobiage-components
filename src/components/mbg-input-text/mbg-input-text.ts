import './mbg-input-text.scss'
import template from './mbg-input-text.html'

class MbgInputTextController {
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
MbgInputTextController.$inject = ['$scope', '$element', '$attrs']

const mbgInputText = {
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
    controller: MbgInputTextController,
}

export { mbgInputText }
