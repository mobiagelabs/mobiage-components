import './mbg-btn-form.scss'
import * as angular from 'angular'
import template from './mbg-btn-form.html'

class MbgBtnFormController {
    private disabled: any
    private label: any

    constructor($scope, $element, $attrs) {
    }
}
MbgBtnFormController.$inject = ['$scope', '$element', '$attrs']

const mbgBtnForm = {
    bindings: {
        disabled: '=?',
        label: '@?'
    },
    template,
    controller: MbgBtnFormController,
}

export { mbgBtnForm }
