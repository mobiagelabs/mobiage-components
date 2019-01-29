import * as angular from 'angular'
import { mbgSelect } from './mbg-select'
import 'angular-elastic-input'

const mbgSelectModule = angular
    .module('mbg.components.mbgSelect', [])
    .component('mbgSelect', mbgSelect)
    // .component('mbgInputStepItem', mbgInputStepItem)
    .name

export { mbgSelectModule }
