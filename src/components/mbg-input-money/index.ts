import 'jquery'
import 'jquery-maskmoney/dist/jquery.maskMoney'
import * as angular from 'angular'
import { mbgInputMoney } from './mbg-input-money'

const mbgInputMoneyModule = angular
    .module('mbg.components.mbgInputMoney', [])
    .component('mbgInputMoney', mbgInputMoney)
    .name

export { mbgInputMoneyModule }
