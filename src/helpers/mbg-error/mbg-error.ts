export class MbgError {
  private restrict: string
  private scope: boolean
  private $timeout

  controller = ($timeout) => {
    this.$timeout = $timeout
    this.restrict = 'A'
    this.scope = false
  }

  link = (scope, elm, attrs) => {

    const addTooltip = () => {
      const trigger = attrs.mbgErrorTrigger || 'focus'
      elm.attr('data-tooltip', attrs.mbgErrorMessage || 'Essa informação é obrigatória.')
      elm.addClass('mbg-error-tooltip')
      elm.find('input').on(trigger === 'hover' ? 'mouseleave' : 'blur', handleDestroy)
    }

    const removeTooltip = () => {
      elm.removeAttr('data-tooltip')
      elm.removeClass('mbg-error-tooltip')
    }

    const handleCreate = () => addTooltip()

    const handleDestroy = () => {
      const trigger = attrs.mbgErrorTrigger || 'focus'
      removeTooltip()
      elm.find('input').off(trigger === 'hover' ? 'mouseleave' : 'blur', handleDestroy)
    }

    const onChangeModelError = () => {
      this.$timeout(() => {
        const hasError = scope.$eval(attrs.mbgError)
        const mbgErrorWhen = scope.$eval(attrs.mbgErrorWhen)
        const trigger = attrs.mbgErrorTrigger || 'focus'
        const formName = elm.closest('form').attr('name')
        if (formName) { scope[formName].$setValidity(attrs.mbgError, !hasError, window) }
        if (hasError && (!attrs.mbgErrorWhen || mbgErrorWhen)) {
          elm.find('input').addClass('mbg-error')
          elm.find('input').off(trigger === 'hover' ? 'mouseover' : 'focus', handleCreate)
          elm.find('input').on(trigger === 'hover' ? 'mouseover' : 'focus', handleCreate)
          if (elm.find('input').is(':focus')) { addTooltip() }
        } else {
          elm.find('input').off(trigger === 'hover' ? 'mouseover' : 'focus', handleCreate)
          elm.find('input').removeClass('mbg-error')
          removeTooltip()
        }
      })
    }

    const unWatchError = scope.$watch(attrs.mbgError, onChangeModelError)
    const unWatchWhen = scope.$watch(attrs.mbgErrorWhen, onChangeModelError)
    scope.$on('$destroy', () => {
      unWatchError()
      unWatchWhen()
    })
  }

}

MbgError.$inject = ['$timeout']
