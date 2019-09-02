import * as angular from 'angular'
import { MbgConnectionRetry } from '../components/mbg-connection-retry/mbg-connection-retry'

const appConfig = (
    $animateProvider,
    $httpProvider,
) => {
    $animateProvider.classNameFilter(/angular-animate/)
    $httpProvider.interceptors.push(['$q', ($q) => {
        return {
            responseError: (config) => {
                if (config.status === -1) {
                    const connectionRetry = angular.element(`mbg-connection-retry > div`).scope()
                    if (connectionRetry) {
                        const ctrl: MbgConnectionRetry = connectionRetry.$ctrl
                        if (ctrl.verifingCount === 0) {
                            ctrl.tryConnect()
                        }
                    }
                }
                return $q.reject(config)
            }
        }
    }])
}

appConfig.$inject = [
    '$animateProvider',
    '$httpProvider',
]

export { appConfig }
