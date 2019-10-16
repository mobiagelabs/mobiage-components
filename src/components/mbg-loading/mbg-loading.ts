import './mbg-loading.scss'
import template from './mbg-loading.html'
import * as angular from 'angular'

class MbgLoadingController {
    private config

    $onInit() {
        this.config = angular.merge({}, {
            width: '100px',
            height: '100px'
        }, this.config)
        if (this.config.color) {
            if (this.config.color.includes('var')) {
                const variableColor = this.config.color.replace('var(', '').replace(')', '')
                this.config.color = getComputedStyle(document.body).getPropertyValue(variableColor)
                return
            }
            return
        }
        this.config.color = getComputedStyle(document.body).getPropertyValue('--primary')
    }
}

const mbgLoading = {
    bindings: {
        config: '=?'
    },
    template,
    controller: MbgLoadingController,
}

export { mbgLoading }
