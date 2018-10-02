import * as angular from 'angular'
import { mbgInputPhone } from './mbg-input-phone'

const mbgInputPhoneModule = angular
    .module('mbg.components.mbgInputPhone', [])
    .component('mbgInputPhone', mbgInputPhone)
    .name

export { mbgInputPhoneModule }
