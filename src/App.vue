<template>
    <v-app id="inspire">
        <v-navigation-drawer v-model="drawer" app right temporary>
            <v-list dense>
                <v-list-item>
                    <v-list-item-avatar>
                        <img
                            :src="
                                `https://randomuser.me/api/portraits/men/28.jpg`
                            "
                            alt=""
                        />
                    </v-list-item-avatar>
                    <v-list-item-title> User name </v-list-item-title>
                </v-list-item>

                <v-list-item link to="/">
                    <v-list-item-action>
                        <v-icon>fas fa-edit</v-icon>
                    </v-list-item-action>

                    <v-list-item-content>
                        <v-list-item-title>Todos</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>

                <v-list-item link to="/login">
                    <v-list-item-action>
                        <v-icon>mdi-email</v-icon>
                    </v-list-item-action>

                    <v-list-item-content>
                        <v-list-item-title>Login</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>

                <v-list-item link to="/calendar">
                    <v-list-item-action>
                        <v-icon>mdi-event</v-icon>
                    </v-list-item-action>

                    <v-list-item-content>
                        <v-list-item-title>Calendar</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
            </v-list>
        </v-navigation-drawer>

        <v-app-bar app dark>
            <v-toolbar-title class="nav-title" ref="mainTitle">
                <router-link class="router-link-title" to="/">
                    TODO Application
                </router-link>
            </v-toolbar-title>
            
            <div class="tabs-container" ref="tabs">
                <v-tabs dark>
                    <v-tab link to="/"> Todos</v-tab>
                    <v-tab link to="/calendar"> Calendar</v-tab>
                </v-tabs>
                
            </div>

            <v-spacer />

            <div v-if="getUserGetter">
                <v-list-item @click="isUserSelectShow = !isUserSelectShow">
                    <v-list-item-avatar>
                        <img
                            :src="`https://randomuser.me/api/portraits/men/28.jpg`"
                            alt=""
                        >
                    </v-list-item-avatar>
                    <v-list-item-title> {{ getUserGetter.login }} </v-list-item-title>
                </v-list-item>                
            </div>
            

            <div v-else class="" ref="singinBtn">
                <v-btn text link to="/auth/signin" >
                    Sign in
                </v-btn>

            </div>
            
            <UserSelect 
                v-if="isUserSelectShow" 
                @overlayClick="isUserSelectShow = $event"
            
            ></UserSelect>

            <!-- <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon> -->
        </v-app-bar>

        <v-main>
            <!-- сюда 3d background -->
            <TreejsBackground></TreejsBackground>

            <v-container
                class="fill-height align-item-own"
                justify="center"
                fluid
            >
                <router-view></router-view>
            </v-container>
        </v-main>

        <v-footer app dark>
            <v-spacer></v-spacer>

            <span class="white--text"
                >&copy; {{ new Date().getFullYear() }}</span
            >
        </v-footer>
    </v-app>
</template>

<script>
import {
    TimelineLite,
    TweenLite,
} from "gsap";
import { mapGetters,  } from "vuex";
import UserSelect from "./components/UserSelect";
import TreejsBackground from "./components/treejsComponent/TreejsBackground";

export default {
    name: "LayoutsDemosBaselineFlipped",
    props: {
        source: String,
    },
    components: {
        UserSelect,
        TreejsBackground,
    },
    data: () => ({
        drawer: false,
        isUserSelectShow: false,
    }),
    created() {
        this.$store.dispatch('tryAutomaticLogin')
    },
    computed: {
        ...mapGetters(['getUserGetter'])
    },
    mounted() {
        const { 
            mainTitle,
            tabs, 
            singinBtn, 
        } = this.$refs;

        const timeline = new TimelineLite();

        timeline.from(mainTitle, {
            x:-2000,
        })
        timeline.from(singinBtn, {
            x: 200,
        })
        timeline.from(tabs, {
            y:-100,
        })

        TweenLite.to(singinBtn, {
            delay: 2,
            duration: 3,
            scale: 1.35, 
            opacity: .4,
            ease: 'circ.in', 
            repeat: -1,
            yoyo: true,
        });
    },
    methods: {},
};
</script>

<style lang="scss">
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
}

#nav {
    padding: 30px;

    a {
        font-weight: bold;
        color: #2c3e50;

        &.router-link-exact-active {
            color: #42b983;
        }
    }
}

.nav-title {
    width: 30%;
    .router-link-title {
        text-decoration: none;
        color: inherit;
    }
}

.align-item-own {
    align-items: normal !important;
}

.v-list-item {
    flex: none !important;
}
</style>
