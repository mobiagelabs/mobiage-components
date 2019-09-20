import { detect } from 'detect-browser'

export class AutocompleteOff {
  private restrict: string
  private replace: boolean

  constructor() {
    this.restrict = 'A'
    this.replace = true
  }

  controller($scope, $timeout) {
    $scope.$timeout = $timeout
  }

  link(scope, ele, attrs) {
    const navigatorData = detect()
    navigatorData.currentVersion = Number(navigatorData.version.substring(0, navigatorData.version.indexOf('.')))
    const autocompleteValue = navigatorData.name === 'chrome' && navigatorData.currentVersion > 65 ? 'disable' : 'off'
    ele[0].setAttribute('autocomplete', autocompleteValue)
    scope.$timeout(() => {
      Array.from(ele.find('input')).forEach((input: any) => {
        input.setAttribute('autocomplete', autocompleteValue)
      })
    })

  }

}

AutocompleteOff.$inject = ['$scope', '$timeout']
