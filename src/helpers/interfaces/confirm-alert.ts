import { MbgTypeAlert } from '../enums/mbg-type-alert'


export interface ConfirmAlert {
	title: string,
	message?: string,
	type: MbgTypeAlert,
	textConfirm?: string,
	textCancel?: string,
	visibleCancel?: boolean,
	tip?: string,
	enableInput?: boolean,
	invertContrast?: boolean
}
