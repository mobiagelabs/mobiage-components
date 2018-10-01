import './mbg-input-cpfcnpj.scss'
import template from './mbg-input-cpfcnpj.html'

class MbgInputCpfCnpjController {
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
        this.valid = this.isValidCPFCNPJ(evt.$event.target.value)
    }

    isValidCPFCNPJ(cpfcnpj: string) {
        if (cpfcnpj.length <= 14) {
            let soma = 0
            let resto
            let strCPF = cpfcnpj
            strCPF = strCPF.replace('.', '')
            strCPF = strCPF.replace('.', '')
            strCPF = strCPF.replace('.', '')
            strCPF = strCPF.replace('-', '')
            strCPF = strCPF.replace('/', '')
            if (strCPF === '00000000000') {
                return false
            }

            for (let i = 1; i <= 9; i++) {
                soma = soma + parseInt(strCPF.substring(i - 1, i), 10) * (11 - i)
            }
            resto = (soma * 10) % 11

            if ((resto === 10) || (resto === 11)) {
                resto = 0
            }
            if (resto !== parseInt(strCPF.substring(9, 10), 10)) {
                return false
            }
            soma = 0
            for (let i = 1; i <= 10; i++) {
                soma = soma + parseInt(strCPF.substring(i - 1, i), 10) * (12 - i)
            }
            resto = (soma * 10) % 11

            if ((resto === 10) || (resto === 11)) {
                resto = 0
            }
            if (resto !== parseInt(strCPF.substring(10, 11), 10)) {
                return false
            }
            return true
        }
        // if()
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
