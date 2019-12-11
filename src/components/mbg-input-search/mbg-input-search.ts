import './mbg-input-search.scss'
import template from './mbg-input-search.html'

class MbgInputTextController {
    private ngChange
    private ngModel
    private ngRequired
    private ngDisabled
    private props
    private placeholder

    constructor(public $scope, public $element, public $attrs, public $timeout, public $compile) {
        if ($attrs.ngRequired === '') { this.ngRequired = true }
        if ($attrs.ngDisabled === '') { this.ngDisabled = true }
        try {
            const evalPlaceholder = this.$scope.$parent.$eval(this.$attrs.placeholder)
            this.placeholder = evalPlaceholder ? evalPlaceholder : evalPlaceholder === '' ? '' : this.$attrs.placeholder
        } catch (e) {
            this.placeholder = this.$attrs.placeholder
        }
    }

    onChange() {
        if (this.ngChange) {
            this.ngChange({})
        }
    }

}

MbgInputTextController.$inject = ['$scope', '$element', '$attrs', '$timeout', '$compile']

const mbgInputSearch = {
    transclude: true,
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
        ngTopLayout: '=?',
        ngModelOptions: '=?'
    },
    template,
    controller: MbgInputTextController,
}

export { mbgInputSearch }
