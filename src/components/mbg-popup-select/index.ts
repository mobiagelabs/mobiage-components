import * as angular from 'angular'
import { popupSelect } from './mbg-popup-select'

const mbgPopupSelectModule = angular
    .module('mbg.components.mbgPopupSelect', [])
    .component('mbgPopupSelect', popupSelect)
    .name

export { mbgPopupSelectModule }
