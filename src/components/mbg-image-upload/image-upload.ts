import './image-upload.scss'
import template from './image-upload.html'
import { ImageUploadConfig } from './interfaces/image-upload-config'
import { ImageUploadPosition } from './interfaces/image-upload-position'
import * as angular from 'angular'
import { UtilUID } from '../../helpers/util-uid'

class ImageUploadController {
    private config: ImageUploadConfig
    private defaultConfig: ImageUploadConfig
    private ngModel: any
    private webCam: boolean
    private enableCrop: boolean
    private uid

    constructor(public $timeout) {
        this.defaultConfig = {
            accept: 'image/png, image/jpeg',
            maxImages: 1,
            enableCrop: false,
            rounded: false,
            disableFirebase: false,
            viewMode: false,
            disableWebcam: false,
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
        this.uid = UtilUID.generete()
        this.webCam = false
        this.$timeout(() => {
            if (this.config && this.config.size && this.config.size.width.includes('%')) {
                this.config.size.height = !this.config.size.height 
                ? angular.element(`#${this.uid}`).parent().parent().width() // Foi realizado os parents para capturar o tamanho do pai relativo ao mbg-image-upload para que o height não fique zerado
                : this.config.size.height
            }
            this.config = Object.assign(this.defaultConfig, this.config)
            if (this.config.maxImages > 1) {
                this.ngModel = this.ngModel || []
            }
        })

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
