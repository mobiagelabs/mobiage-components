import './mbg-btn-form.scss'
import * as angular from 'angular'
import template from './mbg-btn-form.html'

class MbgBtnFormController {
    private ngClick: Function

    constructor(public $scope, public $element, public $attrs) {}

    handleClick($event) {
        $event.stopPropagation()
        this.ngClick({ $event })
    }

}
MbgBtnFormController.$inject = ['$scope', '$element', '$attrs']

const mbgBtnForm = {
    bindings: {
        ngDisabled: '=?',
        label: '@?',
        ngClick: '&?',
    },
    template,
    controller: MbgBtnFormController,
}

export { mbgBtnForm }
