import * as angular from 'angular'
import { mbgList } from './mbg-list'
import { mbgListColumn } from './components/mbg-list-column/mbg-list-column'

const mbgListModule = angular
    .module('mbg.components.mbgList', [])
    .component('mbgList', mbgList)
    .component('mbgListColumn', mbgListColumn)
    .name

export { mbgListModule }
