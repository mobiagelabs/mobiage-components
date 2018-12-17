const mbgInputMoneyDirective = ($filter, $timeout) => {
    return {
        require: 'ngModel',
        scope: {
            ngModel: '=',
            ngChange: '&?',
            decimal: '@',
            prefix: '@',
        },
        restrict: 'A',
        link: function (scope, elem, attrs, ngModel) {
            $timeout(() => {
                window['jQuery'](elem).maskMoney()
            })
            function decimalRex(dChar) {
                return RegExp('\\d|\\-|\\' + dChar, 'g')
            }

            function clearRex(dChar) {
                return RegExp('\\-{0,1}((\\' + dChar + ')|([0-9]{1,}\\' + dChar + '?))&?[0-9]{0,2}', 'g')
            }

            function clearValue(value) {
                let val = String(value)
                let decimal = 'decimal'
                let dSeparator = scope.decimal
                let cleared = null

                if (RegExp('^-[\\s]*$', 'g').test(val)) {
                    val = '-0'
                }

                if (decimalRex(dSeparator).test(val)) {
                    cleared = val.match(decimalRex(dSeparator)).join('').match(clearRex(dSeparator))
                    cleared = cleared ? cleared[0].replace(dSeparator, '.') : null
                }

                return cleared
            }

            function currencySymbol() {
                return scope.prefix
            }

            ngModel.$parsers.push(function (viewValue) {
                let cVal = clearValue(viewValue)
                return parseFloat(cVal)
            })

            elem.on('keyup', function (evt) {
                const formattedValue = evt.target.value
                scope.$apply(() => {
                    let cVal = parseFloat(clearValue(evt.target.value))
                    ngModel.$modelValue = evt.target.value
                    scope.ngModel = cVal
                    $timeout(() => {
                        evt.target.value = formattedValue
                        if (scope.ngChange) {
                            scope.ngChange({})
                        }
                    })
                })
            })

            ngModel.$formatters.unshift(function (value) {
                return $filter('currency')(value, currencySymbol())
            })
        }

    }
}

mbgInputMoneyDirective.$inject = ['$filter', '$timeout']

export { mbgInputMoneyDirective }
