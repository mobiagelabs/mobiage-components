import './mbg-address.scss'
import template from './mbg-address.html'
import { getStatesBR } from './helpers/states-br'
import { MbgAddressService } from './services/mbg-address.service'

class MbgAddressController {
    private ngModel
    private citiesCache: any
    private premisseCache: any
    private address: {
        zipCode?: string,
        uf?: { initial: string, name: string },
        city?: string,
        premisse?: string,
        number?: string,
        neighborhood?: string
    }
    private cities: Array<any>
    private premisses: Array<any>

    constructor(public $scope,
        public $element,
        public $attrs,
        public $timeout,
        public mbgAddressService: MbgAddressService) { }

    $onInit() {
        this.premisseCache = {}
        this.citiesCache = {}
        this.address = {}
        this.$scope.$watch('$ctrl.address', () => {
            this.onUfChange()
            this.onCityChange()
            this.searchAddressInfo()
        }, true)
    }

    async searchAddressInfo() {
        if (this.address.uf
            && this.address.city
            && this.address.premisse
            && this.address.number
            && !this.address.neighborhood
            && !this.address.zipCode) {
            const address = `${this.address.uf.name} ${this.address.city} ${this.address.premisse} ${this.address.number}`
            this.mbgAddressService
                .getAddressInfo(address)
                .then((response) => {
                    if (response.data && response.data.results && response.data.results.length > 0) {
                        const info = response.data.results[0]
                        info.address_components.forEach((addressInfo) => {
                            if (addressInfo.types.indexOf('sublocality_level_1') !== -1) {
                                this.address.neighborhood = addressInfo.long_name
                            }
                            if (addressInfo.types.indexOf('postal_code') !== -1) {
                                this.address.zipCode = addressInfo.long_name
                            }
                        })
                    }
                })
        }
    }

    async onCityChange() {
        if (this.address.uf && this.address.city) {
            const premisses = await this.loadPremisseByUFAndCity(this.address.uf.initial, this.address.city)
            this.$timeout(() => {
                this.premisses = premisses
            })
        } else {
            delete this.address.neighborhood
            delete this.address.zipCode
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
            delete this.address.zipCode
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
                    .indexOf(this.removeEspecialChar(query).toLowerCase()) !== -1
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
        str = str.replace(/[^a-z0-9]/i, '_')
        str = str.replace(/_+/, '_')
        return str
    }

}

MbgAddressController.$inject = ['$scope', '$element', '$attrs', '$timeout', 'mbgAddressService']

const mbgAddress = {
    bindings: {
        ngModel: '='
    },
    template,
    controller: MbgAddressController,
}

export { mbgAddress }
