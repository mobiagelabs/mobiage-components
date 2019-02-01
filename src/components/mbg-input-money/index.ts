import 'jquery'
import 'jquery-maskmoney/dist/jquery.maskMoney'
import * as angular from 'angular'
import { mbgInputMoney } from './mbg-input-money'
import { mbgInputMoneyDirective } from './mbg-input-money.directive'

import MaskerProvider from './helper/masker-provider'
import CurrencyMaskFilter from './helper/currency-mask-filter'
import CurrencyMaskDirective from './helper/currency-mask-directive'

const mbgInputMoneyModule = angular
    .module('mbg.components.mbgInputMoney', [])
    .component('mbgInputMoney', mbgInputMoney)
    // .directive('mbgInputMoney', mbgInputMoneyDirective)
    .directive('mbgInputMoney', CurrencyMaskDirective)
    .filter('mbgCurrencyMask', CurrencyMaskFilter)
    .provider('$mbgMasker', MaskerProvider)
    .name

export { mbgInputMoneyModule }
