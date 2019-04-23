import * as angular from 'angular'
import './mbg-input-step-item.scss'
import template from './mbg-input-step-item.html'
import { Capitalize } from '../../../../helpers/capitalize'
import { detect } from 'detect-browser'
import { AbsPosition } from '../../../../helpers/abs-position'
import { UtilUID } from '../../../../helpers/util-uid'

class MbgInputStepItemController {
	private fetch: Function
	private data: Array<any>
	private inputValue: string
	private hasFocus: boolean
	private label: string
	private ngModel: any
	private mbgInputStep
	private enableAdd: boolean
	private oldInputValue: string
	private capitalize: boolean
	private focus: Function
	private unFocus: Function
	private ngChange
	private navigatorData
	private autocompleteValue
	private recentItem
	private enableRecent: boolean
	private addOnlyEmpty: boolean
	private disableWatchModel: Function
	private disableWatchLabelModel: Function
	private initializingModel: boolean
	private initializingLabelModel: boolean
	private onMovePrevItem: Function
	private onMoveNextItem: Function
	private ngDisabled: boolean
	private transcludeTemplate: string
	private position
	private uid: string

	constructor(public $scope, public $element, public $attrs, public $timeout, public $transclude) { }

	$onInit() {
		this.navigatorData = detect()
		this.navigatorData.currentVersion = Number(this.navigatorData.version.substring(0, this.navigatorData.version.indexOf('.')))
		this.createAutocompleteDisabled()
		this.hasFocus = false
		this.checkPosition()
		this.enableAdd = this.enableAdd || false
		this.inputValue = ''
		this.findTransclude()
		this.updateInputValue()
		this.observeModel()
		this.observeLabel()
		this.verifyDevErrors()
		this.observeInputValue()
	}

	findTransclude() {
		this.$transclude(this.$scope, (cloneEl) => {
			angular.forEach(cloneEl, cl => {
				let element = angular.element(cl)[0]
				if (element.nodeName && element.nodeName === 'TEMPLATE') {
					this.$timeout(() => {
						this.transcludeTemplate = element.innerHTML
					})
				}
			})
		})
	}

	verifyDevErrors() {
		if (this.enableRecent && !this.$attrs.name) {
			console.warn('Para ativar a funcionalidade de item recente, é necessário colocar o atributo "name" no elemento -> ', this.$element[0].outerHTML)
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

	observeLabel() {
		if (this.label) {
			this.initializingLabelModel = true
			this.disableWatchLabelModel = this.$scope.$watch(`$ctrl.ngModel.${this.label}`, (value) => {
				if (this.initializingLabelModel) {
					this.$timeout(() => { this.initializingLabelModel = false })
				} else {
					if (!angular.equals(value, this.ngModel)) {
						this.updateInputValue()
					}
				}
			})
		}
	}

	observeInputValue() {
		this.$scope.$watch(`$ctrl.inputValue`, () => {
			if (this.capitalize) {
				this.inputValue = Capitalize.format(this.inputValue)
			}
		})
	}

	createAutocompleteDisabled() {
		this.autocompleteValue = this.navigatorData.name === 'chrome' && this.navigatorData.currentVersion > 65 ? 'disabled' : 'off'
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

	setCookie(name, value) {
		let expires = ''
		const date = new Date()
		date.setTime(date.getTime() + (999999 * 24 * 60 * 60 * 1000))
		expires = '; expires=' + date.toUTCString()
		document.cookie = name + '=' + (value || '') + expires + '; path=/'
	}

	getCookie(name) {
		let nameEQ = name + '='
		let ca = document.cookie.split(';')
		for (let i = 0; i < ca.length; i++) {
			let c = ca[i]
			while (c.charAt(0) === ' ') {
				c = c.substring(1, c.length)
			}
			if (c.indexOf(nameEQ) === 0) {
				return c.substring(nameEQ.length, c.length)
			}
		}
		return null
	}

	recentItemIsOn() {
		return this.enableRecent && this.$attrs.name
	}

	isRecent(item) {
		return this.recentItemIsOn() && this.recentItem && angular.equals(item, this.recentItem)
	}

	setItemRecent(item) {
		if (this.recentItemIsOn()) {
			this.setCookie(this.getRecentKey(), JSON.stringify(item))
		}
	}

	getItemRecent() {
		const recent = this.getCookie(this.getRecentKey())
		return recent ? JSON.parse(recent) : null
	}

	getRecentKey() {
		let user: any = sessionStorage.getItem('user')
		if (user) {
			user = JSON.parse(user)
			return (user.organizationHierarchyCode || '') + 'recent-' + this.$attrs.name
		} else {
			return 'favorite-' + this.$attrs.name
		}
	}

	updateElasticInput() {
		this.$timeout(() => {
			const event = new Event('change')
			const input = this.$element.find('input')
			input[0].dispatchEvent(event)
			const inputWrapper = this.mbgInputStep.$element.find('.mb-input-step-wrapper')
			const currentLeft = inputWrapper.scrollLeft()
			inputWrapper.scrollLeft(currentLeft + input.width())
		})
	}

	onInputFocus() {
		if (!this.hasFocus) {
			this.$timeout(() => this.focus ? this.focus() : angular.noop())
			this.hasFocus = true
			this.checkPosition()
			this.onInputChange()
			this.updateElasticInput()
			this.$element.find('input').select()
		}
	}

	onInputBlur() {
		this.unFocus ? this.unFocus() : angular.noop()
		this.$timeout(() => {
			this.hasFocus = false
			this.checkPosition()
			this.updateElasticInput()
		})
	}

	onInputChange() {
		this.$timeout(() => {
			this.fetch ? this.executeFetch() : this.setModel(true)
		})
	}

	executeFetch() {
		const response = this.fetch({ query: this.inputValue })
		if (response && response.then) {
			response.then((data) => this.afterFetchData(data))
		} else {
			this.afterFetchData(response)
		}
	}

	afterFetchData(data) {
		this.$timeout(() => {
			this.data = data
			this.recentItem = this.getItemRecent()
		})
		this.$timeout(() => this.focusFirstOption(), 150)
	}

	onInputKeydown(evt) {
		this.hasFocus = true
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
				this.hasFocus = false
				break
			case 38: // SETA CIMA
				this.moveToUp()
				break
			case 40: // SETA BAIXO
				this.moveToDown()
				break
			case 8: // BACKSPACE
				this.$timeout(() => {
					if (this.fetch) {
						this.initializingLabelModel = true
						this.initializingModel = true
						this.ngModel = null
					}
					if (!this.inputValue && !this.oldInputValue) {
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
		let prevItem = this.$element.prev()
		while (prevItem && prevItem[0] && prevItem[0].hasAttribute('disabled')) {
			prevItem = prevItem.prev()
		}
		if (prevItem[0] && prevItem[0] && prevItem[0].nodeName === 'MBG-INPUT-STEP-ITEM') {
			prevItem.find('input').focus()
		}
		if (this.onMovePrevItem) { this.onMovePrevItem() }
	}

	movePointerNextItem() {
		if (this.ngModel !== null && this.ngModel !== undefined) { // be zero or false
			let nextItem = this.$element.next()
			while (nextItem && nextItem[0] && nextItem[0].hasAttribute('disabled')) {
				nextItem = nextItem.next()
			}
			nextItem[0] ? nextItem.find('input').focus() : this.mbgInputStep.focusNextInput()
		} else {
			this.onInputFocus()
		}
		if (this.onMoveNextItem) { this.onMoveNextItem() }
	}

	getOptions() {
		return angular.element(`[uid="${this.uid}"] li`)
	}

	getOptionFocused() {
		return angular.element(`[uid="${this.uid}"] li.focused`)
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

	setModel(ignoreFocusNext?: boolean) {
		this.$timeout(() => {
			if (this.fetch) {
				const currentOption = this.getOptionFocused()
				if (currentOption[0]) {
					let item = currentOption.hasClass('recent-item') ? this.recentItem : currentOption.scope().item
					if (!item && this.enableAdd) {
						if (this.label) {
							item = { [this.label]: this.inputValue }
						} else {
							item = this.inputValue
						}
					}
					this.ngModel = item
					this.setItemRecent(item)
					if (this.ngChange) { this.ngChange() }
					if (this.label) {
						this.inputValue = this.ngModel[this.label]
					} else {
						this.inputValue = this.ngModel
					}
				}
			} else {
				this.ngModel = this.inputValue
				if (this.ngChange) { this.ngChange() }
			}
			if (!ignoreFocusNext) {
				this.movePointerNextItem()
			}
		})
	}

	selectOption(item) {
		this.ngModel = item
		this.setItemRecent(item)
		if (this.ngChange) { this.ngChange() }
		if (this.label) {
			this.inputValue = this.ngModel[this.label]
		} else {
			this.inputValue = this.ngModel
		}
		this.$timeout(() => {
			this.movePointerNextItem()
		})
	}

	hasData() {
		if (this.label) {
			return this.ngModel && this.ngModel[this.label]
		} else {
			return this.ngModel ? true : false
		}
	}

	checkPosition() {
		if (!this.hasFocus) {
			this.removeInBody()
		} else {
			this.uid = UtilUID.generete()
			this.addInBody()
		}
		const elm = this.$element.find('input')
		const absolutePosition = AbsPosition.get(elm[0])
		this.position = {
			left: absolutePosition.left + 'px',
			top: (absolutePosition.top + elm.height()) + 'px',
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
		this.$element.find('.mbg-input-step-item').append(list)
	}

}

MbgInputStepItemController.$inject = ['$scope', '$element', '$attrs', '$timeout', '$transclude']

const mbgInputStepItem = {
	transclude: true,
	bindings: {
		ngModel: '=',
		fetch: '&?',
		label: '@?',
		enableAdd: '=?',
		hiddenAddLabel: '=?',
		addOnlyEmpty: '=?',
		capitalize: '=?',
		placeholder: '=?',
		ngDisabled: '=?',
		enableRecent: '=?',
		focus: '&?',
		unFocus: '&?',
		onMovePrevItem: '&?',
		onMoveNextItem: '&?',
		ngChange: '&?',
	},
	require: {
		mbgInputStep: '^mbgInputStep'
	},
	controller: MbgInputStepItemController,
	template,
}

export { mbgInputStepItem }
