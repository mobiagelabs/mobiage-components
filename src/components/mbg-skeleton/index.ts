import * as angular from 'angular'
import { mbgSkeleton } from './mbg-skeleton'

const mbgSkeletonModule = angular
    .module('mbg.components.mbgSkeleton', [])
    .component('mbgSkeleton', mbgSkeleton)
    .name

export { mbgSkeletonModule }
