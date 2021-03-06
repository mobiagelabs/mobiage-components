/* tslint:disable */

import * as angular from 'angular'
import components from './components'
import { initializeApp } from 'firebase/app'
import './assets/angular-locale_pt-br.js'
import * as dataDocument from './assets/data-default.json'
import { MbgAlert } from './helpers/services/mbg-alert'
const sizeJson = require('./json/sizes.json')
const genderJson = require('./json/gender.json')
initializeApp({
	apiKey: "AIzaSyBONcuLOKuFFlAjMOr04pYSnJhWCPtr3bU",
	authDomain: "mobiage-n-chill.firebaseapp.com",
	databaseURL: "https://mobiage-n-chill.firebaseio.com",
	projectId: "mobiage-n-chill",
	storageBucket: "mobiage-n-chill.appspot.com",
	messagingSenderId: "74787051710",
	appId: "1:74787051710:web:e8de92a4ed0298f88326ef",
	measurementId: "G-T7BCMVHD5C"
})

const module = angular
	.module('demo', [
		'ngLocale',
		components,
	])
	.controller('demoCtrl', ['$scope', '$timeout', '$http', 'mbgAlert', ($scope, $timeout, $http, mbgAlert: MbgAlert) => {

		$scope.configDocument = {
			document: dataDocument,
			preview: true,
			params: {
				nomeEmpresa: 'Labs LTDA.'
			},
			onSave: (json) => {
				console.log(json)
			}
		}

		// mbgAlert.confirm({
		// 	title: 'Salvar operação',
		// 	type: MbgTypeAlert.INFORMATION,
		// 	message: 'Deseja salvar a operação atual?',
		// 	invertContrast: false,
		// 	textConfirm: 'Aceitar',
		// 	enableInput: true,
		// 	inputPlaceholder: 'Motivo',
		// 	inputType: MbgInputType.TEXTAREA,
		// 	inputValidate: (inputValue) => {
		// 		// console.log('validade ', inputValue)
		// 		return true
		// 	},
		// 	// visibleCancel: false
		// 	// tip: 'Ao salvar a operação, você poderá continuar ela em outro momento.'
		// }).then((response) => {
		// 	console.log('onSuccess',response)
		// })

		// $timeout(() => {
		// 	$scope.mostrarErros = true
		// }, 3000)

		$scope.testeMbgSelect = {
			name: 'Teste',
			key: 'TESTE'
		}

		$scope.testeMbgSelectList = [
			{
				name: 'Teste1',
				key: 'TESTE2'
			},
			{
				name: 'Teste1',
				key: 'TESTE2'
			},
			{
				name: 'Teste1',
				key: 'TESTE2'
			},
		]

		$scope.testeee2 = () => {
			return $scope.testeLabel ? 'name' : 'key'
		}

		$scope.testekey = () => {
			console.log('Asuhd8aysgdiuhoiansp')
		}

		$scope.testeLabel = 'name'

		$timeout(() => {
			$scope.testeLabel = 'key'
		}, 5000)

		$scope.testeteste = (evt: Event) => {
			evt.preventDefault()
			evt.stopPropagation()
			console.log('asçldjasdmçl', evt)
		}

		$scope.VANDERSON
		$scope.entity = {}
		$scope.percentage = 0

		$scope.testeobj = {
			color: 'var(--primary)'
		}

		$scope.searchTeste = (query = '') => {
			$scope.dataTeste = [
				{
					label: 'label'
				},
				{
					label: 'label2'
				},
				{
					label: 'label3'
				},
				{
					label: 'label4'
				},
				{
					label: 'label5'
				},
			].filter((teste) => teste.label.toLowerCase().startsWith(query.toLowerCase()))
		}
		$scope.searchTeste()

		const goTo = (value) => {
			$timeout(() => {
				$scope.percentage = value
			})
		}

		$scope.displayValues = false
		// $timeout(() => {
		// 	$scope.displayValues = false
		// }, 5000)

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
			// $scope.teste = {
			// 	value: 'ajdioasjd@asiodasjd.com'
			// }
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
			return row.qnt !== 37
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
			{
				sep: true
			},
			{
				label: 'Lista de importações',
				icon: 'fas fa-list-ul',
				callback: () => {
					console.log('Teste')
				}
			},
		]
		$scope.testedlsadkasjn = () => {
			return [
				'Fixo',
				'Variavel',
			]
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
			]//.map((s) => s.label)
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
		]//.map((s) => s.label)


		const url = 'https://api.kigisistemas.com.br/mobiage-api/api/v2/product-item/terminal?idPriceSheetType=MOBAAAC410AAA&inventoryOnly=false&lookAtStock=false&pageSize=12&gumgaToken=228L1362E1582910433476C158290863347600O1360.1361.1362.I'

		$scope.getProductsDTO = (query = '', page = 1) => {
			return new Promise((resolve) => {
				$timeout(() => {
					$http.get(url + '&search=' + '' + '&page=' + page).then((resp) => {
						resp.data.values = resp.data.values.map((t) => {
							return {
								name: t.name,
								active: t.active,
								brand: t.brand,
								barCode: t.barCode,
								image: t.urlImage,
								saleValue: t.value,
								stock: t.stock,
								reference: t.reference,
								variation: t.variation,
							}
						})
						resolve(resp.data.values)
					})
				}, 500)
			})
		}

		$scope.addItem = (barCode, quantity) => {
			console.log('asydgaysud', barCode, quantity)
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

		$scope.valor2 = 0.1987

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

		$scope.errorBarCode = (barCode) => {
			return new Promise((resolve) => {
				if (barCode === '123') {
					$timeout(() => {
						$scope.errorlabelteste = 'Primeiro erro'
						resolve(true)
					}, 500)
				} else if (barCode === '321') {
					$timeout(() => {
						$scope.errorlabelteste = 'Segundo erro'
						resolve(true)
					}, 700)
				} else {
					resolve(false)
				}
			})
		}

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

		$scope.testechange = () => {
			console.log('Oi 2')
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
				"id": "3700D589F4C540099D03026A0E133CE0",
				"oi": null,
				"version": 0,
				"type": "TAMANHO",
				"subType": null,
				"description": "Tamanho(UN-G5)",
				"value": "PP",
				"valueRef": null,
				"tags": null,
				"detailsBase": null
			},
			{
				"id": "3700D57DA6BF00009C54026A0E133CE0",
				"oi": null,
				"version": 0,
				"type": "TAMANHO",
				"subType": null,
				"description": "Tamanho(UN-G5)",
				"value": "P",
				"valueRef": null,
				"tags": null,
				"detailsBase": null
			},
			{
				"id": "3700D57D7C2C90EE3F71026A0E133CE0",
				"oi": null,
				"version": 0,
				"type": "TAMANHO",
				"subType": null,
				"description": "Tamanho(UN-G5)",
				"value": "M",
				"valueRef": null,
				"tags": null,
				"detailsBase": null
			},
			{
				"id": "3700D57DADEAF0EBC693026A0E133CE0",
				"oi": null,
				"version": 0,
				"type": "TAMANHO",
				"subType": null,
				"description": "Tamanho(UN-G5)",
				"value": "G",
				"valueRef": null,
				"tags": null,
				"detailsBase": null
			},
			{
				"id": "3700D57FD1673013431F026A0E133CE0",
				"oi": null,
				"version": 0,
				"type": "TAMANHO",
				"subType": null,
				"description": "Tamanho(UN-G5)",
				"value": "GG",
				"valueRef": null,
				"tags": null,
				"detailsBase": null
			},
			{
				"id": "3700D58EA2E40006908B026A0E133CE0",
				"oi": null,
				"version": 0,
				"type": "TAMANHO",
				"subType": null,
				"description": "Tamanho(UN-G5)",
				"value": "XG",
				"valueRef": null,
				"tags": null,
				"detailsBase": null
			},
			{
				"id": "3700D58ACCD5C0AB8687026A0E133CE0",
				"oi": null,
				"version": 0,
				"type": "TAMANHO",
				"subType": null,
				"description": "Tamanho(UN-G5)",
				"value": "G1",
				"valueRef": null,
				"tags": null,
				"detailsBase": null
			},
			{
				"id": "3700D58A28A6808C510B026A0E133CE0",
				"oi": null,
				"version": 0,
				"type": "TAMANHO",
				"subType": null,
				"description": "Tamanho(UN-G5)",
				"value": "G2",
				"valueRef": null,
				"tags": null,
				"detailsBase": null
			},
			{
				"id": "3700D58DE1B6E07B502C026A0E133CE0",
				"oi": null,
				"version": 0,
				"type": "TAMANHO",
				"subType": null,
				"description": "Tamanho(UN-G5)",
				"value": "G3",
				"valueRef": null,
				"tags": null,
				"detailsBase": null
			},
			{
				"id": "3700D5D1FF0030BD7AF1026A0E133CE0",
				"oi": null,
				"version": 0,
				"type": "TAMANHO",
				"subType": null,
				"description": "Tamanho(UN-G5)",
				"value": "G5",
				"valueRef": null,
				"tags": null,
				"detailsBase": null
			},
			{
				"id": "3700D57D7A09B0A3E71E026A0E133CE0",
				"oi": null,
				"version": 0,
				"type": "TAMANHO",
				"subType": null,
				"description": "Tamanho(UN-G5)",
				"value": "UN",
				"valueRef": null,
				"tags": null,
				"detailsBase": null
			},
			{
				"id": "A81B847856AFB8F49FE0771A18054FB8",
				"oi": {
					"value": "1034.1035.1036."
				},
				"version": 0,
				"type": "TAMANHO",
				"subType": null,
				"description": null,
				"value": "4",
				"valueRef": null,
				"tags": null,
				"detailsBase": null
			},
			{
				"id": "5B972F42D7A520E1B838D34C18CFE3CB",
				"oi": {
					"value": "1034.1035.1036."
				},
				"version": 0,
				"type": "TAMANHO",
				"subType": null,
				"description": null,
				"value": "6",
				"valueRef": null,
				"tags": null,
				"detailsBase": null
			},
			{
				"id": "25BE99FD9C15AE54AAF39A89B9171CCB",
				"oi": {
					"value": "1034.1035.1036."
				},
				"version": 0,
				"type": "TAMANHO",
				"subType": null,
				"description": null,
				"value": "8",
				"valueRef": null,
				"tags": null,
				"detailsBase": null
			},
			{
				"id": "3700D774B1BCE0D33F7C026A0E133CE0",
				"oi": null,
				"version": 0,
				"type": "TAMANHO",
				"subType": null,
				"description": "TAMANHO (34-46)",
				"value": "34",
				"valueRef": null,
				"tags": null,
				"detailsBase": null
			},
			{
				"id": "3700D77F358A704824F4026A0E133CE0",
				"oi": null,
				"version": 0,
				"type": "TAMANHO",
				"subType": null,
				"description": "TAMANHO (SAPATOS)",
				"value": "35",
				"valueRef": null,
				"tags": null,
				"detailsBase": null
			},
			{
				"id": "3700D58C87CC30D37227026A0E133CE0",
				"oi": null,
				"version": 0,
				"type": "TAMANHO",
				"subType": null,
				"description": "Tamanho(36-56)",
				"value": "36",
				"valueRef": null,
				"tags": null,
				"detailsBase": null
			},
			{
				"id": "3700D77F32CB5078A501026A0E133CE0",
				"oi": null,
				"version": 0,
				"type": "TAMANHO",
				"subType": null,
				"description": "TAMANHO (SAPATOS)",
				"value": "37",
				"valueRef": null,
				"tags": null,
				"detailsBase": null
			},
			{
				"id": "3700D58C7D1DD01584D7026A0E133CE0",
				"oi": null,
				"version": 0,
				"type": "TAMANHO",
				"subType": null,
				"description": "Tamanho(36-56)",
				"value": "38",
				"valueRef": null,
				"tags": null,
				"detailsBase": null
			},
			{
				"id": "3700D77F2F6FF02D3135026A0E133CE0",
				"oi": null,
				"version": 0,
				"type": "TAMANHO",
				"subType": null,
				"description": "TAMANHO (SAPATOS)",
				"value": "39",
				"valueRef": null,
				"tags": null,
				"detailsBase": null
			},
			{
				"id": "3700D58A516430F9160B026A0E133CE0",
				"oi": null,
				"version": 0,
				"type": "TAMANHO",
				"subType": null,
				"description": "Tamanho(36-56)",
				"value": "40",
				"valueRef": null,
				"tags": null,
				"detailsBase": null
			},
			{
				"id": "3700D58FE06D109D3A21026A0E133CE0",
				"oi": null,
				"version": 0,
				"type": "TAMANHO",
				"subType": null,
				"description": "Tamanho(36-56)",
				"value": "42",
				"valueRef": null,
				"tags": null,
				"detailsBase": null
			},
			{
				"id": "3700D58A6E13F0E5A26D026A0E133CE0",
				"oi": null,
				"version": 0,
				"type": "TAMANHO",
				"subType": null,
				"description": "Tamanho(36-56)",
				"value": "44",
				"valueRef": null,
				"tags": null,
				"detailsBase": null
			},
			{
				"id": "3700D58AFEE240368409026A0E133CE0",
				"oi": null,
				"version": 0,
				"type": "TAMANHO",
				"subType": null,
				"description": "Tamanho(36-56)",
				"value": "46",
				"valueRef": null,
				"tags": null,
				"detailsBase": null
			},
			{
				"id": "3700D58C768E20794F99026A0E133CE0",
				"oi": null,
				"version": 0,
				"type": "TAMANHO",
				"subType": null,
				"description": "Tamanho(36-56)",
				"value": "48",
				"valueRef": null,
				"tags": null,
				"detailsBase": null
			},
			{
				"id": "3700D58C82750024D917026A0E133CE0",
				"oi": null,
				"version": 0,
				"type": "TAMANHO",
				"subType": null,
				"description": "Tamanho(36-56)",
				"value": "50",
				"valueRef": null,
				"tags": null,
				"detailsBase": null
			},
			{
				"id": "3700D58DF2CDE0CB938F026A0E133CE0",
				"oi": null,
				"version": 0,
				"type": "TAMANHO",
				"subType": null,
				"description": "Tamanho(36-56)",
				"value": "52",
				"valueRef": null,
				"tags": null,
				"detailsBase": null
			},
			{
				"id": "3700D5D720C850CAA177026A0E133CE0",
				"oi": null,
				"version": 0,
				"type": "TAMANHO",
				"subType": null,
				"description": "Tamanho(36-56)",
				"value": "54",
				"valueRef": null,
				"tags": null,
				"detailsBase": null
			},
			{
				"id": "3700D5D4CB8DB02EA803026A0E133CE0",
				"oi": null,
				"version": 0,
				"type": "TAMANHO",
				"subType": null,
				"description": "Tamanho(36-56)",
				"value": "56",
				"valueRef": null,
				"tags": null,
				"detailsBase": null
			},
			{
				"id": "3700D56836EC30B80037026A0E133CE0",
				"oi": null,
				"version": 0,
				"type": "COR",
				"subType": null,
				"description": "Amarelo",
				"value": "Amarelo",
				"valueRef": "#FFFF00",
				"tags": null,
				"detailsBase": null
			},
			{
				"id": "3700D56833DEF06C4C4A026A0E133CE0",
				"oi": null,
				"version": 0,
				"type": "COR",
				"subType": null,
				"description": "Couro",
				"value": "Couro",
				"valueRef": null,
				"tags": null,
				"detailsBase": null
			},
			{
				"id": "3700D568300E609EE9DD026A0E133CE0",
				"oi": null,
				"version": 0,
				"type": "COR",
				"subType": null,
				"description": "Lilás",
				"value": "Lilás",
				"valueRef": "#B19CD9",
				"tags": null,
				"detailsBase": null
			},
			{
				"id": "3700D568316DF038D765026A0E133CE0",
				"oi": null,
				"version": 0,
				"type": "COR",
				"subType": null,
				"description": "Ocre",
				"value": "Ocre",
				"valueRef": "#cc7722",
				"tags": null,
				"detailsBase": null
			},
			{
				"id": "3700D5683824B0CAFC88026A0E133CE0",
				"oi": null,
				"version": 0,
				"type": "COR",
				"subType": null,
				"description": "Vermelho",
				"value": "Vermelho",
				"valueRef": "#FF0000",
				"tags": null,
				"detailsBase": null
			},
			{
				"id": "3700D568353E80220F72026A0E133CE0",
				"oi": null,
				"version": 0,
				"type": "COR",
				"subType": null,
				"description": "Pérola",
				"value": "Pérola",
				"valueRef": "#FEFFDD",
				"tags": null,
				"detailsBase": null
			},
			{
				"id": "3700D5683A4790112BE7026A0E133CE0",
				"oi": null,
				"version": 0,
				"type": "COR",
				"subType": null,
				"description": "Champagne",
				"value": "Champagne",
				"valueRef": "#C0C0AC",
				"tags": null,
				"detailsBase": null
			},
			{
				"id": "3700D5683B59003C6B8E026A0E133CE0",
				"oi": null,
				"version": 0,
				"type": "COR",
				"subType": null,
				"description": "Azul navy",
				"value": "Azul navy",
				"valueRef": "#2C385D",
				"tags": null,
				"detailsBase": null
			},
			{
				"id": "3700D5683CDFA028985D026A0E133CE0",
				"oi": null,
				"version": 0,
				"type": "COR",
				"subType": null,
				"description": "Nude",
				"value": "Nude",
				"valueRef": "#ebc8b2",
				"tags": null,
				"detailsBase": null
			},
			{
				"id": "3700D5683DF1103DD33F026A0E133CE0",
				"oi": null,
				"version": 0,
				"type": "COR",
				"subType": null,
				"description": "Verde Limão",
				"value": "Verde Limão",
				"valueRef": "#00ff00",
				"tags": null,
				"detailsBase": null
			},
			{
				"id": "3700D5683FC5D0C471B6026A0E133CE0",
				"oi": null,
				"version": 0,
				"type": "COR",
				"subType": null,
				"description": "Verde Tiffany",
				"value": "Verde Tiffany",
				"valueRef": "#23CDB8",
				"tags": null,
				"detailsBase": null
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

		$scope.result2 = [
			{
				"yDetail": {
					"id": "3700D568300E609EE9DD026A0E133CE0",
					"oi": null,
					"version": 0,
					"type": "COR",
					"subType": null,
					"description": "Lilás",
					"value": "Lilás",
					"valueRef": "#B19CD9",
					"tags": null,
					"detailsBase": null
				},
				"xDetail": {
					"id": "3700D589F4C540099D03026A0E133CE0",
					"oi": null,
					"version": 0,
					"type": "TAMANHO",
					"subType": null,
					"description": "Tamanho(UN-G5)",
					"value": "PP",
					"valueRef": null,
					"tags": null,
					"detailsBase": null
				},
				"enable": true,
				"price": 300
			},
			{
				"yDetail": {
					"id": "3700D568300E609EE9DD026A0E133CE0",
					"oi": null,
					"version": 0,
					"type": "COR",
					"subType": null,
					"description": "Lilás",
					"value": "Lilás",
					"valueRef": "#B19CD9",
					"tags": null,
					"detailsBase": null
				},
				"xDetail": {
					"id": "3700D57DA6BF00009C54026A0E133CE0",
					"oi": null,
					"version": 0,
					"type": "TAMANHO",
					"subType": null,
					"description": "Tamanho(UN-G5)",
					"value": "P",
					"valueRef": null,
					"tags": null,
					"detailsBase": null
				},
				"enable": true,
				"price": 300
			},
			{
				"yDetail": {
					"id": "3700D568300E609EE9DD026A0E133CE0",
					"oi": null,
					"version": 0,
					"type": "COR",
					"subType": null,
					"description": "Lilás",
					"value": "Lilás",
					"valueRef": "#B19CD9",
					"tags": null,
					"detailsBase": null
				},
				"xDetail": {
					"id": "3700D57D7C2C90EE3F71026A0E133CE0",
					"oi": null,
					"version": 0,
					"type": "TAMANHO",
					"subType": null,
					"description": "Tamanho(UN-G5)",
					"value": "M",
					"valueRef": null,
					"tags": null,
					"detailsBase": null
				},
				"enable": true,
				"price": 300
			},
			{
				"yDetail": {
					"id": "3700D568300E609EE9DD026A0E133CE0",
					"oi": null,
					"version": 0,
					"type": "COR",
					"subType": null,
					"description": "Lilás",
					"value": "Lilás",
					"valueRef": "#B19CD9",
					"tags": null,
					"detailsBase": null
				},
				"xDetail": {
					"id": "3700D57DADEAF0EBC693026A0E133CE0",
					"oi": null,
					"version": 0,
					"type": "TAMANHO",
					"subType": null,
					"description": "Tamanho(UN-G5)",
					"value": "G",
					"valueRef": null,
					"tags": null,
					"detailsBase": null
				},
				"enable": true,
				"price": 300
			},
			{
				"yDetail": {
					"id": "3700D568300E609EE9DD026A0E133CE0",
					"oi": null,
					"version": 0,
					"type": "COR",
					"subType": null,
					"description": "Lilás",
					"value": "Lilás",
					"valueRef": "#B19CD9",
					"tags": null,
					"detailsBase": null
				},
				"xDetail": {
					"id": "3700D57FD1673013431F026A0E133CE0",
					"oi": null,
					"version": 0,
					"type": "TAMANHO",
					"subType": null,
					"description": "Tamanho(UN-G5)",
					"value": "GG",
					"valueRef": null,
					"tags": null,
					"detailsBase": null
				},
				"enable": true,
				"price": 300
			},
			{
				"yDetail": {
					"id": "3700D568300E609EE9DD026A0E133CE0",
					"oi": null,
					"version": 0,
					"type": "COR",
					"subType": null,
					"description": "Lilás",
					"value": "Lilás",
					"valueRef": "#B19CD9",
					"tags": null,
					"detailsBase": null
				},
				"xDetail": {
					"id": "3700D58EA2E40006908B026A0E133CE0",
					"oi": null,
					"version": 0,
					"type": "TAMANHO",
					"subType": null,
					"description": "Tamanho(UN-G5)",
					"value": "XG",
					"valueRef": null,
					"tags": null,
					"detailsBase": null
				},
				"enable": true,
				"price": 300
			},
			{
				"yDetail": {
					"id": "3700D568300E609EE9DD026A0E133CE0",
					"oi": null,
					"version": 0,
					"type": "COR",
					"subType": null,
					"description": "Lilás",
					"value": "Lilás",
					"valueRef": "#B19CD9",
					"tags": null,
					"detailsBase": null
				},
				"xDetail": {
					"id": "3700D58ACCD5C0AB8687026A0E133CE0",
					"oi": null,
					"version": 0,
					"type": "TAMANHO",
					"subType": null,
					"description": "Tamanho(UN-G5)",
					"value": "G1",
					"valueRef": null,
					"tags": null,
					"detailsBase": null
				},
				"enable": true,
				"price": 300
			},
			{
				"yDetail": {
					"id": "3700D568300E609EE9DD026A0E133CE0",
					"oi": null,
					"version": 0,
					"type": "COR",
					"subType": null,
					"description": "Lilás",
					"value": "Lilás",
					"valueRef": "#B19CD9",
					"tags": null,
					"detailsBase": null
				},
				"xDetail": {
					"id": "3700D58A28A6808C510B026A0E133CE0",
					"oi": null,
					"version": 0,
					"type": "TAMANHO",
					"subType": null,
					"description": "Tamanho(UN-G5)",
					"value": "G2",
					"valueRef": null,
					"tags": null,
					"detailsBase": null
				},
				"enable": true,
				"price": 300
			},
			{
				"yDetail": {
					"id": "3700D568300E609EE9DD026A0E133CE0",
					"oi": null,
					"version": 0,
					"type": "COR",
					"subType": null,
					"description": "Lilás",
					"value": "Lilás",
					"valueRef": "#B19CD9",
					"tags": null,
					"detailsBase": null
				},
				"xDetail": {
					"id": "3700D58DE1B6E07B502C026A0E133CE0",
					"oi": null,
					"version": 0,
					"type": "TAMANHO",
					"subType": null,
					"description": "Tamanho(UN-G5)",
					"value": "G3",
					"valueRef": null,
					"tags": null,
					"detailsBase": null
				},
				"enable": true,
				"price": 300
			},
			{
				"yDetail": {
					"id": "3700D568300E609EE9DD026A0E133CE0",
					"oi": null,
					"version": 0,
					"type": "COR",
					"subType": null,
					"description": "Lilás",
					"value": "Lilás",
					"valueRef": "#B19CD9",
					"tags": null,
					"detailsBase": null
				},
				"xDetail": {
					"id": "3700D5D1FF0030BD7AF1026A0E133CE0",
					"oi": null,
					"version": 0,
					"type": "TAMANHO",
					"subType": null,
					"description": "Tamanho(UN-G5)",
					"value": "G5",
					"valueRef": null,
					"tags": null,
					"detailsBase": null
				},
				"enable": true,
				"price": 300
			},
			{
				"yDetail": {
					"id": "3700D568300E609EE9DD026A0E133CE0",
					"oi": null,
					"version": 0,
					"type": "COR",
					"subType": null,
					"description": "Lilás",
					"value": "Lilás",
					"valueRef": "#B19CD9",
					"tags": null,
					"detailsBase": null
				},
				"xDetail": {
					"id": "3700D57D7A09B0A3E71E026A0E133CE0",
					"oi": null,
					"version": 0,
					"type": "TAMANHO",
					"subType": null,
					"description": "Tamanho(UN-G5)",
					"value": "UN",
					"valueRef": null,
					"tags": null,
					"detailsBase": null
				},
				"enable": true,
				"price": 300
			},
			{
				"yDetail": {
					"id": "3700D568300E609EE9DD026A0E133CE0",
					"oi": null,
					"version": 0,
					"type": "COR",
					"subType": null,
					"description": "Lilás",
					"value": "Lilás",
					"valueRef": "#B19CD9",
					"tags": null,
					"detailsBase": null
				},
				"xDetail": {
					"id": "A81B847856AFB8F49FE0771A18054FB8",
					"oi": {
						"value": "1034.1035.1036."
					},
					"version": 0,
					"type": "TAMANHO",
					"subType": null,
					"description": null,
					"value": "4",
					"valueRef": null,
					"tags": null,
					"detailsBase": null
				},
				"enable": true,
				"price": 300
			},
			{
				"yDetail": {
					"id": "3700D568300E609EE9DD026A0E133CE0",
					"oi": null,
					"version": 0,
					"type": "COR",
					"subType": null,
					"description": "Lilás",
					"value": "Lilás",
					"valueRef": "#B19CD9",
					"tags": null,
					"detailsBase": null
				},
				"xDetail": {
					"id": "5B972F42D7A520E1B838D34C18CFE3CB",
					"oi": {
						"value": "1034.1035.1036."
					},
					"version": 0,
					"type": "TAMANHO",
					"subType": null,
					"description": null,
					"value": "6",
					"valueRef": null,
					"tags": null,
					"detailsBase": null
				},
				"enable": true,
				"price": 300
			},
			{
				"yDetail": {
					"id": "3700D568300E609EE9DD026A0E133CE0",
					"oi": null,
					"version": 0,
					"type": "COR",
					"subType": null,
					"description": "Lilás",
					"value": "Lilás",
					"valueRef": "#B19CD9",
					"tags": null,
					"detailsBase": null
				},
				"xDetail": {
					"id": "25BE99FD9C15AE54AAF39A89B9171CCB",
					"oi": {
						"value": "1034.1035.1036."
					},
					"version": 0,
					"type": "TAMANHO",
					"subType": null,
					"description": null,
					"value": "8",
					"valueRef": null,
					"tags": null,
					"detailsBase": null
				},
				"enable": true,
				"price": 300
			},
			{
				"yDetail": {
					"id": "3700D568300E609EE9DD026A0E133CE0",
					"oi": null,
					"version": 0,
					"type": "COR",
					"subType": null,
					"description": "Lilás",
					"value": "Lilás",
					"valueRef": "#B19CD9",
					"tags": null,
					"detailsBase": null
				},
				"xDetail": {
					"id": "3700D774B1BCE0D33F7C026A0E133CE0",
					"oi": null,
					"version": 0,
					"type": "TAMANHO",
					"subType": null,
					"description": "TAMANHO (34-46)",
					"value": "34",
					"valueRef": null,
					"tags": null,
					"detailsBase": null
				},
				"enable": true,
				"price": 300
			},
			{
				"yDetail": {
					"id": "3700D568300E609EE9DD026A0E133CE0",
					"oi": null,
					"version": 0,
					"type": "COR",
					"subType": null,
					"description": "Lilás",
					"value": "Lilás",
					"valueRef": "#B19CD9",
					"tags": null,
					"detailsBase": null
				},
				"xDetail": {
					"id": "3700D77F358A704824F4026A0E133CE0",
					"oi": null,
					"version": 0,
					"type": "TAMANHO",
					"subType": null,
					"description": "TAMANHO (SAPATOS)",
					"value": "35",
					"valueRef": null,
					"tags": null,
					"detailsBase": null
				},
				"enable": true,
				"price": 300
			},
			{
				"yDetail": {
					"id": "3700D568300E609EE9DD026A0E133CE0",
					"oi": null,
					"version": 0,
					"type": "COR",
					"subType": null,
					"description": "Lilás",
					"value": "Lilás",
					"valueRef": "#B19CD9",
					"tags": null,
					"detailsBase": null
				},
				"xDetail": {
					"id": "3700D58C87CC30D37227026A0E133CE0",
					"oi": null,
					"version": 0,
					"type": "TAMANHO",
					"subType": null,
					"description": "Tamanho(36-56)",
					"value": "36",
					"valueRef": null,
					"tags": null,
					"detailsBase": null
				},
				"enable": true,
				"price": 300
			},
			{
				"yDetail": {
					"id": "3700D568300E609EE9DD026A0E133CE0",
					"oi": null,
					"version": 0,
					"type": "COR",
					"subType": null,
					"description": "Lilás",
					"value": "Lilás",
					"valueRef": "#B19CD9",
					"tags": null,
					"detailsBase": null
				},
				"xDetail": {
					"id": "3700D77F32CB5078A501026A0E133CE0",
					"oi": null,
					"version": 0,
					"type": "TAMANHO",
					"subType": null,
					"description": "TAMANHO (SAPATOS)",
					"value": "37",
					"valueRef": null,
					"tags": null,
					"detailsBase": null
				},
				"enable": true,
				"price": 300
			},
			{
				"yDetail": {
					"id": "3700D568300E609EE9DD026A0E133CE0",
					"oi": null,
					"version": 0,
					"type": "COR",
					"subType": null,
					"description": "Lilás",
					"value": "Lilás",
					"valueRef": "#B19CD9",
					"tags": null,
					"detailsBase": null
				},
				"xDetail": {
					"id": "3700D58C7D1DD01584D7026A0E133CE0",
					"oi": null,
					"version": 0,
					"type": "TAMANHO",
					"subType": null,
					"description": "Tamanho(36-56)",
					"value": "38",
					"valueRef": null,
					"tags": null,
					"detailsBase": null
				},
				"enable": true,
				"price": 300
			},
			{
				"yDetail": {
					"id": "3700D568300E609EE9DD026A0E133CE0",
					"oi": null,
					"version": 0,
					"type": "COR",
					"subType": null,
					"description": "Lilás",
					"value": "Lilás",
					"valueRef": "#B19CD9",
					"tags": null,
					"detailsBase": null
				},
				"xDetail": {
					"id": "3700D77F2F6FF02D3135026A0E133CE0",
					"oi": null,
					"version": 0,
					"type": "TAMANHO",
					"subType": null,
					"description": "TAMANHO (SAPATOS)",
					"value": "39",
					"valueRef": null,
					"tags": null,
					"detailsBase": null
				},
				"enable": true,
				"price": 300
			},
			{
				"yDetail": {
					"id": "3700D568300E609EE9DD026A0E133CE0",
					"oi": null,
					"version": 0,
					"type": "COR",
					"subType": null,
					"description": "Lilás",
					"value": "Lilás",
					"valueRef": "#B19CD9",
					"tags": null,
					"detailsBase": null
				},
				"xDetail": {
					"id": "3700D58A516430F9160B026A0E133CE0",
					"oi": null,
					"version": 0,
					"type": "TAMANHO",
					"subType": null,
					"description": "Tamanho(36-56)",
					"value": "40",
					"valueRef": null,
					"tags": null,
					"detailsBase": null
				},
				"enable": true,
				"price": 300
			},
			{
				"yDetail": {
					"id": "3700D568300E609EE9DD026A0E133CE0",
					"oi": null,
					"version": 0,
					"type": "COR",
					"subType": null,
					"description": "Lilás",
					"value": "Lilás",
					"valueRef": "#B19CD9",
					"tags": null,
					"detailsBase": null
				},
				"xDetail": {
					"id": "3700D58FE06D109D3A21026A0E133CE0",
					"oi": null,
					"version": 0,
					"type": "TAMANHO",
					"subType": null,
					"description": "Tamanho(36-56)",
					"value": "42",
					"valueRef": null,
					"tags": null,
					"detailsBase": null
				},
				"enable": true,
				"price": 300
			},
			{
				"yDetail": {
					"id": "3700D568300E609EE9DD026A0E133CE0",
					"oi": null,
					"version": 0,
					"type": "COR",
					"subType": null,
					"description": "Lilás",
					"value": "Lilás",
					"valueRef": "#B19CD9",
					"tags": null,
					"detailsBase": null
				},
				"xDetail": {
					"id": "3700D58A6E13F0E5A26D026A0E133CE0",
					"oi": null,
					"version": 0,
					"type": "TAMANHO",
					"subType": null,
					"description": "Tamanho(36-56)",
					"value": "44",
					"valueRef": null,
					"tags": null,
					"detailsBase": null
				},
				"enable": true,
				"price": 300
			},
			{
				"yDetail": {
					"id": "3700D568316DF038D765026A0E133CE0",
					"oi": null,
					"version": 0,
					"type": "COR",
					"subType": null,
					"description": "Ocre",
					"value": "Ocre",
					"valueRef": "#cc7722",
					"tags": null,
					"detailsBase": null
				},
				"xDetail": {
					"id": "3700D589F4C540099D03026A0E133CE0",
					"oi": null,
					"version": 0,
					"type": "TAMANHO",
					"subType": null,
					"description": "Tamanho(UN-G5)",
					"value": "PP",
					"valueRef": null,
					"tags": null,
					"detailsBase": null
				},
				"enable": true,
				"price": 300
			},
			{
				"yDetail": {
					"id": "3700D56833DEF06C4C4A026A0E133CE0",
					"oi": null,
					"version": 0,
					"type": "COR",
					"subType": null,
					"description": "Couro",
					"value": "Couro",
					"valueRef": null,
					"tags": null,
					"detailsBase": null
				},
				"xDetail": {
					"id": "3700D589F4C540099D03026A0E133CE0",
					"oi": null,
					"version": 0,
					"type": "TAMANHO",
					"subType": null,
					"description": "Tamanho(UN-G5)",
					"value": "PP",
					"valueRef": null,
					"tags": null,
					"detailsBase": null
				},
				"enable": true,
				"price": 300
			},
			{
				"yDetail": {
					"id": "3700D568353E80220F72026A0E133CE0",
					"oi": null,
					"version": 0,
					"type": "COR",
					"subType": null,
					"description": "Pérola",
					"value": "Pérola",
					"valueRef": "#FEFFDD",
					"tags": null,
					"detailsBase": null
				},
				"xDetail": {
					"id": "3700D589F4C540099D03026A0E133CE0",
					"oi": null,
					"version": 0,
					"type": "TAMANHO",
					"subType": null,
					"description": "Tamanho(UN-G5)",
					"value": "PP",
					"valueRef": null,
					"tags": null,
					"detailsBase": null
				},
				"enable": true,
				"price": 300
			},
			{
				"yDetail": {
					"id": "3700D5682734C0267582026A0E133CE0",
					"oi": null,
					"version": 0,
					"type": "COR",
					"subType": null,
					"description": "Única",
					"value": "Única",
					"valueRef": null,
					"tags": null,
					"detailsBase": null
				},
				"xDetail": {
					"id": "3700D589F4C540099D03026A0E133CE0",
					"oi": null,
					"version": 0,
					"type": "TAMANHO",
					"subType": null,
					"description": "Tamanho(UN-G5)",
					"value": "PP",
					"valueRef": null,
					"tags": null,
					"detailsBase": null
				},
				"enable": true,
				"price": 300
			},
			{
				"yDetail": {
					"id": "3700D568316DF038D765026A0E133CE0",
					"oi": null,
					"version": 0,
					"type": "COR",
					"subType": null,
					"description": "Ocre",
					"value": "Ocre",
					"valueRef": "#cc7722",
					"tags": null,
					"detailsBase": null
				},
				"xDetail": {
					"id": "3700D57DA6BF00009C54026A0E133CE0",
					"oi": null,
					"version": 0,
					"type": "TAMANHO",
					"subType": null,
					"description": "Tamanho(UN-G5)",
					"value": "P",
					"valueRef": null,
					"tags": null,
					"detailsBase": null
				},
				"enable": true,
				"price": 300
			},
			{
				"yDetail": {
					"id": "3700D56833DEF06C4C4A026A0E133CE0",
					"oi": null,
					"version": 0,
					"type": "COR",
					"subType": null,
					"description": "Couro",
					"value": "Couro",
					"valueRef": null,
					"tags": null,
					"detailsBase": null
				},
				"xDetail": {
					"id": "3700D57DA6BF00009C54026A0E133CE0",
					"oi": null,
					"version": 0,
					"type": "TAMANHO",
					"subType": null,
					"description": "Tamanho(UN-G5)",
					"value": "P",
					"valueRef": null,
					"tags": null,
					"detailsBase": null
				},
				"enable": true,
				"price": 300
			},
			{
				"yDetail": {
					"id": "3700D568353E80220F72026A0E133CE0",
					"oi": null,
					"version": 0,
					"type": "COR",
					"subType": null,
					"description": "Pérola",
					"value": "Pérola",
					"valueRef": "#FEFFDD",
					"tags": null,
					"detailsBase": null
				},
				"xDetail": {
					"id": "3700D57DA6BF00009C54026A0E133CE0",
					"oi": null,
					"version": 0,
					"type": "TAMANHO",
					"subType": null,
					"description": "Tamanho(UN-G5)",
					"value": "P",
					"valueRef": null,
					"tags": null,
					"detailsBase": null
				},
				"enable": true,
				"price": 300
			},
			{
				"yDetail": {
					"id": "3700D5682734C0267582026A0E133CE0",
					"oi": null,
					"version": 0,
					"type": "COR",
					"subType": null,
					"description": "Única",
					"value": "Única",
					"valueRef": null,
					"tags": null,
					"detailsBase": null
				},
				"xDetail": {
					"id": "3700D57DA6BF00009C54026A0E133CE0",
					"oi": null,
					"version": 0,
					"type": "TAMANHO",
					"subType": null,
					"description": "Tamanho(UN-G5)",
					"value": "P",
					"valueRef": null,
					"tags": null,
					"detailsBase": null
				},
				"enable": true,
				"price": 300
			},
			{
				"yDetail": {
					"id": "3700D568316DF038D765026A0E133CE0",
					"oi": null,
					"version": 0,
					"type": "COR",
					"subType": null,
					"description": "Ocre",
					"value": "Ocre",
					"valueRef": "#cc7722",
					"tags": null,
					"detailsBase": null
				},
				"xDetail": {
					"id": "3700D57D7C2C90EE3F71026A0E133CE0",
					"oi": null,
					"version": 0,
					"type": "TAMANHO",
					"subType": null,
					"description": "Tamanho(UN-G5)",
					"value": "M",
					"valueRef": null,
					"tags": null,
					"detailsBase": null
				},
				"enable": true,
				"price": 300
			},
			{
				"yDetail": {
					"id": "3700D56833DEF06C4C4A026A0E133CE0",
					"oi": null,
					"version": 0,
					"type": "COR",
					"subType": null,
					"description": "Couro",
					"value": "Couro",
					"valueRef": null,
					"tags": null,
					"detailsBase": null
				},
				"xDetail": {
					"id": "3700D57D7C2C90EE3F71026A0E133CE0",
					"oi": null,
					"version": 0,
					"type": "TAMANHO",
					"subType": null,
					"description": "Tamanho(UN-G5)",
					"value": "M",
					"valueRef": null,
					"tags": null,
					"detailsBase": null
				},
				"enable": true,
				"price": 300
			},
			{
				"yDetail": {
					"id": "3700D568353E80220F72026A0E133CE0",
					"oi": null,
					"version": 0,
					"type": "COR",
					"subType": null,
					"description": "Pérola",
					"value": "Pérola",
					"valueRef": "#FEFFDD",
					"tags": null,
					"detailsBase": null
				},
				"xDetail": {
					"id": "3700D57D7C2C90EE3F71026A0E133CE0",
					"oi": null,
					"version": 0,
					"type": "TAMANHO",
					"subType": null,
					"description": "Tamanho(UN-G5)",
					"value": "M",
					"valueRef": null,
					"tags": null,
					"detailsBase": null
				},
				"enable": true,
				"price": 300
			},
			{
				"yDetail": {
					"id": "3700D5682734C0267582026A0E133CE0",
					"oi": null,
					"version": 0,
					"type": "COR",
					"subType": null,
					"description": "Única",
					"value": "Única",
					"valueRef": null,
					"tags": null,
					"detailsBase": null
				},
				"xDetail": {
					"id": "3700D57D7C2C90EE3F71026A0E133CE0",
					"oi": null,
					"version": 0,
					"type": "TAMANHO",
					"subType": null,
					"description": "Tamanho(UN-G5)",
					"value": "M",
					"valueRef": null,
					"tags": null,
					"detailsBase": null
				},
				"enable": true,
				"price": 300
			},
			{
				"yDetail": {
					"id": "3700D568316DF038D765026A0E133CE0",
					"oi": null,
					"version": 0,
					"type": "COR",
					"subType": null,
					"description": "Ocre",
					"value": "Ocre",
					"valueRef": "#cc7722",
					"tags": null,
					"detailsBase": null
				},
				"xDetail": {
					"id": "3700D57DADEAF0EBC693026A0E133CE0",
					"oi": null,
					"version": 0,
					"type": "TAMANHO",
					"subType": null,
					"description": "Tamanho(UN-G5)",
					"value": "G",
					"valueRef": null,
					"tags": null,
					"detailsBase": null
				},
				"enable": true,
				"price": 300
			},
			{
				"yDetail": {
					"id": "3700D56833DEF06C4C4A026A0E133CE0",
					"oi": null,
					"version": 0,
					"type": "COR",
					"subType": null,
					"description": "Couro",
					"value": "Couro",
					"valueRef": null,
					"tags": null,
					"detailsBase": null
				},
				"xDetail": {
					"id": "3700D57DADEAF0EBC693026A0E133CE0",
					"oi": null,
					"version": 0,
					"type": "TAMANHO",
					"subType": null,
					"description": "Tamanho(UN-G5)",
					"value": "G",
					"valueRef": null,
					"tags": null,
					"detailsBase": null
				},
				"enable": true,
				"price": 300
			},
			{
				"yDetail": {
					"id": "3700D568353E80220F72026A0E133CE0",
					"oi": null,
					"version": 0,
					"type": "COR",
					"subType": null,
					"description": "Pérola",
					"value": "Pérola",
					"valueRef": "#FEFFDD",
					"tags": null,
					"detailsBase": null
				},
				"xDetail": {
					"id": "3700D57DADEAF0EBC693026A0E133CE0",
					"oi": null,
					"version": 0,
					"type": "TAMANHO",
					"subType": null,
					"description": "Tamanho(UN-G5)",
					"value": "G",
					"valueRef": null,
					"tags": null,
					"detailsBase": null
				},
				"enable": true,
				"price": 300
			},
			{
				"yDetail": {
					"id": "3700D5682734C0267582026A0E133CE0",
					"oi": null,
					"version": 0,
					"type": "COR",
					"subType": null,
					"description": "Única",
					"value": "Única",
					"valueRef": null,
					"tags": null,
					"detailsBase": null
				},
				"xDetail": {
					"id": "3700D57DADEAF0EBC693026A0E133CE0",
					"oi": null,
					"version": 0,
					"type": "TAMANHO",
					"subType": null,
					"description": "Tamanho(UN-G5)",
					"value": "G",
					"valueRef": null,
					"tags": null,
					"detailsBase": null
				},
				"enable": true,
				"price": 300
			},
			{
				"yDetail": {
					"id": "3700D568316DF038D765026A0E133CE0",
					"oi": null,
					"version": 0,
					"type": "COR",
					"subType": null,
					"description": "Ocre",
					"value": "Ocre",
					"valueRef": "#cc7722",
					"tags": null,
					"detailsBase": null
				},
				"xDetail": {
					"id": "3700D57FD1673013431F026A0E133CE0",
					"oi": null,
					"version": 0,
					"type": "TAMANHO",
					"subType": null,
					"description": "Tamanho(UN-G5)",
					"value": "GG",
					"valueRef": null,
					"tags": null,
					"detailsBase": null
				},
				"enable": true,
				"price": 300
			},
			{
				"yDetail": {
					"id": "3700D56833DEF06C4C4A026A0E133CE0",
					"oi": null,
					"version": 0,
					"type": "COR",
					"subType": null,
					"description": "Couro",
					"value": "Couro",
					"valueRef": null,
					"tags": null,
					"detailsBase": null
				},
				"xDetail": {
					"id": "3700D57FD1673013431F026A0E133CE0",
					"oi": null,
					"version": 0,
					"type": "TAMANHO",
					"subType": null,
					"description": "Tamanho(UN-G5)",
					"value": "GG",
					"valueRef": null,
					"tags": null,
					"detailsBase": null
				},
				"enable": true,
				"price": 300
			},
			{
				"yDetail": {
					"id": "3700D568353E80220F72026A0E133CE0",
					"oi": null,
					"version": 0,
					"type": "COR",
					"subType": null,
					"description": "Pérola",
					"value": "Pérola",
					"valueRef": "#FEFFDD",
					"tags": null,
					"detailsBase": null
				},
				"xDetail": {
					"id": "3700D57FD1673013431F026A0E133CE0",
					"oi": null,
					"version": 0,
					"type": "TAMANHO",
					"subType": null,
					"description": "Tamanho(UN-G5)",
					"value": "GG",
					"valueRef": null,
					"tags": null,
					"detailsBase": null
				},
				"enable": true,
				"price": 300
			},
			{
				"yDetail": {
					"id": "3700D5682734C0267582026A0E133CE0",
					"oi": null,
					"version": 0,
					"type": "COR",
					"subType": null,
					"description": "Única",
					"value": "Única",
					"valueRef": null,
					"tags": null,
					"detailsBase": null
				},
				"xDetail": {
					"id": "3700D57FD1673013431F026A0E133CE0",
					"oi": null,
					"version": 0,
					"type": "TAMANHO",
					"subType": null,
					"description": "Tamanho(UN-G5)",
					"value": "GG",
					"valueRef": null,
					"tags": null,
					"detailsBase": null
				},
				"enable": true,
				"price": 300
			},
			{
				"yDetail": {
					"id": "3700D568316DF038D765026A0E133CE0",
					"oi": null,
					"version": 0,
					"type": "COR",
					"subType": null,
					"description": "Ocre",
					"value": "Ocre",
					"valueRef": "#cc7722",
					"tags": null,
					"detailsBase": null
				},
				"xDetail": {
					"id": "3700D58EA2E40006908B026A0E133CE0",
					"oi": null,
					"version": 0,
					"type": "TAMANHO",
					"subType": null,
					"description": "Tamanho(UN-G5)",
					"value": "XG",
					"valueRef": null,
					"tags": null,
					"detailsBase": null
				},
				"enable": true,
				"price": 300
			},
			{
				"yDetail": {
					"id": "3700D56833DEF06C4C4A026A0E133CE0",
					"oi": null,
					"version": 0,
					"type": "COR",
					"subType": null,
					"description": "Couro",
					"value": "Couro",
					"valueRef": null,
					"tags": null,
					"detailsBase": null
				},
				"xDetail": {
					"id": "3700D58EA2E40006908B026A0E133CE0",
					"oi": null,
					"version": 0,
					"type": "TAMANHO",
					"subType": null,
					"description": "Tamanho(UN-G5)",
					"value": "XG",
					"valueRef": null,
					"tags": null,
					"detailsBase": null
				},
				"enable": true,
				"price": 300
			},
			{
				"yDetail": {
					"id": "3700D568353E80220F72026A0E133CE0",
					"oi": null,
					"version": 0,
					"type": "COR",
					"subType": null,
					"description": "Pérola",
					"value": "Pérola",
					"valueRef": "#FEFFDD",
					"tags": null,
					"detailsBase": null
				},
				"xDetail": {
					"id": "3700D58EA2E40006908B026A0E133CE0",
					"oi": null,
					"version": 0,
					"type": "TAMANHO",
					"subType": null,
					"description": "Tamanho(UN-G5)",
					"value": "XG",
					"valueRef": null,
					"tags": null,
					"detailsBase": null
				},
				"enable": true,
				"price": 300
			},
			{
				"yDetail": {
					"id": "3700D5682734C0267582026A0E133CE0",
					"oi": null,
					"version": 0,
					"type": "COR",
					"subType": null,
					"description": "Única",
					"value": "Única",
					"valueRef": null,
					"tags": null,
					"detailsBase": null
				},
				"xDetail": {
					"id": "3700D58EA2E40006908B026A0E133CE0",
					"oi": null,
					"version": 0,
					"type": "TAMANHO",
					"subType": null,
					"description": "Tamanho(UN-G5)",
					"value": "XG",
					"valueRef": null,
					"tags": null,
					"detailsBase": null
				},
				"enable": true,
				"price": 300
			},
			{
				"yDetail": {
					"id": "3700D568316DF038D765026A0E133CE0",
					"oi": null,
					"version": 0,
					"type": "COR",
					"subType": null,
					"description": "Ocre",
					"value": "Ocre",
					"valueRef": "#cc7722",
					"tags": null,
					"detailsBase": null
				},
				"xDetail": {
					"id": "3700D58ACCD5C0AB8687026A0E133CE0",
					"oi": null,
					"version": 0,
					"type": "TAMANHO",
					"subType": null,
					"description": "Tamanho(UN-G5)",
					"value": "G1",
					"valueRef": null,
					"tags": null,
					"detailsBase": null
				},
				"enable": true,
				"price": 300
			},
			{
				"yDetail": {
					"id": "3700D56833DEF06C4C4A026A0E133CE0",
					"oi": null,
					"version": 0,
					"type": "COR",
					"subType": null,
					"description": "Couro",
					"value": "Couro",
					"valueRef": null,
					"tags": null,
					"detailsBase": null
				},
				"xDetail": {
					"id": "3700D58ACCD5C0AB8687026A0E133CE0",
					"oi": null,
					"version": 0,
					"type": "TAMANHO",
					"subType": null,
					"description": "Tamanho(UN-G5)",
					"value": "G1",
					"valueRef": null,
					"tags": null,
					"detailsBase": null
				},
				"enable": true,
				"price": 300
			},
			{
				"yDetail": {
					"id": "3700D568353E80220F72026A0E133CE0",
					"oi": null,
					"version": 0,
					"type": "COR",
					"subType": null,
					"description": "Pérola",
					"value": "Pérola",
					"valueRef": "#FEFFDD",
					"tags": null,
					"detailsBase": null
				},
				"xDetail": {
					"id": "3700D58ACCD5C0AB8687026A0E133CE0",
					"oi": null,
					"version": 0,
					"type": "TAMANHO",
					"subType": null,
					"description": "Tamanho(UN-G5)",
					"value": "G1",
					"valueRef": null,
					"tags": null,
					"detailsBase": null
				},
				"enable": true,
				"price": 300
			},
			{
				"yDetail": {
					"id": "3700D5682734C0267582026A0E133CE0",
					"oi": null,
					"version": 0,
					"type": "COR",
					"subType": null,
					"description": "Única",
					"value": "Única",
					"valueRef": null,
					"tags": null,
					"detailsBase": null
				},
				"xDetail": {
					"id": "3700D58ACCD5C0AB8687026A0E133CE0",
					"oi": null,
					"version": 0,
					"type": "TAMANHO",
					"subType": null,
					"description": "Tamanho(UN-G5)",
					"value": "G1",
					"valueRef": null,
					"tags": null,
					"detailsBase": null
				},
				"enable": true,
				"price": 300
			},
			{
				"yDetail": {
					"id": "3700D568316DF038D765026A0E133CE0",
					"oi": null,
					"version": 0,
					"type": "COR",
					"subType": null,
					"description": "Ocre",
					"value": "Ocre",
					"valueRef": "#cc7722",
					"tags": null,
					"detailsBase": null
				},
				"xDetail": {
					"id": "3700D58A28A6808C510B026A0E133CE0",
					"oi": null,
					"version": 0,
					"type": "TAMANHO",
					"subType": null,
					"description": "Tamanho(UN-G5)",
					"value": "G2",
					"valueRef": null,
					"tags": null,
					"detailsBase": null
				},
				"enable": true,
				"price": 300
			},
			{
				"yDetail": {
					"id": "3700D56833DEF06C4C4A026A0E133CE0",
					"oi": null,
					"version": 0,
					"type": "COR",
					"subType": null,
					"description": "Couro",
					"value": "Couro",
					"valueRef": null,
					"tags": null,
					"detailsBase": null
				},
				"xDetail": {
					"id": "3700D58A28A6808C510B026A0E133CE0",
					"oi": null,
					"version": 0,
					"type": "TAMANHO",
					"subType": null,
					"description": "Tamanho(UN-G5)",
					"value": "G2",
					"valueRef": null,
					"tags": null,
					"detailsBase": null
				},
				"enable": true,
				"price": 300
			},
			{
				"yDetail": {
					"id": "3700D568353E80220F72026A0E133CE0",
					"oi": null,
					"version": 0,
					"type": "COR",
					"subType": null,
					"description": "Pérola",
					"value": "Pérola",
					"valueRef": "#FEFFDD",
					"tags": null,
					"detailsBase": null
				},
				"xDetail": {
					"id": "3700D58A28A6808C510B026A0E133CE0",
					"oi": null,
					"version": 0,
					"type": "TAMANHO",
					"subType": null,
					"description": "Tamanho(UN-G5)",
					"value": "G2",
					"valueRef": null,
					"tags": null,
					"detailsBase": null
				},
				"enable": true,
				"price": 300
			},
			{
				"yDetail": {
					"id": "3700D5682734C0267582026A0E133CE0",
					"oi": null,
					"version": 0,
					"type": "COR",
					"subType": null,
					"description": "Única",
					"value": "Única",
					"valueRef": null,
					"tags": null,
					"detailsBase": null
				},
				"xDetail": {
					"id": "3700D58A28A6808C510B026A0E133CE0",
					"oi": null,
					"version": 0,
					"type": "TAMANHO",
					"subType": null,
					"description": "Tamanho(UN-G5)",
					"value": "G2",
					"valueRef": null,
					"tags": null,
					"detailsBase": null
				},
				"enable": true,
				"price": 300
			},
			{
				"yDetail": {
					"id": "3700D568316DF038D765026A0E133CE0",
					"oi": null,
					"version": 0,
					"type": "COR",
					"subType": null,
					"description": "Ocre",
					"value": "Ocre",
					"valueRef": "#cc7722",
					"tags": null,
					"detailsBase": null
				},
				"xDetail": {
					"id": "3700D58DE1B6E07B502C026A0E133CE0",
					"oi": null,
					"version": 0,
					"type": "TAMANHO",
					"subType": null,
					"description": "Tamanho(UN-G5)",
					"value": "G3",
					"valueRef": null,
					"tags": null,
					"detailsBase": null
				},
				"enable": true,
				"price": 300
			},
			{
				"yDetail": {
					"id": "3700D56833DEF06C4C4A026A0E133CE0",
					"oi": null,
					"version": 0,
					"type": "COR",
					"subType": null,
					"description": "Couro",
					"value": "Couro",
					"valueRef": null,
					"tags": null,
					"detailsBase": null
				},
				"xDetail": {
					"id": "3700D58DE1B6E07B502C026A0E133CE0",
					"oi": null,
					"version": 0,
					"type": "TAMANHO",
					"subType": null,
					"description": "Tamanho(UN-G5)",
					"value": "G3",
					"valueRef": null,
					"tags": null,
					"detailsBase": null
				},
				"enable": true,
				"price": 300
			},
			{
				"yDetail": {
					"id": "3700D568353E80220F72026A0E133CE0",
					"oi": null,
					"version": 0,
					"type": "COR",
					"subType": null,
					"description": "Pérola",
					"value": "Pérola",
					"valueRef": "#FEFFDD",
					"tags": null,
					"detailsBase": null
				},
				"xDetail": {
					"id": "3700D58DE1B6E07B502C026A0E133CE0",
					"oi": null,
					"version": 0,
					"type": "TAMANHO",
					"subType": null,
					"description": "Tamanho(UN-G5)",
					"value": "G3",
					"valueRef": null,
					"tags": null,
					"detailsBase": null
				},
				"enable": true,
				"price": 300
			},
			{
				"yDetail": {
					"id": "3700D5682734C0267582026A0E133CE0",
					"oi": null,
					"version": 0,
					"type": "COR",
					"subType": null,
					"description": "Única",
					"value": "Única",
					"valueRef": null,
					"tags": null,
					"detailsBase": null
				},
				"xDetail": {
					"id": "3700D58DE1B6E07B502C026A0E133CE0",
					"oi": null,
					"version": 0,
					"type": "TAMANHO",
					"subType": null,
					"description": "Tamanho(UN-G5)",
					"value": "G3",
					"valueRef": null,
					"tags": null,
					"detailsBase": null
				},
				"enable": true,
				"price": 300
			},
			{
				"yDetail": {
					"id": "3700D568316DF038D765026A0E133CE0",
					"oi": null,
					"version": 0,
					"type": "COR",
					"subType": null,
					"description": "Ocre",
					"value": "Ocre",
					"valueRef": "#cc7722",
					"tags": null,
					"detailsBase": null
				},
				"xDetail": {
					"id": "3700D5D1FF0030BD7AF1026A0E133CE0",
					"oi": null,
					"version": 0,
					"type": "TAMANHO",
					"subType": null,
					"description": "Tamanho(UN-G5)",
					"value": "G5",
					"valueRef": null,
					"tags": null,
					"detailsBase": null
				},
				"enable": true,
				"price": 300
			},
			{
				"yDetail": {
					"id": "3700D56833DEF06C4C4A026A0E133CE0",
					"oi": null,
					"version": 0,
					"type": "COR",
					"subType": null,
					"description": "Couro",
					"value": "Couro",
					"valueRef": null,
					"tags": null,
					"detailsBase": null
				},
				"xDetail": {
					"id": "3700D5D1FF0030BD7AF1026A0E133CE0",
					"oi": null,
					"version": 0,
					"type": "TAMANHO",
					"subType": null,
					"description": "Tamanho(UN-G5)",
					"value": "G5",
					"valueRef": null,
					"tags": null,
					"detailsBase": null
				},
				"enable": true,
				"price": 300
			},
			{
				"yDetail": {
					"id": "3700D568353E80220F72026A0E133CE0",
					"oi": null,
					"version": 0,
					"type": "COR",
					"subType": null,
					"description": "Pérola",
					"value": "Pérola",
					"valueRef": "#FEFFDD",
					"tags": null,
					"detailsBase": null
				},
				"xDetail": {
					"id": "3700D5D1FF0030BD7AF1026A0E133CE0",
					"oi": null,
					"version": 0,
					"type": "TAMANHO",
					"subType": null,
					"description": "Tamanho(UN-G5)",
					"value": "G5",
					"valueRef": null,
					"tags": null,
					"detailsBase": null
				},
				"enable": true,
				"price": 300
			},
			{
				"yDetail": {
					"id": "3700D5682734C0267582026A0E133CE0",
					"oi": null,
					"version": 0,
					"type": "COR",
					"subType": null,
					"description": "Única",
					"value": "Única",
					"valueRef": null,
					"tags": null,
					"detailsBase": null
				},
				"xDetail": {
					"id": "3700D5D1FF0030BD7AF1026A0E133CE0",
					"oi": null,
					"version": 0,
					"type": "TAMANHO",
					"subType": null,
					"description": "Tamanho(UN-G5)",
					"value": "G5",
					"valueRef": null,
					"tags": null,
					"detailsBase": null
				},
				"enable": true,
				"price": 300
			},
			{
				"yDetail": {
					"id": "3700D568316DF038D765026A0E133CE0",
					"oi": null,
					"version": 0,
					"type": "COR",
					"subType": null,
					"description": "Ocre",
					"value": "Ocre",
					"valueRef": "#cc7722",
					"tags": null,
					"detailsBase": null
				},
				"xDetail": {
					"id": "3700D57D7A09B0A3E71E026A0E133CE0",
					"oi": null,
					"version": 0,
					"type": "TAMANHO",
					"subType": null,
					"description": "Tamanho(UN-G5)",
					"value": "UN",
					"valueRef": null,
					"tags": null,
					"detailsBase": null
				},
				"enable": true,
				"price": 300
			},
			{
				"yDetail": {
					"id": "3700D56833DEF06C4C4A026A0E133CE0",
					"oi": null,
					"version": 0,
					"type": "COR",
					"subType": null,
					"description": "Couro",
					"value": "Couro",
					"valueRef": null,
					"tags": null,
					"detailsBase": null
				},
				"xDetail": {
					"id": "3700D57D7A09B0A3E71E026A0E133CE0",
					"oi": null,
					"version": 0,
					"type": "TAMANHO",
					"subType": null,
					"description": "Tamanho(UN-G5)",
					"value": "UN",
					"valueRef": null,
					"tags": null,
					"detailsBase": null
				},
				"enable": true,
				"price": 300
			},
			{
				"yDetail": {
					"id": "3700D568353E80220F72026A0E133CE0",
					"oi": null,
					"version": 0,
					"type": "COR",
					"subType": null,
					"description": "Pérola",
					"value": "Pérola",
					"valueRef": "#FEFFDD",
					"tags": null,
					"detailsBase": null
				},
				"xDetail": {
					"id": "3700D57D7A09B0A3E71E026A0E133CE0",
					"oi": null,
					"version": 0,
					"type": "TAMANHO",
					"subType": null,
					"description": "Tamanho(UN-G5)",
					"value": "UN",
					"valueRef": null,
					"tags": null,
					"detailsBase": null
				},
				"enable": true,
				"price": 300
			},
			{
				"yDetail": {
					"id": "3700D5682734C0267582026A0E133CE0",
					"oi": null,
					"version": 0,
					"type": "COR",
					"subType": null,
					"description": "Única",
					"value": "Única",
					"valueRef": null,
					"tags": null,
					"detailsBase": null
				},
				"xDetail": {
					"id": "3700D57D7A09B0A3E71E026A0E133CE0",
					"oi": null,
					"version": 0,
					"type": "TAMANHO",
					"subType": null,
					"description": "Tamanho(UN-G5)",
					"value": "UN",
					"valueRef": null,
					"tags": null,
					"detailsBase": null
				},
				"enable": true,
				"price": 300
			},
			{
				"yDetail": {
					"id": "3700D568316DF038D765026A0E133CE0",
					"oi": null,
					"version": 0,
					"type": "COR",
					"subType": null,
					"description": "Ocre",
					"value": "Ocre",
					"valueRef": "#cc7722",
					"tags": null,
					"detailsBase": null
				},
				"xDetail": {
					"id": "A81B847856AFB8F49FE0771A18054FB8",
					"oi": {
						"value": "1034.1035.1036."
					},
					"version": 0,
					"type": "TAMANHO",
					"subType": null,
					"description": null,
					"value": "4",
					"valueRef": null,
					"tags": null,
					"detailsBase": null
				},
				"enable": true,
				"price": 300
			},
			{
				"yDetail": {
					"id": "3700D56833DEF06C4C4A026A0E133CE0",
					"oi": null,
					"version": 0,
					"type": "COR",
					"subType": null,
					"description": "Couro",
					"value": "Couro",
					"valueRef": null,
					"tags": null,
					"detailsBase": null
				},
				"xDetail": {
					"id": "A81B847856AFB8F49FE0771A18054FB8",
					"oi": {
						"value": "1034.1035.1036."
					},
					"version": 0,
					"type": "TAMANHO",
					"subType": null,
					"description": null,
					"value": "4",
					"valueRef": null,
					"tags": null,
					"detailsBase": null
				},
				"enable": true,
				"price": 300
			},
			{
				"yDetail": {
					"id": "3700D568353E80220F72026A0E133CE0",
					"oi": null,
					"version": 0,
					"type": "COR",
					"subType": null,
					"description": "Pérola",
					"value": "Pérola",
					"valueRef": "#FEFFDD",
					"tags": null,
					"detailsBase": null
				},
				"xDetail": {
					"id": "A81B847856AFB8F49FE0771A18054FB8",
					"oi": {
						"value": "1034.1035.1036."
					},
					"version": 0,
					"type": "TAMANHO",
					"subType": null,
					"description": null,
					"value": "4",
					"valueRef": null,
					"tags": null,
					"detailsBase": null
				},
				"enable": true,
				"price": 300
			},
			{
				"yDetail": {
					"id": "3700D5682734C0267582026A0E133CE0",
					"oi": null,
					"version": 0,
					"type": "COR",
					"subType": null,
					"description": "Única",
					"value": "Única",
					"valueRef": null,
					"tags": null,
					"detailsBase": null
				},
				"xDetail": {
					"id": "A81B847856AFB8F49FE0771A18054FB8",
					"oi": {
						"value": "1034.1035.1036."
					},
					"version": 0,
					"type": "TAMANHO",
					"subType": null,
					"description": null,
					"value": "4",
					"valueRef": null,
					"tags": null,
					"detailsBase": null
				},
				"enable": true,
				"price": 300
			},
			{
				"yDetail": {
					"id": "3700D568316DF038D765026A0E133CE0",
					"oi": null,
					"version": 0,
					"type": "COR",
					"subType": null,
					"description": "Ocre",
					"value": "Ocre",
					"valueRef": "#cc7722",
					"tags": null,
					"detailsBase": null
				},
				"xDetail": {
					"id": "5B972F42D7A520E1B838D34C18CFE3CB",
					"oi": {
						"value": "1034.1035.1036."
					},
					"version": 0,
					"type": "TAMANHO",
					"subType": null,
					"description": null,
					"value": "6",
					"valueRef": null,
					"tags": null,
					"detailsBase": null
				},
				"enable": true,
				"price": 300
			},
			{
				"yDetail": {
					"id": "3700D56833DEF06C4C4A026A0E133CE0",
					"oi": null,
					"version": 0,
					"type": "COR",
					"subType": null,
					"description": "Couro",
					"value": "Couro",
					"valueRef": null,
					"tags": null,
					"detailsBase": null
				},
				"xDetail": {
					"id": "5B972F42D7A520E1B838D34C18CFE3CB",
					"oi": {
						"value": "1034.1035.1036."
					},
					"version": 0,
					"type": "TAMANHO",
					"subType": null,
					"description": null,
					"value": "6",
					"valueRef": null,
					"tags": null,
					"detailsBase": null
				},
				"enable": true,
				"price": 300
			},
			{
				"yDetail": {
					"id": "3700D568353E80220F72026A0E133CE0",
					"oi": null,
					"version": 0,
					"type": "COR",
					"subType": null,
					"description": "Pérola",
					"value": "Pérola",
					"valueRef": "#FEFFDD",
					"tags": null,
					"detailsBase": null
				},
				"xDetail": {
					"id": "5B972F42D7A520E1B838D34C18CFE3CB",
					"oi": {
						"value": "1034.1035.1036."
					},
					"version": 0,
					"type": "TAMANHO",
					"subType": null,
					"description": null,
					"value": "6",
					"valueRef": null,
					"tags": null,
					"detailsBase": null
				},
				"enable": true,
				"price": 300
			},
			{
				"yDetail": {
					"id": "3700D5682734C0267582026A0E133CE0",
					"oi": null,
					"version": 0,
					"type": "COR",
					"subType": null,
					"description": "Única",
					"value": "Única",
					"valueRef": null,
					"tags": null,
					"detailsBase": null
				},
				"xDetail": {
					"id": "5B972F42D7A520E1B838D34C18CFE3CB",
					"oi": {
						"value": "1034.1035.1036."
					},
					"version": 0,
					"type": "TAMANHO",
					"subType": null,
					"description": null,
					"value": "6",
					"valueRef": null,
					"tags": null,
					"detailsBase": null
				},
				"enable": true,
				"price": 300
			},
			{
				"yDetail": {
					"id": "3700D568316DF038D765026A0E133CE0",
					"oi": null,
					"version": 0,
					"type": "COR",
					"subType": null,
					"description": "Ocre",
					"value": "Ocre",
					"valueRef": "#cc7722",
					"tags": null,
					"detailsBase": null
				},
				"xDetail": {
					"id": "25BE99FD9C15AE54AAF39A89B9171CCB",
					"oi": {
						"value": "1034.1035.1036."
					},
					"version": 0,
					"type": "TAMANHO",
					"subType": null,
					"description": null,
					"value": "8",
					"valueRef": null,
					"tags": null,
					"detailsBase": null
				},
				"enable": true,
				"price": 300
			},
			{
				"yDetail": {
					"id": "3700D56833DEF06C4C4A026A0E133CE0",
					"oi": null,
					"version": 0,
					"type": "COR",
					"subType": null,
					"description": "Couro",
					"value": "Couro",
					"valueRef": null,
					"tags": null,
					"detailsBase": null
				},
				"xDetail": {
					"id": "25BE99FD9C15AE54AAF39A89B9171CCB",
					"oi": {
						"value": "1034.1035.1036."
					},
					"version": 0,
					"type": "TAMANHO",
					"subType": null,
					"description": null,
					"value": "8",
					"valueRef": null,
					"tags": null,
					"detailsBase": null
				},
				"enable": true,
				"price": 300
			},
			{
				"yDetail": {
					"id": "3700D568353E80220F72026A0E133CE0",
					"oi": null,
					"version": 0,
					"type": "COR",
					"subType": null,
					"description": "Pérola",
					"value": "Pérola",
					"valueRef": "#FEFFDD",
					"tags": null,
					"detailsBase": null
				},
				"xDetail": {
					"id": "25BE99FD9C15AE54AAF39A89B9171CCB",
					"oi": {
						"value": "1034.1035.1036."
					},
					"version": 0,
					"type": "TAMANHO",
					"subType": null,
					"description": null,
					"value": "8",
					"valueRef": null,
					"tags": null,
					"detailsBase": null
				},
				"enable": true,
				"price": 300
			},
			{
				"yDetail": {
					"id": "3700D5682734C0267582026A0E133CE0",
					"oi": null,
					"version": 0,
					"type": "COR",
					"subType": null,
					"description": "Única",
					"value": "Única",
					"valueRef": null,
					"tags": null,
					"detailsBase": null
				},
				"xDetail": {
					"id": "25BE99FD9C15AE54AAF39A89B9171CCB",
					"oi": {
						"value": "1034.1035.1036."
					},
					"version": 0,
					"type": "TAMANHO",
					"subType": null,
					"description": null,
					"value": "8",
					"valueRef": null,
					"tags": null,
					"detailsBase": null
				},
				"enable": true,
				"price": 300
			},
			{
				"yDetail": {
					"id": "3700D568316DF038D765026A0E133CE0",
					"oi": null,
					"version": 0,
					"type": "COR",
					"subType": null,
					"description": "Ocre",
					"value": "Ocre",
					"valueRef": "#cc7722",
					"tags": null,
					"detailsBase": null
				},
				"xDetail": {
					"id": "3700D774B1BCE0D33F7C026A0E133CE0",
					"oi": null,
					"version": 0,
					"type": "TAMANHO",
					"subType": null,
					"description": "TAMANHO (34-46)",
					"value": "34",
					"valueRef": null,
					"tags": null,
					"detailsBase": null
				},
				"enable": true,
				"price": 300
			},
			{
				"yDetail": {
					"id": "3700D56833DEF06C4C4A026A0E133CE0",
					"oi": null,
					"version": 0,
					"type": "COR",
					"subType": null,
					"description": "Couro",
					"value": "Couro",
					"valueRef": null,
					"tags": null,
					"detailsBase": null
				},
				"xDetail": {
					"id": "3700D774B1BCE0D33F7C026A0E133CE0",
					"oi": null,
					"version": 0,
					"type": "TAMANHO",
					"subType": null,
					"description": "TAMANHO (34-46)",
					"value": "34",
					"valueRef": null,
					"tags": null,
					"detailsBase": null
				},
				"enable": true,
				"price": 300
			},
			{
				"yDetail": {
					"id": "3700D568353E80220F72026A0E133CE0",
					"oi": null,
					"version": 0,
					"type": "COR",
					"subType": null,
					"description": "Pérola",
					"value": "Pérola",
					"valueRef": "#FEFFDD",
					"tags": null,
					"detailsBase": null
				},
				"xDetail": {
					"id": "3700D774B1BCE0D33F7C026A0E133CE0",
					"oi": null,
					"version": 0,
					"type": "TAMANHO",
					"subType": null,
					"description": "TAMANHO (34-46)",
					"value": "34",
					"valueRef": null,
					"tags": null,
					"detailsBase": null
				},
				"enable": true,
				"price": 300
			},
			{
				"yDetail": {
					"id": "3700D5682734C0267582026A0E133CE0",
					"oi": null,
					"version": 0,
					"type": "COR",
					"subType": null,
					"description": "Única",
					"value": "Única",
					"valueRef": null,
					"tags": null,
					"detailsBase": null
				},
				"xDetail": {
					"id": "3700D774B1BCE0D33F7C026A0E133CE0",
					"oi": null,
					"version": 0,
					"type": "TAMANHO",
					"subType": null,
					"description": "TAMANHO (34-46)",
					"value": "34",
					"valueRef": null,
					"tags": null,
					"detailsBase": null
				},
				"enable": true,
				"price": 300
			},
			{
				"yDetail": {
					"id": "3700D568316DF038D765026A0E133CE0",
					"oi": null,
					"version": 0,
					"type": "COR",
					"subType": null,
					"description": "Ocre",
					"value": "Ocre",
					"valueRef": "#cc7722",
					"tags": null,
					"detailsBase": null
				},
				"xDetail": {
					"id": "3700D77F358A704824F4026A0E133CE0",
					"oi": null,
					"version": 0,
					"type": "TAMANHO",
					"subType": null,
					"description": "TAMANHO (SAPATOS)",
					"value": "35",
					"valueRef": null,
					"tags": null,
					"detailsBase": null
				},
				"enable": true,
				"price": 300
			},
			{
				"yDetail": {
					"id": "3700D56833DEF06C4C4A026A0E133CE0",
					"oi": null,
					"version": 0,
					"type": "COR",
					"subType": null,
					"description": "Couro",
					"value": "Couro",
					"valueRef": null,
					"tags": null,
					"detailsBase": null
				},
				"xDetail": {
					"id": "3700D77F358A704824F4026A0E133CE0",
					"oi": null,
					"version": 0,
					"type": "TAMANHO",
					"subType": null,
					"description": "TAMANHO (SAPATOS)",
					"value": "35",
					"valueRef": null,
					"tags": null,
					"detailsBase": null
				},
				"enable": true,
				"price": 300
			},
			{
				"yDetail": {
					"id": "3700D568353E80220F72026A0E133CE0",
					"oi": null,
					"version": 0,
					"type": "COR",
					"subType": null,
					"description": "Pérola",
					"value": "Pérola",
					"valueRef": "#FEFFDD",
					"tags": null,
					"detailsBase": null
				},
				"xDetail": {
					"id": "3700D77F358A704824F4026A0E133CE0",
					"oi": null,
					"version": 0,
					"type": "TAMANHO",
					"subType": null,
					"description": "TAMANHO (SAPATOS)",
					"value": "35",
					"valueRef": null,
					"tags": null,
					"detailsBase": null
				},
				"enable": true,
				"price": 300
			},
			{
				"yDetail": {
					"id": "3700D5682734C0267582026A0E133CE0",
					"oi": null,
					"version": 0,
					"type": "COR",
					"subType": null,
					"description": "Única",
					"value": "Única",
					"valueRef": null,
					"tags": null,
					"detailsBase": null
				},
				"xDetail": {
					"id": "3700D77F358A704824F4026A0E133CE0",
					"oi": null,
					"version": 0,
					"type": "TAMANHO",
					"subType": null,
					"description": "TAMANHO (SAPATOS)",
					"value": "35",
					"valueRef": null,
					"tags": null,
					"detailsBase": null
				},
				"enable": true,
				"price": 300
			},
			{
				"yDetail": {
					"id": "3700D568316DF038D765026A0E133CE0",
					"oi": null,
					"version": 0,
					"type": "COR",
					"subType": null,
					"description": "Ocre",
					"value": "Ocre",
					"valueRef": "#cc7722",
					"tags": null,
					"detailsBase": null
				},
				"xDetail": {
					"id": "3700D58C87CC30D37227026A0E133CE0",
					"oi": null,
					"version": 0,
					"type": "TAMANHO",
					"subType": null,
					"description": "Tamanho(36-56)",
					"value": "36",
					"valueRef": null,
					"tags": null,
					"detailsBase": null
				},
				"enable": true,
				"price": 300
			},
			{
				"yDetail": {
					"id": "3700D56833DEF06C4C4A026A0E133CE0",
					"oi": null,
					"version": 0,
					"type": "COR",
					"subType": null,
					"description": "Couro",
					"value": "Couro",
					"valueRef": null,
					"tags": null,
					"detailsBase": null
				},
				"xDetail": {
					"id": "3700D58C87CC30D37227026A0E133CE0",
					"oi": null,
					"version": 0,
					"type": "TAMANHO",
					"subType": null,
					"description": "Tamanho(36-56)",
					"value": "36",
					"valueRef": null,
					"tags": null,
					"detailsBase": null
				},
				"enable": true,
				"price": 300
			},
			{
				"yDetail": {
					"id": "3700D568353E80220F72026A0E133CE0",
					"oi": null,
					"version": 0,
					"type": "COR",
					"subType": null,
					"description": "Pérola",
					"value": "Pérola",
					"valueRef": "#FEFFDD",
					"tags": null,
					"detailsBase": null
				},
				"xDetail": {
					"id": "3700D58C87CC30D37227026A0E133CE0",
					"oi": null,
					"version": 0,
					"type": "TAMANHO",
					"subType": null,
					"description": "Tamanho(36-56)",
					"value": "36",
					"valueRef": null,
					"tags": null,
					"detailsBase": null
				},
				"enable": true,
				"price": 300
			},
			{
				"yDetail": {
					"id": "3700D5682734C0267582026A0E133CE0",
					"oi": null,
					"version": 0,
					"type": "COR",
					"subType": null,
					"description": "Única",
					"value": "Única",
					"valueRef": null,
					"tags": null,
					"detailsBase": null
				},
				"xDetail": {
					"id": "3700D58C87CC30D37227026A0E133CE0",
					"oi": null,
					"version": 0,
					"type": "TAMANHO",
					"subType": null,
					"description": "Tamanho(36-56)",
					"value": "36",
					"valueRef": null,
					"tags": null,
					"detailsBase": null
				},
				"enable": true,
				"price": 300
			},
			{
				"yDetail": {
					"id": "3700D568316DF038D765026A0E133CE0",
					"oi": null,
					"version": 0,
					"type": "COR",
					"subType": null,
					"description": "Ocre",
					"value": "Ocre",
					"valueRef": "#cc7722",
					"tags": null,
					"detailsBase": null
				},
				"xDetail": {
					"id": "3700D77F32CB5078A501026A0E133CE0",
					"oi": null,
					"version": 0,
					"type": "TAMANHO",
					"subType": null,
					"description": "TAMANHO (SAPATOS)",
					"value": "37",
					"valueRef": null,
					"tags": null,
					"detailsBase": null
				},
				"enable": true,
				"price": 300
			},
			{
				"yDetail": {
					"id": "3700D56833DEF06C4C4A026A0E133CE0",
					"oi": null,
					"version": 0,
					"type": "COR",
					"subType": null,
					"description": "Couro",
					"value": "Couro",
					"valueRef": null,
					"tags": null,
					"detailsBase": null
				},
				"xDetail": {
					"id": "3700D77F32CB5078A501026A0E133CE0",
					"oi": null,
					"version": 0,
					"type": "TAMANHO",
					"subType": null,
					"description": "TAMANHO (SAPATOS)",
					"value": "37",
					"valueRef": null,
					"tags": null,
					"detailsBase": null
				},
				"enable": true,
				"price": 300
			},
			{
				"yDetail": {
					"id": "3700D568353E80220F72026A0E133CE0",
					"oi": null,
					"version": 0,
					"type": "COR",
					"subType": null,
					"description": "Pérola",
					"value": "Pérola",
					"valueRef": "#FEFFDD",
					"tags": null,
					"detailsBase": null
				},
				"xDetail": {
					"id": "3700D77F32CB5078A501026A0E133CE0",
					"oi": null,
					"version": 0,
					"type": "TAMANHO",
					"subType": null,
					"description": "TAMANHO (SAPATOS)",
					"value": "37",
					"valueRef": null,
					"tags": null,
					"detailsBase": null
				},
				"enable": true,
				"price": 300
			},
			{
				"yDetail": {
					"id": "3700D5682734C0267582026A0E133CE0",
					"oi": null,
					"version": 0,
					"type": "COR",
					"subType": null,
					"description": "Única",
					"value": "Única",
					"valueRef": null,
					"tags": null,
					"detailsBase": null
				},
				"xDetail": {
					"id": "3700D77F32CB5078A501026A0E133CE0",
					"oi": null,
					"version": 0,
					"type": "TAMANHO",
					"subType": null,
					"description": "TAMANHO (SAPATOS)",
					"value": "37",
					"valueRef": null,
					"tags": null,
					"detailsBase": null
				},
				"enable": true,
				"price": 300
			},
			{
				"yDetail": {
					"id": "3700D568316DF038D765026A0E133CE0",
					"oi": null,
					"version": 0,
					"type": "COR",
					"subType": null,
					"description": "Ocre",
					"value": "Ocre",
					"valueRef": "#cc7722",
					"tags": null,
					"detailsBase": null
				},
				"xDetail": {
					"id": "3700D58C7D1DD01584D7026A0E133CE0",
					"oi": null,
					"version": 0,
					"type": "TAMANHO",
					"subType": null,
					"description": "Tamanho(36-56)",
					"value": "38",
					"valueRef": null,
					"tags": null,
					"detailsBase": null
				},
				"enable": true,
				"price": 300
			},
			{
				"yDetail": {
					"id": "3700D56833DEF06C4C4A026A0E133CE0",
					"oi": null,
					"version": 0,
					"type": "COR",
					"subType": null,
					"description": "Couro",
					"value": "Couro",
					"valueRef": null,
					"tags": null,
					"detailsBase": null
				},
				"xDetail": {
					"id": "3700D58C7D1DD01584D7026A0E133CE0",
					"oi": null,
					"version": 0,
					"type": "TAMANHO",
					"subType": null,
					"description": "Tamanho(36-56)",
					"value": "38",
					"valueRef": null,
					"tags": null,
					"detailsBase": null
				},
				"enable": true,
				"price": 300
			},
			{
				"yDetail": {
					"id": "3700D568353E80220F72026A0E133CE0",
					"oi": null,
					"version": 0,
					"type": "COR",
					"subType": null,
					"description": "Pérola",
					"value": "Pérola",
					"valueRef": "#FEFFDD",
					"tags": null,
					"detailsBase": null
				},
				"xDetail": {
					"id": "3700D58C7D1DD01584D7026A0E133CE0",
					"oi": null,
					"version": 0,
					"type": "TAMANHO",
					"subType": null,
					"description": "Tamanho(36-56)",
					"value": "38",
					"valueRef": null,
					"tags": null,
					"detailsBase": null
				},
				"enable": true,
				"price": 300
			},
			{
				"yDetail": {
					"id": "3700D5682734C0267582026A0E133CE0",
					"oi": null,
					"version": 0,
					"type": "COR",
					"subType": null,
					"description": "Única",
					"value": "Única",
					"valueRef": null,
					"tags": null,
					"detailsBase": null
				},
				"xDetail": {
					"id": "3700D58C7D1DD01584D7026A0E133CE0",
					"oi": null,
					"version": 0,
					"type": "TAMANHO",
					"subType": null,
					"description": "Tamanho(36-56)",
					"value": "38",
					"valueRef": null,
					"tags": null,
					"detailsBase": null
				},
				"enable": true,
				"price": 300
			},
			{
				"yDetail": {
					"id": "3700D568316DF038D765026A0E133CE0",
					"oi": null,
					"version": 0,
					"type": "COR",
					"subType": null,
					"description": "Ocre",
					"value": "Ocre",
					"valueRef": "#cc7722",
					"tags": null,
					"detailsBase": null
				},
				"xDetail": {
					"id": "3700D77F2F6FF02D3135026A0E133CE0",
					"oi": null,
					"version": 0,
					"type": "TAMANHO",
					"subType": null,
					"description": "TAMANHO (SAPATOS)",
					"value": "39",
					"valueRef": null,
					"tags": null,
					"detailsBase": null
				},
				"enable": true,
				"price": 300
			},
			{
				"yDetail": {
					"id": "3700D56833DEF06C4C4A026A0E133CE0",
					"oi": null,
					"version": 0,
					"type": "COR",
					"subType": null,
					"description": "Couro",
					"value": "Couro",
					"valueRef": null,
					"tags": null,
					"detailsBase": null
				},
				"xDetail": {
					"id": "3700D77F2F6FF02D3135026A0E133CE0",
					"oi": null,
					"version": 0,
					"type": "TAMANHO",
					"subType": null,
					"description": "TAMANHO (SAPATOS)",
					"value": "39",
					"valueRef": null,
					"tags": null,
					"detailsBase": null
				},
				"enable": true,
				"price": 300
			},
			{
				"yDetail": {
					"id": "3700D568353E80220F72026A0E133CE0",
					"oi": null,
					"version": 0,
					"type": "COR",
					"subType": null,
					"description": "Pérola",
					"value": "Pérola",
					"valueRef": "#FEFFDD",
					"tags": null,
					"detailsBase": null
				},
				"xDetail": {
					"id": "3700D77F2F6FF02D3135026A0E133CE0",
					"oi": null,
					"version": 0,
					"type": "TAMANHO",
					"subType": null,
					"description": "TAMANHO (SAPATOS)",
					"value": "39",
					"valueRef": null,
					"tags": null,
					"detailsBase": null
				},
				"enable": true,
				"price": 300
			},
			{
				"yDetail": {
					"id": "3700D5682734C0267582026A0E133CE0",
					"oi": null,
					"version": 0,
					"type": "COR",
					"subType": null,
					"description": "Única",
					"value": "Única",
					"valueRef": null,
					"tags": null,
					"detailsBase": null
				},
				"xDetail": {
					"id": "3700D77F2F6FF02D3135026A0E133CE0",
					"oi": null,
					"version": 0,
					"type": "TAMANHO",
					"subType": null,
					"description": "TAMANHO (SAPATOS)",
					"value": "39",
					"valueRef": null,
					"tags": null,
					"detailsBase": null
				},
				"enable": true,
				"price": 300
			},
			{
				"yDetail": {
					"id": "3700D568316DF038D765026A0E133CE0",
					"oi": null,
					"version": 0,
					"type": "COR",
					"subType": null,
					"description": "Ocre",
					"value": "Ocre",
					"valueRef": "#cc7722",
					"tags": null,
					"detailsBase": null
				},
				"xDetail": {
					"id": "3700D58A516430F9160B026A0E133CE0",
					"oi": null,
					"version": 0,
					"type": "TAMANHO",
					"subType": null,
					"description": "Tamanho(36-56)",
					"value": "40",
					"valueRef": null,
					"tags": null,
					"detailsBase": null
				},
				"enable": true,
				"price": 300
			},
			{
				"yDetail": {
					"id": "3700D56833DEF06C4C4A026A0E133CE0",
					"oi": null,
					"version": 0,
					"type": "COR",
					"subType": null,
					"description": "Couro",
					"value": "Couro",
					"valueRef": null,
					"tags": null,
					"detailsBase": null
				},
				"xDetail": {
					"id": "3700D58A516430F9160B026A0E133CE0",
					"oi": null,
					"version": 0,
					"type": "TAMANHO",
					"subType": null,
					"description": "Tamanho(36-56)",
					"value": "40",
					"valueRef": null,
					"tags": null,
					"detailsBase": null
				},
				"enable": true,
				"price": 300
			},
			{
				"yDetail": {
					"id": "3700D568353E80220F72026A0E133CE0",
					"oi": null,
					"version": 0,
					"type": "COR",
					"subType": null,
					"description": "Pérola",
					"value": "Pérola",
					"valueRef": "#FEFFDD",
					"tags": null,
					"detailsBase": null
				},
				"xDetail": {
					"id": "3700D58A516430F9160B026A0E133CE0",
					"oi": null,
					"version": 0,
					"type": "TAMANHO",
					"subType": null,
					"description": "Tamanho(36-56)",
					"value": "40",
					"valueRef": null,
					"tags": null,
					"detailsBase": null
				},
				"enable": true,
				"price": 300
			},
			{
				"yDetail": {
					"id": "3700D5682734C0267582026A0E133CE0",
					"oi": null,
					"version": 0,
					"type": "COR",
					"subType": null,
					"description": "Única",
					"value": "Única",
					"valueRef": null,
					"tags": null,
					"detailsBase": null
				},
				"xDetail": {
					"id": "3700D58A516430F9160B026A0E133CE0",
					"oi": null,
					"version": 0,
					"type": "TAMANHO",
					"subType": null,
					"description": "Tamanho(36-56)",
					"value": "40",
					"valueRef": null,
					"tags": null,
					"detailsBase": null
				},
				"enable": true,
				"price": 300
			},
			{
				"yDetail": {
					"id": "3700D568316DF038D765026A0E133CE0",
					"oi": null,
					"version": 0,
					"type": "COR",
					"subType": null,
					"description": "Ocre",
					"value": "Ocre",
					"valueRef": "#cc7722",
					"tags": null,
					"detailsBase": null
				},
				"xDetail": {
					"id": "3700D58FE06D109D3A21026A0E133CE0",
					"oi": null,
					"version": 0,
					"type": "TAMANHO",
					"subType": null,
					"description": "Tamanho(36-56)",
					"value": "42",
					"valueRef": null,
					"tags": null,
					"detailsBase": null
				},
				"enable": true,
				"price": 300
			},
			{
				"yDetail": {
					"id": "3700D56833DEF06C4C4A026A0E133CE0",
					"oi": null,
					"version": 0,
					"type": "COR",
					"subType": null,
					"description": "Couro",
					"value": "Couro",
					"valueRef": null,
					"tags": null,
					"detailsBase": null
				},
				"xDetail": {
					"id": "3700D58FE06D109D3A21026A0E133CE0",
					"oi": null,
					"version": 0,
					"type": "TAMANHO",
					"subType": null,
					"description": "Tamanho(36-56)",
					"value": "42",
					"valueRef": null,
					"tags": null,
					"detailsBase": null
				},
				"enable": true,
				"price": 300
			},
			{
				"yDetail": {
					"id": "3700D568353E80220F72026A0E133CE0",
					"oi": null,
					"version": 0,
					"type": "COR",
					"subType": null,
					"description": "Pérola",
					"value": "Pérola",
					"valueRef": "#FEFFDD",
					"tags": null,
					"detailsBase": null
				},
				"xDetail": {
					"id": "3700D58FE06D109D3A21026A0E133CE0",
					"oi": null,
					"version": 0,
					"type": "TAMANHO",
					"subType": null,
					"description": "Tamanho(36-56)",
					"value": "42",
					"valueRef": null,
					"tags": null,
					"detailsBase": null
				},
				"enable": true,
				"price": 300
			},
			{
				"yDetail": {
					"id": "3700D5682734C0267582026A0E133CE0",
					"oi": null,
					"version": 0,
					"type": "COR",
					"subType": null,
					"description": "Única",
					"value": "Única",
					"valueRef": null,
					"tags": null,
					"detailsBase": null
				},
				"xDetail": {
					"id": "3700D58FE06D109D3A21026A0E133CE0",
					"oi": null,
					"version": 0,
					"type": "TAMANHO",
					"subType": null,
					"description": "Tamanho(36-56)",
					"value": "42",
					"valueRef": null,
					"tags": null,
					"detailsBase": null
				},
				"enable": true,
				"price": 300
			},
			{
				"yDetail": {
					"id": "3700D568316DF038D765026A0E133CE0",
					"oi": null,
					"version": 0,
					"type": "COR",
					"subType": null,
					"description": "Ocre",
					"value": "Ocre",
					"valueRef": "#cc7722",
					"tags": null,
					"detailsBase": null
				},
				"xDetail": {
					"id": "3700D58A6E13F0E5A26D026A0E133CE0",
					"oi": null,
					"version": 0,
					"type": "TAMANHO",
					"subType": null,
					"description": "Tamanho(36-56)",
					"value": "44",
					"valueRef": null,
					"tags": null,
					"detailsBase": null
				},
				"enable": true,
				"price": 300
			},
			{
				"yDetail": {
					"id": "3700D56833DEF06C4C4A026A0E133CE0",
					"oi": null,
					"version": 0,
					"type": "COR",
					"subType": null,
					"description": "Couro",
					"value": "Couro",
					"valueRef": null,
					"tags": null,
					"detailsBase": null
				},
				"xDetail": {
					"id": "3700D58A6E13F0E5A26D026A0E133CE0",
					"oi": null,
					"version": 0,
					"type": "TAMANHO",
					"subType": null,
					"description": "Tamanho(36-56)",
					"value": "44",
					"valueRef": null,
					"tags": null,
					"detailsBase": null
				},
				"enable": true,
				"price": 300
			},
			{
				"yDetail": {
					"id": "3700D568353E80220F72026A0E133CE0",
					"oi": null,
					"version": 0,
					"type": "COR",
					"subType": null,
					"description": "Pérola",
					"value": "Pérola",
					"valueRef": "#FEFFDD",
					"tags": null,
					"detailsBase": null
				},
				"xDetail": {
					"id": "3700D58A6E13F0E5A26D026A0E133CE0",
					"oi": null,
					"version": 0,
					"type": "TAMANHO",
					"subType": null,
					"description": "Tamanho(36-56)",
					"value": "44",
					"valueRef": null,
					"tags": null,
					"detailsBase": null
				},
				"enable": true,
				"price": 300
			},
			{
				"yDetail": {
					"id": "3700D5682734C0267582026A0E133CE0",
					"oi": null,
					"version": 0,
					"type": "COR",
					"subType": null,
					"description": "Única",
					"value": "Única",
					"valueRef": null,
					"tags": null,
					"detailsBase": null
				},
				"xDetail": {
					"id": "3700D58A6E13F0E5A26D026A0E133CE0",
					"oi": null,
					"version": 0,
					"type": "TAMANHO",
					"subType": null,
					"description": "Tamanho(36-56)",
					"value": "44",
					"valueRef": null,
					"tags": null,
					"detailsBase": null
				},
				"enable": true,
				"price": 300
			},
			{
				"yDetail": {
					"id": "3700D5683824B0CAFC88026A0E133CE0",
					"oi": null,
					"version": 0,
					"type": "COR",
					"subType": null,
					"description": "Vermelho",
					"value": "Vermelho",
					"valueRef": "#FF0000",
					"tags": null,
					"detailsBase": null
				},
				"xDetail": {
					"id": "3700D589F4C540099D03026A0E133CE0",
					"oi": null,
					"version": 0,
					"type": "TAMANHO",
					"subType": null,
					"description": "Tamanho(UN-G5)",
					"value": "PP",
					"valueRef": null,
					"tags": null,
					"detailsBase": null
				},
				"enable": true,
				"price": 300
			},
			{
				"yDetail": {
					"id": "3700D5683A4790112BE7026A0E133CE0",
					"oi": null,
					"version": 0,
					"type": "COR",
					"subType": null,
					"description": "Champagne",
					"value": "Champagne",
					"valueRef": "#C0C0AC",
					"tags": null,
					"detailsBase": null
				},
				"xDetail": {
					"id": "3700D589F4C540099D03026A0E133CE0",
					"oi": null,
					"version": 0,
					"type": "TAMANHO",
					"subType": null,
					"description": "Tamanho(UN-G5)",
					"value": "PP",
					"valueRef": null,
					"tags": null,
					"detailsBase": null
				},
				"enable": true,
				"price": 300
			},
			{
				"yDetail": {
					"id": "3700D56836EC30B80037026A0E133CE0",
					"oi": null,
					"version": 0,
					"type": "COR",
					"subType": null,
					"description": "Amarelo",
					"value": "Amarelo",
					"valueRef": "#FFFF00",
					"tags": null,
					"detailsBase": null
				},
				"xDetail": {
					"id": "3700D589F4C540099D03026A0E133CE0",
					"oi": null,
					"version": 0,
					"type": "TAMANHO",
					"subType": null,
					"description": "Tamanho(UN-G5)",
					"value": "PP",
					"valueRef": null,
					"tags": null,
					"detailsBase": null
				},
				"enable": true,
				"price": 300
			},
			{
				"yDetail": {
					"id": "3700D5683B59003C6B8E026A0E133CE0",
					"oi": null,
					"version": 0,
					"type": "COR",
					"subType": null,
					"description": "Azul navy",
					"value": "Azul navy",
					"valueRef": "#2C385D",
					"tags": null,
					"detailsBase": null
				},
				"xDetail": {
					"id": "3700D589F4C540099D03026A0E133CE0",
					"oi": null,
					"version": 0,
					"type": "TAMANHO",
					"subType": null,
					"description": "Tamanho(UN-G5)",
					"value": "PP",
					"valueRef": null,
					"tags": null,
					"detailsBase": null
				},
				"enable": true,
				"price": 300
			},
			{
				"yDetail": {
					"id": "3700D5683824B0CAFC88026A0E133CE0",
					"oi": null,
					"version": 0,
					"type": "COR",
					"subType": null,
					"description": "Vermelho",
					"value": "Vermelho",
					"valueRef": "#FF0000",
					"tags": null,
					"detailsBase": null
				},
				"xDetail": {
					"id": "3700D57DA6BF00009C54026A0E133CE0",
					"oi": null,
					"version": 0,
					"type": "TAMANHO",
					"subType": null,
					"description": "Tamanho(UN-G5)",
					"value": "P",
					"valueRef": null,
					"tags": null,
					"detailsBase": null
				},
				"enable": true,
				"price": 300
			},
			{
				"yDetail": {
					"id": "3700D5683A4790112BE7026A0E133CE0",
					"oi": null,
					"version": 0,
					"type": "COR",
					"subType": null,
					"description": "Champagne",
					"value": "Champagne",
					"valueRef": "#C0C0AC",
					"tags": null,
					"detailsBase": null
				},
				"xDetail": {
					"id": "3700D57DA6BF00009C54026A0E133CE0",
					"oi": null,
					"version": 0,
					"type": "TAMANHO",
					"subType": null,
					"description": "Tamanho(UN-G5)",
					"value": "P",
					"valueRef": null,
					"tags": null,
					"detailsBase": null
				},
				"enable": true,
				"price": 300
			},
			{
				"yDetail": {
					"id": "3700D56836EC30B80037026A0E133CE0",
					"oi": null,
					"version": 0,
					"type": "COR",
					"subType": null,
					"description": "Amarelo",
					"value": "Amarelo",
					"valueRef": "#FFFF00",
					"tags": null,
					"detailsBase": null
				},
				"xDetail": {
					"id": "3700D57DA6BF00009C54026A0E133CE0",
					"oi": null,
					"version": 0,
					"type": "TAMANHO",
					"subType": null,
					"description": "Tamanho(UN-G5)",
					"value": "P",
					"valueRef": null,
					"tags": null,
					"detailsBase": null
				},
				"enable": true,
				"price": 300
			},
			{
				"yDetail": {
					"id": "3700D5683B59003C6B8E026A0E133CE0",
					"oi": null,
					"version": 0,
					"type": "COR",
					"subType": null,
					"description": "Azul navy",
					"value": "Azul navy",
					"valueRef": "#2C385D",
					"tags": null,
					"detailsBase": null
				},
				"xDetail": {
					"id": "3700D57DA6BF00009C54026A0E133CE0",
					"oi": null,
					"version": 0,
					"type": "TAMANHO",
					"subType": null,
					"description": "Tamanho(UN-G5)",
					"value": "P",
					"valueRef": null,
					"tags": null,
					"detailsBase": null
				},
				"enable": true,
				"price": 300
			},
			{
				"yDetail": {
					"id": "3700D5683824B0CAFC88026A0E133CE0",
					"oi": null,
					"version": 0,
					"type": "COR",
					"subType": null,
					"description": "Vermelho",
					"value": "Vermelho",
					"valueRef": "#FF0000",
					"tags": null,
					"detailsBase": null
				},
				"xDetail": {
					"id": "3700D57D7C2C90EE3F71026A0E133CE0",
					"oi": null,
					"version": 0,
					"type": "TAMANHO",
					"subType": null,
					"description": "Tamanho(UN-G5)",
					"value": "M",
					"valueRef": null,
					"tags": null,
					"detailsBase": null
				},
				"enable": true,
				"price": 300
			},
			{
				"yDetail": {
					"id": "3700D5683A4790112BE7026A0E133CE0",
					"oi": null,
					"version": 0,
					"type": "COR",
					"subType": null,
					"description": "Champagne",
					"value": "Champagne",
					"valueRef": "#C0C0AC",
					"tags": null,
					"detailsBase": null
				},
				"xDetail": {
					"id": "3700D57D7C2C90EE3F71026A0E133CE0",
					"oi": null,
					"version": 0,
					"type": "TAMANHO",
					"subType": null,
					"description": "Tamanho(UN-G5)",
					"value": "M",
					"valueRef": null,
					"tags": null,
					"detailsBase": null
				},
				"enable": true,
				"price": 300
			},
			{
				"yDetail": {
					"id": "3700D56836EC30B80037026A0E133CE0",
					"oi": null,
					"version": 0,
					"type": "COR",
					"subType": null,
					"description": "Amarelo",
					"value": "Amarelo",
					"valueRef": "#FFFF00",
					"tags": null,
					"detailsBase": null
				},
				"xDetail": {
					"id": "3700D57D7C2C90EE3F71026A0E133CE0",
					"oi": null,
					"version": 0,
					"type": "TAMANHO",
					"subType": null,
					"description": "Tamanho(UN-G5)",
					"value": "M",
					"valueRef": null,
					"tags": null,
					"detailsBase": null
				},
				"enable": true,
				"price": 300
			},
			{
				"yDetail": {
					"id": "3700D5683B59003C6B8E026A0E133CE0",
					"oi": null,
					"version": 0,
					"type": "COR",
					"subType": null,
					"description": "Azul navy",
					"value": "Azul navy",
					"valueRef": "#2C385D",
					"tags": null,
					"detailsBase": null
				},
				"xDetail": {
					"id": "3700D57D7C2C90EE3F71026A0E133CE0",
					"oi": null,
					"version": 0,
					"type": "TAMANHO",
					"subType": null,
					"description": "Tamanho(UN-G5)",
					"value": "M",
					"valueRef": null,
					"tags": null,
					"detailsBase": null
				},
				"enable": true,
				"price": 300
			},
			{
				"yDetail": {
					"id": "3700D5683824B0CAFC88026A0E133CE0",
					"oi": null,
					"version": 0,
					"type": "COR",
					"subType": null,
					"description": "Vermelho",
					"value": "Vermelho",
					"valueRef": "#FF0000",
					"tags": null,
					"detailsBase": null
				},
				"xDetail": {
					"id": "3700D57DADEAF0EBC693026A0E133CE0",
					"oi": null,
					"version": 0,
					"type": "TAMANHO",
					"subType": null,
					"description": "Tamanho(UN-G5)",
					"value": "G",
					"valueRef": null,
					"tags": null,
					"detailsBase": null
				},
				"enable": true,
				"price": 300
			},
			{
				"yDetail": {
					"id": "3700D5683A4790112BE7026A0E133CE0",
					"oi": null,
					"version": 0,
					"type": "COR",
					"subType": null,
					"description": "Champagne",
					"value": "Champagne",
					"valueRef": "#C0C0AC",
					"tags": null,
					"detailsBase": null
				},
				"xDetail": {
					"id": "3700D57DADEAF0EBC693026A0E133CE0",
					"oi": null,
					"version": 0,
					"type": "TAMANHO",
					"subType": null,
					"description": "Tamanho(UN-G5)",
					"value": "G",
					"valueRef": null,
					"tags": null,
					"detailsBase": null
				},
				"enable": true,
				"price": 300
			},
			{
				"yDetail": {
					"id": "3700D56836EC30B80037026A0E133CE0",
					"oi": null,
					"version": 0,
					"type": "COR",
					"subType": null,
					"description": "Amarelo",
					"value": "Amarelo",
					"valueRef": "#FFFF00",
					"tags": null,
					"detailsBase": null
				},
				"xDetail": {
					"id": "3700D57DADEAF0EBC693026A0E133CE0",
					"oi": null,
					"version": 0,
					"type": "TAMANHO",
					"subType": null,
					"description": "Tamanho(UN-G5)",
					"value": "G",
					"valueRef": null,
					"tags": null,
					"detailsBase": null
				},
				"enable": true,
				"price": 300
			},
			{
				"yDetail": {
					"id": "3700D5683B59003C6B8E026A0E133CE0",
					"oi": null,
					"version": 0,
					"type": "COR",
					"subType": null,
					"description": "Azul navy",
					"value": "Azul navy",
					"valueRef": "#2C385D",
					"tags": null,
					"detailsBase": null
				},
				"xDetail": {
					"id": "3700D57DADEAF0EBC693026A0E133CE0",
					"oi": null,
					"version": 0,
					"type": "TAMANHO",
					"subType": null,
					"description": "Tamanho(UN-G5)",
					"value": "G",
					"valueRef": null,
					"tags": null,
					"detailsBase": null
				},
				"enable": true,
				"price": 300
			},
			{
				"yDetail": {
					"id": "3700D5683824B0CAFC88026A0E133CE0",
					"oi": null,
					"version": 0,
					"type": "COR",
					"subType": null,
					"description": "Vermelho",
					"value": "Vermelho",
					"valueRef": "#FF0000",
					"tags": null,
					"detailsBase": null
				},
				"xDetail": {
					"id": "3700D57FD1673013431F026A0E133CE0",
					"oi": null,
					"version": 0,
					"type": "TAMANHO",
					"subType": null,
					"description": "Tamanho(UN-G5)",
					"value": "GG",
					"valueRef": null,
					"tags": null,
					"detailsBase": null
				},
				"enable": true,
				"price": 300
			},
			{
				"yDetail": {
					"id": "3700D5683A4790112BE7026A0E133CE0",
					"oi": null,
					"version": 0,
					"type": "COR",
					"subType": null,
					"description": "Champagne",
					"value": "Champagne",
					"valueRef": "#C0C0AC",
					"tags": null,
					"detailsBase": null
				},
				"xDetail": {
					"id": "3700D57FD1673013431F026A0E133CE0",
					"oi": null,
					"version": 0,
					"type": "TAMANHO",
					"subType": null,
					"description": "Tamanho(UN-G5)",
					"value": "GG",
					"valueRef": null,
					"tags": null,
					"detailsBase": null
				},
				"enable": true,
				"price": 300
			},
			{
				"yDetail": {
					"id": "3700D56836EC30B80037026A0E133CE0",
					"oi": null,
					"version": 0,
					"type": "COR",
					"subType": null,
					"description": "Amarelo",
					"value": "Amarelo",
					"valueRef": "#FFFF00",
					"tags": null,
					"detailsBase": null
				},
				"xDetail": {
					"id": "3700D57FD1673013431F026A0E133CE0",
					"oi": null,
					"version": 0,
					"type": "TAMANHO",
					"subType": null,
					"description": "Tamanho(UN-G5)",
					"value": "GG",
					"valueRef": null,
					"tags": null,
					"detailsBase": null
				},
				"enable": true,
				"price": 300
			},
			{
				"yDetail": {
					"id": "3700D5683B59003C6B8E026A0E133CE0",
					"oi": null,
					"version": 0,
					"type": "COR",
					"subType": null,
					"description": "Azul navy",
					"value": "Azul navy",
					"valueRef": "#2C385D",
					"tags": null,
					"detailsBase": null
				},
				"xDetail": {
					"id": "3700D57FD1673013431F026A0E133CE0",
					"oi": null,
					"version": 0,
					"type": "TAMANHO",
					"subType": null,
					"description": "Tamanho(UN-G5)",
					"value": "GG",
					"valueRef": null,
					"tags": null,
					"detailsBase": null
				},
				"enable": true,
				"price": 300
			},
			{
				"yDetail": {
					"id": "3700D5683824B0CAFC88026A0E133CE0",
					"oi": null,
					"version": 0,
					"type": "COR",
					"subType": null,
					"description": "Vermelho",
					"value": "Vermelho",
					"valueRef": "#FF0000",
					"tags": null,
					"detailsBase": null
				},
				"xDetail": {
					"id": "3700D58EA2E40006908B026A0E133CE0",
					"oi": null,
					"version": 0,
					"type": "TAMANHO",
					"subType": null,
					"description": "Tamanho(UN-G5)",
					"value": "XG",
					"valueRef": null,
					"tags": null,
					"detailsBase": null
				},
				"enable": true,
				"price": 300
			},
			{
				"yDetail": {
					"id": "3700D5683A4790112BE7026A0E133CE0",
					"oi": null,
					"version": 0,
					"type": "COR",
					"subType": null,
					"description": "Champagne",
					"value": "Champagne",
					"valueRef": "#C0C0AC",
					"tags": null,
					"detailsBase": null
				},
				"xDetail": {
					"id": "3700D58EA2E40006908B026A0E133CE0",
					"oi": null,
					"version": 0,
					"type": "TAMANHO",
					"subType": null,
					"description": "Tamanho(UN-G5)",
					"value": "XG",
					"valueRef": null,
					"tags": null,
					"detailsBase": null
				},
				"enable": true,
				"price": 300
			},
			{
				"yDetail": {
					"id": "3700D56836EC30B80037026A0E133CE0",
					"oi": null,
					"version": 0,
					"type": "COR",
					"subType": null,
					"description": "Amarelo",
					"value": "Amarelo",
					"valueRef": "#FFFF00",
					"tags": null,
					"detailsBase": null
				},
				"xDetail": {
					"id": "3700D58EA2E40006908B026A0E133CE0",
					"oi": null,
					"version": 0,
					"type": "TAMANHO",
					"subType": null,
					"description": "Tamanho(UN-G5)",
					"value": "XG",
					"valueRef": null,
					"tags": null,
					"detailsBase": null
				},
				"enable": true,
				"price": 300
			},
			{
				"yDetail": {
					"id": "3700D5683B59003C6B8E026A0E133CE0",
					"oi": null,
					"version": 0,
					"type": "COR",
					"subType": null,
					"description": "Azul navy",
					"value": "Azul navy",
					"valueRef": "#2C385D",
					"tags": null,
					"detailsBase": null
				},
				"xDetail": {
					"id": "3700D58EA2E40006908B026A0E133CE0",
					"oi": null,
					"version": 0,
					"type": "TAMANHO",
					"subType": null,
					"description": "Tamanho(UN-G5)",
					"value": "XG",
					"valueRef": null,
					"tags": null,
					"detailsBase": null
				},
				"enable": true,
				"price": 300
			},
			{
				"yDetail": {
					"id": "3700D5683824B0CAFC88026A0E133CE0",
					"oi": null,
					"version": 0,
					"type": "COR",
					"subType": null,
					"description": "Vermelho",
					"value": "Vermelho",
					"valueRef": "#FF0000",
					"tags": null,
					"detailsBase": null
				},
				"xDetail": {
					"id": "3700D58ACCD5C0AB8687026A0E133CE0",
					"oi": null,
					"version": 0,
					"type": "TAMANHO",
					"subType": null,
					"description": "Tamanho(UN-G5)",
					"value": "G1",
					"valueRef": null,
					"tags": null,
					"detailsBase": null
				},
				"enable": true,
				"price": 300
			},
			{
				"yDetail": {
					"id": "3700D5683A4790112BE7026A0E133CE0",
					"oi": null,
					"version": 0,
					"type": "COR",
					"subType": null,
					"description": "Champagne",
					"value": "Champagne",
					"valueRef": "#C0C0AC",
					"tags": null,
					"detailsBase": null
				},
				"xDetail": {
					"id": "3700D58ACCD5C0AB8687026A0E133CE0",
					"oi": null,
					"version": 0,
					"type": "TAMANHO",
					"subType": null,
					"description": "Tamanho(UN-G5)",
					"value": "G1",
					"valueRef": null,
					"tags": null,
					"detailsBase": null
				},
				"enable": true,
				"price": 300
			},
			{
				"yDetail": {
					"id": "3700D56836EC30B80037026A0E133CE0",
					"oi": null,
					"version": 0,
					"type": "COR",
					"subType": null,
					"description": "Amarelo",
					"value": "Amarelo",
					"valueRef": "#FFFF00",
					"tags": null,
					"detailsBase": null
				},
				"xDetail": {
					"id": "3700D58ACCD5C0AB8687026A0E133CE0",
					"oi": null,
					"version": 0,
					"type": "TAMANHO",
					"subType": null,
					"description": "Tamanho(UN-G5)",
					"value": "G1",
					"valueRef": null,
					"tags": null,
					"detailsBase": null
				},
				"enable": true,
				"price": 300
			},
			{
				"yDetail": {
					"id": "3700D5683B59003C6B8E026A0E133CE0",
					"oi": null,
					"version": 0,
					"type": "COR",
					"subType": null,
					"description": "Azul navy",
					"value": "Azul navy",
					"valueRef": "#2C385D",
					"tags": null,
					"detailsBase": null
				},
				"xDetail": {
					"id": "3700D58ACCD5C0AB8687026A0E133CE0",
					"oi": null,
					"version": 0,
					"type": "TAMANHO",
					"subType": null,
					"description": "Tamanho(UN-G5)",
					"value": "G1",
					"valueRef": null,
					"tags": null,
					"detailsBase": null
				},
				"enable": true,
				"price": 300
			},
			{
				"yDetail": {
					"id": "3700D5683824B0CAFC88026A0E133CE0",
					"oi": null,
					"version": 0,
					"type": "COR",
					"subType": null,
					"description": "Vermelho",
					"value": "Vermelho",
					"valueRef": "#FF0000",
					"tags": null,
					"detailsBase": null
				},
				"xDetail": {
					"id": "3700D58A28A6808C510B026A0E133CE0",
					"oi": null,
					"version": 0,
					"type": "TAMANHO",
					"subType": null,
					"description": "Tamanho(UN-G5)",
					"value": "G2",
					"valueRef": null,
					"tags": null,
					"detailsBase": null
				},
				"enable": true,
				"price": 300
			},
			{
				"yDetail": {
					"id": "3700D5683A4790112BE7026A0E133CE0",
					"oi": null,
					"version": 0,
					"type": "COR",
					"subType": null,
					"description": "Champagne",
					"value": "Champagne",
					"valueRef": "#C0C0AC",
					"tags": null,
					"detailsBase": null
				},
				"xDetail": {
					"id": "3700D58A28A6808C510B026A0E133CE0",
					"oi": null,
					"version": 0,
					"type": "TAMANHO",
					"subType": null,
					"description": "Tamanho(UN-G5)",
					"value": "G2",
					"valueRef": null,
					"tags": null,
					"detailsBase": null
				},
				"enable": true,
				"price": 300
			},
			{
				"yDetail": {
					"id": "3700D56836EC30B80037026A0E133CE0",
					"oi": null,
					"version": 0,
					"type": "COR",
					"subType": null,
					"description": "Amarelo",
					"value": "Amarelo",
					"valueRef": "#FFFF00",
					"tags": null,
					"detailsBase": null
				},
				"xDetail": {
					"id": "3700D58A28A6808C510B026A0E133CE0",
					"oi": null,
					"version": 0,
					"type": "TAMANHO",
					"subType": null,
					"description": "Tamanho(UN-G5)",
					"value": "G2",
					"valueRef": null,
					"tags": null,
					"detailsBase": null
				},
				"enable": true,
				"price": 300
			},
			{
				"yDetail": {
					"id": "3700D5683B59003C6B8E026A0E133CE0",
					"oi": null,
					"version": 0,
					"type": "COR",
					"subType": null,
					"description": "Azul navy",
					"value": "Azul navy",
					"valueRef": "#2C385D",
					"tags": null,
					"detailsBase": null
				},
				"xDetail": {
					"id": "3700D58A28A6808C510B026A0E133CE0",
					"oi": null,
					"version": 0,
					"type": "TAMANHO",
					"subType": null,
					"description": "Tamanho(UN-G5)",
					"value": "G2",
					"valueRef": null,
					"tags": null,
					"detailsBase": null
				},
				"enable": true,
				"price": 300
			},
			{
				"yDetail": {
					"id": "3700D5683824B0CAFC88026A0E133CE0",
					"oi": null,
					"version": 0,
					"type": "COR",
					"subType": null,
					"description": "Vermelho",
					"value": "Vermelho",
					"valueRef": "#FF0000",
					"tags": null,
					"detailsBase": null
				},
				"xDetail": {
					"id": "3700D58DE1B6E07B502C026A0E133CE0",
					"oi": null,
					"version": 0,
					"type": "TAMANHO",
					"subType": null,
					"description": "Tamanho(UN-G5)",
					"value": "G3",
					"valueRef": null,
					"tags": null,
					"detailsBase": null
				},
				"enable": true,
				"price": 300
			},
			{
				"yDetail": {
					"id": "3700D5683A4790112BE7026A0E133CE0",
					"oi": null,
					"version": 0,
					"type": "COR",
					"subType": null,
					"description": "Champagne",
					"value": "Champagne",
					"valueRef": "#C0C0AC",
					"tags": null,
					"detailsBase": null
				},
				"xDetail": {
					"id": "3700D58DE1B6E07B502C026A0E133CE0",
					"oi": null,
					"version": 0,
					"type": "TAMANHO",
					"subType": null,
					"description": "Tamanho(UN-G5)",
					"value": "G3",
					"valueRef": null,
					"tags": null,
					"detailsBase": null
				},
				"enable": true,
				"price": 300
			},
			{
				"yDetail": {
					"id": "3700D56836EC30B80037026A0E133CE0",
					"oi": null,
					"version": 0,
					"type": "COR",
					"subType": null,
					"description": "Amarelo",
					"value": "Amarelo",
					"valueRef": "#FFFF00",
					"tags": null,
					"detailsBase": null
				},
				"xDetail": {
					"id": "3700D58DE1B6E07B502C026A0E133CE0",
					"oi": null,
					"version": 0,
					"type": "TAMANHO",
					"subType": null,
					"description": "Tamanho(UN-G5)",
					"value": "G3",
					"valueRef": null,
					"tags": null,
					"detailsBase": null
				},
				"enable": true,
				"price": 300
			},
			{
				"yDetail": {
					"id": "3700D5683B59003C6B8E026A0E133CE0",
					"oi": null,
					"version": 0,
					"type": "COR",
					"subType": null,
					"description": "Azul navy",
					"value": "Azul navy",
					"valueRef": "#2C385D",
					"tags": null,
					"detailsBase": null
				},
				"xDetail": {
					"id": "3700D58DE1B6E07B502C026A0E133CE0",
					"oi": null,
					"version": 0,
					"type": "TAMANHO",
					"subType": null,
					"description": "Tamanho(UN-G5)",
					"value": "G3",
					"valueRef": null,
					"tags": null,
					"detailsBase": null
				},
				"enable": true,
				"price": 300
			},
			{
				"yDetail": {
					"id": "3700D5683824B0CAFC88026A0E133CE0",
					"oi": null,
					"version": 0,
					"type": "COR",
					"subType": null,
					"description": "Vermelho",
					"value": "Vermelho",
					"valueRef": "#FF0000",
					"tags": null,
					"detailsBase": null
				},
				"xDetail": {
					"id": "3700D5D1FF0030BD7AF1026A0E133CE0",
					"oi": null,
					"version": 0,
					"type": "TAMANHO",
					"subType": null,
					"description": "Tamanho(UN-G5)",
					"value": "G5",
					"valueRef": null,
					"tags": null,
					"detailsBase": null
				},
				"enable": true,
				"price": 300
			},
			{
				"yDetail": {
					"id": "3700D5683A4790112BE7026A0E133CE0",
					"oi": null,
					"version": 0,
					"type": "COR",
					"subType": null,
					"description": "Champagne",
					"value": "Champagne",
					"valueRef": "#C0C0AC",
					"tags": null,
					"detailsBase": null
				},
				"xDetail": {
					"id": "3700D5D1FF0030BD7AF1026A0E133CE0",
					"oi": null,
					"version": 0,
					"type": "TAMANHO",
					"subType": null,
					"description": "Tamanho(UN-G5)",
					"value": "G5",
					"valueRef": null,
					"tags": null,
					"detailsBase": null
				},
				"enable": true,
				"price": 300
			},
			{
				"yDetail": {
					"id": "3700D56836EC30B80037026A0E133CE0",
					"oi": null,
					"version": 0,
					"type": "COR",
					"subType": null,
					"description": "Amarelo",
					"value": "Amarelo",
					"valueRef": "#FFFF00",
					"tags": null,
					"detailsBase": null
				},
				"xDetail": {
					"id": "3700D5D1FF0030BD7AF1026A0E133CE0",
					"oi": null,
					"version": 0,
					"type": "TAMANHO",
					"subType": null,
					"description": "Tamanho(UN-G5)",
					"value": "G5",
					"valueRef": null,
					"tags": null,
					"detailsBase": null
				},
				"enable": true,
				"price": 300
			},
			{
				"yDetail": {
					"id": "3700D5683B59003C6B8E026A0E133CE0",
					"oi": null,
					"version": 0,
					"type": "COR",
					"subType": null,
					"description": "Azul navy",
					"value": "Azul navy",
					"valueRef": "#2C385D",
					"tags": null,
					"detailsBase": null
				},
				"xDetail": {
					"id": "3700D5D1FF0030BD7AF1026A0E133CE0",
					"oi": null,
					"version": 0,
					"type": "TAMANHO",
					"subType": null,
					"description": "Tamanho(UN-G5)",
					"value": "G5",
					"valueRef": null,
					"tags": null,
					"detailsBase": null
				},
				"enable": true,
				"price": 300
			},
			{
				"yDetail": {
					"id": "3700D5683824B0CAFC88026A0E133CE0",
					"oi": null,
					"version": 0,
					"type": "COR",
					"subType": null,
					"description": "Vermelho",
					"value": "Vermelho",
					"valueRef": "#FF0000",
					"tags": null,
					"detailsBase": null
				},
				"xDetail": {
					"id": "3700D57D7A09B0A3E71E026A0E133CE0",
					"oi": null,
					"version": 0,
					"type": "TAMANHO",
					"subType": null,
					"description": "Tamanho(UN-G5)",
					"value": "UN",
					"valueRef": null,
					"tags": null,
					"detailsBase": null
				},
				"enable": true,
				"price": 300
			},
			{
				"yDetail": {
					"id": "3700D5683A4790112BE7026A0E133CE0",
					"oi": null,
					"version": 0,
					"type": "COR",
					"subType": null,
					"description": "Champagne",
					"value": "Champagne",
					"valueRef": "#C0C0AC",
					"tags": null,
					"detailsBase": null
				},
				"xDetail": {
					"id": "3700D57D7A09B0A3E71E026A0E133CE0",
					"oi": null,
					"version": 0,
					"type": "TAMANHO",
					"subType": null,
					"description": "Tamanho(UN-G5)",
					"value": "UN",
					"valueRef": null,
					"tags": null,
					"detailsBase": null
				},
				"enable": true,
				"price": 300
			},
			{
				"yDetail": {
					"id": "3700D56836EC30B80037026A0E133CE0",
					"oi": null,
					"version": 0,
					"type": "COR",
					"subType": null,
					"description": "Amarelo",
					"value": "Amarelo",
					"valueRef": "#FFFF00",
					"tags": null,
					"detailsBase": null
				},
				"xDetail": {
					"id": "3700D57D7A09B0A3E71E026A0E133CE0",
					"oi": null,
					"version": 0,
					"type": "TAMANHO",
					"subType": null,
					"description": "Tamanho(UN-G5)",
					"value": "UN",
					"valueRef": null,
					"tags": null,
					"detailsBase": null
				},
				"enable": true,
				"price": 300
			},
			{
				"yDetail": {
					"id": "3700D5683B59003C6B8E026A0E133CE0",
					"oi": null,
					"version": 0,
					"type": "COR",
					"subType": null,
					"description": "Azul navy",
					"value": "Azul navy",
					"valueRef": "#2C385D",
					"tags": null,
					"detailsBase": null
				},
				"xDetail": {
					"id": "3700D57D7A09B0A3E71E026A0E133CE0",
					"oi": null,
					"version": 0,
					"type": "TAMANHO",
					"subType": null,
					"description": "Tamanho(UN-G5)",
					"value": "UN",
					"valueRef": null,
					"tags": null,
					"detailsBase": null
				},
				"enable": true,
				"price": 300
			},
			{
				"yDetail": {
					"id": "3700D5683824B0CAFC88026A0E133CE0",
					"oi": null,
					"version": 0,
					"type": "COR",
					"subType": null,
					"description": "Vermelho",
					"value": "Vermelho",
					"valueRef": "#FF0000",
					"tags": null,
					"detailsBase": null
				},
				"xDetail": {
					"id": "A81B847856AFB8F49FE0771A18054FB8",
					"oi": {
						"value": "1034.1035.1036."
					},
					"version": 0,
					"type": "TAMANHO",
					"subType": null,
					"description": null,
					"value": "4",
					"valueRef": null,
					"tags": null,
					"detailsBase": null
				},
				"enable": true,
				"price": 300
			},
			{
				"yDetail": {
					"id": "3700D5683A4790112BE7026A0E133CE0",
					"oi": null,
					"version": 0,
					"type": "COR",
					"subType": null,
					"description": "Champagne",
					"value": "Champagne",
					"valueRef": "#C0C0AC",
					"tags": null,
					"detailsBase": null
				},
				"xDetail": {
					"id": "A81B847856AFB8F49FE0771A18054FB8",
					"oi": {
						"value": "1034.1035.1036."
					},
					"version": 0,
					"type": "TAMANHO",
					"subType": null,
					"description": null,
					"value": "4",
					"valueRef": null,
					"tags": null,
					"detailsBase": null
				},
				"enable": true,
				"price": 300
			},
			{
				"yDetail": {
					"id": "3700D56836EC30B80037026A0E133CE0",
					"oi": null,
					"version": 0,
					"type": "COR",
					"subType": null,
					"description": "Amarelo",
					"value": "Amarelo",
					"valueRef": "#FFFF00",
					"tags": null,
					"detailsBase": null
				},
				"xDetail": {
					"id": "A81B847856AFB8F49FE0771A18054FB8",
					"oi": {
						"value": "1034.1035.1036."
					},
					"version": 0,
					"type": "TAMANHO",
					"subType": null,
					"description": null,
					"value": "4",
					"valueRef": null,
					"tags": null,
					"detailsBase": null
				},
				"enable": true,
				"price": 300
			},
			{
				"yDetail": {
					"id": "3700D5683B59003C6B8E026A0E133CE0",
					"oi": null,
					"version": 0,
					"type": "COR",
					"subType": null,
					"description": "Azul navy",
					"value": "Azul navy",
					"valueRef": "#2C385D",
					"tags": null,
					"detailsBase": null
				},
				"xDetail": {
					"id": "A81B847856AFB8F49FE0771A18054FB8",
					"oi": {
						"value": "1034.1035.1036."
					},
					"version": 0,
					"type": "TAMANHO",
					"subType": null,
					"description": null,
					"value": "4",
					"valueRef": null,
					"tags": null,
					"detailsBase": null
				},
				"enable": true,
				"price": 300
			},
			{
				"yDetail": {
					"id": "3700D5683824B0CAFC88026A0E133CE0",
					"oi": null,
					"version": 0,
					"type": "COR",
					"subType": null,
					"description": "Vermelho",
					"value": "Vermelho",
					"valueRef": "#FF0000",
					"tags": null,
					"detailsBase": null
				},
				"xDetail": {
					"id": "5B972F42D7A520E1B838D34C18CFE3CB",
					"oi": {
						"value": "1034.1035.1036."
					},
					"version": 0,
					"type": "TAMANHO",
					"subType": null,
					"description": null,
					"value": "6",
					"valueRef": null,
					"tags": null,
					"detailsBase": null
				},
				"enable": true,
				"price": 300
			},
			{
				"yDetail": {
					"id": "3700D5683A4790112BE7026A0E133CE0",
					"oi": null,
					"version": 0,
					"type": "COR",
					"subType": null,
					"description": "Champagne",
					"value": "Champagne",
					"valueRef": "#C0C0AC",
					"tags": null,
					"detailsBase": null
				},
				"xDetail": {
					"id": "5B972F42D7A520E1B838D34C18CFE3CB",
					"oi": {
						"value": "1034.1035.1036."
					},
					"version": 0,
					"type": "TAMANHO",
					"subType": null,
					"description": null,
					"value": "6",
					"valueRef": null,
					"tags": null,
					"detailsBase": null
				},
				"enable": true,
				"price": 300
			},
			{
				"yDetail": {
					"id": "3700D56836EC30B80037026A0E133CE0",
					"oi": null,
					"version": 0,
					"type": "COR",
					"subType": null,
					"description": "Amarelo",
					"value": "Amarelo",
					"valueRef": "#FFFF00",
					"tags": null,
					"detailsBase": null
				},
				"xDetail": {
					"id": "5B972F42D7A520E1B838D34C18CFE3CB",
					"oi": {
						"value": "1034.1035.1036."
					},
					"version": 0,
					"type": "TAMANHO",
					"subType": null,
					"description": null,
					"value": "6",
					"valueRef": null,
					"tags": null,
					"detailsBase": null
				},
				"enable": true,
				"price": 300
			},
			{
				"yDetail": {
					"id": "3700D5683B59003C6B8E026A0E133CE0",
					"oi": null,
					"version": 0,
					"type": "COR",
					"subType": null,
					"description": "Azul navy",
					"value": "Azul navy",
					"valueRef": "#2C385D",
					"tags": null,
					"detailsBase": null
				},
				"xDetail": {
					"id": "5B972F42D7A520E1B838D34C18CFE3CB",
					"oi": {
						"value": "1034.1035.1036."
					},
					"version": 0,
					"type": "TAMANHO",
					"subType": null,
					"description": null,
					"value": "6",
					"valueRef": null,
					"tags": null,
					"detailsBase": null
				},
				"enable": true,
				"price": 300
			},
			{
				"yDetail": {
					"id": "3700D5683824B0CAFC88026A0E133CE0",
					"oi": null,
					"version": 0,
					"type": "COR",
					"subType": null,
					"description": "Vermelho",
					"value": "Vermelho",
					"valueRef": "#FF0000",
					"tags": null,
					"detailsBase": null
				},
				"xDetail": {
					"id": "25BE99FD9C15AE54AAF39A89B9171CCB",
					"oi": {
						"value": "1034.1035.1036."
					},
					"version": 0,
					"type": "TAMANHO",
					"subType": null,
					"description": null,
					"value": "8",
					"valueRef": null,
					"tags": null,
					"detailsBase": null
				},
				"enable": true,
				"price": 300
			},
			{
				"yDetail": {
					"id": "3700D5683A4790112BE7026A0E133CE0",
					"oi": null,
					"version": 0,
					"type": "COR",
					"subType": null,
					"description": "Champagne",
					"value": "Champagne",
					"valueRef": "#C0C0AC",
					"tags": null,
					"detailsBase": null
				},
				"xDetail": {
					"id": "25BE99FD9C15AE54AAF39A89B9171CCB",
					"oi": {
						"value": "1034.1035.1036."
					},
					"version": 0,
					"type": "TAMANHO",
					"subType": null,
					"description": null,
					"value": "8",
					"valueRef": null,
					"tags": null,
					"detailsBase": null
				},
				"enable": true,
				"price": 300
			},
			{
				"yDetail": {
					"id": "3700D56836EC30B80037026A0E133CE0",
					"oi": null,
					"version": 0,
					"type": "COR",
					"subType": null,
					"description": "Amarelo",
					"value": "Amarelo",
					"valueRef": "#FFFF00",
					"tags": null,
					"detailsBase": null
				},
				"xDetail": {
					"id": "25BE99FD9C15AE54AAF39A89B9171CCB",
					"oi": {
						"value": "1034.1035.1036."
					},
					"version": 0,
					"type": "TAMANHO",
					"subType": null,
					"description": null,
					"value": "8",
					"valueRef": null,
					"tags": null,
					"detailsBase": null
				},
				"enable": true,
				"price": 300
			},
			{
				"yDetail": {
					"id": "3700D5683B59003C6B8E026A0E133CE0",
					"oi": null,
					"version": 0,
					"type": "COR",
					"subType": null,
					"description": "Azul navy",
					"value": "Azul navy",
					"valueRef": "#2C385D",
					"tags": null,
					"detailsBase": null
				},
				"xDetail": {
					"id": "25BE99FD9C15AE54AAF39A89B9171CCB",
					"oi": {
						"value": "1034.1035.1036."
					},
					"version": 0,
					"type": "TAMANHO",
					"subType": null,
					"description": null,
					"value": "8",
					"valueRef": null,
					"tags": null,
					"detailsBase": null
				},
				"enable": true,
				"price": 300
			},
			{
				"yDetail": {
					"id": "3700D5683824B0CAFC88026A0E133CE0",
					"oi": null,
					"version": 0,
					"type": "COR",
					"subType": null,
					"description": "Vermelho",
					"value": "Vermelho",
					"valueRef": "#FF0000",
					"tags": null,
					"detailsBase": null
				},
				"xDetail": {
					"id": "3700D774B1BCE0D33F7C026A0E133CE0",
					"oi": null,
					"version": 0,
					"type": "TAMANHO",
					"subType": null,
					"description": "TAMANHO (34-46)",
					"value": "34",
					"valueRef": null,
					"tags": null,
					"detailsBase": null
				},
				"enable": true,
				"price": 300
			},
			{
				"yDetail": {
					"id": "3700D5683A4790112BE7026A0E133CE0",
					"oi": null,
					"version": 0,
					"type": "COR",
					"subType": null,
					"description": "Champagne",
					"value": "Champagne",
					"valueRef": "#C0C0AC",
					"tags": null,
					"detailsBase": null
				},
				"xDetail": {
					"id": "3700D774B1BCE0D33F7C026A0E133CE0",
					"oi": null,
					"version": 0,
					"type": "TAMANHO",
					"subType": null,
					"description": "TAMANHO (34-46)",
					"value": "34",
					"valueRef": null,
					"tags": null,
					"detailsBase": null
				},
				"enable": true,
				"price": 300
			},
			{
				"yDetail": {
					"id": "3700D56836EC30B80037026A0E133CE0",
					"oi": null,
					"version": 0,
					"type": "COR",
					"subType": null,
					"description": "Amarelo",
					"value": "Amarelo",
					"valueRef": "#FFFF00",
					"tags": null,
					"detailsBase": null
				},
				"xDetail": {
					"id": "3700D774B1BCE0D33F7C026A0E133CE0",
					"oi": null,
					"version": 0,
					"type": "TAMANHO",
					"subType": null,
					"description": "TAMANHO (34-46)",
					"value": "34",
					"valueRef": null,
					"tags": null,
					"detailsBase": null
				},
				"enable": true,
				"price": 300
			},
			{
				"yDetail": {
					"id": "3700D5683B59003C6B8E026A0E133CE0",
					"oi": null,
					"version": 0,
					"type": "COR",
					"subType": null,
					"description": "Azul navy",
					"value": "Azul navy",
					"valueRef": "#2C385D",
					"tags": null,
					"detailsBase": null
				},
				"xDetail": {
					"id": "3700D774B1BCE0D33F7C026A0E133CE0",
					"oi": null,
					"version": 0,
					"type": "TAMANHO",
					"subType": null,
					"description": "TAMANHO (34-46)",
					"value": "34",
					"valueRef": null,
					"tags": null,
					"detailsBase": null
				},
				"enable": true,
				"price": 300
			},
			{
				"yDetail": {
					"id": "3700D5683824B0CAFC88026A0E133CE0",
					"oi": null,
					"version": 0,
					"type": "COR",
					"subType": null,
					"description": "Vermelho",
					"value": "Vermelho",
					"valueRef": "#FF0000",
					"tags": null,
					"detailsBase": null
				},
				"xDetail": {
					"id": "3700D77F358A704824F4026A0E133CE0",
					"oi": null,
					"version": 0,
					"type": "TAMANHO",
					"subType": null,
					"description": "TAMANHO (SAPATOS)",
					"value": "35",
					"valueRef": null,
					"tags": null,
					"detailsBase": null
				},
				"enable": true,
				"price": 300
			},
			{
				"yDetail": {
					"id": "3700D5683A4790112BE7026A0E133CE0",
					"oi": null,
					"version": 0,
					"type": "COR",
					"subType": null,
					"description": "Champagne",
					"value": "Champagne",
					"valueRef": "#C0C0AC",
					"tags": null,
					"detailsBase": null
				},
				"xDetail": {
					"id": "3700D77F358A704824F4026A0E133CE0",
					"oi": null,
					"version": 0,
					"type": "TAMANHO",
					"subType": null,
					"description": "TAMANHO (SAPATOS)",
					"value": "35",
					"valueRef": null,
					"tags": null,
					"detailsBase": null
				},
				"enable": true,
				"price": 300
			},
			{
				"yDetail": {
					"id": "3700D56836EC30B80037026A0E133CE0",
					"oi": null,
					"version": 0,
					"type": "COR",
					"subType": null,
					"description": "Amarelo",
					"value": "Amarelo",
					"valueRef": "#FFFF00",
					"tags": null,
					"detailsBase": null
				},
				"xDetail": {
					"id": "3700D77F358A704824F4026A0E133CE0",
					"oi": null,
					"version": 0,
					"type": "TAMANHO",
					"subType": null,
					"description": "TAMANHO (SAPATOS)",
					"value": "35",
					"valueRef": null,
					"tags": null,
					"detailsBase": null
				},
				"enable": true,
				"price": 300
			},
			{
				"yDetail": {
					"id": "3700D5683B59003C6B8E026A0E133CE0",
					"oi": null,
					"version": 0,
					"type": "COR",
					"subType": null,
					"description": "Azul navy",
					"value": "Azul navy",
					"valueRef": "#2C385D",
					"tags": null,
					"detailsBase": null
				},
				"xDetail": {
					"id": "3700D77F358A704824F4026A0E133CE0",
					"oi": null,
					"version": 0,
					"type": "TAMANHO",
					"subType": null,
					"description": "TAMANHO (SAPATOS)",
					"value": "35",
					"valueRef": null,
					"tags": null,
					"detailsBase": null
				},
				"enable": true,
				"price": 300
			},
			{
				"yDetail": {
					"id": "3700D5683824B0CAFC88026A0E133CE0",
					"oi": null,
					"version": 0,
					"type": "COR",
					"subType": null,
					"description": "Vermelho",
					"value": "Vermelho",
					"valueRef": "#FF0000",
					"tags": null,
					"detailsBase": null
				},
				"xDetail": {
					"id": "3700D58C87CC30D37227026A0E133CE0",
					"oi": null,
					"version": 0,
					"type": "TAMANHO",
					"subType": null,
					"description": "Tamanho(36-56)",
					"value": "36",
					"valueRef": null,
					"tags": null,
					"detailsBase": null
				},
				"enable": true,
				"price": 300
			},
			{
				"yDetail": {
					"id": "3700D5683A4790112BE7026A0E133CE0",
					"oi": null,
					"version": 0,
					"type": "COR",
					"subType": null,
					"description": "Champagne",
					"value": "Champagne",
					"valueRef": "#C0C0AC",
					"tags": null,
					"detailsBase": null
				},
				"xDetail": {
					"id": "3700D58C87CC30D37227026A0E133CE0",
					"oi": null,
					"version": 0,
					"type": "TAMANHO",
					"subType": null,
					"description": "Tamanho(36-56)",
					"value": "36",
					"valueRef": null,
					"tags": null,
					"detailsBase": null
				},
				"enable": true,
				"price": 300
			},
			{
				"yDetail": {
					"id": "3700D56836EC30B80037026A0E133CE0",
					"oi": null,
					"version": 0,
					"type": "COR",
					"subType": null,
					"description": "Amarelo",
					"value": "Amarelo",
					"valueRef": "#FFFF00",
					"tags": null,
					"detailsBase": null
				},
				"xDetail": {
					"id": "3700D58C87CC30D37227026A0E133CE0",
					"oi": null,
					"version": 0,
					"type": "TAMANHO",
					"subType": null,
					"description": "Tamanho(36-56)",
					"value": "36",
					"valueRef": null,
					"tags": null,
					"detailsBase": null
				},
				"enable": true,
				"price": 300
			},
			{
				"yDetail": {
					"id": "3700D5683B59003C6B8E026A0E133CE0",
					"oi": null,
					"version": 0,
					"type": "COR",
					"subType": null,
					"description": "Azul navy",
					"value": "Azul navy",
					"valueRef": "#2C385D",
					"tags": null,
					"detailsBase": null
				},
				"xDetail": {
					"id": "3700D58C87CC30D37227026A0E133CE0",
					"oi": null,
					"version": 0,
					"type": "TAMANHO",
					"subType": null,
					"description": "Tamanho(36-56)",
					"value": "36",
					"valueRef": null,
					"tags": null,
					"detailsBase": null
				},
				"enable": true,
				"price": 300
			},
			{
				"yDetail": {
					"id": "3700D5683824B0CAFC88026A0E133CE0",
					"oi": null,
					"version": 0,
					"type": "COR",
					"subType": null,
					"description": "Vermelho",
					"value": "Vermelho",
					"valueRef": "#FF0000",
					"tags": null,
					"detailsBase": null
				},
				"xDetail": {
					"id": "3700D77F32CB5078A501026A0E133CE0",
					"oi": null,
					"version": 0,
					"type": "TAMANHO",
					"subType": null,
					"description": "TAMANHO (SAPATOS)",
					"value": "37",
					"valueRef": null,
					"tags": null,
					"detailsBase": null
				},
				"enable": true,
				"price": 300
			},
			{
				"yDetail": {
					"id": "3700D5683A4790112BE7026A0E133CE0",
					"oi": null,
					"version": 0,
					"type": "COR",
					"subType": null,
					"description": "Champagne",
					"value": "Champagne",
					"valueRef": "#C0C0AC",
					"tags": null,
					"detailsBase": null
				},
				"xDetail": {
					"id": "3700D77F32CB5078A501026A0E133CE0",
					"oi": null,
					"version": 0,
					"type": "TAMANHO",
					"subType": null,
					"description": "TAMANHO (SAPATOS)",
					"value": "37",
					"valueRef": null,
					"tags": null,
					"detailsBase": null
				},
				"enable": true,
				"price": 300
			},
			{
				"yDetail": {
					"id": "3700D56836EC30B80037026A0E133CE0",
					"oi": null,
					"version": 0,
					"type": "COR",
					"subType": null,
					"description": "Amarelo",
					"value": "Amarelo",
					"valueRef": "#FFFF00",
					"tags": null,
					"detailsBase": null
				},
				"xDetail": {
					"id": "3700D77F32CB5078A501026A0E133CE0",
					"oi": null,
					"version": 0,
					"type": "TAMANHO",
					"subType": null,
					"description": "TAMANHO (SAPATOS)",
					"value": "37",
					"valueRef": null,
					"tags": null,
					"detailsBase": null
				},
				"enable": true,
				"price": 300
			},
			{
				"yDetail": {
					"id": "3700D5683B59003C6B8E026A0E133CE0",
					"oi": null,
					"version": 0,
					"type": "COR",
					"subType": null,
					"description": "Azul navy",
					"value": "Azul navy",
					"valueRef": "#2C385D",
					"tags": null,
					"detailsBase": null
				},
				"xDetail": {
					"id": "3700D77F32CB5078A501026A0E133CE0",
					"oi": null,
					"version": 0,
					"type": "TAMANHO",
					"subType": null,
					"description": "TAMANHO (SAPATOS)",
					"value": "37",
					"valueRef": null,
					"tags": null,
					"detailsBase": null
				},
				"enable": true,
				"price": 300
			},
			{
				"yDetail": {
					"id": "3700D5683824B0CAFC88026A0E133CE0",
					"oi": null,
					"version": 0,
					"type": "COR",
					"subType": null,
					"description": "Vermelho",
					"value": "Vermelho",
					"valueRef": "#FF0000",
					"tags": null,
					"detailsBase": null
				},
				"xDetail": {
					"id": "3700D58C7D1DD01584D7026A0E133CE0",
					"oi": null,
					"version": 0,
					"type": "TAMANHO",
					"subType": null,
					"description": "Tamanho(36-56)",
					"value": "38",
					"valueRef": null,
					"tags": null,
					"detailsBase": null
				},
				"enable": true,
				"price": 300
			},
			{
				"yDetail": {
					"id": "3700D5683A4790112BE7026A0E133CE0",
					"oi": null,
					"version": 0,
					"type": "COR",
					"subType": null,
					"description": "Champagne",
					"value": "Champagne",
					"valueRef": "#C0C0AC",
					"tags": null,
					"detailsBase": null
				},
				"xDetail": {
					"id": "3700D58C7D1DD01584D7026A0E133CE0",
					"oi": null,
					"version": 0,
					"type": "TAMANHO",
					"subType": null,
					"description": "Tamanho(36-56)",
					"value": "38",
					"valueRef": null,
					"tags": null,
					"detailsBase": null
				},
				"enable": true,
				"price": 300
			},
			{
				"yDetail": {
					"id": "3700D56836EC30B80037026A0E133CE0",
					"oi": null,
					"version": 0,
					"type": "COR",
					"subType": null,
					"description": "Amarelo",
					"value": "Amarelo",
					"valueRef": "#FFFF00",
					"tags": null,
					"detailsBase": null
				},
				"xDetail": {
					"id": "3700D58C7D1DD01584D7026A0E133CE0",
					"oi": null,
					"version": 0,
					"type": "TAMANHO",
					"subType": null,
					"description": "Tamanho(36-56)",
					"value": "38",
					"valueRef": null,
					"tags": null,
					"detailsBase": null
				},
				"enable": true,
				"price": 300
			},
			{
				"yDetail": {
					"id": "3700D5683B59003C6B8E026A0E133CE0",
					"oi": null,
					"version": 0,
					"type": "COR",
					"subType": null,
					"description": "Azul navy",
					"value": "Azul navy",
					"valueRef": "#2C385D",
					"tags": null,
					"detailsBase": null
				},
				"xDetail": {
					"id": "3700D58C7D1DD01584D7026A0E133CE0",
					"oi": null,
					"version": 0,
					"type": "TAMANHO",
					"subType": null,
					"description": "Tamanho(36-56)",
					"value": "38",
					"valueRef": null,
					"tags": null,
					"detailsBase": null
				},
				"enable": true,
				"price": 300
			},
			{
				"yDetail": {
					"id": "3700D5683824B0CAFC88026A0E133CE0",
					"oi": null,
					"version": 0,
					"type": "COR",
					"subType": null,
					"description": "Vermelho",
					"value": "Vermelho",
					"valueRef": "#FF0000",
					"tags": null,
					"detailsBase": null
				},
				"xDetail": {
					"id": "3700D77F2F6FF02D3135026A0E133CE0",
					"oi": null,
					"version": 0,
					"type": "TAMANHO",
					"subType": null,
					"description": "TAMANHO (SAPATOS)",
					"value": "39",
					"valueRef": null,
					"tags": null,
					"detailsBase": null
				},
				"enable": true,
				"price": 300
			},
			{
				"yDetail": {
					"id": "3700D5683A4790112BE7026A0E133CE0",
					"oi": null,
					"version": 0,
					"type": "COR",
					"subType": null,
					"description": "Champagne",
					"value": "Champagne",
					"valueRef": "#C0C0AC",
					"tags": null,
					"detailsBase": null
				},
				"xDetail": {
					"id": "3700D77F2F6FF02D3135026A0E133CE0",
					"oi": null,
					"version": 0,
					"type": "TAMANHO",
					"subType": null,
					"description": "TAMANHO (SAPATOS)",
					"value": "39",
					"valueRef": null,
					"tags": null,
					"detailsBase": null
				},
				"enable": true,
				"price": 300
			},
			{
				"yDetail": {
					"id": "3700D56836EC30B80037026A0E133CE0",
					"oi": null,
					"version": 0,
					"type": "COR",
					"subType": null,
					"description": "Amarelo",
					"value": "Amarelo",
					"valueRef": "#FFFF00",
					"tags": null,
					"detailsBase": null
				},
				"xDetail": {
					"id": "3700D77F2F6FF02D3135026A0E133CE0",
					"oi": null,
					"version": 0,
					"type": "TAMANHO",
					"subType": null,
					"description": "TAMANHO (SAPATOS)",
					"value": "39",
					"valueRef": null,
					"tags": null,
					"detailsBase": null
				},
				"enable": true,
				"price": 300
			},
			{
				"yDetail": {
					"id": "3700D5683B59003C6B8E026A0E133CE0",
					"oi": null,
					"version": 0,
					"type": "COR",
					"subType": null,
					"description": "Azul navy",
					"value": "Azul navy",
					"valueRef": "#2C385D",
					"tags": null,
					"detailsBase": null
				},
				"xDetail": {
					"id": "3700D77F2F6FF02D3135026A0E133CE0",
					"oi": null,
					"version": 0,
					"type": "TAMANHO",
					"subType": null,
					"description": "TAMANHO (SAPATOS)",
					"value": "39",
					"valueRef": null,
					"tags": null,
					"detailsBase": null
				},
				"enable": true,
				"price": 300
			},
			{
				"yDetail": {
					"id": "3700D5683824B0CAFC88026A0E133CE0",
					"oi": null,
					"version": 0,
					"type": "COR",
					"subType": null,
					"description": "Vermelho",
					"value": "Vermelho",
					"valueRef": "#FF0000",
					"tags": null,
					"detailsBase": null
				},
				"xDetail": {
					"id": "3700D58A516430F9160B026A0E133CE0",
					"oi": null,
					"version": 0,
					"type": "TAMANHO",
					"subType": null,
					"description": "Tamanho(36-56)",
					"value": "40",
					"valueRef": null,
					"tags": null,
					"detailsBase": null
				},
				"enable": true,
				"price": 300
			},
			{
				"yDetail": {
					"id": "3700D5683A4790112BE7026A0E133CE0",
					"oi": null,
					"version": 0,
					"type": "COR",
					"subType": null,
					"description": "Champagne",
					"value": "Champagne",
					"valueRef": "#C0C0AC",
					"tags": null,
					"detailsBase": null
				},
				"xDetail": {
					"id": "3700D58A516430F9160B026A0E133CE0",
					"oi": null,
					"version": 0,
					"type": "TAMANHO",
					"subType": null,
					"description": "Tamanho(36-56)",
					"value": "40",
					"valueRef": null,
					"tags": null,
					"detailsBase": null
				},
				"enable": true,
				"price": 300
			},
			{
				"yDetail": {
					"id": "3700D56836EC30B80037026A0E133CE0",
					"oi": null,
					"version": 0,
					"type": "COR",
					"subType": null,
					"description": "Amarelo",
					"value": "Amarelo",
					"valueRef": "#FFFF00",
					"tags": null,
					"detailsBase": null
				},
				"xDetail": {
					"id": "3700D58A516430F9160B026A0E133CE0",
					"oi": null,
					"version": 0,
					"type": "TAMANHO",
					"subType": null,
					"description": "Tamanho(36-56)",
					"value": "40",
					"valueRef": null,
					"tags": null,
					"detailsBase": null
				},
				"enable": true,
				"price": 300
			},
			{
				"yDetail": {
					"id": "3700D5683B59003C6B8E026A0E133CE0",
					"oi": null,
					"version": 0,
					"type": "COR",
					"subType": null,
					"description": "Azul navy",
					"value": "Azul navy",
					"valueRef": "#2C385D",
					"tags": null,
					"detailsBase": null
				},
				"xDetail": {
					"id": "3700D58A516430F9160B026A0E133CE0",
					"oi": null,
					"version": 0,
					"type": "TAMANHO",
					"subType": null,
					"description": "Tamanho(36-56)",
					"value": "40",
					"valueRef": null,
					"tags": null,
					"detailsBase": null
				},
				"enable": true,
				"price": 300
			},
			{
				"yDetail": {
					"id": "3700D5683824B0CAFC88026A0E133CE0",
					"oi": null,
					"version": 0,
					"type": "COR",
					"subType": null,
					"description": "Vermelho",
					"value": "Vermelho",
					"valueRef": "#FF0000",
					"tags": null,
					"detailsBase": null
				},
				"xDetail": {
					"id": "3700D58FE06D109D3A21026A0E133CE0",
					"oi": null,
					"version": 0,
					"type": "TAMANHO",
					"subType": null,
					"description": "Tamanho(36-56)",
					"value": "42",
					"valueRef": null,
					"tags": null,
					"detailsBase": null
				},
				"enable": true,
				"price": 300
			},
			{
				"yDetail": {
					"id": "3700D5683A4790112BE7026A0E133CE0",
					"oi": null,
					"version": 0,
					"type": "COR",
					"subType": null,
					"description": "Champagne",
					"value": "Champagne",
					"valueRef": "#C0C0AC",
					"tags": null,
					"detailsBase": null
				},
				"xDetail": {
					"id": "3700D58FE06D109D3A21026A0E133CE0",
					"oi": null,
					"version": 0,
					"type": "TAMANHO",
					"subType": null,
					"description": "Tamanho(36-56)",
					"value": "42",
					"valueRef": null,
					"tags": null,
					"detailsBase": null
				},
				"enable": true,
				"price": 300
			},
			{
				"yDetail": {
					"id": "3700D56836EC30B80037026A0E133CE0",
					"oi": null,
					"version": 0,
					"type": "COR",
					"subType": null,
					"description": "Amarelo",
					"value": "Amarelo",
					"valueRef": "#FFFF00",
					"tags": null,
					"detailsBase": null
				},
				"xDetail": {
					"id": "3700D58FE06D109D3A21026A0E133CE0",
					"oi": null,
					"version": 0,
					"type": "TAMANHO",
					"subType": null,
					"description": "Tamanho(36-56)",
					"value": "42",
					"valueRef": null,
					"tags": null,
					"detailsBase": null
				},
				"enable": true,
				"price": 300
			},
			{
				"yDetail": {
					"id": "3700D5683B59003C6B8E026A0E133CE0",
					"oi": null,
					"version": 0,
					"type": "COR",
					"subType": null,
					"description": "Azul navy",
					"value": "Azul navy",
					"valueRef": "#2C385D",
					"tags": null,
					"detailsBase": null
				},
				"xDetail": {
					"id": "3700D58FE06D109D3A21026A0E133CE0",
					"oi": null,
					"version": 0,
					"type": "TAMANHO",
					"subType": null,
					"description": "Tamanho(36-56)",
					"value": "42",
					"valueRef": null,
					"tags": null,
					"detailsBase": null
				},
				"enable": true,
				"price": 300
			},
			{
				"yDetail": {
					"id": "3700D5683824B0CAFC88026A0E133CE0",
					"oi": null,
					"version": 0,
					"type": "COR",
					"subType": null,
					"description": "Vermelho",
					"value": "Vermelho",
					"valueRef": "#FF0000",
					"tags": null,
					"detailsBase": null
				},
				"xDetail": {
					"id": "3700D58A6E13F0E5A26D026A0E133CE0",
					"oi": null,
					"version": 0,
					"type": "TAMANHO",
					"subType": null,
					"description": "Tamanho(36-56)",
					"value": "44",
					"valueRef": null,
					"tags": null,
					"detailsBase": null
				},
				"enable": true,
				"price": 300
			},
			{
				"yDetail": {
					"id": "3700D5683A4790112BE7026A0E133CE0",
					"oi": null,
					"version": 0,
					"type": "COR",
					"subType": null,
					"description": "Champagne",
					"value": "Champagne",
					"valueRef": "#C0C0AC",
					"tags": null,
					"detailsBase": null
				},
				"xDetail": {
					"id": "3700D58A6E13F0E5A26D026A0E133CE0",
					"oi": null,
					"version": 0,
					"type": "TAMANHO",
					"subType": null,
					"description": "Tamanho(36-56)",
					"value": "44",
					"valueRef": null,
					"tags": null,
					"detailsBase": null
				},
				"enable": true,
				"price": 300
			},
			{
				"yDetail": {
					"id": "3700D56836EC30B80037026A0E133CE0",
					"oi": null,
					"version": 0,
					"type": "COR",
					"subType": null,
					"description": "Amarelo",
					"value": "Amarelo",
					"valueRef": "#FFFF00",
					"tags": null,
					"detailsBase": null
				},
				"xDetail": {
					"id": "3700D58A6E13F0E5A26D026A0E133CE0",
					"oi": null,
					"version": 0,
					"type": "TAMANHO",
					"subType": null,
					"description": "Tamanho(36-56)",
					"value": "44",
					"valueRef": null,
					"tags": null,
					"detailsBase": null
				},
				"enable": true,
				"price": 300
			},
			{
				"yDetail": {
					"id": "3700D5683B59003C6B8E026A0E133CE0",
					"oi": null,
					"version": 0,
					"type": "COR",
					"subType": null,
					"description": "Azul navy",
					"value": "Azul navy",
					"valueRef": "#2C385D",
					"tags": null,
					"detailsBase": null
				},
				"xDetail": {
					"id": "3700D58A6E13F0E5A26D026A0E133CE0",
					"oi": null,
					"version": 0,
					"type": "TAMANHO",
					"subType": null,
					"description": "Tamanho(36-56)",
					"value": "44",
					"valueRef": null,
					"tags": null,
					"detailsBase": null
				},
				"enable": true,
				"price": 300
			},
			{
				"yDetail": {
					"id": "3700D5683CDFA028985D026A0E133CE0",
					"oi": null,
					"version": 0,
					"type": "COR",
					"subType": null,
					"description": "Nude",
					"value": "Nude",
					"valueRef": "#ebc8b2",
					"tags": null,
					"detailsBase": null
				},
				"xDetail": {
					"id": "3700D589F4C540099D03026A0E133CE0",
					"oi": null,
					"version": 0,
					"type": "TAMANHO",
					"subType": null,
					"description": "Tamanho(UN-G5)",
					"value": "PP",
					"valueRef": null,
					"tags": null,
					"detailsBase": null
				},
				"enable": true,
				"price": 300
			},
			{
				"yDetail": {
					"id": "3700D5683DF1103DD33F026A0E133CE0",
					"oi": null,
					"version": 0,
					"type": "COR",
					"subType": null,
					"description": "Verde Limão",
					"value": "Verde Limão",
					"valueRef": "#00ff00",
					"tags": null,
					"detailsBase": null
				},
				"xDetail": {
					"id": "3700D589F4C540099D03026A0E133CE0",
					"oi": null,
					"version": 0,
					"type": "TAMANHO",
					"subType": null,
					"description": "Tamanho(UN-G5)",
					"value": "PP",
					"valueRef": null,
					"tags": null,
					"detailsBase": null
				},
				"enable": true,
				"price": 300
			},
			{
				"yDetail": {
					"id": "3700D5683CDFA028985D026A0E133CE0",
					"oi": null,
					"version": 0,
					"type": "COR",
					"subType": null,
					"description": "Nude",
					"value": "Nude",
					"valueRef": "#ebc8b2",
					"tags": null,
					"detailsBase": null
				},
				"xDetail": {
					"id": "3700D57DA6BF00009C54026A0E133CE0",
					"oi": null,
					"version": 0,
					"type": "TAMANHO",
					"subType": null,
					"description": "Tamanho(UN-G5)",
					"value": "P",
					"valueRef": null,
					"tags": null,
					"detailsBase": null
				},
				"enable": true,
				"price": 300
			},
			{
				"yDetail": {
					"id": "3700D5683DF1103DD33F026A0E133CE0",
					"oi": null,
					"version": 0,
					"type": "COR",
					"subType": null,
					"description": "Verde Limão",
					"value": "Verde Limão",
					"valueRef": "#00ff00",
					"tags": null,
					"detailsBase": null
				},
				"xDetail": {
					"id": "3700D57DA6BF00009C54026A0E133CE0",
					"oi": null,
					"version": 0,
					"type": "TAMANHO",
					"subType": null,
					"description": "Tamanho(UN-G5)",
					"value": "P",
					"valueRef": null,
					"tags": null,
					"detailsBase": null
				},
				"enable": true,
				"price": 300
			},
			{
				"yDetail": {
					"id": "3700D5683CDFA028985D026A0E133CE0",
					"oi": null,
					"version": 0,
					"type": "COR",
					"subType": null,
					"description": "Nude",
					"value": "Nude",
					"valueRef": "#ebc8b2",
					"tags": null,
					"detailsBase": null
				},
				"xDetail": {
					"id": "3700D57D7C2C90EE3F71026A0E133CE0",
					"oi": null,
					"version": 0,
					"type": "TAMANHO",
					"subType": null,
					"description": "Tamanho(UN-G5)",
					"value": "M",
					"valueRef": null,
					"tags": null,
					"detailsBase": null
				},
				"enable": true,
				"price": 300
			},
			{
				"yDetail": {
					"id": "3700D5683DF1103DD33F026A0E133CE0",
					"oi": null,
					"version": 0,
					"type": "COR",
					"subType": null,
					"description": "Verde Limão",
					"value": "Verde Limão",
					"valueRef": "#00ff00",
					"tags": null,
					"detailsBase": null
				},
				"xDetail": {
					"id": "3700D57D7C2C90EE3F71026A0E133CE0",
					"oi": null,
					"version": 0,
					"type": "TAMANHO",
					"subType": null,
					"description": "Tamanho(UN-G5)",
					"value": "M",
					"valueRef": null,
					"tags": null,
					"detailsBase": null
				},
				"enable": true,
				"price": 300
			},
			{
				"yDetail": {
					"id": "3700D5683CDFA028985D026A0E133CE0",
					"oi": null,
					"version": 0,
					"type": "COR",
					"subType": null,
					"description": "Nude",
					"value": "Nude",
					"valueRef": "#ebc8b2",
					"tags": null,
					"detailsBase": null
				},
				"xDetail": {
					"id": "3700D57DADEAF0EBC693026A0E133CE0",
					"oi": null,
					"version": 0,
					"type": "TAMANHO",
					"subType": null,
					"description": "Tamanho(UN-G5)",
					"value": "G",
					"valueRef": null,
					"tags": null,
					"detailsBase": null
				},
				"enable": true,
				"price": 300
			},
			{
				"yDetail": {
					"id": "3700D5683DF1103DD33F026A0E133CE0",
					"oi": null,
					"version": 0,
					"type": "COR",
					"subType": null,
					"description": "Verde Limão",
					"value": "Verde Limão",
					"valueRef": "#00ff00",
					"tags": null,
					"detailsBase": null
				},
				"xDetail": {
					"id": "3700D57DADEAF0EBC693026A0E133CE0",
					"oi": null,
					"version": 0,
					"type": "TAMANHO",
					"subType": null,
					"description": "Tamanho(UN-G5)",
					"value": "G",
					"valueRef": null,
					"tags": null,
					"detailsBase": null
				},
				"enable": true,
				"price": 300
			},
			{
				"yDetail": {
					"id": "3700D5683CDFA028985D026A0E133CE0",
					"oi": null,
					"version": 0,
					"type": "COR",
					"subType": null,
					"description": "Nude",
					"value": "Nude",
					"valueRef": "#ebc8b2",
					"tags": null,
					"detailsBase": null
				},
				"xDetail": {
					"id": "3700D57FD1673013431F026A0E133CE0",
					"oi": null,
					"version": 0,
					"type": "TAMANHO",
					"subType": null,
					"description": "Tamanho(UN-G5)",
					"value": "GG",
					"valueRef": null,
					"tags": null,
					"detailsBase": null
				},
				"enable": true,
				"price": 300
			},
			{
				"yDetail": {
					"id": "3700D5683DF1103DD33F026A0E133CE0",
					"oi": null,
					"version": 0,
					"type": "COR",
					"subType": null,
					"description": "Verde Limão",
					"value": "Verde Limão",
					"valueRef": "#00ff00",
					"tags": null,
					"detailsBase": null
				},
				"xDetail": {
					"id": "3700D57FD1673013431F026A0E133CE0",
					"oi": null,
					"version": 0,
					"type": "TAMANHO",
					"subType": null,
					"description": "Tamanho(UN-G5)",
					"value": "GG",
					"valueRef": null,
					"tags": null,
					"detailsBase": null
				},
				"enable": true,
				"price": 300
			},
			{
				"yDetail": {
					"id": "3700D5683CDFA028985D026A0E133CE0",
					"oi": null,
					"version": 0,
					"type": "COR",
					"subType": null,
					"description": "Nude",
					"value": "Nude",
					"valueRef": "#ebc8b2",
					"tags": null,
					"detailsBase": null
				},
				"xDetail": {
					"id": "3700D58EA2E40006908B026A0E133CE0",
					"oi": null,
					"version": 0,
					"type": "TAMANHO",
					"subType": null,
					"description": "Tamanho(UN-G5)",
					"value": "XG",
					"valueRef": null,
					"tags": null,
					"detailsBase": null
				},
				"enable": true,
				"price": 300
			},
			{
				"yDetail": {
					"id": "3700D5683DF1103DD33F026A0E133CE0",
					"oi": null,
					"version": 0,
					"type": "COR",
					"subType": null,
					"description": "Verde Limão",
					"value": "Verde Limão",
					"valueRef": "#00ff00",
					"tags": null,
					"detailsBase": null
				},
				"xDetail": {
					"id": "3700D58EA2E40006908B026A0E133CE0",
					"oi": null,
					"version": 0,
					"type": "TAMANHO",
					"subType": null,
					"description": "Tamanho(UN-G5)",
					"value": "XG",
					"valueRef": null,
					"tags": null,
					"detailsBase": null
				},
				"enable": true,
				"price": 300
			},
			{
				"yDetail": {
					"id": "3700D5683CDFA028985D026A0E133CE0",
					"oi": null,
					"version": 0,
					"type": "COR",
					"subType": null,
					"description": "Nude",
					"value": "Nude",
					"valueRef": "#ebc8b2",
					"tags": null,
					"detailsBase": null
				},
				"xDetail": {
					"id": "3700D58ACCD5C0AB8687026A0E133CE0",
					"oi": null,
					"version": 0,
					"type": "TAMANHO",
					"subType": null,
					"description": "Tamanho(UN-G5)",
					"value": "G1",
					"valueRef": null,
					"tags": null,
					"detailsBase": null
				},
				"enable": true,
				"price": 300
			},
			{
				"yDetail": {
					"id": "3700D5683DF1103DD33F026A0E133CE0",
					"oi": null,
					"version": 0,
					"type": "COR",
					"subType": null,
					"description": "Verde Limão",
					"value": "Verde Limão",
					"valueRef": "#00ff00",
					"tags": null,
					"detailsBase": null
				},
				"xDetail": {
					"id": "3700D58ACCD5C0AB8687026A0E133CE0",
					"oi": null,
					"version": 0,
					"type": "TAMANHO",
					"subType": null,
					"description": "Tamanho(UN-G5)",
					"value": "G1",
					"valueRef": null,
					"tags": null,
					"detailsBase": null
				},
				"enable": true,
				"price": 300
			},
			{
				"yDetail": {
					"id": "3700D5683CDFA028985D026A0E133CE0",
					"oi": null,
					"version": 0,
					"type": "COR",
					"subType": null,
					"description": "Nude",
					"value": "Nude",
					"valueRef": "#ebc8b2",
					"tags": null,
					"detailsBase": null
				},
				"xDetail": {
					"id": "3700D58A28A6808C510B026A0E133CE0",
					"oi": null,
					"version": 0,
					"type": "TAMANHO",
					"subType": null,
					"description": "Tamanho(UN-G5)",
					"value": "G2",
					"valueRef": null,
					"tags": null,
					"detailsBase": null
				},
				"enable": true,
				"price": 300
			},
			{
				"yDetail": {
					"id": "3700D5683DF1103DD33F026A0E133CE0",
					"oi": null,
					"version": 0,
					"type": "COR",
					"subType": null,
					"description": "Verde Limão",
					"value": "Verde Limão",
					"valueRef": "#00ff00",
					"tags": null,
					"detailsBase": null
				},
				"xDetail": {
					"id": "3700D58A28A6808C510B026A0E133CE0",
					"oi": null,
					"version": 0,
					"type": "TAMANHO",
					"subType": null,
					"description": "Tamanho(UN-G5)",
					"value": "G2",
					"valueRef": null,
					"tags": null,
					"detailsBase": null
				},
				"enable": true,
				"price": 300
			},
			{
				"yDetail": {
					"id": "3700D5683CDFA028985D026A0E133CE0",
					"oi": null,
					"version": 0,
					"type": "COR",
					"subType": null,
					"description": "Nude",
					"value": "Nude",
					"valueRef": "#ebc8b2",
					"tags": null,
					"detailsBase": null
				},
				"xDetail": {
					"id": "3700D58DE1B6E07B502C026A0E133CE0",
					"oi": null,
					"version": 0,
					"type": "TAMANHO",
					"subType": null,
					"description": "Tamanho(UN-G5)",
					"value": "G3",
					"valueRef": null,
					"tags": null,
					"detailsBase": null
				},
				"enable": true,
				"price": 300
			},
			{
				"yDetail": {
					"id": "3700D5683DF1103DD33F026A0E133CE0",
					"oi": null,
					"version": 0,
					"type": "COR",
					"subType": null,
					"description": "Verde Limão",
					"value": "Verde Limão",
					"valueRef": "#00ff00",
					"tags": null,
					"detailsBase": null
				},
				"xDetail": {
					"id": "3700D58DE1B6E07B502C026A0E133CE0",
					"oi": null,
					"version": 0,
					"type": "TAMANHO",
					"subType": null,
					"description": "Tamanho(UN-G5)",
					"value": "G3",
					"valueRef": null,
					"tags": null,
					"detailsBase": null
				},
				"enable": true,
				"price": 300
			},
			{
				"yDetail": {
					"id": "3700D5683CDFA028985D026A0E133CE0",
					"oi": null,
					"version": 0,
					"type": "COR",
					"subType": null,
					"description": "Nude",
					"value": "Nude",
					"valueRef": "#ebc8b2",
					"tags": null,
					"detailsBase": null
				},
				"xDetail": {
					"id": "3700D5D1FF0030BD7AF1026A0E133CE0",
					"oi": null,
					"version": 0,
					"type": "TAMANHO",
					"subType": null,
					"description": "Tamanho(UN-G5)",
					"value": "G5",
					"valueRef": null,
					"tags": null,
					"detailsBase": null
				},
				"enable": true,
				"price": 300
			},
			{
				"yDetail": {
					"id": "3700D5683DF1103DD33F026A0E133CE0",
					"oi": null,
					"version": 0,
					"type": "COR",
					"subType": null,
					"description": "Verde Limão",
					"value": "Verde Limão",
					"valueRef": "#00ff00",
					"tags": null,
					"detailsBase": null
				},
				"xDetail": {
					"id": "3700D5D1FF0030BD7AF1026A0E133CE0",
					"oi": null,
					"version": 0,
					"type": "TAMANHO",
					"subType": null,
					"description": "Tamanho(UN-G5)",
					"value": "G5",
					"valueRef": null,
					"tags": null,
					"detailsBase": null
				},
				"enable": true,
				"price": 300
			},
			{
				"yDetail": {
					"id": "3700D5683CDFA028985D026A0E133CE0",
					"oi": null,
					"version": 0,
					"type": "COR",
					"subType": null,
					"description": "Nude",
					"value": "Nude",
					"valueRef": "#ebc8b2",
					"tags": null,
					"detailsBase": null
				},
				"xDetail": {
					"id": "3700D57D7A09B0A3E71E026A0E133CE0",
					"oi": null,
					"version": 0,
					"type": "TAMANHO",
					"subType": null,
					"description": "Tamanho(UN-G5)",
					"value": "UN",
					"valueRef": null,
					"tags": null,
					"detailsBase": null
				},
				"enable": true,
				"price": 300
			},
			{
				"yDetail": {
					"id": "3700D5683DF1103DD33F026A0E133CE0",
					"oi": null,
					"version": 0,
					"type": "COR",
					"subType": null,
					"description": "Verde Limão",
					"value": "Verde Limão",
					"valueRef": "#00ff00",
					"tags": null,
					"detailsBase": null
				},
				"xDetail": {
					"id": "3700D57D7A09B0A3E71E026A0E133CE0",
					"oi": null,
					"version": 0,
					"type": "TAMANHO",
					"subType": null,
					"description": "Tamanho(UN-G5)",
					"value": "UN",
					"valueRef": null,
					"tags": null,
					"detailsBase": null
				},
				"enable": true,
				"price": 300
			},
			{
				"yDetail": {
					"id": "3700D5683CDFA028985D026A0E133CE0",
					"oi": null,
					"version": 0,
					"type": "COR",
					"subType": null,
					"description": "Nude",
					"value": "Nude",
					"valueRef": "#ebc8b2",
					"tags": null,
					"detailsBase": null
				},
				"xDetail": {
					"id": "A81B847856AFB8F49FE0771A18054FB8",
					"oi": {
						"value": "1034.1035.1036."
					},
					"version": 0,
					"type": "TAMANHO",
					"subType": null,
					"description": null,
					"value": "4",
					"valueRef": null,
					"tags": null,
					"detailsBase": null
				},
				"enable": true,
				"price": 300
			},
			{
				"yDetail": {
					"id": "3700D5683DF1103DD33F026A0E133CE0",
					"oi": null,
					"version": 0,
					"type": "COR",
					"subType": null,
					"description": "Verde Limão",
					"value": "Verde Limão",
					"valueRef": "#00ff00",
					"tags": null,
					"detailsBase": null
				},
				"xDetail": {
					"id": "A81B847856AFB8F49FE0771A18054FB8",
					"oi": {
						"value": "1034.1035.1036."
					},
					"version": 0,
					"type": "TAMANHO",
					"subType": null,
					"description": null,
					"value": "4",
					"valueRef": null,
					"tags": null,
					"detailsBase": null
				},
				"enable": true,
				"price": 300
			},
			{
				"yDetail": {
					"id": "3700D5683CDFA028985D026A0E133CE0",
					"oi": null,
					"version": 0,
					"type": "COR",
					"subType": null,
					"description": "Nude",
					"value": "Nude",
					"valueRef": "#ebc8b2",
					"tags": null,
					"detailsBase": null
				},
				"xDetail": {
					"id": "5B972F42D7A520E1B838D34C18CFE3CB",
					"oi": {
						"value": "1034.1035.1036."
					},
					"version": 0,
					"type": "TAMANHO",
					"subType": null,
					"description": null,
					"value": "6",
					"valueRef": null,
					"tags": null,
					"detailsBase": null
				},
				"enable": true,
				"price": 300
			},
			{
				"yDetail": {
					"id": "3700D5683DF1103DD33F026A0E133CE0",
					"oi": null,
					"version": 0,
					"type": "COR",
					"subType": null,
					"description": "Verde Limão",
					"value": "Verde Limão",
					"valueRef": "#00ff00",
					"tags": null,
					"detailsBase": null
				},
				"xDetail": {
					"id": "5B972F42D7A520E1B838D34C18CFE3CB",
					"oi": {
						"value": "1034.1035.1036."
					},
					"version": 0,
					"type": "TAMANHO",
					"subType": null,
					"description": null,
					"value": "6",
					"valueRef": null,
					"tags": null,
					"detailsBase": null
				},
				"enable": true,
				"price": 300
			},
			{
				"yDetail": {
					"id": "3700D5683CDFA028985D026A0E133CE0",
					"oi": null,
					"version": 0,
					"type": "COR",
					"subType": null,
					"description": "Nude",
					"value": "Nude",
					"valueRef": "#ebc8b2",
					"tags": null,
					"detailsBase": null
				},
				"xDetail": {
					"id": "25BE99FD9C15AE54AAF39A89B9171CCB",
					"oi": {
						"value": "1034.1035.1036."
					},
					"version": 0,
					"type": "TAMANHO",
					"subType": null,
					"description": null,
					"value": "8",
					"valueRef": null,
					"tags": null,
					"detailsBase": null
				},
				"enable": true,
				"price": 300
			},
			{
				"yDetail": {
					"id": "3700D5683DF1103DD33F026A0E133CE0",
					"oi": null,
					"version": 0,
					"type": "COR",
					"subType": null,
					"description": "Verde Limão",
					"value": "Verde Limão",
					"valueRef": "#00ff00",
					"tags": null,
					"detailsBase": null
				},
				"xDetail": {
					"id": "25BE99FD9C15AE54AAF39A89B9171CCB",
					"oi": {
						"value": "1034.1035.1036."
					},
					"version": 0,
					"type": "TAMANHO",
					"subType": null,
					"description": null,
					"value": "8",
					"valueRef": null,
					"tags": null,
					"detailsBase": null
				},
				"enable": true,
				"price": 300
			},
			{
				"yDetail": {
					"id": "3700D5683CDFA028985D026A0E133CE0",
					"oi": null,
					"version": 0,
					"type": "COR",
					"subType": null,
					"description": "Nude",
					"value": "Nude",
					"valueRef": "#ebc8b2",
					"tags": null,
					"detailsBase": null
				},
				"xDetail": {
					"id": "3700D774B1BCE0D33F7C026A0E133CE0",
					"oi": null,
					"version": 0,
					"type": "TAMANHO",
					"subType": null,
					"description": "TAMANHO (34-46)",
					"value": "34",
					"valueRef": null,
					"tags": null,
					"detailsBase": null
				},
				"enable": true,
				"price": 300
			},
			{
				"yDetail": {
					"id": "3700D5683DF1103DD33F026A0E133CE0",
					"oi": null,
					"version": 0,
					"type": "COR",
					"subType": null,
					"description": "Verde Limão",
					"value": "Verde Limão",
					"valueRef": "#00ff00",
					"tags": null,
					"detailsBase": null
				},
				"xDetail": {
					"id": "3700D774B1BCE0D33F7C026A0E133CE0",
					"oi": null,
					"version": 0,
					"type": "TAMANHO",
					"subType": null,
					"description": "TAMANHO (34-46)",
					"value": "34",
					"valueRef": null,
					"tags": null,
					"detailsBase": null
				},
				"enable": true,
				"price": 300
			},
			{
				"yDetail": {
					"id": "3700D5683CDFA028985D026A0E133CE0",
					"oi": null,
					"version": 0,
					"type": "COR",
					"subType": null,
					"description": "Nude",
					"value": "Nude",
					"valueRef": "#ebc8b2",
					"tags": null,
					"detailsBase": null
				},
				"xDetail": {
					"id": "3700D77F358A704824F4026A0E133CE0",
					"oi": null,
					"version": 0,
					"type": "TAMANHO",
					"subType": null,
					"description": "TAMANHO (SAPATOS)",
					"value": "35",
					"valueRef": null,
					"tags": null,
					"detailsBase": null
				},
				"enable": true,
				"price": 300
			},
			{
				"yDetail": {
					"id": "3700D5683DF1103DD33F026A0E133CE0",
					"oi": null,
					"version": 0,
					"type": "COR",
					"subType": null,
					"description": "Verde Limão",
					"value": "Verde Limão",
					"valueRef": "#00ff00",
					"tags": null,
					"detailsBase": null
				},
				"xDetail": {
					"id": "3700D77F358A704824F4026A0E133CE0",
					"oi": null,
					"version": 0,
					"type": "TAMANHO",
					"subType": null,
					"description": "TAMANHO (SAPATOS)",
					"value": "35",
					"valueRef": null,
					"tags": null,
					"detailsBase": null
				},
				"enable": true,
				"price": 300
			},
			{
				"yDetail": {
					"id": "3700D5683CDFA028985D026A0E133CE0",
					"oi": null,
					"version": 0,
					"type": "COR",
					"subType": null,
					"description": "Nude",
					"value": "Nude",
					"valueRef": "#ebc8b2",
					"tags": null,
					"detailsBase": null
				},
				"xDetail": {
					"id": "3700D58C87CC30D37227026A0E133CE0",
					"oi": null,
					"version": 0,
					"type": "TAMANHO",
					"subType": null,
					"description": "Tamanho(36-56)",
					"value": "36",
					"valueRef": null,
					"tags": null,
					"detailsBase": null
				},
				"enable": true,
				"price": 300
			},
			{
				"yDetail": {
					"id": "3700D5683DF1103DD33F026A0E133CE0",
					"oi": null,
					"version": 0,
					"type": "COR",
					"subType": null,
					"description": "Verde Limão",
					"value": "Verde Limão",
					"valueRef": "#00ff00",
					"tags": null,
					"detailsBase": null
				},
				"xDetail": {
					"id": "3700D58C87CC30D37227026A0E133CE0",
					"oi": null,
					"version": 0,
					"type": "TAMANHO",
					"subType": null,
					"description": "Tamanho(36-56)",
					"value": "36",
					"valueRef": null,
					"tags": null,
					"detailsBase": null
				},
				"enable": true,
				"price": 300
			},
			{
				"yDetail": {
					"id": "3700D5683CDFA028985D026A0E133CE0",
					"oi": null,
					"version": 0,
					"type": "COR",
					"subType": null,
					"description": "Nude",
					"value": "Nude",
					"valueRef": "#ebc8b2",
					"tags": null,
					"detailsBase": null
				},
				"xDetail": {
					"id": "3700D77F32CB5078A501026A0E133CE0",
					"oi": null,
					"version": 0,
					"type": "TAMANHO",
					"subType": null,
					"description": "TAMANHO (SAPATOS)",
					"value": "37",
					"valueRef": null,
					"tags": null,
					"detailsBase": null
				},
				"enable": true,
				"price": 300
			},
			{
				"yDetail": {
					"id": "3700D5683DF1103DD33F026A0E133CE0",
					"oi": null,
					"version": 0,
					"type": "COR",
					"subType": null,
					"description": "Verde Limão",
					"value": "Verde Limão",
					"valueRef": "#00ff00",
					"tags": null,
					"detailsBase": null
				},
				"xDetail": {
					"id": "3700D77F32CB5078A501026A0E133CE0",
					"oi": null,
					"version": 0,
					"type": "TAMANHO",
					"subType": null,
					"description": "TAMANHO (SAPATOS)",
					"value": "37",
					"valueRef": null,
					"tags": null,
					"detailsBase": null
				},
				"enable": true,
				"price": 300
			},
			{
				"yDetail": {
					"id": "3700D5683CDFA028985D026A0E133CE0",
					"oi": null,
					"version": 0,
					"type": "COR",
					"subType": null,
					"description": "Nude",
					"value": "Nude",
					"valueRef": "#ebc8b2",
					"tags": null,
					"detailsBase": null
				},
				"xDetail": {
					"id": "3700D58C7D1DD01584D7026A0E133CE0",
					"oi": null,
					"version": 0,
					"type": "TAMANHO",
					"subType": null,
					"description": "Tamanho(36-56)",
					"value": "38",
					"valueRef": null,
					"tags": null,
					"detailsBase": null
				},
				"enable": true,
				"price": 300
			},
			{
				"yDetail": {
					"id": "3700D5683DF1103DD33F026A0E133CE0",
					"oi": null,
					"version": 0,
					"type": "COR",
					"subType": null,
					"description": "Verde Limão",
					"value": "Verde Limão",
					"valueRef": "#00ff00",
					"tags": null,
					"detailsBase": null
				},
				"xDetail": {
					"id": "3700D58C7D1DD01584D7026A0E133CE0",
					"oi": null,
					"version": 0,
					"type": "TAMANHO",
					"subType": null,
					"description": "Tamanho(36-56)",
					"value": "38",
					"valueRef": null,
					"tags": null,
					"detailsBase": null
				},
				"enable": true,
				"price": 300
			},
			{
				"yDetail": {
					"id": "3700D5683CDFA028985D026A0E133CE0",
					"oi": null,
					"version": 0,
					"type": "COR",
					"subType": null,
					"description": "Nude",
					"value": "Nude",
					"valueRef": "#ebc8b2",
					"tags": null,
					"detailsBase": null
				},
				"xDetail": {
					"id": "3700D77F2F6FF02D3135026A0E133CE0",
					"oi": null,
					"version": 0,
					"type": "TAMANHO",
					"subType": null,
					"description": "TAMANHO (SAPATOS)",
					"value": "39",
					"valueRef": null,
					"tags": null,
					"detailsBase": null
				},
				"enable": true,
				"price": 300
			},
			{
				"yDetail": {
					"id": "3700D5683DF1103DD33F026A0E133CE0",
					"oi": null,
					"version": 0,
					"type": "COR",
					"subType": null,
					"description": "Verde Limão",
					"value": "Verde Limão",
					"valueRef": "#00ff00",
					"tags": null,
					"detailsBase": null
				},
				"xDetail": {
					"id": "3700D77F2F6FF02D3135026A0E133CE0",
					"oi": null,
					"version": 0,
					"type": "TAMANHO",
					"subType": null,
					"description": "TAMANHO (SAPATOS)",
					"value": "39",
					"valueRef": null,
					"tags": null,
					"detailsBase": null
				},
				"enable": true,
				"price": 300
			},
			{
				"yDetail": {
					"id": "3700D5683CDFA028985D026A0E133CE0",
					"oi": null,
					"version": 0,
					"type": "COR",
					"subType": null,
					"description": "Nude",
					"value": "Nude",
					"valueRef": "#ebc8b2",
					"tags": null,
					"detailsBase": null
				},
				"xDetail": {
					"id": "3700D58A516430F9160B026A0E133CE0",
					"oi": null,
					"version": 0,
					"type": "TAMANHO",
					"subType": null,
					"description": "Tamanho(36-56)",
					"value": "40",
					"valueRef": null,
					"tags": null,
					"detailsBase": null
				},
				"enable": true,
				"price": 300
			},
			{
				"yDetail": {
					"id": "3700D5683DF1103DD33F026A0E133CE0",
					"oi": null,
					"version": 0,
					"type": "COR",
					"subType": null,
					"description": "Verde Limão",
					"value": "Verde Limão",
					"valueRef": "#00ff00",
					"tags": null,
					"detailsBase": null
				},
				"xDetail": {
					"id": "3700D58A516430F9160B026A0E133CE0",
					"oi": null,
					"version": 0,
					"type": "TAMANHO",
					"subType": null,
					"description": "Tamanho(36-56)",
					"value": "40",
					"valueRef": null,
					"tags": null,
					"detailsBase": null
				},
				"enable": true,
				"price": 300
			},
			{
				"yDetail": {
					"id": "3700D5683CDFA028985D026A0E133CE0",
					"oi": null,
					"version": 0,
					"type": "COR",
					"subType": null,
					"description": "Nude",
					"value": "Nude",
					"valueRef": "#ebc8b2",
					"tags": null,
					"detailsBase": null
				},
				"xDetail": {
					"id": "3700D58FE06D109D3A21026A0E133CE0",
					"oi": null,
					"version": 0,
					"type": "TAMANHO",
					"subType": null,
					"description": "Tamanho(36-56)",
					"value": "42",
					"valueRef": null,
					"tags": null,
					"detailsBase": null
				},
				"enable": true,
				"price": 300
			},
			{
				"yDetail": {
					"id": "3700D5683DF1103DD33F026A0E133CE0",
					"oi": null,
					"version": 0,
					"type": "COR",
					"subType": null,
					"description": "Verde Limão",
					"value": "Verde Limão",
					"valueRef": "#00ff00",
					"tags": null,
					"detailsBase": null
				},
				"xDetail": {
					"id": "3700D58FE06D109D3A21026A0E133CE0",
					"oi": null,
					"version": 0,
					"type": "TAMANHO",
					"subType": null,
					"description": "Tamanho(36-56)",
					"value": "42",
					"valueRef": null,
					"tags": null,
					"detailsBase": null
				},
				"enable": true,
				"price": 300
			},
			{
				"yDetail": {
					"id": "3700D5683CDFA028985D026A0E133CE0",
					"oi": null,
					"version": 0,
					"type": "COR",
					"subType": null,
					"description": "Nude",
					"value": "Nude",
					"valueRef": "#ebc8b2",
					"tags": null,
					"detailsBase": null
				},
				"xDetail": {
					"id": "3700D58A6E13F0E5A26D026A0E133CE0",
					"oi": null,
					"version": 0,
					"type": "TAMANHO",
					"subType": null,
					"description": "Tamanho(36-56)",
					"value": "44",
					"valueRef": null,
					"tags": null,
					"detailsBase": null
				},
				"enable": true,
				"price": 300
			},
			{
				"yDetail": {
					"id": "3700D5683DF1103DD33F026A0E133CE0",
					"oi": null,
					"version": 0,
					"type": "COR",
					"subType": null,
					"description": "Verde Limão",
					"value": "Verde Limão",
					"valueRef": "#00ff00",
					"tags": null,
					"detailsBase": null
				},
				"xDetail": {
					"id": "3700D58A6E13F0E5A26D026A0E133CE0",
					"oi": null,
					"version": 0,
					"type": "TAMANHO",
					"subType": null,
					"description": "Tamanho(36-56)",
					"value": "44",
					"valueRef": null,
					"tags": null,
					"detailsBase": null
				},
				"enable": true,
				"price": 300
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

		// $http.get('https://api-hom.mobiage.io/mobiage-api/api/sales-goal/dashboard?gumgaToken=511L518E1569847473353C156984568040000O516.517.518.I')
		// 	.then((response) => {
		// 		series.push({
		// 			type: 'column',
		// 			name: 'Valor vendido',
		// 			color: '#42CAF5',
		// 			data: meses
		// 		})

		// 		series = series.concat(metas.map((goal) => {
		// 			return {
		// 				type: 'spline',
		// 				color: '#541794',
		// 				name: goal.name,
		// 				data: goal.data.map((mes) => (mes.value * Math.random()) || 0),
		// 				marker: {
		// 					lineWidth: 2,
		// 					lineColor: '#541794',
		// 					fillColor: 'white'
		// 				}
		// 			}
		// 		}))

		// 		series.push({
		// 			type: 'pie',
		// 			name: 'Meta Anual',
		// 			data: [{
		// 				name: 'Meta',
		// 				y: 76700,
		// 			}, {
		// 				name: 'Progresso',
		// 				y: 18458,
		// 			}],
		// 			center: [100, -40],
		// 			size: 100,
		// 			showInLegend: false,
		// 			dataLabels: {
		// 				enabled: false
		// 			}
		// 		})

		// 		aaaaaaaaaaaaaaaaaaaa(series, meses.map((mes) => mes.name))

		// 	})

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
							type: 'barline',
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

		$scope.fetchSizes = () => {
			return genderJson
		}

		$scope.addDetail = (item) => {
			console.log(item)
		}

		$scope.hhhsss = (evt) => {
			console.log(evt)
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

		$scope.testecons = () => {
			console.log('asdihasoidashpid')
		}

	}])
angular.bootstrap(document, [module.name])

/* tslint:enable */
