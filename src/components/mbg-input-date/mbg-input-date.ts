import './mbg-input-date.scss'
import template from './mbg-input-date.html'

class MbgInputDateController {
    private ngChange
    private ngModel
    private ngRequired
    private ngDisabled
    private props
    private format

    constructor(public $scope, public $element, public $attrs) {
        if ($attrs.ngRequired === '') { this.ngRequired = true }
        if ($attrs.ngDisabled === '') { this.ngDisabled = true }
        this.props = {
            placeholder: $attrs.placeholder || '',
        }
        this.format = 'DD/MM/YYYY'
    }

    onChange() {
        if (this.ngChange) {
            this.ngChange({})
        }
    }
}

MbgInputDateController.$inject = ['$scope', '$element', '$attrs']

const mbgInputDate = {
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
        format: '@?',
    },
    template,
    controller: MbgInputDateController,
}

export { mbgInputDate }
