import './mbg-homescreen.scss'
import template from './mbg-homescreen.html'

class MbgHomescreenController {
    private tabs: Array<any>
    private ngModel
    private ngChange
    private config
    private cards: Array<any>
    private chart
    private loading

    constructor(public $scope, public $element, public $attrs, public $timeout) { }

    $onInit() {
        this.$scope.$watch('$ctrl.config', () => {
            if (this.config && !this.tabs) {
                this.tabs = this.config.tabs
                this.renderTab(0)
            }
        })
    }

    renderTab(tabIndex) {
        this.$timeout(() => {
            if (this.tabs[tabIndex]) {
                this.tabs.forEach((tab, index) => this.tabs[index].active = false)
                this.tabs[tabIndex].active = true
                this.cards = this.tabs[tabIndex].cards
                this.chart = this.tabs[tabIndex].chart
            }
        })
    }

}

MbgHomescreenController.$inject = ['$scope', '$element', '$attrs', '$timeout']

const mbgHomescreen = {
    bindings: {
        config: '=',
        loading: '=?',
    },
    template,
    controller: MbgHomescreenController,
}

export { mbgHomescreen }
