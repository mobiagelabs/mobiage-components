import * as angular from 'angular'
import { mbgProductSearch } from './mbg-product-search'
import 'angular-elastic-input'

const mbgProductSearchModule = angular
    .module('mbg.components.mbgProductSearch', [])
    .component('mbgProductSearch', mbgProductSearch)
    .name

export { mbgProductSearchModule }
