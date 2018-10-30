import * as angular from 'angular'
import { MbgListController } from '../../mbg-list'

export class MbgListColumnController {
    private mbgList: MbgListController
    private name: string
    private label: string
    private templateColumn: string
    private templateRow: string

    constructor(public $scope, public $element, public $attrs, public $timeout, public $transclude) { }

    $onInit() {
        this.mbgList.registerColumn(this)
        this.generateTemplateColumn()
        this.generateTemplateRow()
    }

    generateTemplateColumn() {
        this.templateColumn = `
            <label class="column-title">${this.label ? this.label : this.name}</label>
        `
    }

    generateTemplateRow() {
        this.$transclude(this.$scope, (cloneElem) => {
            angular.forEach(cloneElem, (elm) => {
                const element = angular.element(elm)[0]
                if (element.nodeName === 'MBG-LIST-CONTENT') {
                    this.templateRow = element.outerHTML
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
        ngStyle: '=?'
    },
    template: '',
    controller: MbgListColumnController,
}

export { mbgListColumn }
