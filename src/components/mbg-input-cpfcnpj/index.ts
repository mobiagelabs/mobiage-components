import * as angular from 'angular'
import { mbgInputCpfCnpj } from './mbg-input-cpfcnpj'

const mbgInputCpfCnpjModule = angular
    .module('mbg.components.mbgInputCpfCnpj', [])
    .component('mbgInputCpfCnpj', mbgInputCpfCnpj)
    .name

export { mbgInputCpfCnpjModule }
