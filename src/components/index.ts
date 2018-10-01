import * as angular from 'angular'
import 'angular-input-masks'
import './common.scss'
import { imageUploadModule } from './image-upload'
import { mbgInputCnpjModule } from './mbg-input-cnpj'
import { mbgInputCpfModule } from './mbg-input-cpf'

export default angular
  .module('mbg.components', [
    'ui.utils.masks',
    imageUploadModule,
    mbgInputCnpjModule,
    mbgInputCpfModule,
  ])
  .name
