import * as angular from 'angular'
import { mbgInputDate } from './mbg-input-date'
import { MbgDatepicker } from './mbg-datepicker/mbg-datepicker'

const mbgInputDateModule = angular
    .module('mbg.components.mbgInputDate', [])
    .component('mbgInputDate', mbgInputDate)
    .directive('mbgDatepicker', () => new MbgDatepicker)
    .name

export { mbgInputDateModule }
