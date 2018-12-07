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
                rows.map((position) => {
                    return {
                        index: position,
                        row: this.rows[position],
                    }
                }).forEach((mapValue) => {
                    const indexRow = this.rows.findIndex((r) => angular.equals(r, mapValue.row))
                    this.addAdicionalRow(indexRow)
                })
            })
        }, true)
    }

    addAdicionalRow(indexRow) {
        this.rows[indexRow].isOpenedRow = true
        const newRow = angular.merge(angular.copy(this.rows[indexRow]), { template: this.mbgRows[0].template, isAdicional: true })
        this.rows.splice(indexRow + 1, 0, newRow)
    }

    removeAdicionalRow(indexRow) {
        this.rows[indexRow].isOpenedRow = false
        this.rows.splice(indexRow + 1, 1)
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

    toogleRow(row) {
        const indexRow = this.rows.findIndex((r) => angular.equals(r, row))
        const listRow = this.rows[indexRow]
        if (listRow.isOpenedRow) {
            this.removeAdicionalRow(indexRow)
        } else {
            this.addAdicionalRow(indexRow)
        }
    }

    changeVariable(variable, index, str) {
        this.rows[index + 1][variable] === str ? this.rows[index + 1][variable] = '' : this.rows[index + 1][variable] = str
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
