import './mbg-input-cnpj.scss'
import template from './mbg-input-cnpj.html'

class MbgInputCnpjController {
    private ngChange
    private ngModel
    private ngRequired
    private ngDisabled
    private props
    public valid = true

    constructor($scope, $element, $attrs) {
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
        this.valid = this.isValidCNPJ(evt.$event.target.value)
    }

    isValidCNPJ(cnpj: string) {
        let tamanho
        let numeros
        let digitos
        let soma
        let pos
        let resultado
        let i
        if (cnpj === '') {
            return true
        }
        cnpj = cnpj.replace(/[^\d]+/g, '')
        if (cnpj === '') {
            return false
        }
        if (cnpj.length !== 14) {
            return false
        }
        tamanho = cnpj.length - 2
        numeros = cnpj.substring(0, tamanho)
        digitos = cnpj.substring(tamanho)
        soma = 0
        pos = tamanho - 7
        for (i = tamanho; i >= 1; i--) {
            soma += numeros.charAt(tamanho - i) * pos--
            if (pos < 2) {
                pos = 9
            }
        }
        resultado = soma % 11 < 2 ? 0 : 11 - soma % 11
        if (resultado !== parseInt(digitos.charAt(0))) {
            return false
        }

        tamanho += 1
        numeros = cnpj.substring(0, tamanho)
        soma = 0
        pos = tamanho - 7
        for (i = tamanho; i >= 1; i--) {
            soma += numeros.charAt(tamanho - i) * pos--
            if (pos < 2) {
                pos = 9
            }
        }
        resultado = soma % 11 < 2 ? 0 : 11 - soma % 11
        if (resultado !== parseInt(digitos.charAt(1))) {
            return false
        }
        return true
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
