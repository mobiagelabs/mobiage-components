import * as angular from 'angular'
import { mbgEditor } from './mbg-editor'

const mbgEditorModule = angular
    .module('mbg.components.mbgEditor', [])
    .component('mbgEditor', mbgEditor)
    .name

export { mbgEditorModule }
