import './mbg-input-file.scss'
import template from './mbg-input-file.html'
import { ImageUploadFirebase } from '../mbg-image-upload/helpers/firebase'

class MbgInputFileController {
    public inputElement
    public isDragStart: boolean
    public multiple: boolean
    public ngModel: any
    public uploading: boolean
    public uploadingError: boolean
    public uploadPaused: boolean
    public uploadProgress: number
    public uploadTask: any

    constructor(public $scope, public $element, public $attrs, public $timeout) { }

    $onInit() {
        this.$timeout(() => {
            this.uploadProgress = 0
            this.inputElement = this.$element.find('.input-fake')[0]
            this.inputElement.addEventListener('dragover', this.onDragOver)
            this.inputElement.addEventListener('dragleave', this.onDragLeave)
            this.inputElement.addEventListener('drop', this.onDrop)
        })
    }

    $onDestroy() {
        this.inputElement.removeEventListener('dragover', this.onDragOver)
        this.inputElement.removeEventListener('dragleave', this.onDragLeave)
        this.inputElement.removeEventListener('drop', this.onDrop)
    }

    onDragOver = (evt) => {
        evt.stopPropagation()
        evt.preventDefault()
        this.$timeout(() => this.isDragStart = true)
    }

    onDragLeave = (evt) => {
        evt.stopPropagation()
        evt.preventDefault()
        this.$timeout(() => this.isDragStart = false)
    }

    onDrop = (evt) => {
        evt.stopPropagation()
        evt.preventDefault()
        const files: Array<File> = Array.from(evt.dataTransfer.files)
        if (files && files.length > 0) {
            this.processFiles(files)
        }
        this.$timeout(() => this.isDragStart = false)
    }

    openImageChoice() {
        this.$timeout(() => this.$element.find('input[type="file"]')[0].click())
    }

    onFilesChoice(evt) {
        const files: Array<File> = Array.from(evt.target.files)
        if (files && files.length > 0) {
            this.processFiles(files)
        }
    }

    getBase64(file: File): Promise<any> {
        return new Promise((resolve) => {
            const reader = new FileReader()
            reader.readAsDataURL(file)
            reader.onload = () => resolve(reader.result)
        })
    }

    processFiles(files) {
        this.uploading = true
        this.$timeout(() => {
            this.uploadTask = ImageUploadFirebase.uploadFile(files[0], {
                onResume: () => {
                    this.$timeout(() => this.uploadPaused = false)
                },
                onPause: () => {
                    this.$timeout(() => this.uploadPaused = true)
                },
                onProgress: (value) => {
                    this.$timeout(() => this.uploadProgress = Math.round(value))
                },
                onError: () => {
                    this.$timeout(() => {
                        this.uploadingError = true
                        this.uploading = false
                    })
                },
                onSuccess: (response) => {
                    this.$timeout(() => {
                        this.uploadingError = false
                        this.uploading = false
                        this.ngModel = response
                        this.$timeout(() => this.uploadProgress = 0, 1000)
                    })
                }
            })
        })
    }

    playOrResume() {
        if (this.uploadTask) {
            if (this.uploadPaused) {
                this.uploadTask.resume()
            } else {
                this.uploadTask.pause()
            }
        }
    }

    stopUpload() {
        if (this.uploadTask) {
            this.uploadTask.cancel()
        }
    }

    clearModel() {
        delete this.ngModel
    }

    getSize(bytes: any) {
        const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB']
        if (bytes === 0) { return '0 Byte' }
        const value: any = Math.floor(Math.log(bytes) / Math.log(1024))
        const i = parseInt(value)
        return Math.round(bytes / Math.pow(1024, i)) + ' ' + sizes[i]
    }

}

MbgInputFileController.$inject = ['$scope', '$element', '$attrs', '$timeout']

const mbgInputFile = {
    bindings: {
        ngModel: '=',
    },
    template,
    controller: MbgInputFileController,
}

export { mbgInputFile }
