import './mbg-mindmap.scss'
import template from './mbg-mindmap.html'
import Buzzmap from '../../assets/buzzmap.js'
import * as angular from 'angular'
import { UtilUID } from '../../helpers/util-uid'

export class MbgMindmapController {
    public uid: string
    public transcludeTemplate
    public tree: Array<any>
    public loopKey: string
    public buzzmap
    public container
    public onClickEdit: Function
    public enableEdit: boolean
    public unsubscribe

    constructor(public $scope, public $element, public $attrs, public $timeout, public $transclude) { }

    $onInit() {
        this.uid = UtilUID.generete()
        this.findTransclude()
        this.unsubscribe = this.$scope.$watch('$ctrl.tree', () => {
            this.$timeout(() => this.createMap(), 1000)
        }, true)
    }

    $onDestroy() {
        if (this.buzzmap) {
            this.buzzmap.destroy()
        }
        this.unsubscribe()
    }

    createDefaultTemplate() {
        this.transcludeTemplate = `
            <div class="node-children">
                <label>{{ $item.name }}</label>
                <label class="document">CNPJ: {{ $item.cnpj }}</label>
                ${this.enableEdit ? `<div class="edit-wrapper">
                        <i class="far fa-edit"></i>
                        <a>Editar</a>
                    </div> ` : ``}
            </div>
        `
    }

    handleClickEdit(item) {
        this.$timeout(() => {
            if (this.onClickEdit) {
                this.onClickEdit({ $item: item })
            } else {
                throw 'Não foi informado a função de callback para a ação "editar" do componente mindmap.'
            }
        })
    }

    createEventClick() {
        this.$element.find('.node').on('click', (evt) => {
            const parent = angular.element(evt.target).closest('div.node')
            const parentIsEditWrapper = angular.element(evt.target).closest('div.edit-wrapper')
            if (parent && parentIsEditWrapper.length && !evt.target.classList.contains('edit-wrapper')) {
                this.handleClickEdit(parent[0].$item)
            }
        })
    }

    findTransclude() {
        this.$transclude(this.$scope, (cloneEl) => {
            angular.forEach(cloneEl, cl => {
                let element = angular.element(cl)[0]
                if (element.nodeName && element.nodeName === 'TEMPLATE') {
                    this.transcludeTemplate = element.innerHTML
                }
            })
            if (!this.transcludeTemplate) {
                this.createDefaultTemplate()
            }
        })
    }

    createMap() {
        if (this.buzzmap) {
            this.buzzmap.destroy()
        }
        this.container = this.$element.find('.mbg-mindmap-wrapper')
        this.buzzmap = Buzzmap(this.container, {
            structure: '.mbg-mindmap-structure',
            editable: false, // enable edit mode
            onchange: function (node, data) {  // if map is changed, save to localStorage
                // console.log(data)
            },
        })
        this.setInitialPosition()
        this.createEventClick()
    }

    setInitialPosition() {
        this.$timeout(() => {
            const nodes = this.buzzmap
                .nodes
                .filter((node) => node.visible)
            const parentWidth = this.container.width()
            const cardSize = (parentWidth / (nodes.length - 1))
            nodes.forEach((node, index) => {
                if (index === 0) { node.setPosition(parentWidth / 2, 10) } // inital center x
                if (index !== 0) {
                    const top = index === 1 || index === nodes.length - 1 ? 200 : 400
                    const left = (cardSize / 2) * (index)
                    node.setPosition(left, top)
                }
                node.updatePosition()
            })
        })
    }

}

MbgMindmapController.$inject = ['$scope', '$element', '$attrs', '$timeout', '$transclude']

const mbgMindmap = {
    transclude: true,
    bindings: {
        onClickEdit: '&?',
        enableEdit: '=?',
        tree: '=',
        loopKey: '@?',
    },
    template,
    controller: MbgMindmapController,
}

export { mbgMindmap }
