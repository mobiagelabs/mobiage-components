import './mbg-editor.scss'
import template from './mbg-editor.html'

import { L10n } from '@syncfusion/ej2-base'

import { DocumentEditorContainer, Toolbar } from '@syncfusion/ej2-documenteditor'
import { TitleBar } from './mbg-title-bar'
import * as ptbr from './pt-br.json'

export class MbgEditorController {
    private config: any
    private container: DocumentEditorContainer

    constructor(public $element, public $timeout) { }

    $onInit() {
        this.$timeout(() => {
            this.config = this.config || {}
            this.config.params = this.config.params || {}
            L10n.load(ptbr)
            let hostUrl: string = 'https://ej2services.syncfusion.com/production/web-services/'
            this.container = new DocumentEditorContainer({
                enableToolbar: !this.config.preview,
                restrictEditing: this.config.preview,
                locale: 'pt',
                enableLocalPaste: true
            })
            DocumentEditorContainer.Inject(Toolbar)
            this.container.appendTo('#container')
            this.container.serviceUrl = hostUrl + 'api/documenteditor/'
            let titleBar: TitleBar = new TitleBar(document.getElementById('documenteditor_titlebar'), this.container.documentEditor, true, null, this.onSave)
            if (this.config.document) {
                let documentJson = JSON.stringify(this.config.document)
                if (this.config.preview) {
                    Object.keys(this.config.params).forEach((paramKey) => {
                        documentJson = this.replaceAll(documentJson, `<<${paramKey}>>`, this.config.params[paramKey])
                    })
                }
                this.container.documentEditor.open(documentJson)
            }
            this.container.documentEditor.documentName = 'Editar contrato'
            titleBar.updateDocumentTitle()

            this.container.documentChange = (): void => {
                titleBar.updateDocumentTitle()
                this.container.documentEditor.focusIn()
            }
        })
    }

    $onDestroy() {
        this.container.destroy()
    }

    replaceAll = (str, needle, replacement) => {
        return str.split(needle).join(replacement)
    }

    onSave = (json) => {
        if (this.config.onSave) {
            this.config.onSave(json)
        }
    }

}

MbgEditorController.$inject = ['$element', '$timeout']

const mbgEditor = {
    bindings: {
        config: '=?',
    },
    template,
    controller: MbgEditorController,
}

export { mbgEditor }
