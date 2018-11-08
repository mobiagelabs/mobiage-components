import * as angular from 'angular'
import { mbgInputCheckbox } from './mbg-input-checkbox'

const mbgInputCheckboxModule = angular
    .module('mbg.components.mbgInputCheckbox', [])
    .component('mbgInputCheckbox', mbgInputCheckbox)
    .name

export { mbgInputCheckboxModule }
