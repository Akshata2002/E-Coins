export const getUserTransactions = async (userId, token) => {

    try {
        const res = await fetch(`${import.meta.env.VITE_APP_BACKEND_URL}/transaction/getusertransactionhistory`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            },

        });
        const data = await res.json();
        if (res.status === 200) {
            return { status: 200, data }

        }
        return { status: res.status, msg: data.message }

    } catch (err) {
        return { status: 500, msg: err.message }
    }
}


export const getAllUsers = async (token) => {

    try {
        const res = await fetch(`${import.meta.env.VITE_APP_BACKEND_URL}/user/getusers`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            },

        });
        const data = await res.json();
        if (res.status === 200) {
            return { status: 200, data }

        }
        return { status: res.status, msg: data.message }

    } catch (err) {
        return { status: 500, msg: err.message }
    }
}

export const transferEcoins = async (formData, token) => {

    try {
        const res = await fetch(`${import.meta.env.VITE_APP_BACKEND_URL}/transaction/sendecoins`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify(formData)
        });
        const data = await res.json();
        if (res.status === 200) {
            return { status: 200, data }

        }
        return { status: res.status, msg: data.message }

    } catch (err) {
        return { status: 500, msg: err.message }
    }
}

export const topUsers = async (token) => {

    try {
        const res = await fetch(`${import.meta.env.VITE_APP_BACKEND_URL}/user/topusers`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            },

        });
        const data = await res.json();
        if (res.status === 200) {
            return { status: 200, data }

        }
        return { status: res.status, msg: data.message }

    } catch (err) {
        return { status: 500, msg: err.message }
    }
}

export const getCoinsGainedAndLost = async (token) => {

    try {
        const res = await fetch(`${import.meta.env.VITE_APP_BACKEND_URL}/user/coinsgainedandlossed`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            },

        });
        const data = await res.json();
        if (res.status === 200) {
            return { status: 200, data }

        }
        return { status: res.status, msg: data.message }

    } catch (err) {
        return { status: 500, msg: err.message }
    }
}
