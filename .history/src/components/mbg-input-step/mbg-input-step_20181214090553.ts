import * as angular from 'angular'
import './mbg-input-step.scss'
import template from './mbg-input-step.html'

class MbgInputStepController {
    private items: Array<HTMLElement>
    private onFinishFocusElement: string

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
        if (this.onFinishFocusElement) {
            debugger
            const elementToFocus: any = angular.element(this.onFinishFocusElement)
            elementToFocus.focus()
        } else {
            this.$element.nextAll('input').first().focus()
        }
    }

    handleClick(evt) {
        if (evt.type !== 'click' || evt.target.className !== 'mb-input-step-wrapper') {
            return
        }
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
            this.$timeout(() => lastEmpty.find('input').focus(), 400)
        } else {
            const lastItem: any = angular.element(Array.from(this.items)[this.items.length - 1])
            this.$timeout(() => lastItem.find('input').focus(), 400)
        }
    }

    showPlaceholder() {
        return Array.from((this.items || [])).filter((item) => {
            const scope: any = angular.element(item).find('input').scope()
            return (scope && scope.$ctrl.ngModel) || (scope && scope.$ctrl.hasFocus)
        }).length === 0
    }

}

MbgInputStepController.$inject = ['$scope', '$element', '$attrs', '$timeout', '$compile']

const mbgInputStep = {
    bindings: {
        onFinishFocusElement: '@?',
    },
    transclude: true,
    controller: MbgInputStepController,
    template,
}

export { mbgInputStep }
