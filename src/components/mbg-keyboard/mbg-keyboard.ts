import './mbg-keyboard.scss'
import template from './mbg-keyboard.html'

export class MbgKeyboard {
    private ngModel

    constructor(public $scope, public $element, public $attrs, public $timeout) { }

}

MbgKeyboard.$inject = ['$scope', '$element', '$attrs', '$timeout']

const mbgKeyboard = {
    bindings: {
        ngModel: '=?',
    },
    template,
    controller: MbgKeyboard,
}

export { mbgKeyboard }
