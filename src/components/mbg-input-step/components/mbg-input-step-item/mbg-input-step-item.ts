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
    private enableAdd: boolean

    constructor(public $scope, public $element, public $attrs, public $timeout) { }

    $onInit() {
        this.hasFocus = false
        this.enableAdd = this.enableAdd || false
        this.inputValue = ''
    }

    updateElasticInput() {
        this.$timeout(() => {
            const event = new Event('change')
            const input = this.$element.find('input')
            input[0].dispatchEvent(event)
        })
    }

    onInputFocus() {
        this.hasFocus = true
        this.onInputChange(true)
        this.updateElasticInput()
    }

    onInputBlur() {
        this.hasFocus = false
        this.updateElasticInput()
    }

    onInputChange(ignoreClearModel?: boolean) {
        if (!ignoreClearModel) {
            delete this.ngModel
        }
        if (this.fetch) {
            this.executeFetch()
        }
    }

    executeFetch() {
        const response = this.fetch({ query: this.inputValue })
        if (response instanceof Promise) {
            response.then((data) => this.afterFetchData(data))
        } else {
            this.afterFetchData(response)
        }
    }

    afterFetchData(data) {
        this.$timeout(() => {
            this.data = data
        })
        this.$timeout(() => {
            this.focusFirstOption()
        }, 100)
    }

    onInputKeydown(evt) {
        switch (evt.keyCode) {
            case 13: // ENTER
                this.setModel()
                break
            case 188: // VIRGULA
                evt.stopPropagation()
                evt.preventDefault()
                this.setModel()
                break
            case 38: // SETA CIMA
                this.moveToUp()
                break
            case 40: // SETA BAIXO
                this.moveToDown()
                break
            case 8: // BACKSPACE
                if (!this.ngModel && this.inputValue === '') {
                    this.movePointerPrevItem()
                }
                break
            case 9: // TAB
                this.setModel(true)
                break
        }
    }

    movePointerPrevItem() {
        const prevItem = this.$element.prev()
        prevItem.find('input').focus()
    }

    movePointerNextItem() {
        const nextItem = this.$element.next()
        if (nextItem[0]) {
            nextItem.find('input').focus()
        } else {
            this.mbgInputStep.focusNextInput()
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

    setModel(ignoreFocusNext?: boolean) {
        if (this.fetch) {
            const currentOption = this.getOptionFocused()
            if (currentOption[0]) {
                let item = currentOption.scope().item
                if (!item && this.enableAdd) {
                    item = { [this.label]: this.inputValue }
                }
                this.ngModel = item
                this.inputValue = this.ngModel[this.label]
            }
        } else {
            this.ngModel = this.inputValue
        }
        if (!ignoreFocusNext) {
            this.movePointerNextItem()
        }
    }

}

MbgInputStepItemController.$inject = ['$scope', '$element', '$attrs', '$timeout']

const mbgInputStepItem = {
    bindings: {
        ngModel: '=',
        fetch: '&?',
        label: '@?',
        enableAdd: '=?'
    },
    require: {
        mbgInputStep: '^mbgInputStep'
    },
    controller: MbgInputStepItemController,
    template,
}

export { mbgInputStepItem }
