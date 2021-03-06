import './mbg-multi-select.scss'
import template from './mbg-multi-select.html'
import * as angular from 'angular'
import { AbsPosition } from '../../helpers/abs-position'
import { ScrollAnimate } from '../../helpers/scroll-animate'

class MbgMultiSelectController {
    private ngModel: any
    private label: string
    private enableSort: boolean
    private liDragging: Element
    private liOver: Element
    private lastPageX
    private pageX
    private fetch: Function
    private searchModel
    private eventsFunctions
    private ngChange: Function
    private enableAdd: boolean

    constructor(public $scope, public $element, public $attrs, public $timeout) { }

    $onInit() {
        this.$scope.$watch('$ctrl.ngModel', () => {
            this.$timeout(() => this.handleEvents())
        }, true)
    }

    $onDestroy() {
        this.stopDragEvents()
    }

    handleEvents() {
        this.stopDragEvents()
        if (this.enableSort) { this.createDragEvents() }
    }

    verifyScroll() {
        this.$timeout(() => {
            const elm = angular.element(`.mbg-multi-select-scroll`)[0]
            this.$timeout(() => {
                ScrollAnimate.scrollLeftTo(elm, elm.scrollWidth, 350)
            }, 100)
        })
    }

    onSelect() {
        this.$timeout(() => {
            if (this.searchModel) {
                this.ngModel = this.ngModel || []
                if (this.ngModel && typeof this.ngModel[0] === 'string') {
                    if (this.ngModel.filter((v) => v.toLowerCase() === this.searchModel.toLowerCase()).length === 0) {
                        this.ngModel.push(this.searchModel)
                    }
                } else {
                    this.ngModel.push(this.searchModel)
                }
                this.verifyScroll()
                this.$timeout(() => delete this.searchModel)
                if (this.ngChange) {
                    this.ngChange()
                }
            }
        })
    }

    remoteItem(index) {
        this.ngModel.splice(index, 1)
        this.verifyScroll()
        this.$timeout(() => {
            if (this.ngChange) {
                this.ngChange()
            }
        })
    }

    stopDragEvents() {
        if (this.eventsFunctions) {
            Array.from(this.$element.find('ul.items-selected li')).forEach((liElement: HTMLElement) => {
                liElement.removeEventListener('dragstart', this.eventsFunctions.dragStart, false)
                liElement.removeEventListener('drag', this.eventsFunctions.drag, false)
                liElement.removeEventListener('dragend', this.eventsFunctions.dragend, false)
                liElement.removeEventListener('dragover', this.eventsFunctions.dragover, false)
            })
        }
    }

    createDragEvents() {
        this.$timeout(() => {
            Array.from(this.$element.find('ul.items-selected li')).forEach((liElement: HTMLElement) => {
                this.eventsFunctions = {
                    dragStart: (e) => this.onDragStart(e),
                    drag: (e) => this.onDrag(e),
                    dragend: (e) => this.onDragEnd(e),
                    dragover: (e) => this.onDragOver(e),
                }
                liElement.addEventListener('dragstart', this.eventsFunctions.dragStart, false)
                liElement.addEventListener('drag', this.eventsFunctions.drag, false)
                liElement.addEventListener('dragend', this.eventsFunctions.dragend, false)
                liElement.addEventListener('dragover', this.eventsFunctions.dragover, false)
            })
        })
    }

    appendBefore(element, elementToInsert) {
        element.parentNode.insertBefore(elementToInsert, element)
    }

    appendAfter(element, elementToInsert) {
        element.parentNode.insertBefore(elementToInsert, element.nextSibling)
    }

    onDrag(evt: any) {
        if (!this.liDragging) { return }
        if (evt.pageX !== 0) { this.pageX = evt.pageX }
        if (this.liDragging && this.liOver && this.pageX > 0) {
            const overPageX = AbsPosition.get(this.liOver).left + (this.liOver.clientWidth / 2)
            if (this.pageX <= overPageX) {
                if (this.lastPageX !== this.pageX) {
                    if (this.liOver.previousElementSibling === this.liDragging && this.liDragging.previousElementSibling) {
                        this.$timeout(() => this.liOver = this.liDragging.previousElementSibling)
                    } else {
                        this.appendBefore(this.liOver, this.liDragging)
                        this.onMoveElements()
                    }
                }
            } else {
                if (this.lastPageX !== this.pageX) {
                    if (this.liOver.nextElementSibling === this.liDragging && this.liDragging.nextElementSibling) {
                        this.$timeout(() => this.liOver = this.liDragging.nextElementSibling)
                    } else {
                        this.appendAfter(this.liOver, this.liDragging)
                        this.onMoveElements()
                    }
                }
            }
        } else if (this.pageX > 0) {
            const draggingPageX = AbsPosition.get(this.liDragging).left + (this.liDragging.clientWidth / 2)
            const pageX = this.pageX
            if (pageX <= draggingPageX && this.liDragging.previousElementSibling) {
                this.liOver = this.liDragging.previousElementSibling
            } else if (this.liDragging.nextElementSibling) {
                this.liOver = this.liDragging.nextElementSibling
            }
        }
        this.lastPageX = this.pageX
    }

    onDragStart(evt: any) {
        delete this.liDragging
        delete this.liOver
        const elm: any = evt.toElement || evt.srcElement
        if (elm.nodeName !== 'LI') {
            evt.stopPropagation()
            evt.preventDefault()
            return
        }
        this.liDragging = elm
        evt.dataTransfer.effectAllowed = 'move'
        evt.dataTransfer.setData('text/plain', 'dragging')
        this.liDragging.classList.add('dragging')
    }

    onDragEnd(evt: any) {
        if (!this.liDragging) { return }
        evt.dataTransfer.effectAllowed = 'none'
        this.liDragging.classList.remove('dragging')
        delete this.liDragging
        delete this.liOver
    }

    onDragOver(evt: any) {
        this.pageX = evt.pageX
        if (!this.liDragging) { return }
        const elm: any = evt.toElement || evt.srcElement
        if (elm.nodeName !== 'LI') {
            evt.stopPropagation()
            evt.preventDefault()
            return
        }
        const liOver: Element = elm
        if (this.liDragging !== liOver) {
            this.liOver = liOver
        }
    }

    onMoveElements() {
        this.$timeout(() => {
            this.ngModel = Array.from(this.$element.find('ul.items-selected li')).map((liElement: HTMLElement) => angular.element(liElement).scope().item)
        })
    }

}
MbgMultiSelectController.$inject = ['$scope', '$element', '$attrs', '$timeout']

const mbgMultiSelect = {
    bindings: {
        placeholder: '@?',
        fetch: '&?',
        ngModel: '=?',
        ngChange: '&?',
        enableAdd: '=?',
        enableSort: '=?',
        label: '@?',
        ngBlur: '&?',
        ngFocus: '&?'
    },
    template,
    controller: MbgMultiSelectController,
}

export { mbgMultiSelect }
