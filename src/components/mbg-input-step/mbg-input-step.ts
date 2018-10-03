import * as angular from 'angular'
import './mbg-input-step.scss'
import template from './mbg-input-step.html'

class MbgInputStepController {
    private items: Array<HTMLElement>

    constructor(public $scope, public $element, public $attrs, public $timeout, public $compile) {
        this.$timeout(() => this.fetchItems())
    }

    fetchItems() {
        const items: any = this.$element.find('mbg-input-step-item')
        items.sort((a, b) => {
            const startA = parseInt(angular.element(a).attr('order'))
            const startB = parseInt(angular.element(b).attr('order'))
            return startA - startB
        })
        items.parent().replaceWith(this.$compile(items)(this.$scope.$parent))
        this.items = items
    }

}

MbgInputStepController.$inject = ['$scope', '$element', '$attrs', '$timeout', '$compile']

const mbgInputStep = {
    bindings: {
    },
    transclude: true,
    controller: MbgInputStepController,
    template,
}

export { mbgInputStep }
