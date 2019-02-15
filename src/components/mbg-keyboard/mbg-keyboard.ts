import './mbg-keyboard.scss'
import template from './mbg-keyboard.html'
import * as angular from 'angular'
import { MbgDeviceCheck } from '../../helpers/mbg-device-check'

export class MbgKeyboard {
    private bindClick: any
    private activeColor: string
    private currentActiveElement
    private lastBorderElement: string
    private rowsButtons: Array<{ buttons: Array<{ code: any, label: string }> }>
    private options: Array<{ content: string, onClick: Function, enable: boolean }>
    private focusElement: string

    constructor(public $scope, public $element, public $attrs, public $timeout, public $interval, public $sce) { }

    $onInit() {
        this.createButtons()
        this.bindClick = angular.element(document)
            .on('click', (evt) => this.checkActiveElement(evt))
            .on('keydown', (evt) => this.checkActiveElement(evt))
        this.focusInitialElement()
    }

    focusInitialElement() {
        if (this.focusElement) {
            this.$timeout(() => {
                angular.element(this.focusElement).focus()
                this.checkActiveElement()
            })
        }
    }

    transformHTMLContent(content) {
        return this.$sce.trustAsHtml(content)
    }

    handleOptionClick(option) {
        option.enable = !option.enable
        if (option.onClick) {
            option.onClick(option)
        }
    }

    createButtons() {
        this.rowsButtons = [
            {
                buttons: [
                    { code: 55, label: '7' },
                    { code: 56, label: '8' },
                    { code: 57, label: '9' },
                    { code: 'CLEAR', label: 'C' },
                ]
            },
            {
                buttons: [
                    { code: 52, label: '4' },
                    { code: 53, label: '5' },
                    { code: 54, label: '6' },
                    { code: 'BACKSPACE', label: '<' },
                ]
            },
            {
                buttons: [
                    { code: 49, label: '1' },
                    { code: 50, label: '2' },
                    { code: 51, label: '3' },
                    { code: 120, label: 'x' },
                ]
            },
            {
                buttons: [
                    { code: 48, label: '0' },
                    { code: '48 48', label: '00' },
                    { code: 44, label: ',' },
                    { code: 45, label: '-' },
                ]
            }
        ]
    }

    $onDestroy() {
        this.bindClick.unbind()
    }

    elementEnableVirtualKeyboard(elm) {
        const elmScope = elm.parent().scope()
        return elmScope.$ctrl && elmScope.$ctrl.$attrs && elmScope.$ctrl.$attrs.hasOwnProperty('enableKeyboard')
    }

    checkActiveElement(evt?) {
        this.$timeout(() => {
            const activeTempElement = angular.element(document.activeElement)
            this.beforeActiveElement()
            if (activeTempElement.closest('.mbg-input-wrapper').length === 1 && this.elementEnableVirtualKeyboard(activeTempElement)) {
                this.hideNativeKeyboard(activeTempElement)
                this.currentActiveElement = activeTempElement
                this.afterActiveElement()
            } else if (this.currentActiveElement
                && (activeTempElement.closest('.mbg-keyboard-wrapper').length === 1
                    || (evt && angular.element(evt.target).closest('.mbg-keyboard-wrapper').length === 1))) {
                this.currentActiveElement.focus()
                this.afterActiveElement()
            } else {
                delete this.currentActiveElement
            }
        })
    }

    hideNativeKeyboard(activeTempElement) {
        if (MbgDeviceCheck.isMobileOrTablet()) {
            activeTempElement.attr('readonly', 'readonly') // Force keyboard to hide on input field.
            activeTempElement.attr('disabled', 'true') // Force keyboard to hide on textarea field.
            this.$timeout(() => {
                activeTempElement.blur()
                activeTempElement.removeAttr('readonly')
                activeTempElement.removeAttr('disabled')
            }, 100)
        }
    }

    onButtonClick(itemCode) {
        this.currentActiveElement.focus()
        if (itemCode) {
            this.onItemKeyboardPress(itemCode.toString())
        }
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
        this.$timeout(() => {
            const nativeActiveElement = this.currentActiveElement[0]
            const eventObj: any = document.createEvent('Events')
            eventObj.initEvent('keydown', true, true)
            eventObj.which = key
            eventObj.keyCode = key
            nativeActiveElement.dispatchEvent(eventObj)
        })
    }

    clearValue() {
        this.currentActiveElement.val('')
        this.currentActiveElement.trigger('input')
    }

    applyValue(key: number) {
        key = Number(key)
        const nativeActiveElement = this.currentActiveElement[0]
        if ((nativeActiveElement.hasAttribute('mbg-input-money') || nativeActiveElement.hasAttribute('type="number"'))
            && (key === 44 || key === 45 || key === 120 || key === 13)) {
            return
        }
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
        if (nativeActiveElement.type === 'number') {
            const currentVal = this.currentActiveElement.val()
            this.currentActiveElement.val(this.replaceAt(currentVal, currentVal.length - 1, ''))
        }
        this.currentActiveElement.trigger('input')
    }

}

MbgKeyboard.$inject = ['$scope', '$element', '$attrs', '$timeout', '$interval', '$sce']

const mbgKeyboard = {
    bindings: {
        activeColor: '@?',
        focusElement: '@?',
        options: '=?',
    },
    template,
    controller: MbgKeyboard,
}

export { mbgKeyboard }
