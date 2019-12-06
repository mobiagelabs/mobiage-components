import { MbgTypeAlert } from '../enums/mbg-type-alert'
import { MbgInputType } from '../enums/mbg-input-type'

export interface ConfirmAlert {
	type: MbgTypeAlert,
	title: string,
	message?: string,
	textConfirm?: string,
	textCancel?: string,
	visibleCancel?: boolean,
	tip?: string,
	enableInput?: boolean,
	inputType?: MbgInputType,
	inputPlaceholder?: string,
	invertContrast?: boolean,
	inputValidate?: any
}
