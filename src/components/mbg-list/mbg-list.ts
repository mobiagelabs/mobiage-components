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
    public onClickRow: Function
    public enableOnSelectByRow: boolean
    public checkboxIf: Function

    constructor(public $scope, public $element, public $attrs, public $timeout, public $transclude) { }

    $onInit() {
        this.enableOnSelectByRow = this.enableOnSelectByRow === undefined ? true : this.enableOnSelectByRow
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
            try {
                this.checkAll = this.isAllSelected()
            } catch (e) {
                this.checkAll = false
            }
        }, true)
        this.observeOpenedRows()
        this.observeSelectedValues()
    }

    removeCircularJson(json) {
        const parsed = JSON.parse(json)
        delete parsed.$json
        return JSON.stringify(parsed)
    }

    observeSelectedValues() {
        this.$scope.$watch('$ctrl.selectedValues', (selectedValues) => {
            if (selectedValues && Array.isArray(selectedValues)) {
                selectedValues.forEach((selectedValue) => {
                    if (selectedValue && selectedValue.$json) {
                        this.selectedMap[this.removeCircularJson(selectedValue.$json)] = true
                    } else {
                        selectedValue.$json = JSON.stringify(selectedValue)
                        this.selectedMap[this.removeCircularJson(selectedValue.$json)] = true
                    }
                })
                try {
                    this.checkAll = this.isAllSelected()
                } catch (e) {
                    this.checkAll = false
                }
            }
            if (!selectedValues || selectedValues.length === 0) {
                this.selectedMap = []
            }
        }, true)
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
        if (this.checkboxIf) {
            const possibleActive = this.list.filter((row) => this.checkboxIf({ $row: row }))
            return possibleActive.filter((row) => !this.selectedMap[this.removeCircularJson(JSON.stringify(row))]).length === 0
        }
        return this.list.filter((row) => !this.selectedMap[this.removeCircularJson(JSON.stringify(row))]).length === 0
    }

    toogleAll(selectAll) {
        this.list.forEach((row) => {
            if (this.checkboxIf) {
                if (this.checkboxIf({ $row: row })) {
                    this.selectedMap[this.removeCircularJson(JSON.stringify(row))] = selectAll
                }
            } else {
                this.selectedMap[this.removeCircularJson(JSON.stringify(row))] = selectAll
            }
        })
        this.handlingSelectedValues()
    }

    toogleCheckbox() {
        this.checkAll = this.isAllSelected()
        this.handlingSelectedValues()
    }

    toogleRadio(row) {
        this.selectedMap = {}
        this.selectedMap[this.removeCircularJson(row)] = true
        this.handlingSelectedValues()
    }

    handlingSelectedValues() {
        this.selectedValues =
            Object.keys(this.selectedMap)
                .filter((row) => this.selectedMap[row])
                .map((row) => JSON.parse(row))
    }

    handleClickRow(row, index) {
        if (this.rowsAdicional !== index && (this.checkbox || this.radio) && this.enableOnSelectByRow) {
            if (this.radio) {
                this.toogleRadio(row.$json)
            } else {
                if (this.checkboxIf) {
                    if (this.checkboxIf({ $row: row })) {
                        this.selectedMap[row.$json] = !this.selectedMap[row.$json]
                        this.toogleCheckbox()
                    }
                } else {
                    this.selectedMap[row.$json] = !this.selectedMap[row.$json]
                    this.toogleCheckbox()
                }
            }
        }
        if (this.onClickRow) {
            this.onClickRow({ $row: row })
        }
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

    getRowStripedStyle(row, index) {
        if (row.isAdicional) {
            const background = this.$element.find(`table tr`)[index].style.backgroundColor
            return { background }
        }
        return {
            background: this.list.findIndex((r) => angular.equals(row.$json, JSON.stringify(r))) % 2 === 0 ? '#eaeaea' : '#F5F5F5'
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
        onClickRow: '&?',
        enableOnSelectByRow: '=?',
        checkboxIf: '&?',
        openedRows: '=?',
        selectedValues: '=?'
    },
    template,
    controller: MbgListController,
}

export { mbgList }
