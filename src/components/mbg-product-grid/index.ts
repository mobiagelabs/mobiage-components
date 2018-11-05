import * as angular from 'angular'
import { mbgProductGrid } from './mbg-product-grid'

const mbgProductGridModule = angular
    .module('mbg.components.mbgProductGrid', [])
    .component('mbgProductGrid', mbgProductGrid)
    .name

export { mbgProductGridModule }
