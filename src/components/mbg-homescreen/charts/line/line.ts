import * as Highcharts from 'highcharts'
import * as ExportChart from 'highcharts/modules/exporting'
import './line.scss'
import template from './line.html'

ExportChart(Highcharts)

class MbgChartLineController {
    public intervalFunctions = []
    public hasData: any
    public countUpdates = 0
    public chart

    constructor(public $scope, public $element, public $attrs, public $timeout) { }

    $onInit() {
        this.render()
    }

    updateSerie(chartInstance, serie, index) {
        serie.data = [0]
        if (serie) {
            serie.sync({
                setValue: (value) => {
                    chartInstance.series[index].setData(value)
                    this.countUpdates++
                }
            })
        }
    }

    render() {
        const chartInstance = Highcharts.chart(this.$element[0].querySelector('.home-chart'), this.getHighchartConfig())
        this.hasData = () => {
            const finds = chartInstance.series.reduce((value, serie) => {
                return value + serie.data.length
            }, 0) > 0
            return finds
        }
        if (this.chart && this.chart.series) {
            this.chart.series.forEach((serie, index) => {
                this.updateSerie(chartInstance, serie, index)
            })
        }
    }

    realMerge(to, from) {
        for (let n in from) {
            if (typeof to[n] !== 'object') {
                to[n] = from[n]
            } else if (typeof from[n] === 'object') {
                to[n] = this.realMerge(to[n], from[n])
            }
        }
        return to
    }

    getHighchartConfig() {
        const configDefault = {
            chart: {
                type: 'areaspline',
                spacingLeft: 34,
                spacingBottom: 34,
                // margin: [0, -12, 0, -12],
                backgroundColor: 'transparent'
            },
            exporting: {
                enabled: false
            },
            title: {
                style: {
                    color: '#aaabaa',
                    fontWeight: '400',
                    fontSize: '17px',
                },
                text: this.chart.chartTitle || ''
            },
            lang: {
                noData: 'Não há dados no momento'
            },
            yAxis: {
                title: {
                    enabled: false
                },
                gridLineColor: 'rgba(220, 220, 220, 0.2)',
                gridZIndex: 4,
                labels: {
                    enabled: true,
                    align: 'left',
                    style: {
                        color: '#ababab',
                        fontWeight: 'bold',
                        fontFamily: '"Montserrat", sans-serif',
                    },
                    x: -10,
                    y: 30
                }
            },
            xAxis: {
                enabled: true,
                lineWidth: 0,
                minorTickLength: 0,
                tickLength: 0,
                minorGridLineWidth: 0,
                lineColor: 'transparent',
                categories: this.chart.categories,
                title: {
                    enabled: true
                },
                labels: {
                    enabled: true
                },
            },
            plotOptions: {
                label: {
                    enabled: true
                },
            },
            credits: {
                enabled: false
            },
            tooltip: {
                borderRadius: 20,
                backgroundColor: this.chart.chartColor ? this.chart.chartColor.tooltip : '#00BDBE',
                borderWidth: 2,
                borderColor: this.chart.chartColor ? this.chart.chartColor.tooltip : '#00BDBE',
                shadow: true,
                style: {
                    color: 'white',
                    fontWeight: '400',
                    fontFamily: '"Montserrat", sans-serif',
                },
                headerFormat: '<span></span>'
            },
            legend: {
                enabled: true,
                align: 'right',
                verticalAlign: 'top',
                // y: -340,
                itemStyle: {
                    color: '#aaa',
                    pointerEvents: 'none',
                    textTransform: 'uppercase',
                    fontWeight: '400',
                    fontFamily: '"Montserrat", sans-serif',
                    verticalAlign: 'middle'
                },
                itemHoverStyle: {
                    color: '#aaa'
                },
                layout: 'horizontal',
                symbolRadius: 2,
                navigation: {
                    enabled: false
                }
            },
            series: [{
                type: 'areaspline',
                lineWidth: 0,
                color: this.chart.chartColor ? this.chart.chartColor.fillColor[0][1] : 'rgba(255,147,43,1)',
                lineColor: 'transparent',
                marker: {
                    enabled: false,
                    lineColor: '#fff',
                    lineWidth: 2
                },
                fillColor: {
                    linearGradient: [0, 0, 0, 400],
                    stops: this.chart.chartColor ? this.chart.chartColor.fillColor : [
                        [0, 'rgba(253,147,0,1)'],
                        [1, 'rgba(247,41,14,1)']
                    ]
                },
                name: ' ',
                data: []
            }
            ]
        }
        const self = this
        return this.realMerge(configDefault, {
            yAxis: {
                labels: {
                    formatter: function () {
                        return self.formatValue(this)
                    }
                }
            },
            tooltip: {
                useHTML: true,
                formatter: function () {
                    if (this.point.template) {
                        return this.point.template
                    }
                    return `` + self.formatValue({ value: this.y })
                }
            },
            series: []
        })
    }

    formatValue(context) {
        if (this.chart && this.chart.format === 'money') {
            return 'R$' + (context.value).toLocaleString('pt-BR')
        } else {
            return context.value
        }
    }

}

MbgChartLineController.$inject = ['$scope', '$element', '$attrs', '$timeout']

const mbgChartLine = {
    bindings: {
        chart: '=',
    },
    template,
    controller: MbgChartLineController,
}

export { mbgChartLine }
