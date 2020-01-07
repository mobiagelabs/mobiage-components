import './mbg-input-text.scss'
import * as angular from 'angular'
import template from './mbg-input-text.html'
import * as _get from 'lodash.get'
import * as _set from 'lodash.set'

class MbgInputTextController {
    private inputElement
    private placeholder
    private mbgPlaceholder
    private mbgModel
    private mbgDisabled
    private mbgFocus
    private mbgBlur
    private mbgValue
    private mbgChange
    private mbgKeyup
    private mbgKeydown
    private mbgKeypress

    constructor(public $scope, public $element, public $attrs, public $timeout) { }

    $onInit() {
        this.$scope.$parent.$watch(() => this.$onChanges())
    }

    $onDestroy() {
        this.destroyEvents()
    }

    createEvents() {
        this.inputElement[0].addEventListener('keydown', this.onKeyDown)
        this.inputElement[0].addEventListener('keyup', this.onKeyUp)
        this.inputElement[0].addEventListener('keypress', this.onKeyPress)
        this.inputElement[0].addEventListener('paste', this.onPaste)
        this.inputElement[0].addEventListener('cut', this.onCut)
        this.inputElement[0].addEventListener('focus', this.onFocus)
        this.inputElement[0].addEventListener('blur', this.onBlur)
    }

    destroyEvents() {
        this.inputElement[0].removeEventListener('keydown', this.onKeyDown)
        this.inputElement[0].removeEventListener('keyup', this.onKeyUp)
        this.inputElement[0].removeEventListener('keypress', this.onKeyPress)
        this.inputElement[0].removeEventListener('paste', this.onPaste)
        this.inputElement[0].removeEventListener('cut', this.onCut)
        this.inputElement[0].removeEventListener('focus', this.onFocus)
        this.inputElement[0].removeEventListener('blur', this.onBlur)
    }

    onFocus = ($event) => {
        if (this.mbgFocus) { this.mbgFocus({ $event }) }
    }

    onBlur = ($event) => {
        if (this.mbgBlur) { this.mbgBlur({ $event }) }
    }

    onCut = ($event) => {
        this.changeModel($event.target.value)
    }

    onPaste = ($event) => {
        this.changeModel($event.target.value)
    }

    onKeyDown = ($event) => {
        if (this.mbgKeydown) { this.mbgKeydown({ $event }) }
    }

    onKeyPress = ($event) => {
        if (this.mbgKeypress) { this.mbgKeypress({ $event }) }
    }

    onKeyUp = ($event) => {
        if (this.mbgKeyup) { this.mbgKeyup({ $event }) }
        this.changeModel($event.target.value)
    }

    changeModel(value) {
        this.$timeout(() => {
            _set(this.$scope.$parent, this.mbgModel, value)
            this.onChangeText()
        })
    }

    onInitInput() {
        this.inputElement = this.$element.find('input')
        this.$onChanges()
        this.createEvents()
        this.processValue()
    }

    processPlaceholder() {
        if (this.placeholder) { this.inputElement.attr('placeholder', this.placeholder) }
        if (this.$attrs.mbgPlaceholder) {
            try {
                const placeholder = this.$scope.$parent.$eval(this.$attrs.mbgPlaceholder)
                this.inputElement.attr('placeholder', placeholder)
            } catch (e) { /** failed on execute eval */ }
        }
    }

    processDisabled() {
        try {
            let disabled = this.$scope.$parent.$eval(this.mbgDisabled)
            if (disabled === '') { disabled = true }
            disabled ? this.inputElement.attr('disabled', this.placeholder) : this.inputElement.removeAttr('disabled')
        } catch (e) { /** failed on execute eval */ }
    }

    processModel() {
        const value = _get(this.$scope.$parent, this.mbgModel)
        this.inputElement[0].value = value || ''
    }

    processValue() {
        try {
            if (this.$attrs.mbgValue) {
                const value = this.$scope.$parent.$eval(this.mbgValue)
                this.changeModel(value)
            }
        } catch (e) { /** failed on execute eval */ }
    }

    $onChanges = () => {
        if (this.inputElement) {
            this.processPlaceholder()
            this.processModel()
            this.processDisabled()
        }
    }

    onChangeText = () => {
        if (this.mbgChange) {
            this.mbgChange({})
        }
    }

}

MbgInputTextController.$inject = ['$scope', '$element', '$attrs', '$timeout']

const mbgInputText = {
    bindings: {
        placeholder: '@?',
        mbgModel: '@?',
        mbgPlaceholder: '@?',
        mbgValue: '@?',
        mbgDisabled: '@?',
        mbgFocus: '&?',
        mbgBlur: '&?',
        mbgChange: '&?',
        mbgKeyup: '&?',
        mbgKeydown: '&?',
        mbgKeypress: '&?',
    },
    template,
    controller: MbgInputTextController,
}

export { mbgInputText }
