import * as angular from 'angular'
import { mbgInputCpf } from './mbg-input-cpf'

const mbgInputCpfModule = angular
    .module('mbg.components.mbgInputCpf', [])
    .component('mbgInputCpf', mbgInputCpf)
    .name

export { mbgInputCpfModule }
