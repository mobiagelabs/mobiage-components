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
			maxImages: 1,
			disableFirebase: true,
			disableWebcam: false,
			viewMode: false,
			enableCrop: true,
			rounded: true
		}

		// $scope.rowsOpen = [1]

		$timeout(() => {
			$scope.rowsOpen = [0, 1, 3]
		}, 5000)

		$scope.kkk = (index) => {
			window['teste'][index].addAdicionalRow()
		}

		$scope.profileImage = [
			{
				url: 'https://www.clubedocriador.com/img-passaros/abelharuco14-01-2016-08-46-31.jpg'
			},
			{
				url: 'https://t1.ea.ltmcdn.com/pt/images/8/8/6/nomes_para_passaros_azuis_22688_2_600.jpg'
			}
		]

		$scope.produtos = [
			{
				code: '0',
				product: 'Camiseta Adidas farm floral',
				qnt: 20,
				costValue: 200.00
			},
			{
				code: '1',
				product: 'Blusa Adidas undeground',
				qnt: 37,
				costValue: 435.90
			},
			{
				code: '2',
				product: 'Calça Nike undeground',
				qnt: 25,
				costValue: 348.90
			}, {
				code: '3',
				product: 'Shorts Nike undeground',
				qnt: 25,
				costValue: 348.90,
			}
		]

		$scope.lalala = () => {
			console.log('aspodasdpoasdoasd')
		}

		$scope.sort = (dir, column) => {
			console.log(dir, column)
		}

		$scope.focusedTeste = (param) => {
			if (param) {
				$scope.teste = param
			}
		}

		$scope.details = [
			{
				type: 'TAMANHO',
				value: 'P'
			},
			{
				type: 'TAMANHO',
				value: 'M'
			},
			{
				type: 'TAMANHO',
				value: 'G'
			},
			{
				type: 'TAMANHO',
				value: 'GG'
			},
			{
				type: 'COR',
				value: 'Verde',
				valueRef: '#17b709'
			},
			{
				type: 'COR',
				value: 'Azul',
				valueRef: '#015ec1'
			},
			{
				type: 'COR',
				value: 'Preto',
				valueRef: '#000000'
			},
			{
				type: 'COR',
				value: 'Pink',
				valueRef: '#ce00cb'
			}
		]

		$scope.result = [
			{
				'xDetail': {
					'type': 'TAMANHO',
					'value': 'P'
				},
				'yDetail': {
					'type': 'COR',
					'value': 'Pink',
					'valueRef': '#ce00cb'
				},
				'stock': 111,
				'price': 10
			},
			{
				'xDetail': {
					'type': 'TAMANHO',
					'value': 'GG'
				},
				'yDetail': {
					'type': 'COR',
					'value': 'Verde',
					'valueRef': '#17b709'
				},
				'price': 10
			}
		]

		$scope.editTeste = (x, y) => {
			console.log(x, y)
		}

		$scope.listTeste = [
			{}
		]

		$scope.olamundo = 'Mateus'

		$scope.unFocus = () => {
			$scope.teste = ''
		}

		$scope.getNavigation = (item, page) => {
			const id = item ? item.id : ''
			return $http.get('https://api-hom.kigisistemas.com.br/mobiage-api/api/product-tree/navigation', {
				params: {
					idProductTree: id,
					page,
				},
				headers: {
					gumgaToken: '2L2E1634220573724C154090857372400O2.I'
				}
			})
		}

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
