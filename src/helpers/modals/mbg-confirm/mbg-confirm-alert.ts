import './mbg-confirm-alert.scss'
import { ConfirmAlert } from '../../interfaces/confirm-alert'

class MbgCofirmAlertController {
	private isValidResult: boolean
	private inputValue: string

	constructor(
		public $scope,
		public $timeout,
		public $uibModalInstance,
		public config: ConfirmAlert
	) { }

	$onInit() {
		this.config.visibleCancel = this.config.visibleCancel !== undefined ? this.config.visibleCancel : true
	}

	close(confirm) {
		this.$timeout(async () => {
			if (this.config.invertContrast) { confirm = !confirm }
			if (this.config.inputValidate) {
				const isValidResult = await this.executeValidade()
				this.$timeout(() => {
					this.isValidResult = isValidResult
					if (this.isValidResult) { this.$uibModalInstance.close(this.inputValue) }
				})
			} else {
				this.$uibModalInstance.close(this.inputValue || confirm)
			}
		})
	}

	async executeValidade() {
		return this.config.inputValidate(this.inputValue)
	}

	dismiss() {
		this.$uibModalInstance.close(false)
	}
}

MbgCofirmAlertController['$inject'] = [
	'$scope',
	'$timeout',
	'$uibModalInstance',
	'config',
]

export { MbgCofirmAlertController }
