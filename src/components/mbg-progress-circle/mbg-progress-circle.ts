import './mbg-progress-circle.scss'
import template from './mbg-progress-circle.html'
const ProgressBar = require('progressbar.js')

class MbgProgressCircleController {

    private unWatch: any
    private progressCircle: any
    private onFinish: Function

    constructor(public $scope, public $element, public $attrs, public $timeout) {
    }

    $onInit() {
        this.unWatch = this.$scope.$watch('$ctrl.percentage', (value) => {
            if (this.progressCircle && value != undefined) {
                this.progressCircle.animate(value / 100)
            }
        })
        this.$timeout(() => {
            this.progressCircle = new ProgressBar.Circle('#progress', {
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
                    var value = Math.round(circle.value() * 100);
                    if (value === 0) {
                        circle.setText('')
                    } else {
                        circle.setText(value + '%')
                    }
                }
            });
            this.progressCircle.text.style.fontFamily = '"Raleway", Helvetica, sans-serif'
            this.progressCircle.text.style.fontSize = '2rem'
            this.progressCircle.animate(0.0)
        })
    }

    $onDestroy() {
        if (this.unWatch) {
            this.unWatch()
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
        titleProgress: '@?'
    },
    template,
    controller: MbgProgressCircleController,
}

export { mbgProgressCircle }
