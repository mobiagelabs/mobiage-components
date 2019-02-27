class Paginator {
    private pageSize
    private pageRangeDisplayed

    constructor(pageSize, pageRangeDisplayed) {
        this.pageSize = pageSize || 10
        this.pageRangeDisplayed = pageRangeDisplayed || 10
    }

    build(count, activePage) {
        // We want the number of pages, rounded up to the nearest page.
        const totalPages = Math.ceil(count / this.pageSize)
        // Ensure both count and activePage are treated as Numbers
        count = parseInt(count, 10)
        activePage = parseInt(activePage, 10) || 1
        // Obviously we can't be on a negative or 0 page.
        if (activePage < 1) { activePage = 1 }
        // If the user has done something like /page/99999 we want to clamp that back
        // down.
        if (activePage > totalPages) { activePage = totalPages }
        // This is the first page to be displayed as a numbered link.
        let firstPage = Math.max(1, activePage - Math.floor(this.pageRangeDisplayed / 2))
        // And here's the last page to be displayed specifically.
        let lastPage = Math.min(totalPages, activePage + Math.floor(this.pageRangeDisplayed / 2))
        // This is triggered if we're at or near one of the extremes; we won't have
        // enough page links. We need to adjust our bounds accordingly.
        if (lastPage - firstPage + 1 < this.pageRangeDisplayed) {
            if (activePage < (totalPages / 2)) {
                lastPage = Math.min(totalPages, lastPage + (this.pageRangeDisplayed - (lastPage - firstPage)))
            } else {
                firstPage = Math.max(1, firstPage - (this.pageRangeDisplayed - (lastPage - firstPage)))
            }
        }
        // This can be triggered if the user wants an odd number of pages.
        if (lastPage - firstPage + 1 > this.pageRangeDisplayed) {
            if (activePage > (totalPages / 2)) {
                firstPage++
            } else {
                lastPage--
            }
        }
        // First result on the page. This, along with the field below, can be used to
        // do "showing x to y of z results" style things.
        let firstResult = this.pageSize * (activePage - 1)
        if (firstResult < 0) { firstResult = 0 }

        // Last result on the page.
        let lastResult = (this.pageSize * activePage) - 1
        if (lastResult < 0) { lastResult = 0 }
        if (lastResult > Math.max(count - 1, 0)) { lastResult = Math.max(count - 1, 0) }

        // GIMME THAT OBJECT
        return {
            totalPages: totalPages,
            pages: Math.min(lastPage - firstPage + 1, totalPages),
            activePage: activePage,
            firstPage: firstPage,
            lastPage: lastPage,
            previousPage: activePage - 1,
            nextPage: activePage + 1,
            hasPreviousPage: activePage > 1,
            hasNextPage: activePage < totalPages,
            count: count,
            results: Math.min(lastResult - firstResult + 1, count),
            firstResult: firstResult,
            lastResult: lastResult,
        }
    }

}

export { Paginator }
