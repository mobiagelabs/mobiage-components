import * as angular from 'angular'
import { mbgInputIe } from './mbg-input-ie'

const mbgInputIeModule = angular
    .module('mbg.components.mbgInputIe', [])
    .component('mbgInputIe', mbgInputIe)
    .name

export { mbgInputIeModule }
