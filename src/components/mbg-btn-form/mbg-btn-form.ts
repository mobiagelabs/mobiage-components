import './mbg-btn-form.scss'
import * as angular from 'angular'
import template from './mbg-btn-form.html'

class MbgBtnFormController {
    private ngClick: Function
    private ngDisabled: boolean
    private loading: boolean

    constructor(public $scope, public $element, public $attrs) { }

    handleClick($event) {
        if (this.ngDisabled || this.loading) { return }
        $event.stopPropagation()
        this.ngClick({ $event })
    }

}
MbgBtnFormController.$inject = ['$scope', '$element', '$attrs']

const mbgBtnForm = {
    bindings: {
        ngDisabled: '=?',
        label: '@?',
        loading: '=?',
        ngClick: '&?',
    },
    template,
    controller: MbgBtnFormController,
}

export { mbgBtnForm }
