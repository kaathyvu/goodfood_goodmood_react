let token = localStorage.getItem('token')

export const serverCalls = {
    get: async () => {
        const response = await fetch (`http://127.0.0.1:5000/api/recipes/${token}`, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                'x-access-type': `Bearer ${token}`
            }
        });
        if (! response.ok) {
            throw new Error('Failed to fetch data from server')
        }
        return await response.json()
    },

    getOne: async (id: any) => {
        const response = await fetch (`http://127.0.0.1:5000/api/recipes/${token}/${id}`, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                'x-access-type': `Bearer ${token}`
            }
        });
        if (! response.ok) {
            throw new Error('Failed to fetch data from server')
        }
        return await response.json()
    },

    create: async (data:any) => {
        console.log(data)
        const response = await fetch(`http://127.0.0.1:5000/api/recipes/${token}`, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
                'x-access-type': `Bearer ${token}`
            },
            body: JSON.stringify(data)
        });

        if (! response.ok) {
            throw new Error('Failed to create new data on server')
        }

        return await response.json()
    },

    update: async (id: string, data:any) => {
        const response = await fetch(`http://127.0.0.1:5000/api/recipes/${token}/${id}`, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
                'x-access-type': `Bearer ${token}`
            },
            body: JSON.stringify(data)
        });
    },

    delete: async (id: string) => {
        const response = await fetch (`http://127.0.0.1:5000/api/recipes/${token}/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-type': 'application/json',
                'x-access-type': `Bearer ${token}`
            },
        });
    }

}