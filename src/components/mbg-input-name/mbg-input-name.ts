import './mbg-input-name.scss'
import template from './mbg-input-name.html'
import { Capitalize } from '../../helpers/capitalize'

class MbgInputNameController {
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

    $onInit() {
        this.ngModel = this.capitalize(this.ngModel || '')
    }


    capitalize(str) {
        return Capitalize.format(str)
    }

    onChange() {
        this.ngModel = this.capitalize(this.ngModel)
        if (this.ngChange) {
            this.ngChange({})
        }
    }
}

MbgInputNameController.$inject = ['$scope', '$element', '$attrs']

const mbgInputName = {
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
    controller: MbgInputNameController,
}

export { mbgInputName }
