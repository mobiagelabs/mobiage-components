import * as angular from 'angular'
import { mbgConnectionRetry } from './mbg-connection-retry'

const mbgConnectionRetryModule = angular
    .module('mbg.components.mbgConnectionRetry', [])
    .component('mbgConnectionRetry', mbgConnectionRetry)
    .name

export { mbgConnectionRetryModule }
