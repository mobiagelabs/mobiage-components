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
      maxImages: 15
    }

    // $scope.entity = {
    //   tipo: {
    //     name: 'Sapato'
    //   },
    //   marca: {
    //     name: 'Puma'
    //   },
    //   nome: 'Miranda',
    //   modelo: {
    //     name: 'Casual'
    //   }
    // }

    $scope.getTipoProduto = (param = '') => {
      return new Promise((resolve) => {
        resolve([
          {
            name: 'Camiseta'
          },
          {
            name: 'Sapato'
          },
          {
            name: 'Calça'
          },
          {
            name: 'Camiseta'
          },
          {
            name: 'Sapato'
          },
          {
            name: 'Calça'
          },
          {
            name: 'Camiseta'
          },
          {
            name: 'Sapato'
          },
          {
            name: 'Calça'
          },
          {
            name: 'Camiseta'
          },
          {
            name: 'Sapato'
          },
          {
            name: 'Calça'
          },
          {
            name: 'Camiseta'
          },
          {
            name: 'Sapato'
          },
          {
            name: 'Calça'
          },
          {
            name: 'Camiseta'
          },
          {
            name: 'Sapato'
          },
          {
            name: 'Calça'
          },
          {
            name: 'Camiseta'
          },
          {
            name: 'Sapato'
          },
          {
            name: 'Calça'
          },
          {
            name: 'Camiseta'
          },
          {
            name: 'Sapato'
          },
          {
            name: 'Calça'
          },
          {
            name: 'Camiseta'
          },
          {
            name: 'Sapato'
          },
          {
            name: 'Calça'
          },
        ].filter((obj) => {
          return obj.name.toLowerCase().startsWith(param.toLowerCase())
        }))
      })
    }

    $scope.getMarca = (param = '') => {
      return new Promise((resolve) => {
        resolve([
          {
            name: 'Adidas'
          },
          {
            name: 'Nike'
          },
          {
            name: 'Puma'
          }
        ].filter((obj) => {
          return obj.name.toLowerCase().indexOf(param.toLowerCase()) !== -1
        }))
      })
    }


    $scope.getModelo = (param = '') => {
      return new Promise((resolve) => {
        resolve([
          {
            name: 'Futebol'
          },
          {
            name: 'Casual'
          },
          {
            name: 'Corrida'
          }
        ].filter((obj) => {
          return obj.name.toLowerCase().indexOf(param.toLowerCase()) !== -1
        }))
      })
    }

  }])
angular.bootstrap(document, [module.name])
