export namespace MbgCookie {
    const getKeyCookie = (key: string) => {
        let user: any = localStorage.getItem('user')
        if (user) {
            user = JSON.parse(user)
            return (user.organizationHierarchyCode || '') + 'preference-' + key
        } else {
            return 'preference-' + key
        }
    }
    const getCookie = (key) => {
        key = getKeyCookie(key)
        const nameEQ = key + '='
        const ca = document.cookie.split(';')
        for (let i = 0; i < ca.length; i++) {
            let c = ca[i]
            while (c.charAt(0) === ' ') {
                c = c.substring(1, c.length)
            }
            if (c.indexOf(nameEQ) === 0) {
                return c.substring(nameEQ.length, c.length)
            }
        }
        return null
    }
    export function set(key: string, val: any) {
        const value = JSON.stringify({ value: val })
        key = getKeyCookie(key)
        let expires = ''
        const date = new Date()
        date.setTime(date.getTime() + (9999 * 24 * 60 * 60 * 1000))
        expires = '; expires=' + date.toUTCString()
        document.cookie = key + '=' + (value || '') + expires + '; path=/'
    }
    export function get(key: string) {
        const value = getCookie(key)
        try {
            return JSON.parse(value).value
        } catch (e) {
            return null
        }
    }
}
