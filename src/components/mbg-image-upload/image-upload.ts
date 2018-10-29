import './image-upload.scss'
import template from './image-upload.html'
import { ImageUploadConfig } from './interfaces/image-upload-config'
import { ImageUploadPosition } from './interfaces/image-upload-position'

class ImageUploadController {
    private config: ImageUploadConfig
    private defaultConfig: ImageUploadConfig
    private ngModel: any
    private webCam: boolean
    private enableCrop: boolean

    constructor() {
        this.defaultConfig = {
            accept: 'image/png, image/jpeg',
            maxImages: 1,
            enableCrop: false,
            rounded: false,
            size: {
                width: '290px',
                height: '290px',
            },
            children: {
                position: ImageUploadPosition.BOTTOM,
            }
        }
    }

    $onInit() {
        this.webCam = false
        this.config = Object.assign(this.defaultConfig, this.config)
        if (this.config.maxImages > 1) {
            this.ngModel = this.ngModel || []
        }
    }

}

const imageUpload = {
    bindings: {
        config: '=?',
        ngModel: '=',
    },
    controller: ImageUploadController,
    template,
}

export { imageUpload }
