import './mbg-input-cnpj.scss'
import template from './mbg-input-cnpj.html'

class MbgInputCnpjController {
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

    ngBlur(evt) {
        this.valid = this.validaCnpj(evt.$event.target.value)
    }

    validaCnpj(value) {
        let original = value
        let firstNumbers = value.substr(0, 12)
        let firstCalc = this.CalcDigits(firstNumbers, 5)
        let secondCalc = this.CalcDigits(firstCalc, 6)
        if (secondCalc === original) {
            return true
        }
        return false
    }

    CalcDigits(digits, positions = 10, sumDigits = 0) {
        digits = digits.toString()
        for (let i = 0; i < digits.length; i++) {
            sumDigits = sumDigits + (digits[i] * positions)
            positions--
            if (positions < 2) {
                positions = 9
            }
        }
        sumDigits = sumDigits % 11
        if (sumDigits < 2) {
            sumDigits = 0
        } else {
            sumDigits = 11 - sumDigits
        }
        let cnpj = digits + sumDigits
        return cnpj
    }

    onChange() {
        if (this.ngChange) {
            this.ngChange({})
        }
    }
}
MbgInputCnpjController.$inject = ['$scope', '$element', '$attrs']

const mbgInputCnpj = {
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
    controller: MbgInputCnpjController,
}

export { mbgInputCnpj }
