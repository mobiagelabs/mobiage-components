import './mbg-radio.scss'
import template from './mbg-radio.html'

export class MbgRadioController {
    private ngModel
    private ngChange

    constructor(public $scope, public $element, public $attrs, public $timeout, public $transclude) {
    }

    toogleModel(evt) {
        evt.stopPropagation()
        this.ngModel = !this.ngModel
        this.$timeout(() => {
            if (this.ngChange) { this.ngChange() }
        })
    }

}

MbgRadioController.$inject = ['$scope', '$element', '$attrs', '$timeout', '$transclude']

const mbgRadio = {
    bindings: {
        ngModel: '=?',
        ngValue: '=?',
        ngChange: '&?',
        ngRequired: '=?',
        ngDisabled: '=?',
    },
    template,
    controller: MbgRadioController,
}

export { mbgRadio }
