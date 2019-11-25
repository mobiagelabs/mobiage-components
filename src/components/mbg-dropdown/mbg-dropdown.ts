import './mbg-dropdown.scss'
import template from './mbg-dropdown.html'

class MbgDropdownController {
    private inputElement: HTMLInputElement
    private callbackFunction: Function
    private options: Array<any>

    constructor(public $scope, public $element, public $attrs, public $timeout) {
        this.inputElement = this.$element.find('input')[0]
    }

    $onInit() {
        this.options = this.$scope.$parent.$eval(this.$attrs.options)
    }

    onClickOption(option) {
        this.$timeout(() => {
            if (option) {
                switch (option.action) {
                    case 'UPLOAD':
                        this.callbackFunction = option.callback
                        this.inputElement.click()
                        break
                    default:
                        if (option.callback) {
                            option.callback()
                        }
                        break
                }
            }
        })
    }

    async onFilesChoice(evt) {
        const files: Array<File> = Array.from(evt.target.files)
        // const data = await Promise.all(files.map(async (file) => this.getBase64(file)))
        const data = files
        if (this.callbackFunction) {
            this.callbackFunction(data)
        }
        this.inputElement.value = null
    }

    transformBase64ToObject(files) {
        return files.map((base64) => {
            return {
                url: base64
            }
        })
    }

    getBase64(file: File): Promise<any> {
        return new Promise((resolve) => {
            const reader = new FileReader()
            reader.readAsDataURL(file)
            reader.onload = () => resolve(reader.result)
        })
    }

}

MbgDropdownController.$inject = [
    '$scope',
    '$element',
    '$attrs',
    '$timeout'
]

const mbgDropdown = {
    bindings: {
        label: '@?',
        direction: '@?'
    },
    template,
    controller: MbgDropdownController,
}

export { mbgDropdown }
