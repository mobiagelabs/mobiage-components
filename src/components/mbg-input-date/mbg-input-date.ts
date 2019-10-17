import './mbg-input-date.scss'
import template from './mbg-input-date.html'

class MbgInputDateController {
    public ngChange
    public ngModel
    public ngFocus
    public ngBlur
    public ngRequired
    public ngDisabled
    public props
    public format
    public calendar: boolean
    public showSingleCalendar: boolean
    public between: boolean
    public betweenText: string

    constructor(public $scope, public $element, public $attrs) {
        if ($attrs.ngRequired === '') { this.ngRequired = true }
        if ($attrs.ngDisabled === '') { this.ngDisabled = true }
        this.props = {
            placeholder: $attrs.placeholder || '',
            placeholderStart: $attrs.placeholderStart || '',
            placeholderEnd: $attrs.placeholderEnd || '',
        }
        this.format = 'DD/MM/YYYY'
    }

    onChange() {
        if (this.ngChange) {
            this.ngChange({})
        }
    }

    handleFocus(props) {
        this.showSingleCalendar = true
        if (this.ngFocus) { this.ngFocus(props) }
    }

    handleBlur(props) {
        this.showSingleCalendar = false
        if (this.ngBlur) { this.ngBlur(props) }
    }

    onSelectStart = () => {
        this.$element.find(`.mbg-date-between-end`).focus()
    }

}

MbgInputDateController.$inject = ['$scope', '$element', '$attrs']

const mbgInputDate = {
    bindings: {
        ngModel: '=',
        ngChange: '&?',
        ngRequired: '=?',
        ngDisabled: '=?',
        ngBlur: '&?',
        ngFocus: '&?',
        ngKeyup: '&?',
        ngKeypress: '&?',
        ngKeydown: '&?',
        format: '@?',
        betweenText: '@?',
        calendar: '=?',
        between: '=?',
    },
    template,
    controller: MbgInputDateController,
}

export { mbgInputDate }
