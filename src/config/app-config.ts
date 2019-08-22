const appConfig = (
    $animateProvider
) => {
    $animateProvider.classNameFilter(/angular-animate/)
}

appConfig.$inject = [
    '$animateProvider'
]

export { appConfig }