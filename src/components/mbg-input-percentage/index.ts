import * as angular from 'angular'
import { mbgInputPercentage } from './mbg-input-percentage'

const mbgInputPercentageModule = angular
    .module('mbg.components.mbgInputPercentage', [])
    .component('mbgInputPercentage', mbgInputPercentage)
    .name

export { mbgInputPercentageModule }
