import * as angular from 'angular'
import './mbg-input-step-item.scss'
import template from './mbg-input-step-item.html'
import { Capitalize } from '../../../../helpers/capitalize'

class MbgInputStepItemController {
    private inputValue: string
    private fetch: Function
    private data: Array<any>
    private hasFocus: boolean
    private label: string
    private ngModel: any
    private mbgInputStep
    private enableAdd: boolean
    private oldInputValue: string
    private capitalize: boolean

    constructor(public $scope, public $element, public $attrs, public $timeout) { }

    $onInit() {
        this.hasFocus = false
        this.enableAdd = this.enableAdd || false
        this.inputValue = ''
        this.updateInputValue()
        this.$scope.$watch(`$ctrl.ngModel`, (value) => {
            if (!angular.equals(value, this.ngModel)) {
                this.updateInputValue()
            }
        })
        if (this.label) {
            this.$scope.$watch(`$ctrl.ngModel.${this.label}`, (value) => {
                if (!angular.equals(value, this.ngModel)) {
                    this.updateInputValue()
                }
            })
        }

        this.$scope.$watch(`$ctrl.inputValue`, () => {
            if (this.capitalize) {
                this.inputValue = Capitalize.format(this.inputValue)
            }
        })
    }

    updateInputValue() {
        if (this.label && this.ngModel) {
            this.inputValue = this.ngModel[this.label]
        } else {
            this.inputValue = this.ngModel
        }
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
        this.$element.find('input').select()
    }

    onInputBlur() {
        this.$timeout(() => {
            this.hasFocus = false
            this.updateElasticInput()
            if (!this.label && this.inputValue) {
                this.setModel(true)
            }
        }, 150)
    }

    onInputChange(ignoreClearModel?: boolean) {
        this.inputValue = (this.inputValue || '').replace(',', '')
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
        this.$timeout(() => this.focusFirstOption(), 150)
    }

    onInputKeydown(evt) {
        this.oldInputValue = this.inputValue
        switch (evt.keyCode) {
            case 188: // VIRGULA
                evt.preventDefault()
                evt.stopPropagation()
                this.setModel()
                break
            case 13: // ENTER
                evt.preventDefault()
                evt.stopPropagation()
                this.setModel()
                break
            case 38: // SETA CIMA
                this.moveToUp()
                break
            case 40: // SETA BAIXO
                this.moveToDown()
                break
            case 8: // BACKSPACE
                this.$timeout(() => {
                    if (!this.ngModel && !this.inputValue && !this.oldInputValue) {
                        this.movePointerPrevItem()
                    }
                })
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
        this.$timeout(() => {
            this.scrollMove()
        })
    }

    moveToDown() {
        const currentOption = this.getOptionFocused()
        const nextOption = currentOption.next()
        if (nextOption[0]) {
            this.setFocusOption(nextOption)
        } else {
            this.focusFirstOption()
        }
        this.$timeout(() => {
            this.scrollMove()
        })
    }

    scrollMove() {
        const li = this.getOptionFocused()[0]
        const ul = li.parentNode
        const fudge = 4
        const bottom = (ul.scrollTop + (ul.offsetHeight - fudge) - li.offsetHeight)
        const top = ul.scrollTop + fudge
        if (li.offsetTop <= top) {
            ul.scrollTop = li.offsetTop - fudge
        } else if (li.offsetTop >= bottom) {
            ul.scrollTop = li.offsetTop - ((ul.offsetHeight - fudge) - li.offsetHeight)
        }
    }

    setModel(ignoreFocusNext?: boolean) {
        this.$timeout(() => {
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
        })
    }

    selectOption(item) {
        this.ngModel = item
        this.inputValue = this.ngModel[this.label]
        this.movePointerNextItem()
    }

    hasData() {
        if (this.label) {
            return this.ngModel && this.ngModel[this.label]
        } else {
            return this.ngModel ? true : false
        }
    }

}

MbgInputStepItemController.$inject = ['$scope', '$element', '$attrs', '$timeout']

const mbgInputStepItem = {
    bindings: {
        ngModel: '=',
        fetch: '&?',
        label: '@?',
        enableAdd: '=?',
        capitalize: '=?',
    },
    require: {
        mbgInputStep: '^mbgInputStep'
    },
    controller: MbgInputStepItemController,
    template,
}

export { mbgInputStepItem }
