import * as angular from 'angular'
import './mbg-product-search.scss'
import template from './mbg-product-search.html'
import { UtilUID } from '../../helpers/util-uid'
import { AbsPosition } from '../../helpers/abs-position'

class MbgProductSearchController {
    private data: any
    private fetch: Function
    private inputValue: any
    private hasFocus: boolean
    private label: string
    private ngModel: any
    private initializingModel: boolean
    private disableWatchModel: any
    private ngValue: string
    private isLoading: boolean
    private transcludeTemplate: string
    private ngFocus: Function
    private ngBlur: Function
    private placeholder: string
    private autoClear: boolean
    private tryAdd: Function
    private position
    private uidComponent: string
    private debounce
    private debounceTime
    private uid: string
    private page: number
    private isLoadingMore: boolean
    private minLetter: number
    private containsMore: boolean
    private showFeebackScroll: boolean
    private timeoutChange: any

    constructor(public $scope, public $element, public $attrs, public $timeout, public $compile, public $transclude) { }

    $onInit() {
        this.minLetter = typeof this.minLetter === 'undefined' ? 2 : this.minLetter
        this.debounceTime = this.debounceTime || 1000
        this.uidComponent = UtilUID.generete()
        this.placeholder = this.placeholder || 'Encontre por código de barras, referência ou nome do produto.'
        this.inputValue = ''
        this.observeModel()
        this.checkPosition()
        this.updateInputValue()
        this.findTransclude()
        this.$scope.$watch('$ctrl.fetch', () => {
            if (this.ngModel && this.ngValue) {
                this.updateInputValue()
            }
        }, true)
    }

    findTransclude() {
        this.$transclude(this.$scope, (cloneEl) => {
            angular.forEach(cloneEl, cl => {
                let element = angular.element(cl)[0]
                if (element.nodeName && element.nodeName === 'TEMPLATE') {
                    this.transcludeTemplate = element.innerHTML
                }
            })
        })
    }

    executeFetch(onExecute?: Function) {
        if (!this.inputValue || this.inputValue.length < this.minLetter) { return }
        if (this.debounce) {
            this.$timeout.cancel(this.debounce)
        }
        if (this.page === 1) { this.data = [] }
        this.debounce = this.$timeout(() => {
            this.isLoading = true
            const response = this.fetch({ query: (this.inputValue || ''), page: this.page })
            if (response && response.then) {
                response.then((data) => {
                    this.afterFetchData(data)
                    if (onExecute) { onExecute(data) }
                })
            } else {
                this.afterFetchData(response)
                if (onExecute) { onExecute(response) }
            }
        }, this.debounceTime)
    }

    afterFetchData(data) {
        this.$timeout(() => {
            this.data = this.data.concat(data.values)
            this.isLoading = false
            this.isLoadingMore = false
            this.containsMore = data.pageSize > 0
            this.showFeebackScroll = this.page === 1 && data.count > data.pageSize
        })
        this.$timeout(() => this.focusFirstOption(), 150)
    }

    focusFirstOption() {
        const firstOption = this.getOptions()[0]
        this.setFocusOption(firstOption)
    }

    getOptions() {
        return angular.element(`[uid="${this.uid}"] li`)
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

    onInputFocus(ignoreCallback?: boolean) {
        if (!this.hasFocus) {
            this.onInputChange()
            // this.hasFocus = true
            // this.$element.find('input').select()
        }
        if (!ignoreCallback && this.ngFocus) {
            // this.ngFocus()
        }
        this.hasFocus = true
        this.checkPosition()
    }

    onInputBlur() {
        this.$timeout(() => {
            this.hasFocus = false
            this.checkPosition()
        })
        if (this.ngBlur) {
            this.ngBlur()
        }
    }

    clearNgModel(ignoreCallback?: boolean) {
        delete this.ngModel
        delete this.inputValue
        this.onInputFocus(ignoreCallback)
    }

    getOptionFocused() {
        return angular.element(`[uid="${this.uid}"] li.focused`)
    }

    afterEnterPress(oldHasFocus) {
        this.setModel(oldHasFocus)
        this.hasFocus = false
        this.checkPosition()
    }


    onInputChange() {
        if (this.timeoutChange) { this.$timeout.cancel(this.timeoutChange) }
        this.timeoutChange = this.$timeout(() => {
            this.page = 1
            this.data = []
            this.fetch ? this.executeFetch() : angular.noop()
        }, 400)
    }

    onInputKeydown(evt) {
        const oldHasFocus = this.hasFocus
        this.hasFocus = true
        if (evt.keyCode != 13 && evt.keyCode != 38 && evt.keyCode != 40) { this.checkPosition() }
        switch (Number(evt.keyCode)) {
            case 13: // ENTER
                if (this.timeoutChange) { this.$timeout.cancel(this.timeoutChange) }
                evt.preventDefault()
                evt.stopPropagation()
                this.afterEnterPress(oldHasFocus)
                break
            case 38: // SETA CIMA
                this.moveToUp()
                break
            case 40: // SETA BAIXO
                this.moveToDown()
                break
            case 9: // TAB
                this.setModel()
                break
            case 8: // BACKSPACE
                this.$timeout(() => {
                    if (this.fetch) {
                        this.initializingModel = true
                        this.ngModel = null
                    }
                })
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

    executeTryAdd() {
        this.$timeout(() => {
            if (!this.inputValue || this.inputValue.trim() === '') { return }
            const matchs: any = this.inputValue.replace(/ /g, '').split('x').sort((a, b) => { return b.length - a.length })
            const obj = matchs.length > 1 ? { barCode: matchs[0], quantity: Number(matchs[1]) } : { barCode: matchs[0], quantity: 1 }
            this.tryAdd(obj)
            if (this.autoClear) {
                this.inputValue = ''
                this.$element.find('mbg-input-text input').select()
            } else {
                this.inputValue = obj.barCode + ' x ' + obj.quantity
                this.$timeout(() => {
                    this.$element.find('mbg-input-text input').select()
                })
            }
        })
    }

    setModel(oldHasFocus?) {
        this.$timeout(() => {
            if (this.fetch && oldHasFocus) {
                const currentOption = this.getOptionFocused()
                if (currentOption[0]) {
                    let item = currentOption.scope().item
                    this.updateModelValue(this.ngValue ? item[this.ngValue] : item)
                    this.$timeout(() => this.executeTryAdd(), 10)
                } else {
                    this.executeTryAdd()
                }
            } else {
                this.executeTryAdd()
            }
        })
    }

    selectOption(item, isNew?: boolean) {
        this.updateModelValue(this.ngValue ? item[this.ngValue] : item)
        this.$timeout(() => this.executeTryAdd(), 10)
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

    updateModelValue(value) {
        this.ngModel = value
        this.updateInputValue()
    }

    updateInputValue() {
        this.$timeout(() => {
            if (this.ngValue && this.ngModel) {
                this.page = 1
                this.executeFetch((data) => {
                    const item = (data || []).find((i) => i[this.ngValue] === this.ngModel)
                    if (item) {
                        this.inputValue = item[this.label]
                    }
                })
            } else {
                if (this.label && this.ngModel) {
                    this.inputValue = this.ngModel[this.label]
                } else {
                    this.inputValue = this.ngModel
                }
            }
        })
    }

    getPosition() {
        if (this.hasFocus) {
            this.recalcPosition()
        }
        return {
            left: this.position ? this.position.left : 0,
            top: this.position ? this.position.top : 0,
            paddingBottom: this.showFeebackScroll ? 54 : 0,
        }
    }

    recalcPosition() {
        const elm = this.$element.find('.mbg-input-wrapper')
        const absolutePosition = AbsPosition.get(elm[0])
        this.position = {
            left: absolutePosition.left + 'px',
            top: (absolutePosition.top + elm.height()) + 'px',
        }
    }

    checkPosition() {
        if (this.uid) {
            this.removeInBody()
        }
        if (this.hasFocus) {
            this.uid = UtilUID.generete()
            this.addInBody()
            this.recalcPosition()
        }
    }

    addInBody() {
        const body = angular.element(document).find('body')
        const list = this.$element.find('ul')
        list.attr('uid', this.uid)
        body.append(list)
    }

    removeInBody() {
        const list = angular.element(`[uid="${this.uid}"]`)
        this.$element.find('.mbg-product-search-wrapper').append(list)
    }

    onScroll(event) {
        const element = event.target
        this.$timeout(() => this.showFeebackScroll = false)
        if (!this.isLoading && element.scrollHeight - element.scrollTop === element.clientHeight) {
            this.$timeout(() => this.isLoadingMore = true)
            this.page++
            this.fetch ? this.executeFetch() : angular.noop()
        }
    }

}

MbgProductSearchController.$inject = ['$scope', '$element', '$attrs', '$timeout', '$compile', '$transclude']

const mbgProductSearch = {
    transclude: true,
    bindings: {
        tryAdd: '&?',
        ngModel: '=',
        ngValue: '@?',
        fetch: '&?',
        debounceTime: '=?',
        ngFocus: '&?',
        ngBlur: '&?',
        label: '@?',
        autoClear: '=?',
        minLetter: '=?',
        placeholder: '@?',
        disableStock: '=?'
    },
    controller: MbgProductSearchController,
    template,
}

export { mbgProductSearch }
