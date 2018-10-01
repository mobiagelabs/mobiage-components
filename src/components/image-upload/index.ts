import * as angular from 'angular'
import { imageUpload } from './image-upload'
import { imageUploadMain } from './components/image-upload-main/image-upload-main'
import { imageUploadChildren } from './components/image-upload-children/image-upload-children'

const imageUploadModule = angular
    .module('mbg.components.imageUpload', [])
    .component('mbgImageUpload', imageUpload)
    .component('mbgImageUploadMain', imageUploadMain)
    .component('mbgImageUploadChildren', imageUploadChildren)
    .name

export * from './interfaces'
export { imageUploadModule }
