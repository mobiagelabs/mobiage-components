

const mbgInputMoneyDirective = ($filter, $timeout) => {
    return {
        require: 'ngModel',
        scope: {
            ngModel: '=',
            ngChange: '&?',
        },
        restrict: 'A',
        link: function (scope, elem, attr, ngModel) {
            console.log('ma oeeeeeeeeeeeeee')
            $timeout(() => {
                // $(elem).maskMoney()

                function decimalRex(dChar) {
                    return RegExp('\\d|\\-|\\' + dChar, 'g')
                }

                function clearRex(dChar) {
                    return RegExp('\\-{0,1}((\\' + dChar + ')|([0-9]{1,}\\' + dChar + '?))&?[0-9]{0,2}', 'g')
                }

                function clearValue(value) {
                    let val = String(value)
                    let decimal = 'decimal'
                    let dSeparator = attr[decimal]
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
                    let prefix = 'prefix'
                    return attr[prefix]
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
            })
        }

    }
}

mbgInputMoneyDirective.$inject = ['$filter', '$timeout']

export { mbgInputMoneyDirective }
