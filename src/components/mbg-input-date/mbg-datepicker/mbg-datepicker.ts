declare let $

export class MbgDatepicker {
    private restrict: string
    private replace: boolean
    private require: Array<string>
    private scope: any

    constructor() {
        this.restrict = 'A'
        this.replace = true
        this.require = ['?ngModel']
        this.scope = {
            ngModel: '=',
            onSelect: '&?',
        }
    }

    link = (scope, ele, attrs, controllers, $timeout) => {

        $.fn.datepicker.languages['pt-BR'] = {
            format: 'dd/MM/yyyy',
            days: ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'],
            daysShort: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'],
            daysMin: ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'],
            months: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
            monthsShort: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
            weekStart: 1,
            startView: 0,
            yearFirst: false,
            yearSuffix: ''
        }

        $(ele[0]).blur(() => {
            setTimeout(() => $(ele[0]).datepicker(`hide`), 100)
        })

        $(ele[0]).datepicker({ language: 'pt-BR', date: scope.ngModel })

        $(ele[0]).on('pick.datepicker', function (e) {
            scope.ngModel = e.date
            $(ele[0]).datepicker(`hide`)
            if (scope.onSelect) { scope.onSelect() }
        })

        scope.$watch(`ngModel`, () => {
            $(ele[0]).datepicker(`update`)
        })

        scope.$on(`$destroy`, () => {
            $(ele[0]).datepicker(`destroy`)
        })
    }

}

MbgDatepicker.$inject = []
