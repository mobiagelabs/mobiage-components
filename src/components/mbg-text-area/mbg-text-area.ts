import './mbg-text-area.scss'
import template from './mbg-text-area.html'

class MbgTextAreaController {
    private ngChange
    private ngModel
    private ngRequired
    private ngDisabled
    private props

    constructor($scope, $element, $attrs) {
        if ($attrs.ngRequired === '') { this.ngRequired = true }
        if ($attrs.ngDisabled === '') { this.ngDisabled = true }
    }
    onChange() {
        if (this.ngChange) {
            this.ngChange({})
        }
    }
}
MbgTextAreaController.$inject = ['$scope', '$element', '$attrs']

const mbgTextArea = {
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
        placeholder: '@?',
    },
    template,
    controller: MbgTextAreaController,
}

export { mbgTextArea }
