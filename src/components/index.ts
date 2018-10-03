import * as angular from 'angular'
import 'angular-input-masks'
import './common.scss'
import { imageUploadModule } from './image-upload'
import { mbgInputCnpjModule } from './mbg-input-cnpj'
import { mbgInputCpfModule } from './mbg-input-cpf'
import { mbgInputCpfCnpjModule } from './mbg-input-cpfcnpj'
import { mbgInputNameModule } from './mbg-input-name'
import { mbgInputPhoneModule } from './mbg-input-phone'
import { mbgInputTextModule } from './mbg-input-text'
import { mbgInputMoneyModule } from './mbg-input-money'
import { mbgInputStepModule } from './mbg-input-step'

export default angular
  .module('mbg.components', [
    'ui.utils.masks',
    imageUploadModule,
    mbgInputCnpjModule,
    mbgInputCpfModule,
    mbgInputCpfCnpjModule,
    mbgInputNameModule,
    mbgInputPhoneModule,
    mbgInputTextModule,
    mbgInputMoneyModule,
    mbgInputStepModule,
  ])
  .name

export * from './image-upload'
