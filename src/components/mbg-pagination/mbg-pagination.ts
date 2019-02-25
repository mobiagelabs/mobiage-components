import './mbg-pagination.scss'
import template from './mbg-pagination.html'

class MbgPaginationController {
    private pageSize: number
    private page: number
    private count: number
    private next: Function
    private prev: Function

    constructor(public $scope, public $element, public $attrs, public $timeout) {}

    $onInit() {
        this.pageSize = this.pageSize || 0
        this.page = this.page || 0
        this.count = this.count || 0
    }

    initialRecordsInPage() {
        return (this.page * this.pageSize) - this.pageSize + 1
    }

    countRecordsInPage() {
        return this.count < this.pageSize ? this.count : this.page * this.pageSize < this.count ? this.page * this.pageSize : ((this.page - 1) * this.pageSize) + this.count
    }

    disableNext() {
        return this.countRecordsInPage() === this.count
    }

}

MbgPaginationController.$inject = ['$scope', '$element', '$attrs', '$timeout']

const mbgPagination = {
    bindings: {
        pageSize: '=?',
        page: '=?',
        count: '=?',
        next: '&?',
        prev: '&?'
    },
    template,
    controller: MbgPaginationController,
}

export { mbgPagination }
