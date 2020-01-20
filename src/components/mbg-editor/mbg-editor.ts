import './mbg-editor.scss'
import template from './mbg-editor.html'

import { enableRipple, L10n } from '@syncfusion/ej2-base'

import { DocumentEditorContainer, Toolbar } from '@syncfusion/ej2-documenteditor'
import { TitleBar } from './mbg-title-bar'
import * as data from './data-default.json'
import * as ptbr from './pt-br.json'

export class MbgEditorController {

    constructor(public $element, public $timeout) { }

    $onInit() {
        this.$timeout(() => {
            L10n.load(ptbr)
            let hostUrl: string = 'https://ej2services.syncfusion.com/production/web-services/'
            let container: DocumentEditorContainer = new DocumentEditorContainer({
                enableToolbar: true,
                locale: 'pt',
                enableLocalPaste: true
            })
            DocumentEditorContainer.Inject(Toolbar)
            container.appendTo('#container')
            container.serviceUrl = hostUrl + 'api/documenteditor/'
            let titleBar: TitleBar = new TitleBar(document.getElementById('documenteditor_titlebar'), container.documentEditor, true)
            container.documentEditor.open(JSON.stringify((<any>data)))
            container.documentEditor.documentName = 'Editar contrato'
            titleBar.updateDocumentTitle()

            container.documentChange = (): void => {
                titleBar.updateDocumentTitle()
                container.documentEditor.focusIn()
            }
        })
    }

}

MbgEditorController.$inject = ['$element', '$timeout']

const mbgEditor = {
    bindings: {},
    template,
    controller: MbgEditorController,
}

export { mbgEditor }
