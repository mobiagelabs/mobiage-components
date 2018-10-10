import * as angular from 'angular'
import { mbgTextArea } from './mbg-text-area'

const mbgTextAreaModule = angular
    .module('mbg.components.mbgTextArea', [])
    .component('mbgTextArea', mbgTextArea)
    .name

export { mbgTextAreaModule }
