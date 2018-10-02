import * as angular from 'angular'
import components from './components'
import { initializeApp } from 'firebase/app'

initializeApp({
  apiKey: 'AIzaSyCpNjqpFQJ-ptCOMsqZjyDUx33vB_j_yOk',
  authDomain: 'mobiage-ac405.firebaseapp.com',
  databaseURL: 'https://mobiage-ac405.firebaseio.com',
  projectId: 'mobiage-ac405',
  storageBucket: 'mobiage-ac405.appspot.com',
  messagingSenderId: '224462853887'
})

const module = angular
  .module('demo', [
    components,
  ])
  .controller('demoCtrl', ['$scope', ($scope) => {
    $scope.config = {
      maxImages: 3
    }
  }])
angular.bootstrap(document, [module.name])
