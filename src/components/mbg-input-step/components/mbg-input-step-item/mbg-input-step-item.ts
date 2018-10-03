import * as angular from 'angular'
import './mbg-input-step-item.scss'
import template from './mbg-input-step-item.html'

class MbgInputStepItemController {
    private inputValue: string
    private fetch: Function
    private data: Array<any>
    private hasFocus: boolean
    private label: string
    private ngModel: any
    private mbgInputStep

    constructor(public $scope, public $element, public $attrs, public $timeout) {}

    $onInit() {
        // autosizeInput(this.$element.find('input')[0], { minWidth: 54 })
    }

    onInputFocus() {
        this.hasFocus = true
        this.onInputChange()
    }

    onInputBlur() {
        this.hasFocus = false
    }

    onInputChange() {
        const response = this.fetch({ query: this.inputValue })
        if (response instanceof Promise) {
            response.then((data) => this.afterFetchData(data))
        } else {
            this.afterFetchData(response)
        }
    }

    afterFetchData(data) {
        this.$timeout(() => this.data = data)
        this.$timeout(() => {
            this.focusFirstOption()
        }, 100)
    }

    onInputKeydown(evt) {
        switch (evt.keyCode) {
            case 13: // ENTER
                this.setModelFromOptionFocused()
                break
            case 188: // VIRGULA
                evt.stopPropagation()
                evt.preventDefault()
                this.setModelFromOptionFocused()
                break
            case 38: // SETA CIMA
                this.moveToUp()
                break
            case 40: // SETA BAIXO
                this.moveToDown()
                break
        }
    }

    getOptions() {
        return this.$element.find('ul li')
    }

    getOptionFocused() {
        return this.$element.find('ul li.focused')
    }

    removeAllFocus() {
        this.getOptions().removeClass('focused')
    }

    setFocusOption(liOption) {
        if (liOption) {
            this.removeAllFocus()
            angular.element(liOption).addClass('focused')
        }
    }

    focusFirstOption() {
        const firstOption = this.getOptions()[0]
        this.setFocusOption(firstOption)
    }

    focusLastOption() {
        const options = this.getOptions()
        const lastOption = options[options.length - 1]
        this.setFocusOption(lastOption)
    }

    moveToUp() {
        const currentOption = this.getOptionFocused()
        const prevOption = currentOption.prev()
        if (prevOption[0]) {
            this.setFocusOption(prevOption)
        } else {
            this.focusLastOption()
        }
    }

    moveToDown() {
        const currentOption = this.getOptionFocused()
        const nextOption = currentOption.next()
        if (nextOption[0]) {
            this.setFocusOption(nextOption)
        } else {
            this.focusFirstOption()
        }
    }

    setModelFromOptionFocused() {
        const currentOption = this.getOptionFocused()
        if (currentOption[0]) {
            this.ngModel = currentOption.scope().item
            this.inputValue = this.ngModel[this.label]
            this.mbgInputStep.setFocusNextItem(this.$element)
        }
    }

}

MbgInputStepItemController.$inject = ['$scope', '$element', '$attrs', '$timeout']

const mbgInputStepItem = {
    bindings: {
        ngModel: '=',
        fetch: '&?',
        label: '@?'
    },
    require: {
        mbgInputStep: '^mbgInputStep'
    },
    controller: MbgInputStepItemController,
    template,
}

export { mbgInputStepItem }
