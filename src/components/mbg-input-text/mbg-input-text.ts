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
    private ngValue

    constructor(public $scope, public $element, public $attrs) {
        if ($attrs.ngRequired === '') { this.ngRequired = true }
        if ($attrs.ngDisabled === '') { this.ngDisabled = true }
        this.props = {}
    }

    $onInit() {
        if (this.ngValue) {
            this.ngModel = this.ngValue
        }
    }

    fillAttributes() {
        // console.log(this.$attrs.$attr.hasOwnProperty('enableKeyboard'))
    }

    onChange($event) {
        if (this.ngChange) {
            this.ngChange({ $event })
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
        ngValue: '=?',
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
