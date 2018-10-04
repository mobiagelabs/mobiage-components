import './mbg-input-tags.scss'
import template from './mbg-input-tags.html'

class MbgInputTagsController {
    private ngChange
    private ngModel
    private ngRequired
    private ngDisabled
    private ngKeyup
    private props
    private inputValue: string

    constructor(public $scope, public $element, public $attrs) {
        if ($attrs.ngRequired === '') { this.ngRequired = true }
        if ($attrs.ngDisabled === '') { this.ngDisabled = true }
        this.props = {
            placeholder: $attrs.placeholder || '',
        }
    }

    $onInit() {
        this.ngModel = this.ngModel || []
    }

    onChange() {
        if (this.ngChange) {
            this.ngChange({})
        }
    }

    onKeyUp(param) {
        if (this.ngKeyup) {
            this.ngKeyup(param)
        }
        const evt = param.$event
        if (evt.keyCode === 13) {
            this.addTag(this.inputValue)
            this.inputValue = ''
        }
    }

    addTag(str: string) {
        this.ngModel.push(str)
    }

    removeTag(index) {
        this.ngModel.splice(index, 1)
    }

}

MbgInputTagsController.$inject = ['$scope', '$element', '$attrs']

const mbgInputTags = {
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
    },
    template,
    controller: MbgInputTagsController,
}

export { mbgInputTags }
