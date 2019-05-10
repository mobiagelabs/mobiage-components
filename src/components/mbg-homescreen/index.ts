import * as angular from 'angular'
import { mbgHomescreen } from './mbg-homescreen'
import { mbgCardTypeone } from './cards'
import { mbgChartLine } from './charts'

const mbgHomeScreenModule = angular
    .module('mbg.components.mbgHomescreen', [])
    .component('mbgHomescreen', mbgHomescreen)
    .component('mbgCardTypeone', mbgCardTypeone)
    .component('mbgChartLine', mbgChartLine)
    .name

export { mbgHomeScreenModule }
