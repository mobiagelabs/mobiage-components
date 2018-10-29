import './image-crop.scss'
import 'croppie/croppie.css'
import { Croppie } from 'croppie'
import template from './image-crop.html'
import * as angular from 'angular'
import { ImageUploadConfig } from '../../../../interfaces'

class ImageCropController {
    private inputElement: HTMLInputElement
    private config: ImageUploadConfig
    private pendentCrop: any
    private width: number
    private height: number
    private upload: Function
    private element: any
    private crop: any
    private editImage: any

    constructor(public $scope, public $element, public $timeout) {
    }

    $onInit() {
        this.element = this.$element.find('.crop')[0]
        this.setImageCrop()
    }

    setImageCrop() {
        this.editImage = this.pendentCrop
        this.createCrop()
    }

    createCrop() {
        const defaultCrop = {
            viewport: {
                width: this.width,
                height: this.height,
                type: this.config.rounded ? 'circle' : 'square'
            },
            zoomOnWheel: true,
            enableOrientation: true,
            checkCrossOrigin: false,
        }

        const config = Object.assign(defaultCrop)
        this.crop = new Croppie(this.element, config)
        this.crop.bind({ url: this.editImage }).then()
    }

    closeCrop() {
        this.$timeout(() => {
            delete this.pendentCrop
        })
    }

    acceptCrop() {
        this.crop.result({ type: 'base64' }).then((resp) => {
            this.upload({ data: resp })
        })
    }

}

ImageCropController.$inject = ['$scope', '$element', '$timeout']

const imageCrop = {
    bindings: {
        pendentCrop: '=',
        upload: '&',
        config: '=',
        width: '=',
        height: '='
    },
    controller: ImageCropController,
    template,
}

export { imageCrop }
