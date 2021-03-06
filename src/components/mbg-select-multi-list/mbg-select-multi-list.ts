import * as angular from 'angular'
import './mbg-select-multi-list.scss'
import template from './mbg-select-multi-list.html'
import * as Fuse from 'fuse.js'
import { UtilUID } from '../../helpers/util-uid'

export class MbgSelectMultiListController {
    private data: Array<any>
    private ngModel: any
    private dataModel: Array<any>
    private fetch: Function
    private label: string
    private isLoading: boolean
    private inputValue: string
    private listRowTransclude: string
    private listHeaderTransclude: string
    private placeholderLeft: string
    private placeholderRight: string
    private inputValueResult: string

    constructor(public $scope, public $element, public $attrs, public $timeout, public $compile, public $transclude) { }

    $onInit() {
        this.placeholderLeft = this.placeholderLeft || ''
        this.placeholderRight = this.placeholderRight || ''
        this.$scope.$c = this.$scope.$parent
        this.findTransclude()
        this.findTranscludeHeader()
        this.$scope.$watch('$ctrl.data', (data) => {
            this.afterFetchData(data)
        }, true)
        this.$timeout(() => {
            this.ngModel = this.ngModel || []
            this.dataModel = JSON.parse(JSON.stringify(this.ngModel)) || []
        })
    }

    findTransclude() {
        this.$transclude(this.$scope, (cloneEl) => {
            angular.forEach(cloneEl, cl => {
                let element = angular.element(cl)[0]
                if (element.nodeName && element.nodeName === 'MBG-ROW-CONTENT') {
                    this.listRowTransclude = element.innerHTML
                }
            })
        })
    }

    findTranscludeHeader() {
        this.$transclude(this.$scope, (cloneEl) => {
            angular.forEach(cloneEl, cl => {
                let element = angular.element(cl)[0]
                if (element.nodeName && element.nodeName === 'MBG-HEADER-CONTENT') {
                    this.listHeaderTransclude = element.innerHTML
                }
            })
        })
    }

    executeFetch() {
        this.$timeout(() => {
            this.fetch({ query: (this.inputValue || '') })
        })
    }

    afterFetchData(data) {
        this.$timeout(() => {
            this.data = (data || []).filter((row) => this.ngModel.filter((model) => angular.equals(row, model)).length === 0)
        })
    }

    selectRow(row) {
        const copyRow = JSON.parse(JSON.stringify(row))
        const index = this.findIndexRow(this.data, row)
        if (index !== -1) {
            copyRow._uid = UtilUID.generete()
            this.ngModel.push(copyRow)
            this.dataModel.push(copyRow)
            this.data.splice(index, 1)
            this.$timeout(() => {
                (this.ngModel || []).forEach((model) => {
                    delete model._uid
                })
            }, 500)
        }
    }

    removeRow(row) {
        this.$timeout(() => {
            const index = this.findIndexRow(this.ngModel, row)
            const indexData = this.findIndexRow(this.dataModel, row)
            if (index !== -1) {
                this.ngModel.splice(index, 1)
                this.dataModel.splice(indexData, 1)
                this.executeFetch()
            }
        })
    }

    searchNgModel() {
        this.$timeout(() => {
            const dataModel = JSON.parse(JSON.stringify(this.ngModel))
            const options = {
                shouldSort: true,
                threshold: 0.3,
                location: 0,
                distance: 100,
                maxPatternLength: 32,
                minMatchCharLength: 1,
                keys: [this.label]
            }
            const fuse = new Fuse(dataModel, options)
            const result = fuse.search(this.inputValueResult)
            this.dataModel = result.length > 0 ? result : dataModel
        })

    }

    findIndexRow(array: Array<any>, row) {
        return array.findIndex((data) => angular.equals(data, row))
    }

    async addEvent(row) {
        const target: any = angular.element('.result-multi-list-wrapper')
        await target.animate({ scrollTop: this.dataModel.length * 44 }, 500)
        this.$timeout(() => {
            const element = angular.element(`div[id="${row['_uid']}"]`)
            element.addClass('active')
            this.$timeout(() => element.removeClass('active'), 300)
        }, 100)
    }
}

MbgSelectMultiListController.$inject = [
    '$scope',
    '$element',
    '$attrs',
    '$timeout',
    '$compile',
    '$transclude'
]

const mbgSelectMultiList = {
    transclude: true,
    bindings: {
        ngModel: '=?',
        fetch: '&?',
        label: '@?',
        count: '=?',
        placeholderLeft: '@?',
        placeholderRight: '@?',
        titleLeft: '@?',
        titleRight: '@?',
        data: '=?',
        isLoading: '=?'
    },
    template,
    controller: MbgSelectMultiListController,
}

export { mbgSelectMultiList }
