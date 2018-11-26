import * as angular from 'angular'
import { mbgInputDate } from './mbg-input-date'

const mbgInputDateModule = angular
    .module('mbg.components.mbgInputDate', [])
    .component('mbgInputDate', mbgInputDate)
    .name

export { mbgInputDateModule }
