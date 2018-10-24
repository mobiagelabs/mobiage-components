import * as angular from 'angular'
import { mbgNavigation } from './mbg-navigation'

const mbgNavigationModule = angular
    .module('mbg.components.mbgNavigation', [])
    .component('mbgNavigation', mbgNavigation)
    .name

export { mbgNavigationModule }
