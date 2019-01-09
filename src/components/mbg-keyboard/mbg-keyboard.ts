import './mbg-keyboard.scss'
import template from './mbg-keyboard.html'
import * as angular from 'angular'

export class MbgKeyboard {
    private bindClick: any
    private activeColor: string
    private currentActiveElement
    private lastBorderElement: string

    constructor(public $scope, public $element, public $attrs, public $timeout, public $interval) { }

    $onInit() {
        this.bindClick = angular.element(document)
            .on('click', (evt) => this.checkActiveElement(evt))
            .on('keydown', (evt) => this.checkActiveElement(evt))
    }

    $onDestroy() {
        this.bindClick.unbind()
    }

    checkActiveElement(evt) {
        this.$timeout(() => {
            const activeTempElement = angular.element(document.activeElement)
            this.beforeActiveElement()
            if (activeTempElement.closest('.mbg-input-wrapper').length === 1) {
                this.currentActiveElement = activeTempElement
                this.afterActiveElement()
            } else if (this.currentActiveElement
                && (activeTempElement.closest('.mbg-keyboard-wrapper').length === 1
                    || angular.element(evt.target).closest('.mbg-keyboard-wrapper').length === 1)) {
                this.currentActiveElement.focus()
                this.afterActiveElement()
                const itemCode = activeTempElement.attr('data-keyboard-code')
                if (itemCode) {
                    this.onItemKeyboardPress(itemCode)
                }
            } else {
                delete this.currentActiveElement
            }
        })
    }

    onItemKeyboardPress(itemCode) {
        switch (itemCode) {
            case 'CLEAR':
                this.clearValue()
                break
            case 'BACKSPACE':
                this.backspace()
                break
            default:
                itemCode.split(' ').forEach((keyCode) => {
                    this.createKeypressEvent(keyCode)
                    this.applyValue(keyCode)
                })
        }
    }

    beforeActiveElement() {
        if (this.currentActiveElement) {
            this.currentActiveElement.css({ border: this.lastBorderElement })
        }
    }

    afterActiveElement() {
        this.lastBorderElement = this.currentActiveElement.css('border')
        this.currentActiveElement.css({ border: `1px solid ${this.activeColor}` })
    }

    createKeypressEvent(key: number) {
        const nativeActiveElement = this.currentActiveElement[0]
        const eventObj: any = document.createEvent('Events')
        eventObj.initEvent('keydown', true, true)
        eventObj.which = key
        eventObj.keyCode = key
        nativeActiveElement.dispatchEvent(eventObj)
    }

    clearValue() {
        this.currentActiveElement.val('')
        this.currentActiveElement.trigger('input')
    }

    applyValue(key: number) {
        const nativeActiveElement = this.currentActiveElement[0]
        if (nativeActiveElement.type === 'text') {
            const currentVal = this.currentActiveElement.val()
            const newValue = String.fromCharCode(key)
            let startPos = nativeActiveElement.selectionStart,
                endPos = nativeActiveElement.selectionEnd
            const pre = currentVal.substring(0, startPos)
            const post = currentVal.substring(endPos, currentVal.length)
            startPos += newValue.length
            this.currentActiveElement.val(pre + newValue + post)
            nativeActiveElement.setSelectionRange(startPos, startPos)
        }
        if (nativeActiveElement.type === 'number') {
            const currentVal = this.currentActiveElement.val()
            const newValue = String.fromCharCode(key)
            this.currentActiveElement.val(currentVal + newValue)
        }
        this.currentActiveElement.trigger('input')
    }

    replaceAt(str, index, chr) {
        if (index > str.length - 1) {
            return str
        }
        return str.substr(0, index) + chr + str.substr(index + 1)
    }

    backspace() {
        const nativeActiveElement = this.currentActiveElement[0]
        if (nativeActiveElement.type === 'text') {
            const currentVal = this.currentActiveElement.val()
            let startPos = nativeActiveElement.selectionStart
            this.currentActiveElement.val(this.replaceAt(currentVal, startPos - 1, ''))
            nativeActiveElement.setSelectionRange(startPos - 1, startPos - 1)
        }
        this.currentActiveElement.trigger('input')
    }

}

MbgKeyboard.$inject = ['$scope', '$element', '$attrs', '$timeout', '$interval']

const mbgKeyboard = {
    bindings: {
        activeColor: '@?',
    },
    template,
    controller: MbgKeyboard,
}

export { mbgKeyboard }
