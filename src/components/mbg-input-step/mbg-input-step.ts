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

    focusNextInput() {
        this.$element.nextAll('input').first().focus()
    }

    handleClick(evt) {
        if (evt.target.nodeName === 'INPUT') {
            const scope: any = angular.element(evt.target).scope()
            if (scope.$ctrl.ngModel) {
                return
            }
        }
        evt.preventDefault()
        evt.stopPropagation()
        const itemsEmpty = Array.from(this.items).filter((item) => {
            const scope: any = angular.element(item).find('input').scope()
            return !scope.$ctrl.ngModel
        })
        if (itemsEmpty.length > 0) {
            const lastEmpty: any = angular.element(itemsEmpty[0])
            lastEmpty.find('input').focus()
        } else {
            const lastItem: any = angular.element(Array.from(this.items)[this.items.length - 1])
            lastItem.find('input').focus()
        }
    }

    showPlaceholder() {
        return Array.from((this.items || [])).filter((item) => {
            const scope: any = angular.element(item).find('input').scope()
            return scope.$ctrl.ngModel || scope.$ctrl.hasFocus
        }).length === 0
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
