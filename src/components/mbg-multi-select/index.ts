import * as angular from 'angular'
import { mbgMultiSelect } from './mbg-multi-select'

const mbgMultiSelectModule = angular
    .module('mbg.components.mbgMultiSelect', [])
    .component('mbgMultiSelect', mbgMultiSelect)
    .name

export { mbgMultiSelectModule }
