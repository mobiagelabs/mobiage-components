export class MbgOnScroll {
    private restrict: string

    constructor() {
        this.restrict = 'A'
    }

    controller($scope, $parse) {
        $scope.$parse = $parse
    }

    link(scope, ele, attrs) {
        const expressionHandler = scope.$parse(attrs.mbgOnScroll)
        ele.on('scroll', ($event) => expressionHandler(scope, { $event }))
    }

}

MbgOnScroll.$inject = ['$scope', '$parse']
