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
		$scope.entity = {}
		$scope.percentage = 0

		$scope.testeobj = {
			color: 'var(--primary)'
		}

		$scope.print = () => {
			$scope.entity.nasc = new Date(1571886000000)
		}

		const goTo = (value) => {
			$timeout(() => {
				$scope.percentage = value
			})
		}

		// [1, 2, 3, 4].forEach((n, i) => {
		// 	$timeout(() => {
		// 		goTo(25 * n)
		// 		if (n === 4) {
		// 			$timeout(() => {
		// 				$scope.show = false
		// 			}, 1000)
		// 		}
		// 	}, 3000 * (i + 1))
		// })

		$timeout(() => {
			$scope.show = true
		}, 500)

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
		$scope.optionsDropdown = [
			{
				label: 'Importar arquivo XLS',
				action: 'UPLOAD',
				icon: 'fas fa-upload',
				callback: (file) => {
					console.log(file)
				}
			},
			{
				label: 'Baixar Layout XLS',
				icon: 'fas fa-download',
				callback: () => {
					console.log('Teste')
				}
			},
		]



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


		const url = 'https://api-hom.kigisistemas.com.br/mobiage-api/api/v2/product-item/terminal?idPriceSheetType=MOBAAAC410AAA&gumgaToken=615L758E1571055003567C157105320585900O756.757.758.I&pageSize=6'

		$scope.getProductsDTO = (query = '', page) => {
			return $http.get(url + '&search=' + query + '&page=' + page).then((resp) => {
				resp.data.values = resp.data.values.map((t) => {
					t.image = t.urlImage || `https://firebasestorage.googleapis.com/v0/b/mobiage-homologation.appspot.com/o/91d32d0d-1c27-7c2c-254b-85c1e139d32e?alt=media`
					t.saleValue = t.value
					return t
				})
				return resp.data
			})
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
				width: '267px',
				height: '267px'
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


		$scope.entity = Object.assign($scope.entity, { productTree: { name: 'Camiseta' }, brand: { name: 'Adidas' }, model: 'Teste' })

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
		const metas = [
			{
				name: 'Meta 1',
				data: [
					{
						name: 'Jan',
						value: 6000
					},
					{
						name: 'Fev',
						value: 8000
					},
					{
						name: 'Mar',
						value: 13000
					},
					{
						name: 'Abr',
						value: 17000
					},
					{
						name: 'Mai',
						value: 18000
					},
					{
						name: 'Jun',
						value: 18000
					},
					{
						name: 'Jul',
						value: 15000
					},
					{
						name: 'Ago',
						value: 16000
					},
					{
						name: 'Set',
						value: 19000
					},
					{
						name: 'Out',
						value: 17000
					},
					{
						name: 'Nov',
						value: 27000
					},
					{
						name: 'Dez',
						value: 20000
					},
				]
			}
		]
		const meses = [
			{
				y: 7000,
				name: 'Jan',
			},
			{
				y: 2343,
				name: 'Fev',
			},
			{
				y: 7435,
				name: 'Mar',
			},
			{
				y: 7422,
				name: 'Abr',
			},
			{
				y: 3484,
				name: 'Mai',
			},
			{
				y: 9436,
				name: 'Jun',
			},
			{
				y: 2684,
				name: 'Jul',
			},
			{
				y: 2485,
				name: 'Ago',
			},
			{
				y: 2357,
				name: 'Set',
			},
			{
				y: 8542,
				name: 'Out',
			},
			{
				y: 2374,
				name: 'Nov',
			},
			{
				y: 2375,
				name: 'Dez',
			},
		]

		$http.get('https://api-hom.mobiage.io/mobiage-api/api/sales-goal/dashboard?gumgaToken=511L518E1569847473353C156984568040000O516.517.518.I')
			.then((response) => {
				series.push({
					type: 'column',
					name: 'Valor vendido',
					color: '#42CAF5',
					data: meses
				})

				series = series.concat(metas.map((goal) => {
					return {
						type: 'spline',
						color: '#541794',
						name: goal.name,
						data: goal.data.map((mes) => (mes.value * Math.random()) || 0),
						marker: {
							lineWidth: 2,
							lineColor: '#541794',
							fillColor: 'white'
						}
					}
				}))

				series.push({
					type: 'pie',
					name: 'Meta Anual',
					data: [{
						name: 'Meta',
						y: 76700,
					}, {
						name: 'Progresso',
						y: 18458,
					}],
					center: [100, -40],
					size: 100,
					showInLegend: false,
					dataLabels: {
						enabled: false
					}
				})

				aaaaaaaaaaaaaaaaaaaa(series, meses.map((mes) => mes.name))

			})

		const aaaaaaaaaaaaaaaaaaaa = (teste, categories) => {
			$scope.homeConfig = {
				tabs: [
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
					},
					{
						name: 'Metas',
						chart: {
							type: 'barlinepie',
							format: 'money',
							categories,
							series: teste
						}
					},
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
			// return new Promise((resolve) => {
			// 	resolve([
			// 		{
			// 			name: 'Futebol'
			// 		},
			// 		{
			// 			name: 'Casual'
			// 		},
			// 		{
			// 			name: 'Corrida'
			// 		}
			// 	].filter((obj) => {
			// 		return obj.name.toLowerCase().indexOf(param.toLowerCase()) !== -1
			// 	}))
			// })
			return [
				10,
				20,
				30,
				40,
				50,
			]
		}

	}])
angular.bootstrap(document, [module.name])

/* tslint:enable */
