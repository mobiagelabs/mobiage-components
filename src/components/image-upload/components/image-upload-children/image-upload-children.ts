import * as angular from 'angular'
import './image-upload-children.scss'
import template from './image-upload-children.html'

class ImageUploadChildrenController {
    private ngModel: any

    constructor(public $scope, public $element, public $timeout) { }

    getImageChilds() {
        const arr = Array.isArray(this.ngModel) ? this.ngModel : [this.ngModel]
        const childs = Object.assign([], arr).splice(1)
        return childs
    }

    getImageContent(child) {
        const image = {
            background: `url(${child.url}) no-repeat center center / cover`,
        }
        return image
    }

    handleClick(child, index) {
        const currentMain = this.ngModel[0]
        this.ngModel[0] = child
        this.ngModel[index] = currentMain
    }

    removeChild(index, evt?) {
        if (evt) {
            evt.stopPropagation()
        }
        this.ngModel.splice(index + 1, 1)
    }

    handleCreateClick() {
        const inputFile: any = angular
            .element(this.$element[0].parentNode.parentNode)
            .find('input[type="file"]')
            inputFile.click()
    }

}

ImageUploadChildrenController.$inject = ['$scope', '$element', '$timeout']

const imageUploadChildren = {
    bindings: {
        ngModel: '=',
        config: '='
    },
    controller: ImageUploadChildrenController,
    template,
}

export { imageUploadChildren }
