<template>
    <nav
        class="fixed top-0 z-20 flex w-full justify-end md:justify-center gap-2 border-b border-slate-200/10 bg-slate-950/20 p-4 shadow-2xl backdrop-blur-md">
        <div class="hidden md:flex gap-2">
            <NavButton text="Home" link="/" />
            <NavButton text="Explore" link="/explore" />
            <NavButton v-if="!userId" text="Signin" link="/signin" />
            <NavButton v-if="userId" text="Profile" :link="profile_link" v-show="userInfos.email" />
        </div>
        <div class="relative block md:hidden">
            <UIcon class="w-8 h-8" name="i-heroicons-bars-3-bottom-right" :class="!toggle_menu ? 'block' : 'hidden'"
                @click="toggle_menu = !toggle_menu"></UIcon>
            <UIcon class="w-8 h-8" name="i-heroicons-x-circle" :class="toggle_menu ? 'block' : 'hidden'"
                @click="toggle_menu = !toggle_menu"></UIcon>
            <div class="absolute right-0 pl-4 mt-2 pr-10 py-2 bg-slate-50 rounded-lg"
                :class="toggle_menu ? 'block' : 'hidden'">
                <NavButtonWhite text="Home" link="/" />
                <NavButtonWhite text="Explore" link="/explore" />
                <NavButtonWhite v-if="!userId" text="Signin" link="/signin" />
                <NavButtonWhite v-if="userId" text="Profile" :link="profile_link" v-show="userInfos.email" />
            </div>
        </div>
    </nav>
</template>

<style scoped>
.router-link-active {
    background-color: #f97316;
    font-weight: 900;
    color: black;
}
</style>

<script setup>
let toggle_menu = ref(false)
const userId = useCookie('userId');
const userInfos = useState("userInfos", () => { return { photoURL: "", displayName: "", email: "" } });
function extractUsername(email) {
    const [name] = email.split('@');
    const username = `@${name}`;
    return username;
}
const profile_link = computed(()=>`/profile/${extractUsername(userInfos.value.email)}`)
</script>