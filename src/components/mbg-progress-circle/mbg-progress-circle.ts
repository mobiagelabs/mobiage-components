import './mbg-progress-circle.scss'
import template from './mbg-progress-circle.html'
import * as angular from 'angular'
import { UtilUID } from '../../helpers/util-uid'
const progressBar = require('progressbar.js')
class MbgProgressCircleController {

    private unWatchPercentage: any
    private unWatchShow: any
    private progressCircle: any
    private onFinish: Function
    private uidComponent
    private show = false

    constructor(public $scope, public $element, public $attrs, public $timeout) {
    }

    $onInit() {
        this.uidComponent = UtilUID.generete()
        this.unWatchPercentage = this.$scope.$watch('$ctrl.percentage', (value) => {
            if (this.progressCircle && value !== undefined) {
                this.progressCircle.animate(value / 100)
            }
        })
        this.unWatchShow = this.$scope.$watch('$ctrl.show', (value) => {
            this.$timeout(() => {
                value !== undefined && value ? this.addInBody() : this.removeInBody()
            })
        })
        this.$timeout(() => {
            this.progressCircle = new progressBar.Circle('#progress', {
                color: '#666',
                strokeWidth: 4,
                trailWidth: 1,
                easing: 'easeInOut',
                duration: 1400,
                text: {
                    autoStyleContainer: true,
                },
                from: { color: '#666', width: 1 },
                to: { color: '#000', width: 4 },
                step: function (state, circle) {
                    const value = Math.round(circle.value() * 100)
                    if (value === 0) {
                        circle.setText('')
                    } else {
                        circle.setText(value + '%')
                    }
                }
            })
            this.progressCircle.text.style.fontFamily = '"Raleway", Helvetica, sans-serif'
            this.progressCircle.text.style.fontSize = '2rem'
            this.progressCircle.animate(0.0)
        })
    }

    addInBody() {
        const body = angular.element(document).find('body')
        const list = this.$element.find('div.mbg-progress-circle-wrapper')
        list.attr('uid', this.uidComponent)
        body.append(list)
    }

    removeInBody() {
        const list = angular.element(`[uid="${this.uidComponent}"]`)
        this.$element.find('.mbg-progress-circle-wrapper').append(list)
    }

    $onDestroy() {
        if (this.unWatchPercentage) {
            this.unWatchPercentage()
        }
    }

}

MbgProgressCircleController.$inject = [
    '$scope',
    '$element',
    '$attrs',
    '$timeout'
]

const mbgProgressCircle = {
    bindings: {
        percentage: '=?',
        titleProgress: '@?',
        show: '=?'
    },
    template,
    controller: MbgProgressCircleController,
}

export { mbgProgressCircle }
