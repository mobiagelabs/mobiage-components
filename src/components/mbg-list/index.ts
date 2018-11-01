import * as angular from 'angular'
import { mbgList } from './mbg-list'
import { mbgListColumn } from './components/mbg-list-column/mbg-list-column'
import { mbgListRow } from './components/mbg-list-row/mbg-list-row'

const mbgListModule = angular
    .module('mbg.components.mbgList', [])
    .component('mbgList', mbgList)
    .component('mbgListColumn', mbgListColumn)
    .component('mbgListRow', mbgListRow)
    .name

export { mbgListModule }
