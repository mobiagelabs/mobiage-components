import './image-upload-main.scss'
import template from './image-upload-main.html'
import { ImageUploadConfig } from '../../interfaces'
import { ImageUploadFirebase } from '../../helpers/firebase'

class ImageUploadMainController {
    private inputElement: HTMLInputElement
    private config: ImageUploadConfig
    private ngModel: any
    private loading: boolean
    private showAlert: boolean

    constructor(public $scope, public $element, public $timeout) { }

    $onInit() {
        this.inputElement = this.$element.find('input')[0]
        this.inputElement.setAttribute('accept', this.config.accept)
        if (this.config.maxImages > 1) {
            this.inputElement.setAttribute('multiple', 'multiple')
        }
    }

    setNgModel(files) {
        if (this.config.maxImages > 1) {
            this.ngModel = this.ngModel || []
            this.ngModel = this.ngModel.concat(files)
        } else {
            this.ngModel = files[0]
        }
    }

    showAlertMaxImages() {
        this.$scope.$apply(() => {
            this.showAlert = true
            this.$timeout(() => {
                this.showAlert = false
            }, 3000)
        })
    }

    removeCurrentFiles() {
        const files = Array.isArray(this.ngModel) ? this.ngModel : [this.ngModel]
        // console.log(files)
        // ImageUploadFirebase.removeFiles(files)
    }

    async uploadFiles(files: Array<string>) {
        this.$scope.$apply(() => this.loading = true)
        this.removeCurrentFiles()
        const uploadedFiles = await ImageUploadFirebase.upload(files)
        this.$scope.$apply(() => {
            this.setNgModel(uploadedFiles)
            this.loading = false
        })
    }

    openImageChoice() {
        this.inputElement.click()
    }

    async onFilesChoice(evt) {
        const files: Array<File> = Array.from(evt.target.files)
        if (files.length > this.config.maxImages) {
            this.showAlertMaxImages()
            return
        }
        const data = await Promise.all(files.map(async (file) => this.getBase64(file)))
        this.uploadFiles(data)
        this.inputElement.value = null
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
        return image
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
        config: '='
    },
    controller: ImageUploadMainController,
    template,
}

export { imageUploadMain }
