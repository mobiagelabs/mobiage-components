import * as angular from 'angular'
import { mbgSelectMultiList } from './mbg-select-multi-list'

const mbgSelectMultiListModule = angular
    .module('mbg.components.mbgRadio', [])
    .component('mbgSelectMultiList', mbgSelectMultiList)
    .name

export { mbgSelectMultiListModule }
