import './mbg-input-number.scss'
import template from './mbg-input-number.html'

class MbgInputNumberController {
    private ngChange
    private ngModel
    private ngRequired
    private ngDisabled
    private props
    private avaliable: boolean
    constructor(public $scope, public $element, $attrs, public $compile, public $timeout) {
        if ($attrs.ngRequired === '') { this.ngRequired = true }
        if ($attrs.ngDisabled === '') { this.ngDisabled = true }
        this.avaliable = true
        this.props = {
            placeholder: $attrs.placeholder || '',
            precision: $attrs.precision || 0,
            allowNegative: $attrs.allowNegative ? JSON.parse($attrs.allowNegative) : false,
        }
    }

    $onInit() {
        if (this.props.allowNegative) {
            this.enableNegative()
        }
    }

    enableNegative() {
        this.$timeout(() => {
            let input = this.$element.find('input').clone()
            input.attr('ui-negative-number', 'true')
            input = this.$compile(input)(this.$scope)
            this.$element.find('input').replaceWith(input)
        })
    }

    onChange() {
        if (this.ngChange) {
            this.ngChange({})
        }
    }

}
MbgInputNumberController.$inject = ['$scope', '$element', '$attrs', '$compile', '$timeout']

const mbgInputNumber = {
    bindings: {
        ngModel: '=',
        ngChange: '&?',
        ngRequired: '=?',
        ngDisabled: '=?',
        ngBlur: '&?',
        ngFocus: '&?',
        positive: '=?'
    },
    template,
    controller: MbgInputNumberController,
}

export { mbgInputNumber }
