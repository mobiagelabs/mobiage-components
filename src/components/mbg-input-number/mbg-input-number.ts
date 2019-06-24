import './mbg-input-number.scss'
import template from './mbg-input-number.html'

class MbgInputNumberController {
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
      if (this.$attrs.max) {
        this.props.max = this.$attrs.max
      }
      if (this.props.allowNegative) {
        this.enableNegative()
      }
    })
  }

  enableNegative() {
    this.$timeout(() => {
      let input = this.$element.find('input').clone()
      input.attr('ui-negative-number', 'true')
      input = this.$compile(input)(this.$scope)
      this.$element.find('input').replaceWith(input)
    })
  }

  onChange() {
    if (this.ngChange) {
      this.ngChange({})
    }
  }

}

MbgInputNumberController.$inject = [
  '$scope',
  '$element',
  '$attrs',
  '$compile',
  '$timeout'
]

const mbgInputNumber = {
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
  controller: MbgInputNumberController,
}

export { mbgInputNumber }
