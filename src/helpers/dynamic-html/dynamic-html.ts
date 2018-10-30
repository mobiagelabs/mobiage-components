export class MbgDynamicHTML {
    private restrict: string
    private replace: boolean

    constructor() {
        this.restrict = 'A'
        this.replace = true
    }

    controller($scope, $compile) {
        $scope.$compile = $compile
    }

    link(scope, ele, attrs) {
        scope.$watch(attrs.mbgDynamicHtml, (html) => {
            ele.html(html)
            scope.$compile(ele.contents())(scope)
        })
    }

}

MbgDynamicHTML.$inject = ['$scope', '$compile']
