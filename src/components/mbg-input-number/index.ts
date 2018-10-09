import * as angular from 'angular'
import { mbgInputNumber } from './mbg-input-number'

const mbgInputNumberModule = angular
    .module('mbg.components.mbgInputNumber', [])
    .component('mbgInputNumber', mbgInputNumber)
    .name

export { mbgInputNumberModule }
