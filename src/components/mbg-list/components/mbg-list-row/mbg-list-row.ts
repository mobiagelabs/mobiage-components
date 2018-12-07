import * as angular from 'angular'
import { MbgListController } from '../../mbg-list'

export class MbgListRowController {
    private mbgList: MbgListController
    public template: string
    public position: number
    public nextPosition: number
    public mbgListElement
    public id
    public unwatch

    constructor(public $scope, public $element, public $attrs, public $timeout, public $transclude) { }

    $onInit() {
        this.mbgListElement = this.$element.closest('mbg-list > ')[0]
        const scopeParent = angular.element(this.mbgListElement).scope()
        if (!scopeParent) { return }
        this.mbgList = scopeParent.$ctrl
        this.generateTemplateRow()
        this.mbgList.registerRow(this)
    }

    addAdicionalRow() {
        this.mbgList.rows.splice(this.position + 1, 0,
            angular.merge(angular.copy(this.mbgList.rows[this.position]), { template: this.template, isAdicional: true }))
    }

    removeAdicionalRow() {
        const rows = angular.copy(this.mbgList.rows) || []
        rows.splice(this.position + 1, 1)
        this.mbgList.rows = rows
    }

    generateTemplateRow() {
        this.$transclude(this.$scope, (cloneElem) => {
            angular.forEach(cloneElem, (elm) => {
                const element = angular.element(elm)[0]
                if (element.nodeName === 'MBG-LIST-CONTENT') {
                    this.template = element.innerHTML
                }
            })
        })
    }

}

MbgListRowController.$inject = ['$scope', '$element', '$attrs', '$timeout', '$transclude']

const mbgListRow = {
    transclude: true,
    bindings: {
        condition: '=?',
        position: '=?',
    },
    template: '',
    controller: MbgListRowController,
}

export { mbgListRow }
