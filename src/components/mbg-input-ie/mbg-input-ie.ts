import './mbg-input-ie.scss'
import template from './mbg-input-ie.html'
import { Capitalize } from '../../helpers/capitalize'

class MbgInputIeController {
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

MbgInputIeController.$inject = ['$scope', '$element', '$attrs']

const mbgInputIe = {
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
        state: '=?',
        name: '@?'
    },
    template,
    controller: MbgInputIeController,
}

export { mbgInputIe }
