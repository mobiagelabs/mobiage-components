import './image-upload-children.scss'
import template from './image-upload-children.html'

class ImageUploadChildrenController {
    private ngModel: any

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

}

const imageUploadChildren = {
    bindings: {
        ngModel: '=',
        config: '='
    },
    controller: ImageUploadChildrenController,
    template,
}

export { imageUploadChildren }
