import * as angular from 'angular'
import { mbgInputEmail } from './mbg-input-email'

const mbgInputEmailModule = angular
    .module('mbg.components.mbgInputEmail', [])
    .component('mbgInputEmail', mbgInputEmail)
    .name

export { mbgInputEmailModule }
