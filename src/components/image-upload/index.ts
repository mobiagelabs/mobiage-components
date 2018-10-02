import * as angular from 'angular'
import { imageUpload } from './image-upload'
import { imageUploadMain } from './components/image-upload-main/image-upload-main'
import { imageUploadChildren } from './components/image-upload-children/image-upload-children'
import { imageUploadNoImage } from './components/image-upload-no-image/image-upload-no-image'

const imageUploadModule = angular
    .module('mbg.components.imageUpload', [])
    .component('mbgImageUpload', imageUpload)
    .component('mbgImageUploadMain', imageUploadMain)
    .component('mbgImageUploadChildren', imageUploadChildren)
    .component('mbgImageUploadNoImage', imageUploadNoImage)
    .name

export * from './interfaces'
export { imageUploadModule }
