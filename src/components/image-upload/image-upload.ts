import './image-upload.scss'
import template from './image-upload.html'
import { ImageUploadConfig } from './interfaces/image-upload-config'
import { ImageUploadPosition } from './interfaces/image-upload-position'

class ImageUploadController {
    private config: ImageUploadConfig
    private defaultConfig: ImageUploadConfig

    constructor() {
        this.defaultConfig = {
            accept: 'image/png, image/jpeg',
            maxImages: 1,
            size: {
                width: '290px',
                height: '374px',
            },
            children: {
                position: ImageUploadPosition.BOTTOM,
            }
        }
    }

    $onInit() {
        this.config = Object.assign(this.defaultConfig, this.config)
    }

}

const imageUpload = {
    bindings: {
        config: '=?',
    },
    controller: ImageUploadController,
    template,
}

export { imageUpload }
