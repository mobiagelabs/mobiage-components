import './mbg-input-cpf.scss'
import template from './mbg-input-cpf.html'

class MbgInputCpfController {
    private ngChange
    privatengModel
    private ngRequired
    private ngDisabled
    private props
    public valid = true

    constructor($scope, $element, $attrs) {
        if ($attrs.ngRequired === '') { this.ngRequired = true }
        if ($attrs.ngDisabled === '') { this.ngDisabled = true }
        this.props = {
            placeholder: $attrs.placeholder || '',
        }
    }

    ngBlur(evt) {
        this.valid = this.validCpf(evt.$event.target.value)
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
        let cpf = digits + sumDigits
        return cpf
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

    onChange() {
        if (this.ngChange) {
            this.ngChange({})
        }
    }
}
MbgInputCpfController.$inject = ['$scope', '$element', '$attrs']

const mbgInputCpf = {
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
    controller: MbgInputCpfController,
}

export { mbgInputCpf }
