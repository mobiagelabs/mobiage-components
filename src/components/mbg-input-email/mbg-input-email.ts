import './mbg-input-email.scss'
import template from './mbg-input-email.html'

class MbgInputEmailController {
    private ngChange
    private inputValue
    private ngModel
    private ngRequired
    private ngDisabled
    private props

    constructor(public $scope, public $element, public $attrs, public $timeout) {
        if ($attrs.ngRequired === '') { this.ngRequired = true }
        if ($attrs.ngDisabled === '') { this.ngDisabled = true }
        this.props = {
            placeholder: $attrs.placeholder || '',
        }
    }
    onChange() {
        this.$timeout(() => {
            if (this.isValidEmail(this.inputValue)) {
                this.ngModel = this.inputValue
            } else {
                this.ngModel = null
            }
            if (this.ngChange) {
                this.ngChange({})
            }
        })
    }

    isValidEmail(email: string) {
        /* tslint:disable */
        return /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email);
        /* tslint:enable */
    }

}
MbgInputEmailController.$inject = ['$scope', '$element', '$attrs', '$timeout']

const mbgInputEmail = {
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
    controller: MbgInputEmailController,
}

export { mbgInputEmail }
