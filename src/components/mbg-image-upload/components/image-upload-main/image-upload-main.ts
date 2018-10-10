import './image-upload-main.scss'
import template from './image-upload-main.html'
import { ImageUploadConfig } from '../../interfaces'
import { ImageUploadFirebase } from '../../helpers/firebase'

class ImageUploadMainController {
    private inputElement: HTMLInputElement
    private config: ImageUploadConfig
    private ngModel: any
    private loading: boolean
    private showAlertMessage: string

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

    openImageChoice() {
        if (this.config.maxImages === 1 || (!this.enableImageContent() || (Array.isArray(this.ngModel) && this.ngModel.length === 1))) {
            this.$timeout(() => {
                this.inputElement.click()
            })
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
