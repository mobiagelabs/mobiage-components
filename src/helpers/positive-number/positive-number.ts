import * as angular from 'angular'

export class MbgPositiveNumber {
    private restrict: string
    private replace: boolean
    private scope: any

    constructor() {
        this.restrict = 'A'
        this.replace = true
        this.scope = {
            ngModel: '='
        }
    }

    link(scope, ele, attrs) {

        angular.element(ele)
            .on('keydown', (event) => {
                if (attrs.mbgPositiveNumber === 'true') {
                    if (event !== null && (event.keyCode === 189 || event.keyCode === 109)) {
                        event.stopPropagation()
                        event.preventDefault()
                    }
                }
            })
            .on('blur', (event) => {
                if (attrs.mbgPositiveNumber === 'true') {
                    if (scope.ngModel < 0) {
                        scope.ngModel = scope.ngModel * -1
                    }
                }
            })
    }

}

MbgPositiveNumber.$inject = ['$scope', '$compile']
