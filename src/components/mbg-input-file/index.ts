import * as angular from 'angular'
import { mbgInputFile } from './mbg-input-file'

const mbgInputFileModule = angular
    .module('mbg.components.mbgInputFile', [])
    .component('mbgInputFile', mbgInputFile)
    .name

export { mbgInputFileModule }
