import './image-upload-main.scss'
import * as angular from 'angular'
import template from './image-upload-main.html'
import { ImageUploadConfig } from '../../interfaces'
import { ImageUploadFirebase } from '../../helpers/firebase'
import * as Webcam from 'webcamjs'

class ImageUploadMainController {
    private inputElement: HTMLInputElement
    private config: ImageUploadConfig
    private ngModel: any
    private loading: boolean
    private showAlertMessage: string
    private labelPicture: string
    private width: number
    private height: number
    private enableCrop: boolean
    private pendentCrop: any

    constructor(public $scope, public $element, public $timeout, public webCam) { }

    $onInit() {
        this.labelPicture = 'Tirar Foto'
        this.inputElement = this.$element.find('input')[0]
        this.inputElement.setAttribute('accept', this.config.accept)
        if (this.config.maxImages > 1) {
            this.inputElement.setAttribute('multiple', 'multiple')
        }
    }

    openWebCam() {
        this.labelPicture = 'Tirar Foto'
        this.webCam = true
        const elm = this.$element.find('.webcam')
        this.width = elm.parent().width()
        this.height = elm.parent().height()
        elm.width(this.width)
        elm.height(this.height)
        this.$timeout(() => {
            Webcam.set('constraints', { width: this.width, height: this.height })
            Webcam.attach(elm[0])
            this.config.maxImages > 1 ? this.ngModel.unshift({ url: null }) : angular.noop
        })
    }

    varifyEmptyNgModel() {
        return this.config.maxImages > 1 ? this.ngModel.length > 0 : this.ngModel
    }

    takeSnapshot() {
        this.labelPicture = 'Capturando Foto'
        Webcam.snap(async (base64) => {
            if (this.enableCrop && this.config.maxImages === 1) {
                this.labelPicture = 'Tirar Foto'
                this.pendentCrop = base64
            } else {
                const uploadedFiles = await ImageUploadFirebase.upload([base64])
                this.$timeout(() => {
                    this.setNgModel(uploadedFiles)
                    this.config.maxImages === 1 ? this.closeWebCam() : angular.noop()
                    this.labelPicture = 'Tirar Foto'
                })
            }
        })
    }

    removeImage() {
        this.config.maxImages > 1 ? this.ngModel.splice(0, 1) : delete this.ngModel
    }

    closeWebCam() {
        this.webCam = false
        this.config.maxImages > 1 ? this.ngModel.splice(0, 1) : angular.noop
    }

    setNgModel(files) {
        if (this.config.maxImages > 1) {
            this.ngModel = this.ngModel || []
            this.ngModel = this.ngModel.concat(files)
        } else {
            this.ngModel = files[0]
        }
    }

    showAlert(message: string) {
        this.$timeout(() => {
            this.showAlertMessage = message
            this.$timeout(() => this.showAlertMessage = null, 3000)
        })
    }

    removeCurrentFiles() {
        const files = Array.isArray(this.ngModel) ? this.ngModel : [this.ngModel]
        // console.log(files)
        // ImageUploadFirebase.removeFiles(files)
    }

    async uploadFiles(files: Array<string>) {
        this.$timeout(() => this.loading = true)
        this.removeCurrentFiles()
        const uploadedFiles = await ImageUploadFirebase.upload(files)
        this.$timeout(() => {
            this.setNgModel(uploadedFiles)
            this.loading = false
        })
    }

    openImageChoice(evt) {
        if (this.config.maxImages === 1 || (!this.enableImageContent() || (Array.isArray(this.ngModel) && this.ngModel.length === 1))) {
            this.inputElement.click()
        }
    }

    async onFilesChoice(evt) {
        const files: Array<File> = Array.from(evt.target.files)
        const totalFiles = files.length + (Array.isArray(this.ngModel) ? this.ngModel.length : 0)
        if (totalFiles > this.config.maxImages) {
            const remaing = this.config.maxImages - (Array.isArray(this.ngModel) ? this.ngModel.length : 0)
            if (remaing > 0) {
                this.showAlert(`Permitido adicionar mais ${remaing} ${remaing > 1 ? 'imagens' : 'imagem'}.`)
            } else {
                this.showAlert(`Permitido no máximo ${this.config.maxImages} ${this.config.maxImages > 1 ? 'imagens' : 'imagem'}.`)
            }
            return
        }
        const data = await Promise.all(files.map(async (file) => this.getBase64(file)))
        if (this.enableCrop && this.config.maxImages === 1) {
            this.$timeout(() => {
                this.pendentCrop = data[0]
            })
        } else {
            this.uploadFiles(data)
        }
        this.inputElement.value = null
    }

    uploadPosCrop(data) {
        if (data) {
            this.pendentCrop = false
            this.loading = true
            this.uploadFiles([data])
        }
    }

    getBase64(file: File): Promise<any> {
        return new Promise((resolve) => {
            const reader = new FileReader()
            reader.readAsDataURL(file)
            reader.onload = () => resolve(reader.result)
        })
    }

    getImageContent() {
        const imageMain = Array.isArray(this.ngModel) && this.ngModel.length > 0
            ? this.ngModel[0] : (this.ngModel ? this.ngModel : null)
        const image = {
            background: `url(${imageMain.url}) no-repeat center center / cover`,
        }
        if (imageMain.url != null) {
            return image
        } else {
            return
        }
    }

    enableImageContent() {
        const isArray = Array.isArray(this.ngModel)
        if (isArray && this.ngModel.length > 0) {
            return true
        }
        if (!isArray && this.ngModel) {
            return true
        }
        return false
    }

}

ImageUploadMainController.$inject = ['$scope', '$element', '$timeout']

const imageUploadMain = {
    bindings: {
        ngModel: '=',
        enableCrop: '=',
        webCam: '=',
        config: '='
    },
    controller: ImageUploadMainController,
    template,
}

export { imageUploadMain }
