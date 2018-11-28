import './mbg-list.scss'
import * as angular from 'angular'
import template from './mbg-list.html'
import { MbgListColumnController } from './components/mbg-list-column/mbg-list-column'
import { MbgListRowController } from './components/mbg-list-row/mbg-list-row'

export class MbgListController {
    public rows: Array<any>
    public list: Array<any>
    public columns: Array<MbgListColumnController>
    public rowsAdicional: any
    public sort: Function
    public selectedValues: Array<any>
    public selectedMap
    public checkAll: boolean
    public checkbox: boolean
    public radio: boolean
    public $c
    public mbgRows: Array<MbgListRowController>
    public openedRows: Array<number>

    constructor(public $scope, public $element, public $attrs, public $timeout, public $transclude) { }

    $onInit() {
        this.rowsAdicional = {}
        this.$scope.$c = this.$scope.$parent
        this.columns = []
        this.mbgRows = []
        this.selectedMap = {}
        this.$scope.$watch('$ctrl.list', (list) => {
            this.rows = angular.copy(list) || []
            this.rows.forEach((row) => {
                row.$json = JSON.stringify(row)
            })
        }, true)
        this.observeOpenedRows()
    }

    observeOpenedRows() {
        this.$scope.$watch('$ctrl.openedRows', (openedRows) => {
            this.$timeout(() => {
                const rows = openedRows || []
                this.closeAllRows()
                rows.forEach((index, i) => {
                    this.$timeout(() => {
                        let position = index
                        if (i > 0) {
                            position = position + 1
                        }
                        this.rows[position].isOpenedRow = true
                        this.mbgRows[position].addAdicionalRow()
                    })
                })
            })
        }, true)
    }

    closeAllRows() {
        this.rows.forEach((row, index) => {
            if (row && row.isAdicional) {
                this.rows[index - 1].isOpenedRow = false
                this.mbgRows[index - 1].removeAdicionalRow()
            }
        })
    }

    registerColumn(column: MbgListColumnController) {
        this.columns.push(column)
    }

    registerRow(row: MbgListRowController) {
        if (this.mbgRows.filter((r, index) => angular.equals(r, row)).length === 0) {
            this.mbgRows.push(row)
        }
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

    toogleRadio(row) {
        this.selectedMap = {}
        this.selectedMap[row] = true
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

    toogleRow(index) {
        const row = this.rows[index + 1]
        if (row && row.isAdicional) {
            this.rows[index].isOpenedRow = false
            this.mbgRows[index].removeAdicionalRow()
        } else {
            this.rows[index].isOpenedRow = true
            this.mbgRows[index].addAdicionalRow()
        }
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
        radio: '=?',
        openedRows: '=?',
        selectedValues: '=?'
    },
    template,
    controller: MbgListController,
}

export { mbgList }
