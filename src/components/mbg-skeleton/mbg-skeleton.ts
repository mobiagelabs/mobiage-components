import './mbg-skeleton.scss'
import template from './mbg-skeleton.html'

export class MbgSkeletonController {

}

MbgSkeletonController.$inject = []

const mbgSkeleton = {
    bindings: {
        width: '@',
        height: '@',
        margin: '@'
    },
    template,
    controller: MbgSkeletonController,
}

export { mbgSkeleton }
