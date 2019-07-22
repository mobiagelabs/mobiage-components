import './mbg-checkbox.scss'
import template from './mbg-checkbox.html'

export class MbgCheboxController {
    private ngModel
    private ngChange
    private ngDisabled

    constructor(public $scope, public $element, public $attrs, public $timeout, public $transclude) { }

    toogleModel(evt) {
        if (this.ngDisabled) {
            return
        }
        evt.stopPropagation()
        this.ngModel = !this.ngModel
        this.$timeout(() => {
            if (this.ngChange) { this.ngChange() }
        })
    }

}

MbgCheboxController.$inject = ['$scope', '$element', '$attrs', '$timeout', '$transclude']

const mbgCheckbox = {
    bindings: {
        ngModel: '=?',
        ngChange: '&?',
        ngRequired: '=?',
        ngDisabled: '=?',
    },
    template,
    controller: MbgCheboxController,
}

export { mbgCheckbox }
