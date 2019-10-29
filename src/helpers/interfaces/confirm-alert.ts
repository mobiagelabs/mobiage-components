import { MbgTypeAlert } from '../enums/mbg-type-alert'

export interface ConfirmAlert {
	type: MbgTypeAlert,
	title: string,
	message?: string,
	textConfirm?: string,
	textCancel?: string,
	visibleCancel?: boolean,
	tip?: string,
	enableInput?: boolean,
	invertContrast?: boolean
}
