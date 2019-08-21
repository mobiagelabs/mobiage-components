import * as angular from 'angular'
import { mbgDropdown } from './mbg-dropdown'

const mbgDropdownModule = angular
    .module('mbg.components.mbgDropdown', [])
    .component('mbgDropdown', mbgDropdown)
    .name

export { mbgDropdownModule }
