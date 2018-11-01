import * as angular from 'angular'
import { MbgListController } from '../../mbg-list'

export class MbgListRowController {
    private mbgList: MbgListController
    private template: string
    private position: number
    private nextPosition: number
    private mbgListElement

    constructor(public $scope, public $element, public $attrs, public $timeout, public $transclude) { }

    $onInit() {
        this.mbgListElement = this.$element.closest('mbg-list > ')[0]
        const scopeParent = angular.element(this.mbgListElement).scope()
        if (!scopeParent) { return }
        this.mbgList = scopeParent.$ctrl
        this.generateTemplateRow()
        this.observeCondition()
        this.nextPosition = this.position + 1
    }

    observeCondition() {
        this.$scope.$watch('$ctrl.condition', (value) => {
            if (this.mbgList.rowsAdicional !== undefined) {
                this.removeAdicionalRow()
                return
            }
            this.addAdicionalRow()
        })
    }

    addAdicionalRow() {
        this.mbgList.rows = this.mbgList.rows || []
        this.mbgList.rows.splice(this.nextPosition, 0, angular.merge(this.mbgList.rows[this.position], { template: this.template }))
        this.updatePosition()
        this.mbgList.rowsAdicional = this.nextPosition
    }

    removeAdicionalRow() {
        if (this.mbgList.rows[this.nextPosition] && this.mbgList.rowsAdicional !== undefined) {
            this.mbgList.rows.splice(this.mbgList.rowsAdicional, 1)
            this.updatePosition()
            delete this.mbgList.rowsAdicional
        }
    }

    updatePosition() {
        this.mbgList.$timeout(() => {
            Array.from(angular.element(this.mbgListElement).find('tbody tr'))
                .map((elm: any) => angular.element(elm).scope())
                .forEach((scope, index) => scope.$position = index)
        })
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
