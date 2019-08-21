import * as angular from 'angular'
import { mbgProgressCircle } from './mbg-progress-circle'

const mbgProgressCircleModule = angular
    .module('mbg.components.mbgProgressCircle', [])
    .component('mbgProgressCircle', mbgProgressCircle)
    .name

export { mbgProgressCircleModule }
