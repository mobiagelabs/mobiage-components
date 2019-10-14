import './typeone.scss'
import template from './typeone.html'

class MbgCardTypeOneController {
    public hideValue: boolean
    public randomEmoji: string
    public luminosity: number
    public intervalFunction
    public card

    constructor(public $scope, public $element, public $attrs, public $timeout) { }

    $onInit() {
        this.hideValue = false
        this.randomEmoji = '🙈🙉🙊'
        this.luminosity = 0.5
        this.randomEmoji = this.generateRandomEmoji()
        this.syncValue()
        this.renderIcon()
        this.card.enableHideValues = this.card.enableHideValues === undefined ? true : this.card.enableHideValues
    }

    renderIcon() {
        const iconElement = this.$element[0].querySelector('.mbg-h-c-icon-wrapper')
        if (iconElement && this.card.icon) {
            const transformStringToElement = (str) => {
                const doc = new DOMParser().parseFromString(str, 'text/html')
                return doc.body.firstChild
            }
            const icon = transformStringToElement(this.card.icon)
            iconElement.replaceWith(icon)
        }
    }

    syncValue() {
        if (this.card.sync) {
            this.card.loading = true
            this.card.sync(this)
        }
    }

    setValue(value) {
        this.$timeout(() => {
            this.card.value = value
            this.card.loading = false
        }, 1000)
    }

    generateRandomEmoji = () => {
        const emojis = [
            '👏👏👏',
            '🙈🙉🙊',
            '🎉🎉🎉',
            '😎😎😎',
            '🔐🔐🔐'
        ]
        const rand = Math.floor(Math.random() * (emojis.length - 1))
        return emojis[rand]
    }

    toggleShowValue = () => {
        this.randomEmoji = this.generateRandomEmoji()
        this.hideValue = !this.hideValue
    }

    darkerColor = (hex) => {
        let lum = -0.15
        hex = String(hex).replace(/[^0-9a-f]/gi, '')
        if (hex.length < 6) {
            hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2]
        }
        lum = lum || 0
        let rgb = '#', c, i
        for (i = 0; i < 3; i++) {
            c = parseInt(hex.substr(i * 2, 2), 16)
            c = Math.round(Math.min(Math.max(0, c + (c * lum)), 255)).toString(16)
            rgb += ('00' + c).substr(c.length)
        }
        return rgb
    }

    $onDestroy() {
        if (this.intervalFunction) {
            clearInterval(this.intervalFunction)
        }
    }

}

MbgCardTypeOneController.$inject = ['$scope', '$element', '$attrs', '$timeout']

const mbgCardTypeone = {
    bindings: {
        card: '=',
        loading: '=?',
    },
    template,
    controller: MbgCardTypeOneController,
}

export { mbgCardTypeone }
