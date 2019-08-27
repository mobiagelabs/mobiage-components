import * as angular from 'angular'
import { mbgInputReceiveDay } from './mbg-input-receive-day'

const mbgInputReceiveDayModule = angular
    .module('mbg.components.mbgInputReceiveDay', [])
    .component('mbgInputReceiveDay', mbgInputReceiveDay)
    .name

export { mbgInputReceiveDayModule }
