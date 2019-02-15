import './mbg-input-cpfcnpj.scss'
import template from './mbg-input-cpfcnpj.html'

class MbgInputCpfCnpjController {
    private ngChange
    privatengModel
    private ngRequired
    private ngDisabled
    private props
    public valid

    constructor(public $scope, public $element, public $attrs) {
        if ($attrs.ngRequired === '') { this.ngRequired = true }
        if ($attrs.ngDisabled === '') { this.ngDisabled = true }
        this.props = {
            placeholder: $attrs.placeholder || '',
        }
    }

    ngBlur(evt) {
        this.valid = evt.$event.target.value
        this.valid = this.valid.toString()
        this.valid = this.valid.replace(/[^0-9]/g, '')
        if (this.valid.length === 11) {
            this.validCpf(this.valid)
        }
        if (this.valid.length === 14) {
            this.validCnpj(this.valid)
        } else {
            return false
        }
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

    validCpf(value) {
        let digits = value.substr(0, 9)
        let firstCalc = this.CalcDigits(digits)
        let newCpf = this.CalcDigits(firstCalc, 11)
        if (newCpf === value) {
            return true
        } else {
            return false
        }
    }

    validCnpj(value) {
        let original = value
        let firstNumbers = value.substr(0, 12)
        let firstCalc = this.CalcDigits(firstNumbers, 5)
        let secondCalc = this.CalcDigits(firstCalc, 6)
        if (secondCalc === original) {
            return true
        }
        return false
    }

    onChange() {
        if (this.ngChange) {
            this.ngChange({})
        }
    }
}
MbgInputCpfCnpjController.$inject = ['$scope', '$element', '$attrs']

const mbgInputCpfCnpj = {
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
    controller: MbgInputCpfCnpjController,
}

export { mbgInputCpfCnpj }
