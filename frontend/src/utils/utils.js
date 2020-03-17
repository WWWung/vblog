

export function toString(value) {
    return Object.prototype.toString.call(value)
}

export function setLocalStorage(name, value) {
    const {
        localStorage
    } = window
    localStorage.setItem(name, JSON.stringify(value))
}

export function getLocalStorage(name) {
    const {
        localStorage
    } = window
    const value = localStorage.getItem(name)
    try {
        return JSON.parse(value)
    } catch (error) {
        return value
    }
}

export function parseQueryString() {
    const url = window.document.location.href.toString();
    let u = url.split("?");
    if (typeof (u[1]) == "string") {
        u = u[1].split("&");
        const get = {};
        for (let i in u) {
            const j = u[i].split("=");
            get[j[0]] = j[1];
        }
        return get;
    } else {
        return {};
    }
}

export function tryLogin(back = false) {
    const toLoginHtml = () => {
        if (!back) {
            return
        }
        const {
            pathname
        } = window.location
        window.location.href = `/login.html?prevUrl=${pathname}`
    }
    const token = getLocalStorage('token')
    if (!token) {
        toLoginHtml()
    } else {
        return this.$get('/api/user/getUserInfo', false)
            .catch(err => {
                console.log(err)
                toLoginHtml()
            })
    }
}

export function dateFormat(date, fmt = "YYYY-mm-dd") {
    //  YYYY-mm-dd HH:MM
    date = new Date(date)
    let ret;
    const opt = {
        "Y+": date.getFullYear().toString(),        // 年
        "m+": (date.getMonth() + 1).toString(),     // 月
        "d+": date.getDate().toString(),            // 日
        "H+": date.getHours().toString(),           // 时
        "M+": date.getMinutes().toString(),         // 分
        "S+": date.getSeconds().toString()          // 秒
        // 有其他格式化字符需求可以继续添加，必须转化成字符串
    };
    for (let k in opt) {
        ret = new RegExp("(" + k + ")").exec(fmt);
        if (ret) {
            fmt = fmt.replace(ret[1], (ret[1].length == 1) ? (opt[k]) : (opt[k].padStart(ret[1].length, "0")))
        };
    };
    return fmt;
}