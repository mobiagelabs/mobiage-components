import * as angular from 'angular'
import { mbgSelectMultiple } from './mbg-select-multiple'
import 'angular-elastic-input'

const mbgSelectMultipleModule = angular
    .module('mbg.components.mbgSelectMultiple', [])
    .component('mbgSelectMultiple', mbgSelectMultiple)
    .name

export { mbgSelectMultipleModule }
