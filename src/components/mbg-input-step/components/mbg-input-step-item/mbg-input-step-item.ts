import './mbg-input-step-item.scss'
import template from './mbg-input-step-item.html'

class MbgInputStepItemController {
    private inputValue: string
    private fetch: Function
    private data: Array<any>

    constructor(public $scope, public $element, public $attrs, public $timeout) { }

    onInputChange() {
        const response = this.fetch({ query: this.inputValue })
        if (response instanceof Promise) {
            response.then((data) => this.afterFetchData(data))
        } else {
            this.afterFetchData(response)
        }
    }

    afterFetchData(data) {
        this.$timeout(() => this.data = data)
    }

}

MbgInputStepItemController.$inject = ['$scope', '$element', '$attrs', '$timeout']

const mbgInputStepItem = {
    bindings: {
        fetch: '&?',
        label: '@?'
    },
    require: {
        mbgInputStep: '^mbgInputStep'
    },
    controller: MbgInputStepItemController,
    template,
}

export { mbgInputStepItem }
