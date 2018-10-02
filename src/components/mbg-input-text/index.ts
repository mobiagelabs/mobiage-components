import * as angular from 'angular'
import { mbgInputText } from './mbg-input-text'

const mbgInputTextModule = angular
    .module('mbg.components.mbgInputText', [])
    .component('mbgInputText', mbgInputText)
    .name

export { mbgInputTextModule }
