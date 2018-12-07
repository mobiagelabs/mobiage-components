import * as angular from 'angular'
import { MbgListController } from '../../mbg-list'

export class MbgListColumnController {
    private mbgList: MbgListController
    private name: string
    private label: string
    private templateColumn: string
    private templateRow: string
    private sortable: boolean
    private direction: string
    private alignColumn: string
    private alignRow: string

    constructor(public $scope, public $element, public $attrs, public $timeout, public $transclude) { }

    $onInit() {
        this.direction = 'desc'
        this.alignColumn = this.alignColumn || 'left'
        this.alignRow = this.alignRow || 'left'
        this.sortable = this.sortable !== undefined ? this.sortable : false
        this.mbgList.registerColumn(this)
        this.generateTemplateColumn()
        this.generateTemplateRow()
    }

    generateTemplateColumn() {
        this.templateColumn = `<label class="column-title"
            style="justify-content: {{ column.alignColumn == 'left' ? 'flex-start' : column.alignColumn == 'right' ? 'flex-end': 'center' }}"
            ng-style="column.ngStyle">
            ${this.label ? this.label : this.name}
            <div class="column-title-sort" ng-if="column.sortable">
                <svg ng-show="column.direction == 'desc'"
                    ng-click="column.sort()"
                    xmlns="http://www.w3.org/2000/svg"
                    data-name="Layer 1"
                    viewBox="0 0 96 96"
                    x="0px" y="0px">
                    <path d="M43.76,66.24a6,6,0,0,0,8.48,0l29-29a6,6,0,0,0-8.48-8.48L48,53.51,23.24,28.76a6,6,0,0,0-8.48,8.48Z"/>
                </svg>
                <svg ng-show="column.direction == 'asc'"
                    ng-click="column.sort()"
                    xmlns="http://www.w3.org/2000/svg"
                    data-name="Layer 1"
                    viewBox="0 0 96 96"
                    x="0px" y="0px">
                    <path d="M23.24,66.24,48,41.49,72.76,66.24a6,6,0,0,0,8.48-8.48l-29-29a6,6,0,0,0-8.48,0l-29,29a6,6,0,0,0,8.48,8.48Z"/>
                </svg>
            </div>
        </label>`
    }

    sort() {
        this.direction = this.direction === 'asc' ? 'desc' : 'asc'
        this.mbgList.sort({ column: this.name, dir: this.direction })
    }

    generateTemplateRow() {
        this.$transclude(this.$scope, (cloneElem) => {
            angular.forEach(cloneElem, (elm) => {
                const element = angular.element(elm)[0]
                if (element.nodeName === 'MBG-LIST-CONTENT') {
                    this.templateRow = element.innerHTML
                }
            })
            if (!this.templateRow || !this.templateRow.trim()) { this.createDefaultTemplateRow() }
        })
    }

    createDefaultTemplateRow() {
        this.templateRow = `{{ $row[column.name] }}`
    }

}

MbgListColumnController.$inject = ['$scope', '$element', '$attrs', '$timeout', '$transclude']

const mbgListColumn = {
    transclude: true,
    require: {
        mbgList: '^mbgList'
    },
    bindings: {
        name: '@',
        label: '@?',
        ngClass: '=?',
        ngStyle: '=?',
        alignColumn: '@?',
        alignRow: '@?',
        sortable: '=?',
    },
    template: '',
    controller: MbgListColumnController,
}

export { mbgListColumn }
