import * as angular from 'angular'
import { mbgMindmap } from './mbg-mindmap'

const mbgMindmapModule = angular
    .module('mbg.components.mbgMindmap', [])
    .component('mbgMindmap', mbgMindmap)
    .name

export { mbgMindmapModule }
