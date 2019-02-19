import './mbg-input-text.scss'
import * as angular from 'angular'
import template from './mbg-input-text.html'

class MbgInputTextController {
    private ngChange
    private ngModel
    private ngRequired
    private ngDisabled
    private props
    private ngKeydown

    constructor(public $scope, public $element, public $attrs) {
        if ($attrs.ngRequired === '') { this.ngRequired = true }
        if ($attrs.ngDisabled === '') { this.ngDisabled = true }
        this.props = {}
    }

    fillAttributes() {
        console.log(this.$attrs.$attr.hasOwnProperty('enableKeyboard'))
    }

    onChange() {
        if (this.ngChange) {
            this.ngChange({})
        }
    }

    onKeydown($event: Event) {
        $event.stopPropagation()
        if (this.ngKeydown) {
            this.ngKeydown({ $event })
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
        placeholder: '@?',
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
