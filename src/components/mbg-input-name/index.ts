import * as angular from 'angular'
import { mbgInputName } from './mbg-input-name'

const mbgInputNameModule = angular
    .module('mbg.components.mbgInputName', [])
    .component('mbgInputName', mbgInputName)
    .name

export { mbgInputNameModule }
