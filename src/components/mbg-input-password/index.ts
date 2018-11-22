import * as angular from 'angular'
import { mbgInputPassword } from './mbg-input-password'

const mbgInputPasswordModule = angular
    .module('mbg.components.mbgInputPassword', [])
    .component('mbgInputPassword', mbgInputPassword)
    .name

export { mbgInputPasswordModule }
