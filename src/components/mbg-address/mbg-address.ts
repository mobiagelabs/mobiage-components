import './mbg-address.scss'
import template from './mbg-address.html'
import { getStatesBR } from './helpers/states-br'
import { premisseTypes } from './helpers/premisse-types'
import { MbgAddressService } from './services/mbg-address.service'
import * as angular from 'angular'

class MbgAddressController {
    private ngModel
    private citiesCache: any
    private premisseCache: any
    private address: {
        zipCode?: string,
        localization?: string,
        premisse?: string,
        premisseType?: string,
        number?: string,
        neighbourhood?: string,
        information?: string,
        stateCode?: string,
        formalCode?: string,
        uf?: { initial: string, name: string },
    }
    private cities: Array<any>
    private premisses: Array<any>
    public notFound: Function

    constructor(public $scope,
        public $element,
        public $attrs,
        public $timeout,
        public mbgAddressService: MbgAddressService) { }

    $onInit() {
        this.premisseCache = {}
        this.citiesCache = {}
        this.address = {}
        this.$scope.$watch('$ctrl.ngModel', () => this.checkModel(), true)
        this.$scope.$watch('$ctrl.address', () => {
            if (this.address) {
                this.ngModel = {
                    country: 'Brasil',
                    latitude: 0,
                    longitude: 0,
                    zipCode: this.address.zipCode || '',
                    localization: this.address.localization || '',
                    premisse: this.formatFromPremisse(this.address.premisse) || '',
                    premisseType: this.address.premisseType || '',
                    number: this.address.number || '',
                    neighbourhood: this.address.neighbourhood || '',
                    information: this.address.information || '',
                    stateCode: this.address.stateCode || '',
                    formalCode: this.address.formalCode || '',
                    state: this.address.uf && this.address.uf.initial ? this.address.uf.initial : '',
                }
            }
        }, true)
    }

    onChangeCep() {
        this.resetAddress()
        this.updateSteps()
        if (this.address.zipCode) {
            this.searchAddressByCEP()
        }
    }

    checkModel() {
        if (this.hasDiference()) {
            this.address = this.createAddress()
            if (this.ngModel.searchZipCode && this.address.zipCode && !this.address.uf) {
                delete this.ngModel.searchZipCode
                this.onChangeCep()
            }
        }
    }

    getPremisseType(premisse) {
        premisse = premisse.toUpperCase()
        for (let i = 0; i < premisseTypes.length; i += 2) {
            if (premisse.startsWith(premisseTypes[i] + ' ')) {
                return premisseTypes[i]
            }
        }
        return ''
    }

    formatFromPremisse(str) {
        str = str || ''
        if (str.includes('-')) {
            return str.substring(0, str.lastIndexOf('-')).trim()
        }
        return str.trim()
    }

    focusInputCep() {
        this.$element.find('.input-cep-wrapper input').focus()
    }

    createAddress() {
        if (!this.ngModel) {
            return {}
        }
        const uf = getStatesBR().filter((state) => state.initial === this.ngModel.state)[0]
        return {
            zipCode: this.ngModel.zipCode.replace('-', ''),
            neighbourhood: this.ngModel.neighbourhood,
            localization: this.ngModel.localization,
            premisse: this.formatFromPremisse(this.ngModel.premisse),
            number: this.ngModel.number || '',
            premisseType: this.ngModel.premisseType || '',
            stateCode: this.ngModel.stateCode || '',
            information: this.ngModel.information || '',
            formalCode: this.ngModel.formalCode || '',
            uf,
        }
    }

    hasDiference() {
        const address = this.createAddress()
        return !angular.equals(address, this.address)
    }

    updateSteps() {
        Array.from(this.$element.find('mbg-input-step-item input'))
            .map((elm: any) => angular.element(elm).scope())
            .forEach((scope: any) => {
                scope.$ctrl.updateInputValue()
            })
    }

    simuleClick() {
        if (!this.address.uf || !this.address.localization || !this.address.premisse || !this.address.number) {
            this.$element.find('mbg-input-step .mb-input-step-wrapper').click()
        }
    }

    resetAddress() {
        delete this.address.uf
        delete this.address.localization
        delete this.address.premisse
        delete this.address.neighbourhood
        delete this.address.premisseType
        delete this.address.number
        delete this.address.stateCode
        delete this.address.information
        delete this.address.formalCode
    }

    async searchAddressByCEP() {
        if (this.address
            && this.address.zipCode) {
            this.mbgAddressService.getCep(this.address.zipCode)
                .then((response) => {
                    if (response && response.data && response.data.resultado !== '0') {
                        const uf = getStatesBR().filter((state) => state.initial === response.data.uf)[0]
                        this.address = {
                            zipCode: this.address.zipCode.replace('-', ''),
                            neighbourhood: response.data.bairro ? response.data.bairro.trim() : '',
                            localization: this.address.localization ? this.address.localization : response.data.cidade.trim(),
                            premisse: this.formatFromPremisse(response.data.logradouro),
                            number: this.address.number || '',
                            information: this.address.information || '',
                            premisseType: response.data.tipo_logradouro,
                            stateCode: response.data.codigo_estado,
                            formalCode: response.data.ibge_cod_cidade,
                            uf,
                        }
                        this.updateSteps()
                        this.$timeout(() => this.simuleClick())
                    } else {
                        this.notFound()
                    }
                })
        }
    }

    searchAddressInfo() {
        this.$timeout(() => {
            if (this.address.uf
                && this.address.localization
                && this.address.premisse
                && this.address.number
                && this.address.neighbourhood
                && !this.address.zipCode) {
                this.mbgAddressService
                    .getAddress(this.address.uf.initial, this.address.localization, this.address.premisse, this.address.neighbourhood)
                    .then((response) => {
                        if (response.data.length > 0) {
                            const info = response.data[0]
                            this.address.neighbourhood = info.bairro
                            this.address.stateCode = info.codigoIbgeUF
                            this.address.formalCode = info.codigoIbgeCidade
                            this.address.premisseType = this.getPremisseType(info.logradouro)
                            if (!this.address.zipCode) {
                                this.address.zipCode = info.cep.replace('-', '')
                            }
                        }
                    })
            }
        })
    }

    onCityChange() {
        this.$timeout(async () => {
            if (this.address.uf && this.address.localization) {
                const premisses = await this.loadPremisseByUFAndCity(this.address.uf.initial, this.address.localization)
                this.$timeout(() => {
                    this.premisses = premisses
                })
            }
        })
    }

    onUfChange() {
        this.$timeout(async () => {
            if (this.address.uf) {
                const cities = await this.loadCitiesByUF(this.address.uf.initial)
                this.$timeout(() => {
                    this.cities = cities
                })
            } else {
                delete this.address.neighbourhood
                delete this.address.premisseType
            }
        })
    }

    async loadPremisseByUFAndCity(uf, city) {
        if (this.premisseCache[`${uf}-${city}`]) {
            return this.premisseCache[`${uf}-${city}`]
        }
        return this.mbgAddressService
            .getPremisseByUFAndCity(uf, city)
            .then((response) => {
                this.premisseCache[`${uf}-${city}`] = response.data
                return this.premisseCache[`${uf}-${city}`]
            })
    }

    async loadCitiesByUF(uf) {
        if (uf) {
            if (this.citiesCache[uf]) {
                return this.citiesCache[uf]
            }
            return this.mbgAddressService
                .getCitiesByUF(uf)
                .then((response) => {
                    this.citiesCache[uf] = response.data
                    return this.citiesCache[uf]
                })
        } else {
            delete this.address.neighbourhood
            delete this.address.premisseType
        }
        return null
    }

    getStates(query: string) {
        return getStatesBR()
            .filter((state) => {
                return state.name && this.removeEspecialChar(state.name)
                    .toLowerCase()
                    .startsWith(this.removeEspecialChar(query).toLowerCase())
                    || state.initial.toLowerCase() === query.toLowerCase()
            })
    }

    getCities(query) {
        return (this.cities || [])
            .filter((city) => {
                return city && this.removeEspecialChar(city)
                    .toLowerCase()
                    .startsWith(this.removeEspecialChar(query).toLowerCase())
            })
            .sort((a, b) => {
                if (a < b) { return -1 }
                if (a > b) { return 1 }
                return 0
            })
    }

    getPremisses(query) {
        return (this.premisses || [])
            .filter((premisse) => {
                return premisse && this.removeEspecialChar(premisse)
                    .toLowerCase()
                    .includes(this.removeEspecialChar(query).toLowerCase())
            })
            .sort((a, b) => {
                if (a < b) { return -1 }
                if (a > b) { return 1 }
                return 0
            })
            .slice(0, 50)
    }

    removeEspecialChar(str = '') {
        str = str.replace(/[áàãâä]/ui, 'a')
        str = str.replace(/[éèêë]/ui, 'e')
        str = str.replace(/[íìîï]/ui, 'i')
        str = str.replace(/[óòõôö]/ui, 'o')
        str = str.replace(/[úùûü]/ui, 'u')
        str = str.replace(/[ç]/ui, 'c')
        return str
    }

}

MbgAddressController.$inject = ['$scope', '$element', '$attrs', '$timeout', 'mbgAddressService']

const mbgAddress = {
    bindings: {
        ngModel: '=',
        notFound: '&?',
        cepClass: '=?',
        onFinishFocusElement: '@?',
    },
    template,
    controller: MbgAddressController,
}

export { mbgAddress }
