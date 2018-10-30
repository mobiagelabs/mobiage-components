import './mbg-list.scss'
import template from './mbg-list.html'
import { MbgListColumnController } from './components/mbg-list-column/mbg-list-column'

export class MbgListController {
    private list: Array<any>
    private columns: Array<MbgListColumnController>

    constructor(public $scope, public $element, public $attrs, public $timeout, public $transclude) { }

    $onInit() {
        this.columns = []
        console.log(this.columns)
    }

    registerColumn(column: MbgListColumnController) {
        this.columns.push(column)
    }

}

MbgListController.$inject = ['$scope', '$element', '$attrs', '$timeout', '$transclude']

const mbgList = {
    transclude: true,
    bindings: {
        list: '=?',
        class: '@?'
    },
    template,
    controller: MbgListController,
}

export { mbgList }
