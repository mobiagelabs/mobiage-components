import './mbg-input-checkbox.scss'
import template from './mbg-input-checkbox.html'

class MbgInputCheckboxController {
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
        }
    }

    onChange() {
        if (this.ngChange) {
            this.ngChange({})
        }
    }

}
MbgInputCheckboxController.$inject = ['$scope', '$element', '$attrs']

const mbgInputCheckbox = {
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
        type: '@?'
    },
    template,
    controller: MbgInputCheckboxController,
}

export { mbgInputCheckbox }
