import * as angular from 'angular'
import { mbgProductInline } from './mbg-product-inline'

const mbgProductInlineModule = angular
    .module('mbg.components.mbgProductInline', [])
    .component('mbgProductInline', mbgProductInline)
    .name

export { mbgProductInlineModule }
