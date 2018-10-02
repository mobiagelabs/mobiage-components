import './image-upload-main.scss'
import template from './image-upload-main.html'
import { ImageUploadConfig } from '../../interfaces'
import { storage } from 'firebase'

class ImageUploadMainController {
    private URL_FIREBASE = 'https://firebasestorage.googleapis.com/v0/b/bucket/o/id?alt=media'
    private inputElement: HTMLInputElement
    private config: ImageUploadConfig
    private ngModel: any

    constructor(public $scope, public $element) { }

    $onInit() {
        this.inputElement = this.$element.find('input')[0]
        this.inputElement.setAttribute('accept', this.config.accept)
        if (this.config.maxImages > 1) {
            this.inputElement.setAttribute('multiple', 'multiple')
        }
    }

    guid() {
        const s4 = () => Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1)
        return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4()
    }

    removeCurrentFiles() {
        const files = Array.isArray(this.ngModel) ? this.ngModel : [this.ngModel]
        files.forEach((file) => {
            if (file) {
                const storageRef = storage().ref().child(file.idStorage)
                storageRef.delete()
            }
        })
    }

    async uploadFiles(files: Array<string>) {
        this.removeCurrentFiles()
        const uploadedFiles = await Promise.all(files.map(async (base64) => {
            const imageID = this.guid()
            const storageRef = storage().ref().child(imageID)
            const response = await storageRef.putString(base64, 'data_url')
            const imageURL = this.URL_FIREBASE.replace(/bucket/g, response.metadata.bucket).replace(/id/g, response.metadata.name)
            const image = { url: imageURL, idStorage: imageID }
            return image
        }))
        this.$scope.$apply(() => {
            this.ngModel = uploadedFiles
        })
    }

    openImageChoice() {
        this.inputElement.click()
    }

    async onFilesChoice(evt) {
        const files: Array<File> = Array.from(evt.target.files)
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

ImageUploadMainController.$inject = ['$scope', '$element']

const imageUploadMain = {
    bindings: {
        ngModel: '=',
        config: '='
    },
    controller: ImageUploadMainController,
    template,
}

export { imageUploadMain }
