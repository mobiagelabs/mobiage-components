import * as angular from 'angular'
import { imageUpload } from './image-upload'
import { imageUploadMain } from './components/image-upload-main/image-upload-main'
import { imageCrop } from './components/image-upload-main/components/image-crop/image-crop'
import { imageUploadChildren } from './components/image-upload-children/image-upload-children'
import { imageUploadNoImage } from './components/image-upload-no-image/image-upload-no-image'
import { imageUploadLoading } from './components/image-upload-loading/image-upload-loading'


const mbgImageUploadModule = angular
    .module('mbg.components.imageUpload', [])
    .component('mbgImageUpload', imageUpload)
    .component('mbgImageUploadMain', imageUploadMain)
    .component('mbgImageUploadChildren', imageUploadChildren)
    .component('mbgImageUploadNoImage', imageUploadNoImage)
    .component('mbgImageUploadLoading', imageUploadLoading)
    .component('mbgImageCrop', imageCrop)
    .name

export * from './interfaces'
export { mbgImageUploadModule }
