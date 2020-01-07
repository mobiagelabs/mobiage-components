import './mbg-input-text.scss'
import * as angular from 'angular'
import template from './mbg-input-text.html'

class MbgInputTextController {
    private inputElement
    private ngChange
    private mbgModel
    private mbgDisabled
    private props
    private ngKeydown
    private ngKeyup
    private ngValue
    private placeholder

    constructor(public $scope, public $element, public $attrs, public $timeout) {
        if ($attrs.mbgDisabled === '') { this.mbgDisabled = true }
        this.props = {}
    }

    $onInit() {
        if (this.ngValue) { this.mbgModel = this.ngValue }
        this.$scope.$parent.$watch(() => this.$onChanges())
    }

    $onDestroy() {
        this.destroyEvents()
    }

    createEvents() {
        this.inputElement[0].addEventListener('keydown', this.onKeyDown)
        this.inputElement[0].addEventListener('keyup', this.onKeyUp)
        this.inputElement[0].addEventListener('paste', this.onPaste)
        this.inputElement[0].addEventListener('cut', this.onCut)
    }

    destroyEvents() {
        this.inputElement[0].removeEventListener('keydown', this.onKeyDown)
        this.inputElement[0].removeEventListener('keyup', this.onKeyUp)
        this.inputElement[0].removeEventListener('paste', this.onPaste)
        this.inputElement[0].removeEventListener('cut', this.onCut)
    }

    onCut = ($event) => {
        this.changeModel($event)
    }

    onPaste = ($event) => {
        this.changeModel($event)
    }

    onKeyDown = ($event) => {
        if (this.ngKeydown) { this.ngKeydown({ $event }) }
    }

    onKeyUp = ($event) => {
        if (this.ngKeyup) { this.ngKeyup({ $event }) }
        this.changeModel($event)
    }

    changeModel($event) {
        this.$timeout(() => {
            this.$scope.$parent[this.mbgModel] = $event.target.value
            this.onChangeText()
        })
    }

    onInitInput() {
        this.inputElement = this.$element.find('input')
        this.$onChanges()
        this.createEvents()
    }

    processPlaceholder() {
        if (this.placeholder) { this.inputElement.attr('placeholder', this.placeholder) }
    }

    processDisabled() {
        try {
            const disabled = this.$scope.$parent.$eval(this.mbgDisabled)
            disabled ? this.inputElement.attr('disabled', this.placeholder) : this.inputElement.removeAttr('disabled')
        } catch (e) { /** failed on execute eval */ }
    }

    processModel() {
        this.inputElement.attr('value', this.$scope.$parent[this.mbgModel])
    }

    $onChanges = () => {
        if (this.inputElement) {
            this.processPlaceholder()
            this.processModel()
            this.processDisabled()
        }
    }

    onChangeText = () => {
        if (this.ngChange) {
            this.ngChange({})
        }
    }

    onKeydown($event: Event) {
        $event.stopPropagation()
        if (this.ngKeydown) {
            this.ngKeydown({ $event })
        }
    }

}

MbgInputTextController.$inject = ['$scope', '$element', '$attrs', '$timeout']

const mbgInputText = {
    bindings: {
        ngValue: '=?',
        mbgModel: '@?',
        mbgDisabled: '@?',
        ngChange: '&?',
        placeholder: '@?',
        ngBlur: '&?',
        ngFocus: '&?',
        ngKeyup: '&?',
        ngKeypress: '&?',
        ngKeydown: '&?',
    },
    template,
    controller: MbgInputTextController,
}

export { mbgInputText }
