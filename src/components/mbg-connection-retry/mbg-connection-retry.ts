import './mbg-connection-retry.scss'
import template from './mbg-connection-retry.html'
import * as wifiImage from './assets/wifi-wipers.gif'

class MbgConnectionRetry {
    public wifiImage: string
    /**
     * registra se o computador está com rede ou não
     */
    public onLine: boolean
    /**
     * registra se possui erro ao se comunicar com o servidor
     */
    public connectionError: boolean
    /**
     * registra se está sendo feito uma tentativa de conexão
     */
    public verifing: boolean
    /**
     * registra o numero de tentativas de conexão
     */
    public verifingCount: number
    /**
     * informa a url que será feita o ping para verificar a disponibilidade
     */
    public pingUrl: string

    constructor(public $scope, public $element, public $attrs, public $timeout, public $http) { }

    $onInit() {
        this.verifingCount = 0
        this.onLine = navigator.onLine
        this.wifiImage = wifiImage
        this.connectionError = false
        window.addEventListener('online', this.handleConnectionChange)
        window.addEventListener('offline', this.handleConnectionChange)
        this.tryConnect()
    }

    $onDestroy() {
        window.removeEventListener('online', this.handleConnectionChange)
        window.removeEventListener('offline', this.handleConnectionChange)
    }

    handleConnectionChange = (evt) => {
        this.onLine = evt.type === 'online'
        this.tryConnect()
    }

    tryConnect = () => {
        if (this.verifing) { return }
        this.verifing = true
        this.verifingCount++
        this.$timeout(() => {
            if (!this.pingUrl) { throw `O atributo ping-url não foi informado ou não possui valor.` }
            if (!this.onLine) {
                this.verifingCount = 0
                this.verifing = false
                this.connectionError = true
            } else {
                return this.$http.get(this.pingUrl)
                    .then(() => {
                        this.verifing = false
                        this.verifingCount = 0
                        this.$timeout(() => this.connectionError = false)
                    })
                    .catch(() => {
                        this.connectionError = true
                        this.verifing = false
                        this.$timeout(() => this.tryConnect(), 1500)
                    })
            }
        })
    }

}

MbgConnectionRetry.$inject = ['$scope', '$element', '$attrs', '$timeout', '$http']

const mbgConnectionRetry = {
    bindings: {
        pingUrl: '@',
    },
    template,
    controller: MbgConnectionRetry,
}

export { mbgConnectionRetry, MbgConnectionRetry }
