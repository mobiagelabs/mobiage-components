import './mbg-confirm-alert.scss'

class MbgCofirmAlertController {

	constructor(
		public $scope,
		public $timeout,
		public $uibModalInstance,
		public config
	) { }

	$onInit() {
		this.config.visibleCancel = this.config.visibleCancel !== undefined ? this.config.visibleCancel : true
	}

	close(confirm) {
		this.$uibModalInstance.close(confirm)
	}

	dismiss() {
		this.$uibModalInstance.dismiss()
	}
}

MbgCofirmAlertController['$inject'] = [
	'$scope',
	'$timeout',
	'$uibModalInstance',
	'config',
]

export { MbgCofirmAlertController }
