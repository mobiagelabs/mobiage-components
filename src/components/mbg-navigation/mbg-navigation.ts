import './mbg-navigation.scss'
import template from './mbg-navigation.html'

class MbgNavigationController {
    private getNavigation: Function
    private onItemClick: Function
    private navigation: Array<any>
    private breadcrumb: Array<any>
    private animated: any

    constructor(public $scope, public $element, public $attrs, public $timeout) { }

    $onInit() {
        this.animated = {}
        this.breadcrumb = []
        this.handleNavigation(null)
    }

    handleNavigation(item) {
        if (item && item.type === 'PRODUCT_ITEM') {
            return this.handleClickItem(item)
        }
        if (item) { this.breadcrumb.push(item) }
        this.getNavigation({ item })
            .then((response) => {
                this.navigation = response.data
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
        onItemClick: '&'
    },
    template,
    controller: MbgNavigationController,
}

export { mbgNavigation }
