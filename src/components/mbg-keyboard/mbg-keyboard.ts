import './mbg-keyboard.scss'
import template from './mbg-keyboard.html'
import * as angular from 'angular'
import { MbgDeviceCheck } from '../../helpers/mbg-device-check'

export class MbgKeyboard {
    private activeColor: string
    private currentActiveElement
    private rowsButtons: Array<{ buttons: Array<{ code: any, label: string }> }>
    private options: Array<{ content: string, onClick: Function, enable: boolean }>
    private focusElement: string
    private onEventListener
    private isMobileOrTablet: boolean
    private checkTimer

    constructor(public $scope, public $element, public $attrs, public $timeout, public $interval, public $sce) { }

    $onInit() {
        const self = this
        this.createButtons()
        this.onEventListener = (evt) => self.checkActiveElement(evt)
        document.addEventListener('click', this.onEventListener, false)
        document.addEventListener('keydown', this.onEventListener, false)
        window.addEventListener('focus', this.onEventListener, false)
        this.focusInitialElement()
        this.isMobileOrTablet = MbgDeviceCheck.isMobileOrTablet()
        this.checkTimer = this.$interval(() => {
            if (!this.currentActiveElement && document.activeElement) {
                this.onEventListener({ target: document.activeElement })
            }
        }, 500)
    }

    $onDestroy() {
        this.$interval.cancel(this.checkTimer)
        document.removeEventListener('click', this.onEventListener, false)
        document.removeEventListener('keydown', this.onEventListener, false)
        window.removeEventListener('focus', this.onEventListener, false)
    }

    focusInitialElement() {
        if (this.focusElement) {
            this.$timeout(() => {
                angular.element(this.focusElement).focus()
                this.$timeout(() => {
                    this.checkActiveElement()
                })
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

    elementEnableVirtualKeyboard(elm) {
        const elmScope = elm.parent().scope()
        return elmScope.$ctrl && elmScope.$ctrl.$attrs && elmScope.$ctrl.$attrs.hasOwnProperty('enableKeyboard')
    }

    checkActiveElement(evt?) {
        this.checkInputMbg(evt)
        const activeTempElement = evt && evt.target ? angular.element(evt.target) : null
        if (!activeTempElement) {
            return
        }
        this.$timeout(() => {
            this.beforeActiveElement()
            if (activeTempElement.closest('.mbg-input-wrapper').length === 1 && this.elementEnableVirtualKeyboard(activeTempElement)) {
                this.hideNativeKeyboard(activeTempElement)
                this.currentActiveElement = activeTempElement
                this.afterActiveElement()
            } else if (this.currentActiveElement
                && (activeTempElement.closest('.mbg-keyboard-wrapper').length === 1
                    || (evt && angular.element(evt.target).closest('.mbg-keyboard-wrapper').length === 1))) {
                if (!this.isMobileOrTablet) {
                    this.currentActiveElement.focus()
                }
                this.afterActiveElement()
            } else {
                delete this.currentActiveElement
            }
        })
    }

    checkInputMbg(evt) {
        if (this.isMobileOrTablet) {
            const elm = angular.element(evt.target)
            if (elm.closest('.mbg-input-wrapper').length === 1 && this.elementEnableVirtualKeyboard(elm)) {
                this.hideNativeKeyboard(elm)
            }
        }
    }

    hideNativeKeyboard(activeTempElement) {
        if (this.isMobileOrTablet) {
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
        if (!this.isMobileOrTablet) {
            this.currentActiveElement.focus()
        }
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
            this.currentActiveElement.css({ border: '1px solid #ddd' })
        }
    }

    afterActiveElement() {
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
            if (this.isMobileOrTablet) {
                this.currentActiveElement.val(currentVal + newValue)
            } else {
                if (key !== 13) {
                    let startPos = nativeActiveElement.selectionStart,
                        endPos = nativeActiveElement.selectionEnd
                    const pre = currentVal.substring(0, startPos)
                    const post = currentVal.substring(endPos, currentVal.length)
                    startPos += newValue.length
                    this.currentActiveElement.val(pre + newValue + post)
                    nativeActiveElement.setSelectionRange(startPos, startPos)
                }

            }
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
            if (this.isMobileOrTablet) {
                this.currentActiveElement.val(this.replaceAt(currentVal, currentVal.length - 1, ''))
            } else {
                let startPos = nativeActiveElement.selectionStart
                this.currentActiveElement.val(this.replaceAt(currentVal, startPos - 1, ''))
                nativeActiveElement.setSelectionRange(startPos - 1, startPos - 1)
            }
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
