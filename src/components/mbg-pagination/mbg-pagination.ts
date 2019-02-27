import './mbg-pagination.scss'
import template from './mbg-pagination.html'
import { Paginator } from './helpers/paginator'

class MbgPaginationController {
    private paginationInfo
    private activePage: number
    private pageSize: number
    private count: number
    private pageRangeDisplayed: number
    private pages: Array<{ key: string }>
    private onChange: Function

    constructor(public $scope, public $element, public $attrs, public $timeout) { }

    $onInit() {
        this.activePage = this.activePage || 1
        this.pageSize = this.pageSize || 10
        this.count = this.count || 0
        this.pageRangeDisplayed = this.pageRangeDisplayed || 5
        this.observeParams()
        this.buildPages()
    }

    observeParams() {
        this.$scope.$watch('$ctrl.activePage', (newValue, oldValue) => newValue !== oldValue && this.buildPages(), true)
        this.$scope.$watch('$ctrl.pageSize', (newValue, oldValue) => newValue !== oldValue && this.buildPages(), true)
        this.$scope.$watch('$ctrl.pageRangeDisplayed', (newValue, oldValue) => newValue !== oldValue && this.buildPages(), true)
        this.$scope.$watch('$ctrl.count', (newValue, oldValue) => newValue !== oldValue && this.buildPages(), true)
    }

    buildPages() {
        const pages = []
        this.paginationInfo = new Paginator(this.pageSize, this.pageRangeDisplayed).build(this.count, this.activePage)
        for (let i = this.paginationInfo.firstPage; i <= this.paginationInfo.lastPage; i++) {
            pages.push({ key: i })
        }
        this.pages = pages
    }

    setActivePage(page) {
        this.activePage = page
        this.$timeout(() => {
            if (this.onChange) {
                this.onChange({ page: this.activePage })
            }
        })
    }

}

MbgPaginationController.$inject = ['$scope', '$element', '$attrs', '$timeout']

const mbgPagination = {
    bindings: {
        activePage: '=',
        pageSize: '=',
        count: '=',
        pageRangeDisplayed: '=',
        onChange: '&?',
    },
    template,
    controller: MbgPaginationController,
}

export { mbgPagination }
