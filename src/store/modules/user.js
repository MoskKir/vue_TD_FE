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
                });
                
                ctx.commit('updateUser', response.data.userData);
                ctx.commit('updateToken', response.data.token);

            } catch (error) {
                console.error(error);
            }
        },
    },
    mutations: {
        updateUser(state, user) {
            state.user = user;
        },
        updateToken(state, token) {
            localStorage.token = token;
            state.user.token = token;
        }
    },
    state: {
        user: {
                "user_id": 1,
                "login": "root",
                "email": "root@root.com",
                "password": "toor",
                "token": ""
            }
    },
    getters: {
        getUser(state) {
            return state.user;
        },
        getUserId(state) {
            return state.user.user_id;
        }
    }
}