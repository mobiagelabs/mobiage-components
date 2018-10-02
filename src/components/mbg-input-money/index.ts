import 'jquery'
import * as angular from 'angular'
import 'jquery-maskmoney/dist/jquery.maskMoney'
import { mbgInputMoney } from './mbg-input-money'
import { mbgInputMoneyDirective } from './mbg-input-money.directive'

const mbgInputMoneyModule = angular
    .module('mbg.components.mbgInputMoney', [])
    .component('mbgInputMoney', mbgInputMoney)
    .directive('mbgInputMoney', mbgInputMoneyDirective)
    .name

export { mbgInputMoneyModule }
