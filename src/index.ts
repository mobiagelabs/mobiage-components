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
  .controller('demoCtrl', ['$scope', '$timeout', '$http', ($scope, $timeout, $http) => {
    $scope.config = {
      maxImages: 5
    }

    $scope.focusedTeste = (param) => {
      if (param) {
        $scope.teste = param
      }
    }

    $scope.unFocus = () => {
      $scope.teste = ''
    }

    // $scope.getNavigation = (item, page) => {
    //   const id = item ? item.id : ''
    //   return $http.get('http://localhost:8080/mobiage-api/api/product-tree/navigation', {
    //     params: {
    //       idProductTree: id,
    //       page,
    //     },
    //     headers: {
    //       gumgaToken: '51L42E1540820156126C154081835612600O42.I'
    //     }
    //   })
    // }

    // $scope.number = {
    //   'zipCode': '87035050',
    //   'localization': 'Maringá',
    //   'premisse': 'Manoel Ribas',
    //   'number': '37',
    //   'neighborhood': 'Jardim Alvorada',
    //   'uf': 'PR'
    // }

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

    $scope.getMarca().then((resp) => {
      $scope.countBrands = (resp || []).length
    })


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
