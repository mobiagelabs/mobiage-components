import './mbg-popup-select.scss'
import template from './mbg-popup-select.html'
import * as angular from 'angular'
import * as Fuse from 'fuse.js'
import { UtilUID } from '../../helpers/util-uid'

class MbgPopupSelectController {

	private open
	private context
	private ngModel: Array<any>
	private uid: string
	private disableEvent: boolean
	private loading: boolean

	private data: Array<any> // Variavel que armazena o resultado do fetch
	private dataCache: Array<any> // Variavel que armazena o resultado do fetch
	private dataMostUsed: Array<any> // Variavel que armazena o resultado do fetch dos itens mais usuados
	private inputValue: string
	private fetch: Function // Função de pesquisa padrão
	private fetchMostUsed: Function // Função de pesquisa dos itens mais usados
	private displayMostUsed: boolean
	private isLoading: boolean // Controla o aparecimento do loading
	private onSelect: Function
	private transcludeTemplate
	private multiSelect
	private label

	constructor(
		public $scope,
		public $element,
		public $timeout,
		public $transclude
	) { }

	$onInit() {
		this.ngModel = this.ngModel || []
		this.uid = UtilUID.generete()
		this.displayMostUsed = !!this.fetchMostUsed
		this.open = false
		this.$timeout(() => {
			this.findTransclude()
			this.executeFetch()
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

	insertAtCaret = (txtarea, text) => {
		if (!txtarea) { return }
		txtarea = txtarea.nodeName === 'TEXTAREA' ? txtarea : angular.element(txtarea).find('textarea')[0]
		let scrollPos = txtarea.scrollTop
		let strPos = 0
		let br = ((txtarea.selectionStart || txtarea.selectionStart === '0') ?
			'ff' : (document['selection'] ? 'ie' : false))
		if (br === 'ie') {
			txtarea.focus()
			let range = document['selection'].createRange()
			range.moveStart('character', -txtarea.value.length)
			strPos = range.text.length
		} else if (br === 'ff') {
			strPos = txtarea.selectionStart
		}
		let front = (txtarea.value).substring(0, strPos)
		let back = (txtarea.value).substring(strPos, txtarea.value.length)
		txtarea.value = front + text + back
		strPos = strPos + text.length
		if (br === 'ie') {
			txtarea.focus()
			let ieRange = document['selection'].createRange()
			ieRange.moveStart('character', -txtarea.value.length)
			ieRange.moveStart('character', strPos)
			ieRange.moveEnd('character', 0)
			ieRange.select()
		} else if (br === 'ff') {
			txtarea.selectionStart = strPos
			txtarea.selectionEnd = strPos
			txtarea.focus()
		}
		txtarea.scrollTop = scrollPos
	}

	$onDestroy() {
		document.removeEventListener('click', this.onClickOut)
	}

	onButtonClick() {
		delete this.inputValue
		if (!this.open) {
			this.$timeout(() => angular.element(`input[uid="${this.uid}"]`)[0].focus(), 200)
			this.executeFetch()
		}
		this.open = !this.open
		if (this.open) {
			this.$timeout(() => document.addEventListener('click', this.onClickOut))
		} else {
			this.$timeout(() => document.removeEventListener('click', this.onClickOut))
		}
	}

	onClickOut = (e) => {
		this.$timeout(() => {
			if (angular.element(e.target).attr('class') !== '.intercom-composer-details-popover' && angular.element(e.target).parents('.intercom-composer-details-popover').length === 0) {
				this.open = false
				document.removeEventListener('click', this.onClickOut)
			}
		})
	}

	executeFetch() {
		this.isLoading = true
		const response = this.fetch({ query: (this.inputValue || '') })
		if (response && response.then) {
			response.then((result) => {
				this.dataCache = this.filterSeletectedItems(result)
				this.data = this.filterSeletectedItems(result)
			})
		} else {
			this.dataCache = this.filterSeletectedItems(response)
			this.data = this.filterSeletectedItems(response)
		}
	}

	filterSeletectedItems(items) {
		return JSON.parse(JSON.stringify(items.filter((item) => {
			const index = this.ngModel.findIndex((model) => JSON.stringify(model) === JSON.stringify(item))
			return index === -1
		})))
	}

	onInputChange(evt) {
		this.loading = true
		this.$timeout(() => {
			if (this.fetch) {
				if (!this.multiSelect) {
					const options = {
						shouldSort: true,
						threshold: 0.3,
						location: 0,
						distance: 100,
						maxPatternLength: 32,
						minMatchCharLength: 1,
						keys: ['value', this.label]
					}
					const fuse = new Fuse(this.dataCache, options)
					this.data = fuse.search(this.inputValue)
					this.loading = false
				} else {
					const querySplit: any = this.inputValue.trim().replace(/ /g, '').toLowerCase().split(',')
					this.data = this.dataCache.filter((detail) => {
						if ((querySplit[0] === '' && querySplit[1]) || this.inputValue[0] === ',') {
							return false
						} else {
							return (querySplit[0] ? querySplit.includes(detail.value.toLowerCase()) : true)
						}
					})
					this.loading = false
				}
			} else {
				this.loading = false
			}
			if (!this.inputValue) {
				this.executeFetch()
			}
			this.onPress(evt)
		})
	}

	onPress(evt) {
		const arrayRemove: Array<any> = []
		if (Number(evt.keyCode) === 13 && this.data && this.inputValue && !this.loading) {
			this.$timeout(() => {
				this.data.forEach((item, index) => {
					if (!this.multiSelect) {
						if (index === 0) {
							this.ngModel.push(item)
							this.onSelect({ item })
							arrayRemove.push(item)
						}
					} else {
						this.onSelect({ item })
						this.ngModel.push(item)
						arrayRemove.push(item)
					}
				})
				arrayRemove.forEach((removeObj) => {
					const index = this.dataCache.findIndex((data) => JSON.stringify(data) === JSON.stringify(removeObj))
					if (index !== -1) {
						this.dataCache.splice(index, 1)
					}
				})
				delete this.inputValue
				this.$timeout(() => this.data = this.dataCache)
			})
		}
	}

	selectItem(item, evt) {
		evt.stopPropagation()
		evt.preventDefault()
		if (this.onSelect && !this.disableEvent) {
			this.disableEvent = true
			const indexData = this.data.findIndex((data) => angular.equals(item, data))
			this.onSelect({ item })
			this.ngModel.push(item)
			this.$timeout(() => {
				this.data.splice(indexData, 1)
				this.dataCache = this.data
				this.disableEvent = false
			})
		}
	}

	removeItem(item) {
		this.disableEvent = true
		const indexData = this.ngModel.findIndex((data) => angular.equals(item, data))
		this.ngModel.splice(indexData, 1)
		this.$timeout(() => {
			this.executeFetch()
			this.disableEvent = false
		})
	}

}

const popupSelect = {
	transclude: true,
	bindings: {
		context: '@',
		ngModel: '=?',
		onSelect: '&?',
		fetch: '&?',
		label: '@?',
		titlePopup: '@?',
		fetchMostUsed: '&?',
		multiSelect: '=?'
	},
	controller: MbgPopupSelectController,
	template: template,
}

MbgPopupSelectController['$inject'] = [
	'$scope',
	'$element',
	'$timeout',
	'$transclude']

export { popupSelect }
