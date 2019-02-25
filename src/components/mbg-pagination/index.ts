import * as angular from 'angular'
import { mbgPagination } from './mbg-pagination'

const mbgPaginationModule = angular
    .module('mbg.components.mbgPagination', [])
    .component('mbgPagination', mbgPagination)
    .name

export { mbgPaginationModule }
