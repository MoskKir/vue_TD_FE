import axios from "axios";

export default {
    actions: {
        async addNewUser(ctx, user) {
            try {
                await axios.post("http://localhost:3003/api/users/", { 
                    login: user.login,
                    email: user.email,
                    password: user.password,
                });
            } catch (error) {
                console.error(error);
            }
        },
        async getUser(ctx, user) {
            try {
                const response = await axios.post("http://localhost:3003/api/users/auth", {
                    email: user.email,
                    password: user.password,
                }).catch(error => error)

                if (!response.data.userData || !response.data.token) {
                    throw new Error(response.data)
                }
                
                ctx.commit('updateUser', response.data.userData);
                ctx.commit('updateToken', response.data.token);

            } catch (error) {
                ctx.commit('setError', error);
            }
        },
        tryAutomaticLogin(ctx) {
            const user = JSON.parse(localStorage.getItem('user'));
            const token = localStorage.token;

            if (!user || !token) ctx.commit('logout');

            ctx.commit('updateUser', user);
            ctx.commit('updateToken', token);
        },
    },
    mutations: {
        updateUser(state, user) {
            localStorage.user = JSON.stringify(user);
            state.user = user;
        },
        updateToken(state, token) {
            localStorage.token = token;
            state.user.token = token;
        },
        setError(state, error) {
            state.error = error
        },
        logout(state) {
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            state.user = null;
        },
    },
    state: {
        user: null,
        token: null,
        error: null,        
    },
    getters: {
        getUserGetter(state) {
            return state.user;
        },
        getUserId(state) {
            if (state.user) return state.user.user_id;
            const guestUserId = 1;
            return guestUserId;          
        },
        getUserToken(state) {
            if (state.user !== null) return state.user.token;
            return null;
        },
        getErrorGetter(state) {
            return state.error
        }
    }
}