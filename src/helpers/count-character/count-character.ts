import * as angular from 'angular'

export class NgCountCharacter {
    private restrict: string
    private replace: boolean
    private scope: any
    private $timeout
    private $parse

    constructor() {
        this.restrict = 'A'
        this.replace = true
        this.scope = false
    }

    controller = ($timeout, $parse) => {
        this.$timeout = $timeout
        this.$parse = $parse
    }

    link(scope, elm, attrs) {
        elm.addClass('count-character')
        const element = getElement()
        const onPast = (evt) => {
            this.$timeout(() => {
                let inputElement = getElement()
                if (inputElement) {
                    const scopeElement = angular.element(inputElement).scope()
                    const modelGetter = this.$parse(inputElement.getAttribute('ng-model'))
                    const modelSetter = modelGetter.assign
                    modelSetter(scopeElement, inputElement.value.substring(0, attrs.maxCharacter))
                }
            })
        }

        if (element) {
            element.addEventListener('keydown', onKeyDown)
            element.addEventListener('keyup', keyup)
            element.addEventListener('paste', onPast)
            setTimeout(() => handleCount())
        }

        function onKeyDown(evt) {
            let inputElement = getElement()
            handleCount()
            if (inputElement.value.length >= attrs.maxCharacter && evt.keyCode !== 8) {
                evt.stopPropagation()
                evt.preventDefault()
            }
        }

        function keyup(evt) {
            handleCount()
        }

        function getElement() {
            if (elm.find('input').length > 0) {
                return elm.find('input')[0]
            }
            if (elm.find('textarea').length > 0) {
                return elm.find('textarea')[0]
            }
        }

        function handleCount() {
            let inputElement = getElement()
            const value = inputElement && inputElement.value ? inputElement.value : ''
            if (attrs.maxCharacter !== undefined) {
                elm.attr('count-character', `${value.length}/${attrs.maxCharacter}`)
            } else {
                elm.attr('count-character', `${value.length}`)
            }
        }

        scope.$on('$destroy', () => {
            element.removeEventListener('keydown', onKeyDown)
            element.addEventListener('keyup', keyup)
            element.removeEventListener('paste', onPast)
        })
    }





}

NgCountCharacter['$inject'] = ['$timeout', '$parse']
