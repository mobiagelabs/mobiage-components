import * as angular from 'angular'
import 'angular-input-masks'
import './common.scss'
import { mbgImageUploadModule } from './mbg-image-upload'
import { mbgInputCnpjModule } from './mbg-input-cnpj'
import { mbgInputCpfModule } from './mbg-input-cpf'
import { mbgInputCpfCnpjModule } from './mbg-input-cpfcnpj'
import { mbgInputNameModule } from './mbg-input-name'
import { mbgInputPhoneModule } from './mbg-input-phone'
import { mbgInputTextModule } from './mbg-input-text'
import { mbgInputNumberModule } from './mbg-input-number'
import { mbgInputMoneyModule } from './mbg-input-money'
import { mbgInputPercentageModule } from './mbg-input-percentage'
import { mbgInputStepModule } from './mbg-input-step'
import { mbgInputTagsModule } from './mbg-input-tags'

const mbgComponentsModule = angular
  .module('mbg.components', [
    'ui.utils.masks',
    mbgImageUploadModule,
    mbgInputCnpjModule,
    mbgInputCpfModule,
    mbgInputCpfCnpjModule,
    mbgInputNameModule,
    mbgInputPhoneModule,
    mbgInputTextModule,
    mbgInputNumberModule,
    mbgInputMoneyModule,
    mbgInputPercentageModule,
    mbgInputStepModule,
    mbgInputTagsModule,
  ])
  .name

export * from './mbg-image-upload'
export default mbgComponentsModule
