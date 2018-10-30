import './mbg-navigation.scss'
import template from './mbg-navigation.html'

class MbgNavigationController {
    private getNavigation: Function
    private onItemClick: Function
    private navigation: Array<any>
    private breadcrumb: Array<any>
    private animated: any
    private attrValue: string
    private submitted: boolean
    private isDisabledScroll: boolean
    private page: number

    constructor(public $scope, public $element, public $attrs, public $timeout) { }

    $onInit() {
        this.page = 1
        this.attrValue = this.attrValue || 'saleValue'
        this.animated = {}
        this.breadcrumb = []
        this.handleNavigation(null)
    }

    handleNavigation(item) {
        if (this.submitted) {
            return
        }
        this.page = 1
        this.submitted = true
        if (item && item.type === 'PRODUCT_ITEM') {
            this.submitted = false
            return this.handleClickItem(item)
        }
        if (item) { this.breadcrumb.push(item) }
        this.getNavigation({ item, page: this.page })
            .then((response) => {
                this.navigation = response.data
                this.submitted = false
            })
    }

    onScrollBottom() {
        if (this.isDisabledScroll) {
            return
        }
        this.page++
        this.isDisabledScroll = true
        const item = this.breadcrumb[this.breadcrumb.length - 1]
        this.getNavigation({ item, page: this.page })
            .then((response) => {
                this.isDisabledScroll = false
                this.navigation = this.navigation.concat(response.data)
            })
            .catch(() => {
                this.isDisabledScroll = false
            })
    }

    handleBreadcrumb(item, index) {
        this.breadcrumb.splice(index, this.breadcrumb.length)
        this.handleNavigation(item)
    }

    goToHome() {
        this.breadcrumb = []
        this.handleNavigation(null)
    }

    handleClickItem(item) {
        this.animated[item.id] = true
        this.$timeout(() => {
            this.animated[item.id] = false
        }, 500)
        this.onItemClick({ item })
    }

    getBackground(item) {
        const style = {}
        if (!item.files || item.files.length === 0) {
            style['background'] = '#dedede'
        } else {
            style['background'] = 'url(' + item.files[0].url + ') no-repeat center center / cover'
        }
        return style
    }

}

MbgNavigationController.$inject = ['$scope', '$element', '$attrs', '$timeout']

const mbgNavigation = {
    bindings: {
        getNavigation: '&',
        onItemClick: '&',
        attrValue: '@?',
        maxHeight: '@?'
    },
    template,
    controller: MbgNavigationController,
}

export { mbgNavigation }
