import './mbg-input-percentage.scss'
import template from './mbg-input-percentage.html'

class MbgInputPercentageController {
    private ngChange
    private ngModel
    private ngRequired
    private ngDisabled
    private props
    public valid = true

    constructor(public $scope, public $element, public $attrs) {
        if ($attrs.ngRequired === '') {
            this.ngRequired = true
        }
        if ($attrs.ngDisabled === '') {
            this.ngDisabled = true
        }
        this.props = {
            placeholder: $attrs.placeholder || '',
        }
    }

}
MbgInputPercentageController.$inject = ['$scope', '$element', '$attrs']

const mbgInputPercentage = {
    bindings: {
        ngModel: '=',
        ngChange: '&?',
        ngRequired: '=?',
        ngDisabled: '=?',
        ngBlur: '&?',
        ngFocus: '&?',
    },
    template,
    controller: MbgInputPercentageController,
}

export { mbgInputPercentage }
