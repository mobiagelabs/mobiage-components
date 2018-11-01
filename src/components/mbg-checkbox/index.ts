import * as angular from 'angular'
import { mbgCheckbox } from './mbg-checkbox'

const mbgCheckboxModule = angular
    .module('mbg.components.mbgCheckbox', [])
    .component('mbgCheckbox', mbgCheckbox)
    .name

export { mbgCheckboxModule }
