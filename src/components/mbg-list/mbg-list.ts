import './mbg-list.scss'
import * as angular from 'angular'
import template from './mbg-list.html'
import { MbgListColumnController } from './components/mbg-list-column/mbg-list-column'

export class MbgListController {
    public rows: Array<any>
    public list: Array<any>
    public columns: Array<MbgListColumnController>
    public rowsAdicional: number
    public sort: Function
    public selectedValues: Array<any>
    public selectedMap
    public checkAll: boolean
    public checkbox: boolean

    constructor(public $scope, public $element, public $attrs, public $timeout, public $transclude) { }

    $onInit() {
        this.columns = []
        this.selectedMap = {}
        this.$scope.$watch('$ctrl.list', (list) => {
            this.rows = angular.copy(list)
            this.rows.forEach((row) => row.$json = JSON.stringify(row))
        })
    }

    registerColumn(column: MbgListColumnController) {
        this.columns.push(column)
    }

    isAllSelected() {
        return this.list.filter((row) => !this.selectedMap[JSON.stringify(row)]).length === 0
    }

    toogleAll(selectAll) {
        this.list.forEach((row) => this.selectedMap[JSON.stringify(row)] = selectAll)
        this.handlingSelectedValues()
    }

    toogleCheckbox() {
        this.checkAll = this.isAllSelected()
        this.handlingSelectedValues()
    }

    handlingSelectedValues() {
        this.selectedValues =
            Object.keys(this.selectedMap)
                .filter((row) => this.selectedMap[row])
                .map((row) => JSON.parse(row))
    }

    onClickRow(row, index) {
        // if (this.rowsAdicional !== index && this.checkbox) {
        //     this.selectedMap[row.$json] = !this.selectedMap[row.$json]
        //     this.toogleCheckbox()
        // }
    }

}

MbgListController.$inject = ['$scope', '$element', '$attrs', '$timeout', '$transclude']

const mbgList = {
    transclude: true,
    bindings: {
        list: '=?',
        class: '@?',
        sort: '&?',
        checkbox: '=?',
        selectedValues: '=?'
    },
    template,
    controller: MbgListController,
}

export { mbgList }
