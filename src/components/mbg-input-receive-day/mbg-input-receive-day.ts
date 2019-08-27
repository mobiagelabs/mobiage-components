import './mbg-input-receive-day.scss'
import template from './mbg-input-receive-day.html'

class MbgInputReceiveDayController {
  private ngChange
  private ngModel
  private ngRequired
  private ngDisabled
  private props

  constructor(
    public $scope,
    public $element,
    public $attrs,
    public $compile,
    public $timeout
  ) { }

  $onInit() {
    this.$timeout(() => {
      if (this.$attrs.ngRequired === '') {
        this.ngRequired = true
      }
      if (this.$attrs.ngDisabled === '') {
        this.ngDisabled = true
      }
      this.props = {
        placeholder: this.$attrs.placeholder || '',
        precision: this.$attrs.precision || 0,
        allowNegative: this.$attrs.allowNegative ? JSON.parse(this.$attrs.allowNegative) : false,
        uiHideGroupSep: typeof this.$attrs.uiHideGroupSep !== undefined ? true : undefined
      }
      if (this.$attrs.min) {
        this.props.min = this.$attrs.min
      }
    })
  }
  
  onChange() {
    if (this.ngChange) {
      this.ngChange({})
    }
  }

}

MbgInputReceiveDayController.$inject = [
  '$scope',
  '$element',
  '$attrs',
  '$compile',
  '$timeout'
]

const mbgInputReceiveDay = {
  bindings: {
    ngModel: '=',
    ngChange: '&?',
    ngRequired: '=?',
    ngDisabled: '=?',
    ngBlur: '&?',
    ngFocus: '&?',
    positive: '=?',
    ngModelOptions: '=?'
  },
  template,
  controller: MbgInputReceiveDayController,
}

export { mbgInputReceiveDay }
