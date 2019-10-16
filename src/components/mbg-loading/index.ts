import * as angular from 'angular'
import { mbgLoading } from './mbg-loading'

const mbgLoadingModule = angular
    .module('mbg.components.mbgLoading', [])
    .component('mbgLoading', mbgLoading)
    .name

export { mbgLoadingModule }
