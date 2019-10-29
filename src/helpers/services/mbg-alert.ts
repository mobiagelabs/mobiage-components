import mbgCofirmTemplate from '../modals/mbg-confirm/mbg-confirm-alert.html'
import { MbgCofirmAlertController } from '../modals/mbg-confirm/mbg-confirm-alert'
import { ConfirmAlert } from '../interfaces/confirm-alert'

class MbgAlert {

	constructor(public $http, public $uibModal) { }

	async confirm(config: ConfirmAlert) {
		const modal = this.$uibModal.open({
			animation: true,
			template: mbgCofirmTemplate,
			controller: MbgCofirmAlertController,
			controllerAs: '$ctrl',
			windowClass: 'mbg-alert',
			backdrop: 'static',
			keyboard: false,
			size: 'md',
			resolve: {
				config: () => config,
			}
		})
		return modal.result
	}
}

MbgAlert['inject'] = ['$http', '$uibModal']

export { MbgAlert }
