import './image-upload-children.scss'
import template from './image-upload-children.html'

// class ImageUploadChildrenController {
//     constructor() {}
// }

const imageUploadChildren = {
    bindings: {
        ngModel: '=',
        config: '='
    },
    // controller: ImageUploadChildrenController,
    template,
}

export { imageUploadChildren }
