/* @ngInject */
export default function CurrencyMaskDirective($mbgMasker, $timeout) {
    return {
        restrict: 'A',
        require: ['?ngModel'],
        link: function (scope, element, attrs, controllers) {
            var ngModel = controllers[0],
                currency = !attrs.currency ? null : attrs.currency,
                allowNegative = attrs.allowNegative === 'true',
                allowZero = attrs.allowZero === 'true'

            /**
             * Mask @value matching it contents.
             */
            function maskValue(value) {
                return $mbgMasker.maskValue(value, currency);
            }

            /**
             * Return @value to it real value.
             */
            function unmaskValue(value) {
                return $mbgMasker.unmaskValue(value);
            }

            /**
             * Parser who will be applied to the ngModel
             * before the goes to DOM. That is the real ngModel value.
             */
            ngModel.$parsers.push(function (value) {
                value = ((value || '').match(/[0-9]|\.|\,|\040|R|\$|\-/g) || []).join('')
                const isNegative = value.startsWith('-')
                let unmask = value.indexOf(currency) !== -1 ? unmaskValue(value) : value;
                if (unmask && isNegative && allowNegative) {
                    unmask = '-' + unmask
                }
                if (allowNegative && !unmask) {
                    unmask = '0'
                }
                if (unmask && value.indexOf(currency) === -1) {
                    unmask = Number(unmask) * 0.01
                }
                return parseFloat(unmask || '0')
            });

            /**
             * Everytime the input suffer a change,
             * the directive will update it and mask
             * all the typed content.
             */
            scope.$watch(attrs.ngModel, function (value) {
                processMask(value)
            }, true);

            const processMask = (value) => {
                value = (value + '')
                const isNegative = value.startsWith('-')
                if (!value || value.length < 1) {
                    value = '0'
                }
                if (value.length > 18) {
                    return
                }
                if (isNegative) {
                    value = value.replace('-', '')
                }
                var maskedValue = maskValue(value);
                if (isNegative && allowNegative) {
                    maskedValue = '-' + maskedValue
                }
                if (maskedValue !== value) {
                    ngModel.$setViewValue(maskedValue);
                    ngModel.$render();
                }
            }

            element.bind('paste', function (evt) {
                var clipboardData = evt.clipboardData || evt.originalEvent.clipboardData || window.clipboardData;
                var pastedData = clipboardData.getData('text');
                if (isNaN(pastedData)) {
                    evt.preventDefault();
                }
            });

            element.bind('keydown', function (evt) {
                const validLength = (evt.keyCode == 8 || evt.keyCode >= 27 && evt.keyCode <= 40)
                const isValid = (evt.keyCode >= 48 && evt.keyCode <= 57)
                    || (evt.keyCode >= 96 && evt.keyCode <= 105)
                    || (evt.keyCode >= 37 && evt.keyCode <= 40)
                    || (evt.keyCode == 8 || evt.keyCode == 13)
                    || (evt.keyCode == 9)

                    
                if (!validLength && unmaskValue(evt.target.value).length > 17) {
                    evt.stopPropagation();
                    evt.preventDefault()
                    return
                }
                if (!isValid) {
                    evt.preventDefault()
                    return
                }
                /** pega o codigo da tecla */
                var charCode = evt.charCode;
                var keyCode = evt.which || evt.keyCode;
                keyCode = Number(evt.keyCode)

                if (keyCode == 48) {
                    let unmask = unmaskValue(evt.target.value);
                    if (!unmask) {
                        $timeout(() => processMask(''))
                    }
                }

                /** verifica se digitei - e muda para negativo */
                if (keyCode == 45 || keyCode == 189) {
                    evt.preventDefault();
                    evt.stopPropagation();
                    const isNegative = evt.target.value.startsWith('-')
                    if (!isNegative && allowNegative) {
                        let value = unmaskValue(evt.target.value)
                        if (!value) {
                            value = '0'
                        }
                        processMask('-' + value)
                    }
                }
                /** verifica se digitei + e muda para positivo */
                if (keyCode == 43 || keyCode == 187) {
                    evt.preventDefault();
                    evt.stopPropagation();
                    const isNegative = evt.target.value.startsWith('-')
                    if (isNegative && allowNegative) {
                        let value = evt.target.value.replace('-', '+')
                        if (!value) {
                            value = '0'
                        }
                        processMask(unmaskValue(value))
                    }
                }

                if ((evt.ctrlKey && keyCode == 118) || charCode == 0) {
                    return;
                }

                if (keyCode < 48 || keyCode > 57) {
                    evt.preventDefault();
                }
            });
        }
    };
}
