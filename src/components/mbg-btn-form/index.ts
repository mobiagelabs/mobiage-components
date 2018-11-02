import * as angular from 'angular'
import { mbgBtnForm } from './mbg-btn-form'

const mbgBtnFormModule = angular
    .module('mbg.components.mbgBtnForm', [])
    .component('mbgBtnForm', mbgBtnForm)
    .name

export { mbgBtnFormModule }
