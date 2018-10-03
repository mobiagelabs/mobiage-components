import * as angular from 'angular'
import { mbgInputStep } from './mbg-input-step'
import { mbgInputStepItem } from './components/mbg-input-step-item/mbg-input-step-item'

const mbgInputStepModule = angular
    .module('mbg.components.mbgInputStep', [])
    .component('mbgInputStep', mbgInputStep)
    .component('mbgInputStepItem', mbgInputStepItem)
    .name

export { mbgInputStepModule }
