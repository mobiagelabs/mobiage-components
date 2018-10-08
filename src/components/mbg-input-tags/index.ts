import * as angular from 'angular'
import { mbgInputTags } from './mbg-input-tags'

const mbgInputTagsModule = angular
    .module('mbg.components.mbgInputTags', [])
    .component('mbgInputTags', mbgInputTags)
    .name

export { mbgInputTagsModule }
