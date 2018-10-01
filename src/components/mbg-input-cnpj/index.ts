import * as angular from 'angular'
import { mbgInputCnpj } from './mbg-input-cnpj'

const mbgInputCnpjModule = angular
    .module('mbg.components.mbgInputCnpj', [])
    .component('mbgInputCnpj', mbgInputCnpj)
    .name

export { mbgInputCnpjModule }
