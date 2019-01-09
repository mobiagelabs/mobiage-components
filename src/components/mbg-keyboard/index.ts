import * as angular from 'angular'
import { mbgKeyboard } from './mbg-keyboard'

const mbgKeyboardModule = angular
    .module('mbg.components.mbgKeyboard', [])
    .component('mbgKeyboard', mbgKeyboard)
    .name

export { mbgKeyboardModule }
