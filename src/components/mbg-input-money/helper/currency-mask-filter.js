/* @ngInject */
export default function CurrencyMaskFilter ($mbgMasker) {
    var getDigestMode = function (mode) {
        switch(mode) {
            case 'mask':
                return 1;
                break;
            case 'unmask':
                return 2;
                break;
        }
    };

    var digestCurrency = function (currency) {
        if(currency === null || currency === 'default') {
            return null;
        } else {
            return currency;
        };
    };

    return function (input, mode, currency) {
        if(!input) {
            return '';
        }

        input = input.toString();

        // If there is no 'mode' defined. Mask the input.
        var mode = mode ? getDigestMode(mode) : getDigestMode('mask'),
        digestedCurrency = currency ? digestCurrency(currency) : digestCurrency(null);

        if(mode === 1) {
            var maskedValue = $mbgMasker.maskValue(input, digestedCurrency);

            return maskedValue;
        } else if (mode === 2) {
            return $mbgMasker.unmaskValue(input);
        };
    };
}
