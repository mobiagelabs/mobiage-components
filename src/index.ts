/* tslint:disable */

import * as angular from 'angular'
import components from './components'
import { initializeApp } from 'firebase/app'
import './assets/angular-locale_pt-br.js'

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
		'ngLocale',
		components,
	])
	.controller('demoCtrl', ['$scope', '$timeout', '$http', ($scope, $timeout, $http) => {

		$scope.initValue = () => {
			return 'Teste'
		}

		$scope.getLabelSelected = () => {
			return $scope.selecteds.reduce((v, select) => {
				return v + ' ' + select.label
			}, '')
		}

		$scope.essaColunaPode = (row) => {
			return row.qnt != 37
		}

		$scope.getOptionsMultiSelect = () => {
			return [
				{
					name: 'Tipo de produto',
					label: 'Camiseta',
				},
				{
					name: 'Marca',
					label: 'Adidas',
				},
				{
					name: 'Tamanho',
					label: 'P',
				},
				{
					name: 'Cor',
					label: 'Azul',
				},
				{
					name: 'Coleção',
					label: 'Verão 2019',
				},
				{
					name: 'Número do motor',
					label: 'Underground',
				},
				{
					name: 'Número do motor2',
					label: 'Underground',
				},
				{
					name: 'Número do motor3',
					label: 'Underground',
				},
				{
					name: 'Número do motor4',
					label: 'Underground',
				},
				{
					name: 'Número do motor5',
					label: 'Underground',
				},
				{
					name: 'Número do motor6',
					label: 'Underground',
				},
				{
					name: 'Número do motor7',
					label: 'Underground',
				},
				{
					name: 'Número do motor8',
					label: 'Underground',
				},
				{
					name: 'Número do motor9',
					label: 'Underground',
				},
				{
					name: 'Número do motor10',
					label: 'Underground',
				},
				{
					name: 'Número do motor11',
					label: 'Underground',
				}
			].map((s) => s.label)
		}

		$scope.selecteds = [
			{
				name: 'Tipo de produto',
				label: 'Camiseta',
			},
			{
				name: 'Marca',
				label: 'Adidas',
			}
		].map((s) => s.label)


		const url = 'https://api-hom.kigisistemas.com.br/mobiage-api/api/v2/product-item/terminal?gumgaToken=310L261E1552912392436C155291059243600O260.261.I'

		$scope.getProductsDTO = (query, page) => {
			return $http.post(url, {
				"page": page,
				"pageSize": 6,
				"gQuery": {
					"subQuerys": [
						{
							"subQuerys": [],
							"joins": [
								{
									"subQuerys": [],
									"table": "obj.productItemBarCodes as pib",
									"type": "INNER"
								}
							],
							"selects": [],
							"criteria": {
								"comparisonOperator": "CONTAINS",
								"fieldFunction": "lower(translate(%s, 'âàãáÁÂÀÃéêÉÊíÍóôõÓÔÕüúÜÚÇç','AAAAAAAAEEEEIIOOOOOOUUUUCC'))",
								"valueFunction": "lower(translate(%s, 'âàãáÁÂÀÃéêÉÊíÍóôõÓÔÕüúÜÚÇç','AAAAAAAAEEEEIIOOOOOOUUUUCC'))",
								"field": "obj.name",
								"value": query
							},
							"logicalOperator": "SIMPLE"
						},
						{
							"subQuerys": [],
							"joins": [],
							"selects": [],
							"criteria": {
								"comparisonOperator": "CONTAINS",
								"fieldFunction": "%s",
								"valueFunction": "%s",
								"field": "pib.barCode",
								"value": query
							},
							"logicalOperator": "SIMPLE"
						},
						{
							"subQuerys": [],
							"joins": [],
							"selects": [],
							"criteria": {
								"comparisonOperator": "CONTAINS",
								"fieldFunction": "%s",
								"valueFunction": "%s",
								"field": "obj.product.reference",
								"value": query
							},
							"logicalOperator": "SIMPLE"
						}
					],
					"joins": [],
					"selects": [],
					"logicalOperator": "OR",
					"useDistinct": true
				},
				"start": 0,
				"searchCount": true,
				"sortField": "",
				"sortDir": "",
				"count": 189
			}).then((resp) => resp.data.values.map((t) => {
				t.image = t.urlImage
				t.saleValue = t.value
				return t
			}))
		}

		$scope.addItem = (barCode, quantity) => {
			console.log(barCode, quantity)
		}

		$scope.config = {
			maxImages: 3,
			disableFirebase: true,
			disableWebcam: false,
			enableShadow: true,
			viewMode: false,
			enableCrop: false,
			rounded: false,
			size: {
				width: '100%'
			}
		}

		$scope.valor2 = -1500.00

		$scope.testezao = () => {
			console.log($scope)
		}

		// $scope.teste = {
		// 	name: 'teste'
		// }

		$scope.opcoesSelect = [
			{ key: 'CONTAINS', label: 'Contém' },
			{ key: 'NOT_CONTAINS', label: 'Não Contém' },
		]

		$scope.testeloko = () => {
			// console.log('sdfu')
		}

		$scope.optionsKeyboard = [
			{
				content: `
					<i class="fa fa-tag" aria-hidden="true"></i>
					<span>Preço</span>
				`,
				enable: false,
				onClick: (option) => {
					console.log('clicou no D')
				},
				tooltip: 'Testeeeeeeeeeeeeeeeeeeeeeeeee'
			},
			{
				content: `
					<i class="fa fa-quora" aria-hidden="true"></i>
					<span>Quant</span>
				`,
				enable: false,
				onClick: (option) => {
					console.log('clicou no Q')
				},
				tooltip: 'Quantidade'
			},
			{
				content: `<i class="fa fa-car" aria-hidden="true"></i>`,
				enable: false,
				onClick: (option) => {
					console.log('clicou no carro')
				}
			},
			{
				content: `<i class="fa fa-lightbulb-o" aria-hidden="true"></i>`,
				enable: false,
				onClick: (option) => {
					console.log('clicou no lampada')
				}
			}
		]

		// $scope.rowsOpen = [1]

		$scope.testefelipegordao = (item) => console.log(item)

		$timeout(() => {
			$scope.treeOrgs = [
				{
					name: 'Matriz 2',
					cnpj: '82.829.028/0001-09',
					children: [
						{
							name: 'Bom dia 03',
							cnpj: '58.851.253/0001-59',
							children: [
								{
									name: 'Bom dia 04',
									cnpj: '58.851.253/0001-59',
								}
							]
						},
						{
							name: 'Bom dia 06',
							cnpj: '58.851.253/0001-59',
						},
						{
							name: 'Bom dia 15',
							cnpj: '58.851.253/0001-59',
						},
					]
				}
			]
		}, 5000)

		$scope.treeOrgs = [
			{
				name: 'Matriz',
				cnpj: '82.829.028/0001-09',
				children: [
					{
						name: 'Bom dia 01',
						cnpj: '58.851.253/0001-59',
						children: [
							{
								name: 'Bom dia 04',
								cnpj: '58.851.253/0001-59',
							}
						]
					},
					{
						name: 'Bom dia 02',
						cnpj: '58.851.253/0001-59',
					},
					{
						name: 'Bom dia 03',
						cnpj: '58.851.253/0001-59',
					},
				]
			}
		]


		$scope.entity = { productTree: { name: 'Camiseta' }, brand: { name: 'Adidas' }, model: 'Teste' }

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

		$scope.kkkkkjsadjhdjsah9 = () => {
			$scope.columnQntHidden = !$scope.columnQntHidden
		}

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
				'currentStock': 500,
				'enable': true,
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
				'price': 10,
				'currentStock': 200,
				'enable': true,
			}
		]

		$scope.editTeste = (x, y) => {
			console.log(x, y)
		}

		$scope.listTeste = [
			{}
		]
		$scope.testelabel = 'Devolver:'

		$scope.teste222 = (evt) => {
			// console.log(evt.keyCode)
		}

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

		$scope.soma = () => {
			return 10 + 10
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

		// $scope.getTipoProduto = (param) => {
		// 	return new Promise((resolve) => {
		// 		$timeout(() => {
		// 			resolve([30, 60, 90, 120, 150, 180].filter((obj) => obj === Number(param)))
		// 		}, 1000)
		// 	})
		// }

		var series = []

		// $http.get('https://api-hom.kigisistemas.com.br/mobiage-api/api/sales-goal/dashboard?gumgaToken=475L461E1557835396590C155783360006000O459.460.461.I')
		// 	.then((response) => {

		// 		series.push({
		// 			type: 'column',
		// 			name: 'Valor vendido',
		// 			color: '#42CAF5',
		// 			data: response.data[0].vendors.map((vendor) => {
		// 				return {
		// 					y: vendor.movementsValue || 0,
		// 					name: vendor.vendorName,
		// 				}
		// 			})
		// 		})

		// 		series = series.concat(response.data.map((goal) => {
		// 			return {
		// 				type: 'spline',
		// 				color: '#541794',
		// 				name: goal.name,
		// 				data: goal.vendors.map((vendor) => vendor.goalValue || 0),
		// 				marker: {
		// 					lineWidth: 2,
		// 					lineColor: '#541794',
		// 					fillColor: 'white'
		// 				}
		// 			}
		// 		}))

		// 		aaaaaaaaaaaaaaaaaaaa(series, response.data[0].vendors.map((vendor) => vendor.vendorName))

		// 	})

		const aaaaaaaaaaaaaaaaaaaa = (teste, categories) => {
			$scope.homeConfig = {
				tabs: [
					{
						name: 'Metas',
						chart: {
							type: 'barline',
							format: 'money',
							categories,
							series: teste
						}
					},
					{
						name: 'Geral',
						chart: {
							type: 'line',
							format: 'money',
							series: [
								{
									name: 'Realizado',
									sync: (context) => {
										context.setValue([10000, 12000, 30000])
									}
								}
							]
						},
						cards: [
							{
								icon: '<i class="far fa-smile"></i>',
								text: 'Só hoje, sua loja vendeu:',
								color: '#d3e000',
								sync: (context) => {
									context.setValue('R$ 459,00');
								}
							},
							{
								icon: '<i class="far fa-calendar-alt"></i>',
								text: 'Quantidade de vendas hoje:',
								color: '#7e39c5',
								sync: (context) => {
									context.setValue('17');
								}
							},
							{
								icon: '<i class="fas fa-chart-bar"></i>',
								text: 'Ticket médio do dia:',
								color: '#00c7c4',
								sync: (context) => {
									context.setValue('R$ 293,00');
								}
							},
							{
								icon: '<i class="far fa-money-bill-alt"></i>',
								text: 'Quantidade de itens vendidos:',
								greyColor: true,
								color: '#ff1057',
								dark: true,
								sync: (context) => {
									context.setValue('200');
								}
							}
						]
					}
				]
			};
		}

		$scope.getTipoProduto = (param = '') => {
			return new Promise((resolve) => {
				$timeout(() => {
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
							name: 'Bone'
						},
						{
							name: 'Bolsa'
						},
						{
							name: 'InformaticaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaAAAAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa'
						},
					].filter((obj) => {

						return obj.name.toLowerCase().startsWith(param.toLowerCase())

					}))
				}, 1000)
			})
		}

		$scope.testeadd = () => {
			console.log('aójaosidhaioshdipash')
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

/* tslint:enable */
