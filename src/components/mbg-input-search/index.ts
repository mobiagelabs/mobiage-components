import * as angular from 'angular'
import { mbgInputSearch } from './mbg-input-search'

const mbgInputSearchModule = angular
    .module('mbg.components.mbgInputSearch', [])
    .component('mbgInputSearch', mbgInputSearch)
    .name

export { mbgInputSearchModule }
