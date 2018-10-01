import * as angular from 'angular'
import components from './components'

const module = angular
  .module('demo', [
    components,
  ])

angular.bootstrap(document, [module.name])
