import * as angular from 'angular'
import './mbg-select.scss'
import template from './mbg-select.html'
import { MbgCookie } from '../../helpers/cookie'
import { UtilUID } from '../../helpers/util-uid'
import { AbsPosition } from '../../helpers/abs-position'
import * as _get from 'lodash.get'
import * as _set from 'lodash.set'

class MbgSelectController {
    private data: any
    private fetch: Function
    private inputValue: any
    private hasFocus: boolean
    private enableAdd: boolean
    private labelValue: string
    private mbgModel: any
    private initializingModel: boolean
    private disableWatchModel: any
    private ngValue: string
    private isLoading: boolean
    private transcludeTemplate: string
    private onSelect: Function
    private onUnselect: Function
    private ngFocus: Function
    private ngBlur: Function
    private enableFavorite: boolean
    private callbackAdd: Function
    private ignoreItems: Array<any>
    private uid: string
    private position
    private ngDisabled: boolean
    private unObserve: any
    private inputElementWrapper
    private modelValue

    constructor(
        public $scope,
        public $element,
        public $attrs,
        public $timeout,
        public $compile,
        public $transclude) { }

    $onInit() {
        this.inputValue = ''
        this.enableAdd = this.enableAdd || false
        this.observeModel()
        this.updateInputValue()
        this.findTransclude()
        this.checkFavorite()
        this.$timeout(() => {
            this.checkPosition()
        })
        this.$attrs.$observe('label', () => {
            this.resolveLabel()
            this.updateInputValue()
        })
        this.$scope.$parent.$watch(() => this.$onChanges())
    }

    $onDestroy() {
        if (this.unObserve) {
            this.unObserve()
        }
    }

    $onChanges = () => {
        this.modelValue = _get(this.$scope.$parent, this.mbgModel)
    }

    onInitWrapper() {
        this.inputElementWrapper = this.$element.find(`div.mbg-select-wrapper`)
    }

    resolveLabel() {
        try {
            this.labelValue = this.$scope.$eval(this.$attrs.label)
            if (!this.labelValue) {
                this.labelValue = this.$attrs.label
            }
        } catch (e) {
            this.labelValue = this.$attrs.label
        }
    }

    getData() {
        return (this.data || []).filter((item) => {
            return (this.ignoreItems || []).find((ignoreItem) => angular.equals(ignoreItem, item)) ? false : true
        })
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

    changeModel(value) {
        this.$timeout(() => {
            this.modelValue = value
            _set(this.$scope.$parent, this.mbgModel, value)
            // this.onChangeText()
        })
    }

    clickArrow() {
        this.onInputFocus(true)
        this.changeModel(null)
        delete this.inputValue
    }

    executeFetch(onExecute?: Function) {
        this.data = []
        this.isLoading = true
        const response = this.fetch({ query: (this.inputValue || '') })
        if (response && response.then) {
            response.then((data) => {
                this.afterFetchData(data)
                if (onExecute) {
                    onExecute(data)
                }
            })
        } else {
            this.afterFetchData(response)
            if (onExecute) {
                onExecute(response)
            }
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
            this.hasFocus = true
            this.checkPosition()
            this.$element.find('input').select()
        }
        if (!ignoreCallback && this.ngFocus) {
            this.ngFocus()
        }
    }

    onInputBlur() {
        this.$timeout(() => {
            this.hasFocus = false
            this.data = []
            this.checkPosition()
        })
        if (this.ngBlur) {
            this.ngBlur()
        }
    }

    onInputChange() {
        this.$timeout(() => {
            this.fetch ? this.executeFetch() : angular.noop()
        })
    }

    clearNgModel(ignoreCallback?: boolean) {
        this.changeModel(null)
        delete this.inputValue
        this.onInputFocus(ignoreCallback)
        if (this.onUnselect) {
            this.onUnselect()
        }
    }

    getOptionFocused() {
        return angular.element(`[uid="${this.uid}"] li.focused`)
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
                this.setModel()
                break
            case 8: // BACKSPACE
                this.$timeout(() => {
                    if (this.fetch) {
                        this.initializingModel = true
                        this.changeModel(null)
                        if (this.onUnselect) {
                            this.onUnselect()
                        }
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

    setModel() {
        this.$timeout(() => {
            if (this.fetch) {
                const currentOption = this.getOptionFocused()
                if (currentOption[0]) {
                    let item = currentOption.scope().item
                    if (!item && this.enableAdd) {
                        if (this.labelValue) {
                            item = { [this.labelValue]: this.inputValue }
                        } else {
                            item = isNaN(this.inputValue) ? this.inputValue : Number(this.inputValue)
                        }
                    }
                    this.updateModelValue(this.ngValue ? item[this.ngValue] : item)
                }
            } else {
                this.updateModelValue(this.inputValue)
            }
            this.executeCallback()
            if (this.onSelect) {
                this.onSelect({ value: _get(this.$scope.$parent, this.mbgModel) })
            }
        })
    }

    executeCallback(isNew?: boolean) {
        const currentOption = this.getOptionFocused()
        if (currentOption && (currentOption.hasClass('new-item') || isNew) && this.callbackAdd) {
            this.callbackAdd({ query: (this.inputValue || '') })
        }
    }

    selectOption(item, isNew?: boolean) {
        this.data = []
        this.executeCallback(isNew)
        this.updateModelValue(this.ngValue ? item[this.ngValue] : item)
        if (this.onSelect) {
            this.onSelect({ value: _get(this.$scope.$parent, this.mbgModel) })
        }
    }

    observeModel() {
        this.initializingModel = true
        // this.disableWatchModel = this.$scope.$watch(`$ctrl.ngModel`, (value) => {
        //     if (this.initializingModel) {
        //         this.$timeout(() => { this.initializingModel = false })
        //     } else {
        //         if (!angular.equals(value, this.ngModel) || !angular.equals(value, this.inputValue)) {
        //             this.updateInputValue()
        //         }
        //     }
        // })
    }

    addInBody() {
        const body = angular.element(document).find('body')
        const list = this.$element.find('ul')
        list.attr('uid', this.uid)
        body.append(list)
    }

    removeInBody() {
        const list = angular.element(`[uid="${this.uid}"]`)
        this.$element.find('.mbg-select-wrapper').append(list)
    }

    checkPosition() {
        if (!this.hasFocus) {
            this.removeInBody()
        } else {
            this.uid = UtilUID.generete()
            if (this.inputElementWrapper) { this.inputElementWrapper.attr('steps-uid', this.uid) }
            this.addInBody()
        }
        const elm = this.$element.find('mbg-input-text .mbg-input-wrapper')
        const absolutePosition = AbsPosition.get(elm[0])
        this.position = {
            left: absolutePosition.left + 'px',
            top: (absolutePosition.top + elm.height()) + 'px',
        }
    }

    updateModelValue(value) {
        this.changeModel(value)
        this.updateInputValue()
    }

    updateInputValue() {
        this.$timeout(() => {
            if (this.ngValue && this.modelValue) {
                this.executeFetch((data) => {
                    const item = (data || []).find((i) => i[this.ngValue] === this.modelValue)
                    if (item) {
                        this.inputValue = item[this.labelValue]
                    }
                })
            } else {
                if (this.labelValue && this.modelValue) {
                    this.inputValue = this.modelValue[this.labelValue]
                } else {
                    this.inputValue = this.modelValue
                }
            }
        })
    }

    getFavoriteKey() {
        return 'mbg-favorite-' + this.$attrs.name
    }

    checkFavorite() {
        const favorite = MbgCookie.get(this.getFavoriteKey())
        if (favorite && this.enableFavorite && !this.modelValue) {
            this.selectOption(favorite)
        }
    }

    favorite(evt, item) {
        evt.preventDefault()
        evt.stopPropagation()
        if (this.isFavorite(item)) {
            MbgCookie.set(this.getFavoriteKey(), null)
        } else {
            MbgCookie.set(this.getFavoriteKey(), item)
        }
    }

    isOnlyEqual() {
        const options = this.getData()
        return options.filter((opt) => {
            if (this.labelValue) {
                return opt[this.labelValue].toLowerCase() === this.inputValue.toLowerCase()
            } else {
                return opt.toString().toLowerCase() === this.inputValue.toString().toLowerCase()
            }
        }).length !== 1
    }

    isFavorite(item) {
        const favorite = MbgCookie.get(this.getFavoriteKey())
        return favorite && angular.equals(favorite, item)
    }

}

MbgSelectController.$inject = [
    '$scope',
    '$element',
    '$attrs',
    '$timeout',
    '$compile',
    '$transclude'
]

const mbgSelect = {
    transclude: true,
    bindings: {
        mbgModel: '@?',

        ngDisabled: '=',
        ngValue: '@?',
        fetch: '&?',
        ignoreItems: '=?',
        ngFocus: '&?',
        ngBlur: '&?',
        onSelect: '&?',
        onUnselect: '&?',
        enableAdd: '=?',
        placeholder: '@?',
        addOnlyNotEqual: '=?',
        enableFavorite: '=?',
        callbackAdd: '&?'
    },
    controller: MbgSelectController,
    template,
}

export { mbgSelect }
