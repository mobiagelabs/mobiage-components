export namespace ScrollAnimate {
  Math[`easeInOutQuad`] = function (t, b, c, d) {
    t /= d / 2
    if (t < 1) {
      return c / 2 * t * t + b
    }
    t--
    return -c / 2 * (t * (t - 2) - 1) + b
  }
  export function scrollLeftTo(element, to, duration) {
    let start = element.scrollLeft,
      change = to - start,
      currentTime = 0,
      increment = 20
    const animateScroll = function () {
      currentTime += increment
      const val = Math[`easeInOutQuad`](currentTime, start, change, duration)
      element.scrollLeft = val
      if (currentTime < duration) {
        setTimeout(animateScroll, increment)
      }
    }
    animateScroll()
  }

}
