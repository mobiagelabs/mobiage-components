import './mbg-input-cpfcnpj.scss'
import template from './mbg-input-cpfcnpj.html'

class MbgInputCpfCnpjController {
    private ngChange
    privatengModel
    private ngRequired
    private ngDisabled
    private props
    public valid

    constructor($scope, $element, $attrs) {
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
            this.validaCpf(this.valid)
            console.log(this.validaCpf(this.valid), 'CPF')
        }
        if (this.valid.length === 14) {
            this.validaCnpj(this.valid)
            console.log(this.validaCnpj(this.valid), 'CNPJ')
        } else {
            return false
        }
    }

    CalcDigitos(digitos, posicoes = 10, somaDigitos = 0) {
        digitos = digitos.toString()
        for (let i = 0; i < digitos.length; i++) {
            somaDigitos = somaDigitos + (digitos[i] * posicoes)
            posicoes--
            if (posicoes < 2) {
                posicoes = 9
            }
        }
        somaDigitos = somaDigitos % 11
        if (somaDigitos < 2) {
            somaDigitos = 0
        } else {
            somaDigitos = 11 - somaDigitos
        }
        let cpf = digitos + somaDigitos
        return cpf
    }

    validaCpf(valor) {
        let digitos = valor.substr(0, 9)
        let firstCalc = this.CalcDigitos(digitos)
        let novoCpf = this.CalcDigitos(firstCalc, 11)
        if (novoCpf === valor) {
            return true
        } else {
            return false
        }
    }

    validaCnpj(valor) {
        let original = valor
        let primeirosNumeros = valor.substr(0, 12)
        let firstCalc = this.CalcDigitos(primeirosNumeros, 5)
        let secondCalc = this.CalcDigitos(firstCalc, 6)
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
