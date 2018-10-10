class MbgAddressService {
    private apiLocation = 'https://anothers.kigisistemas.com.br/services-api'
    private googleKey = 'AIzaSyAATuKM3qZOaw0oArk_zNUJMOtGfwhoUEI'
    private googleAPI = 'https://maps.google.com/maps/api/geocode/json'

    constructor(public $http) {
    }

    setApiLocation(api: string) {
        this.apiLocation = api
    }

    getCitiesByUF(uf: string) {
        return this.$http.get(`${this.apiLocation}/public/buscar-cidades?uf=${uf}`)
    }

    getPremisseByUFAndCity(uf: string, city: string) {
        return this.$http.get(`${this.apiLocation}/public/buscar-logradouros?uf=${uf}&cidade=${city}`)
    }

    getAddressInfo(address: string) {
        return this.$http.get(`${this.googleAPI}?address=${address}&key=${this.googleKey}`)
    }

}

MbgAddressService['inject'] = ['$http']

export { MbgAddressService }
