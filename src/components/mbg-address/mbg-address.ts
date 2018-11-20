import './mbg-address.scss'
import template from './mbg-address.html'
import { getStatesBR } from './helpers/states-br'
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
        neighborhood?: string,
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
        this.$scope.$watch('$ctrl.address.zipCode', () => this.searchAddressByCEP())
        this.$scope.$watch('$ctrl.address.uf', () => this.onUfChange())
        this.$scope.$watch('$ctrl.address.localization', () => this.onCityChange())
        this.$scope.$watch('$ctrl.address.number', () => this.searchAddressInfo())
        this.$scope.$watch('$ctrl.address', () => {
            if (this.address) {
                this.ngModel = {
                    zipCode: this.address.zipCode || '',
                    localization: this.address.localization || '',
                    premisse: this.formatFromPremisse(this.address.premisse) || '',
                    premisseType: this.address.premisseType || '',
                    number: this.address.number || '',
                    neighborhood: this.address.neighborhood || '',
                    stateCode: this.address.stateCode || '',
                    formalCode: this.address.formalCode || '',
                    state: this.address.uf && this.address.uf.initial ? this.address.uf.initial : '',
                }
            }
        }, true)
    }

    checkModel() {
        if (this.hasDiference()) {
            this.address = this.createAddress()
            this.updateSteps()
        }
    }

    formatFromPremisse(str: string = '') {
        if (str.includes('-')) {
            return str.substring(0, str.lastIndexOf('-')).trim()
        }
        return str.trim()
    }

    createAddress() {
        if (!this.ngModel) {
            return {}
        }
        const uf = getStatesBR().filter((state) => state.initial === this.ngModel.state)[0]
        return {
            zipCode: this.ngModel.zipCode.replace('-', ''),
            neighborhood: this.ngModel.neighborhood,
            localization: this.ngModel.localization,
            premisse: this.formatFromPremisse(this.ngModel.premisse),
            number: this.ngModel.number || '',
            premisseType: this.ngModel.premisseType || '',
            stateCode: this.ngModel.stateCode || '',
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
        delete this.address.neighborhood
        delete this.address.premisseType
        delete this.address.number
        delete this.address.stateCode
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
                            neighborhood: response.data.bairro ? response.data.bairro.trim() : '',
                            localization: this.address.localization ? this.address.localization : response.data.cidade.trim(),
                            premisse: this.formatFromPremisse(response.data.logradouro),
                            number: this.address.number || '',
                            premisseType: response.data.tipo_logradouro,
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

    async searchAddressInfo() {
        if (this.address.uf
            && this.address.localization
            && this.address.premisse
            && this.address.number
            && !this.address.neighborhood) {
            this.mbgAddressService
                .getAddress(this.address.uf.initial, this.address.localization, this.address.premisse)
                .then((response) => {
                    if (response.data.length > 0) {
                        const info = response.data[0]
                        this.address.neighborhood = info.bairro
                        this.address.stateCode = info.codigoIbgeUF
                        this.address.formalCode = info.codigoIbgeCidade
                        if (!this.address.zipCode) {
                            this.address.zipCode = info.cep.replace('-', '')
                        }
                    }
                })
        } else {
            delete this.address.neighborhood
            delete this.address.premisseType
        }
    }

    async onCityChange() {
        if (this.address.uf && this.address.localization) {
            const premisses = await this.loadPremisseByUFAndCity(this.address.uf.initial, this.address.localization)
            this.$timeout(() => {
                this.premisses = premisses
            })
        }
    }

    async onUfChange() {
        if (this.address.uf) {
            const cities = await this.loadCitiesByUF(this.address.uf.initial)
            this.$timeout(() => {
                this.cities = cities
            })
        } else {
            delete this.address.neighborhood
            delete this.address.premisseType
        }
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
            delete this.address.neighborhood
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

    removeEspecialChar(str) {
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
        notFound: '&?'
    },
    template,
    controller: MbgAddressController,
}

export { mbgAddress }
