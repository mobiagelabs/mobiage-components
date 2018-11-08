import * as angular from 'angular'
import { mbgRadio } from './mbg-radio'

const mbgRadioModule = angular
    .module('mbg.components.mbgRadio', [])
    .component('mbgRadio', mbgRadio)
    .name

export { mbgRadioModule }
