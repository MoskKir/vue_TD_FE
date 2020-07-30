<template>
    <div 
        class="overlay"
        @click="overlayClick"
    >
        
        <div 
            class="card"            
            @click.stop="cardClick"
            ref="selectContainer"
        >
            <div class="triangle" ref="triangle"></div>
            <ul>
                <li @click="accountPush">Account</li>
                <li>Documentation</li>
                <li><br></li>
                <div class="logout-btn" @click="logout"> 
                    Log out
                </div>
            </ul>
        </div>
        
    </div>
</template>

<script>
import { mapActions } from "vuex";
import { TimelineLite } from "gsap";
import router from "../router";

export default {
    data: () => ({
        isOverlayClick: false,
    }),
    mounted() {
        const { selectContainer, triangle } = this.$refs;
        const timeline = new TimelineLite();

        timeline.fromTo(
            selectContainer,
            {
                x: 300,
            },
            {
                x: 0,
            },
        );
        timeline.from(
            triangle,
            {
                y: 10,
            },
        );
        
    },
    methods: {
        ...mapActions(["getRequestTodos"]),
        overlayClick() {
            const { selectContainer, triangle } = this.$refs;
            const timeline = new TimelineLite();

            timeline.to(
                triangle,
                {
                    y: 10,
                },
            );
            timeline.to(
                selectContainer,
                {
                    x: 300,
                },
            );
            
            setTimeout(()=>{
                this.isOverlayClick = false;
                this.$emit('overlayClick', this.isOverlayClick)

            }, 1000)           
        },
        cardClick() {
        },
        accountPush() {
            const userId = this.$store.getters.getUserId;
            router.push({ path: `/user/${userId}` });
            this.$emit('overlayClick', this.isOverlayClick);
        },
        async logout() {
            this.$store.commit('logout');
            await this.getRequestTodos();
            this.isOverlayClick = false;
            router.push({ path: '/'});
            this.$emit('overlayClick', this.isOverlayClick);
        },
    },
}
</script>

<style lang="scss" scoped>
.overlay {
    position: fixed;
    width: 100vw;
    height: 100vh;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background: rgba(0, 0, 0, .09);
}

.triangle {
    border-left: 16px solid transparent;
    border-right: 16px solid transparent;
    border-bottom: 16px solid;
    position: absolute;
    top: -10px;
    right: 10px;
    color: white;
}

.card {
    position: absolute;
    top: 70px;
    right: 20px;
    width: 200px;
    color: black;
    background-color: white;
    border-radius: 5px;
    padding: 30px 20px;
    box-shadow: 0px 3px 1px -2px rgba(0, 0, 0, 0.2),
        0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12);
}

ul {
    padding-left: 0 !important;
    list-style: none;
    width: 80%;
    margin: 0 auto;
}

li {
    cursor: pointer;
}

.logout-btn {
    text-align: center;
    padding-top: 20px;
    cursor: pointer;
    border-top: 1px solid black;
}
</style>