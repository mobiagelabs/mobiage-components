import * as angular from 'angular'
import components from './components'
import filters from './filters'

const module = angular
  .module('product', [
    components,
    filters,
  ])

angular.bootstrap(document, [module.name])
