import * as angular from 'angular'
import 'angular-input-masks'
import 'ng-easy-infinite-scroll'
import 'webcamjs'
import './common.scss'
import { MbgDynamicHTML } from '../helpers/dynamic-html/dynamic-html'
import { MbgPositiveNumber } from '../helpers/positive-number/positive-number'
import { mbgImageUploadModule } from './mbg-image-upload'
import { mbgInputCnpjModule } from './mbg-input-cnpj'
import { mbgInputCpfModule } from './mbg-input-cpf'
import { mbgInputCpfCnpjModule } from './mbg-input-cpfcnpj'
import { mbgInputNameModule } from './mbg-input-name'
import { mbgInputIeModule } from './mbg-input-ie'
import { mbgInputPhoneModule } from './mbg-input-phone'
import { mbgInputTextModule } from './mbg-input-text'
import { mbgInputSearchModule } from './mbg-input-search'
import { mbgInputNumberModule } from './mbg-input-number'
import { mbgInputMoneyModule } from './mbg-input-money'
import { mbgInputPercentageModule } from './mbg-input-percentage'
import { mbgInputStepModule } from './mbg-input-step'
import { mbgInputTagsModule } from './mbg-input-tags'
import { mbgInputEmailModule } from './mbg-input-email'
import { mbgAddressModule } from './mbg-address'
import { mbgTextAreaModule } from './mbg-text-area'
import { mbgNavigationModule } from './mbg-navigation'
import { mbgListModule } from './mbg-list'
import { mbgCheckboxModule } from './mbg-checkbox'
import { mbgRadioModule } from './mbg-radio'
import { mbgBtnFormModule } from './mbg-btn-form'
import { mbgProductGridModule } from './mbg-product-grid'
import { mbgInputCheckboxModule } from './mbg-input-checkbox'
import { mbgInputPasswordModule } from './mbg-input-password'
import { mbgInputDateModule } from './mbg-input-date'
import 'angular-ui-bootstrap'

const mbgComponentsModule = angular
  .module('mbg.components', [
    'ui.utils.masks',
    'ngEasyInfiniteScroll',
    'ui.bootstrap',
    mbgImageUploadModule,
    mbgInputCnpjModule,
    mbgInputCpfModule,
    mbgInputCpfCnpjModule,
    mbgInputNameModule,
    mbgInputIeModule,
    mbgInputPhoneModule,
    mbgInputTextModule,
    mbgInputSearchModule,
    mbgInputNumberModule,
    mbgInputMoneyModule,
    mbgInputPercentageModule,
    mbgInputStepModule,
    mbgInputTagsModule,
    mbgInputEmailModule,
    mbgAddressModule,
    mbgTextAreaModule,
    mbgNavigationModule,
    mbgListModule,
    mbgCheckboxModule,
    mbgRadioModule,
    mbgBtnFormModule,
    mbgProductGridModule,
    mbgInputCheckboxModule,
    mbgInputPasswordModule,
    mbgInputDateModule,
  ])
  .directive('mbgDynamicHtml', () => new MbgDynamicHTML)
  .directive('mbgPositiveNumber', () => new MbgPositiveNumber)
  .name

export * from './mbg-image-upload'
export default mbgComponentsModule
