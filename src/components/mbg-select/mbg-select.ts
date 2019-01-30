import * as angular from 'angular'
import './mbg-select.scss'
import template from './mbg-select.html'

class MbgSelectController {
    private data: any
    private fetch: Function
    private inputValue: string
    private hasFocus: boolean
    private enableAdd: boolean
    private label: string
    private ngModel: any
    private initializingModel: boolean
    private disableWatchModel: any
    private ngValue: string
    private isLoading: boolean

    constructor(public $scope, public $element, public $attrs, public $timeout, public $compile) {

    }

    executeFetch() {
        this.data = []
        this.isLoading = true
        const response = this.fetch({ query: this.inputValue })
        if (response && response.then) {
            response.then((data) => {
                this.afterFetchData(data)
            })
        } else {
            this.afterFetchData(response)
        }
    }
    afterFetchData(data) {
        this.$timeout(() => {
            this.data = data
            this.isLoading = false
        })
        this.$timeout(() => this.focusFirstOption(), 150)
    }
    focusFirstOption() {
        const firstOption = this.getOptions()[0]
        this.setFocusOption(firstOption)
    }
    getOptions() {
        return this.$element.find('ul li')
    }
    setFocusOption(liOption) {
        if (liOption) {
            this.removeAllFocus()
            angular.element(liOption).addClass('focused')
        }
    }
    removeAllFocus() {
        this.getOptions().removeClass('focused')
    }
    onInputFocus() {
        if (!this.hasFocus) {
            this.onInputChange()
            this.hasFocus = true
            this.$element.find('input').select()
        }
    }
    onInputChange() {
        this.$timeout(() => {
            this.fetch ? this.executeFetch() : angular.noop()
        })
    }
    clearNgModel() {
        delete this.ngModel
        delete this.inputValue
        this.onInputFocus()
    }
    onInputBlur() {
        this.$timeout(() => this.hasFocus = false)
    }
    getOptionFocused() {
        return this.$element.find('ul li.focused')
    }
    onInputKeydown(evt) {
        this.hasFocus = true
        switch (evt.keyCode) {
            case 13: // ENTER
                evt.preventDefault()
                evt.stopPropagation()
                this.setModel()
                this.hasFocus = false
                break
            case 38: // SETA CIMA
                this.moveToUp()
                break
            case 40: // SETA BAIXO
                this.moveToDown()
                break
            case 9: // TAB
                this.setModel(true)
                break
        }
    }
    moveToUp() {
        const currentOption = this.getOptionFocused()
        const prevOption = currentOption.prev()
        prevOption[0] ? this.setFocusOption(prevOption) : this.focusLastOption()
        this.$timeout(() => this.scrollMove())
    }
    moveToDown() {
        const currentOption = this.getOptionFocused()
        const nextOption = currentOption.next()
        nextOption[0] ? this.setFocusOption(nextOption) : this.focusFirstOption()
        this.$timeout(() => this.scrollMove())
    }
    scrollMove() {
        const li = this.getOptionFocused()[0]
        if (li) {
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
    }
    focusLastOption() {
        const options = this.getOptions()
        const lastOption = options[options.length - 1]
        this.setFocusOption(lastOption)
    }
    setModel(ignoreFocusNext?: boolean) {
        this.$timeout(() => {
            if (this.fetch) {
                const currentOption = this.getOptionFocused()
                if (currentOption[0]) {
                    let item = currentOption.scope().item
                    if (!item && this.enableAdd) {
                        if (this.label) {
                            item = { [this.label]: this.inputValue }
                        } else {
                            item = this.inputValue
                        }
                    }
                    this.ngValue ? this.ngModel = item[this.ngValue] : this.ngModel = item
                    if (this.label) {
                        this.inputValue = this.ngModel[this.label]
                    } else {
                        this.inputValue = this.ngModel
                    }
                }
            } else {
                this.ngModel = this.inputValue
            }
        })
    }
    selectOption(item) {
        this.ngValue ? this.ngModel = item[this.ngValue] : this.ngModel = item
        if (this.label) {
            this.inputValue = this.ngModel[this.label]
        } else {
            this.inputValue = this.ngModel
        }
    }
    observeModel() {
        this.initializingModel = true
        this.disableWatchModel = this.$scope.$watch(`$ctrl.ngModel`, (value) => {
            if (this.initializingModel) {
                this.$timeout(() => { this.initializingModel = false })
            } else {
                if (!angular.equals(value, this.ngModel) || !angular.equals(value, this.inputValue)) {
                    this.updateInputValue()
                }
            }
        })
    }
    updateInputValue() {
        this.$timeout(() => {
            if (this.label && this.ngModel) {
                this.inputValue = this.ngModel[this.label]
            } else {
                this.inputValue = this.ngModel
            }
        })
    }

}

MbgSelectController.$inject = ['$scope', '$element', '$attrs', '$timeout', '$compile']

const mbgSelect = {
    bindings: {
        ngModel: '=',
        ngValue: '@?',
        fetch: '&?',
        label: '@?',
        enableAdd: '=?'
    },
    controller: MbgSelectController,
    template,
}

export { mbgSelect }
