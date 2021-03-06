import * as angular from 'angular'
import { mbgHomescreen } from './mbg-homescreen'
import { mbgCardTypeone } from './cards'
import { mbgChartLine, mbgChartBarLine, mbgChartBarLinePie } from './charts'

const mbgHomeScreenModule = angular
    .module('mbg.components.mbgHomescreen', [])
    .component('mbgHomescreen', mbgHomescreen)
    .component('mbgCardTypeone', mbgCardTypeone)
    .component('mbgChartLine', mbgChartLine)
    .component('mbgChartBarLine', mbgChartBarLine)
    .component('mbgChartBarLinePie', mbgChartBarLinePie)
    .name

export { mbgHomeScreenModule }
