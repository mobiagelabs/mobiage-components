import * as angular from 'angular'
import { mbgAddress } from './mbg-address'
import { MbgAddressService } from './services/mbg-address.service'

const mbgAddressModule = angular
    .module('mbg.components.mbgAddress', [])
    .component('mbgAddress', mbgAddress)
    .service('mbgAddressService', MbgAddressService)
    .name

export { mbgAddressModule }
