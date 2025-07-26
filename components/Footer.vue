<template>
    <footer class="border-t border-gray-800 text-left">
        <div class="mx-auto max-w-7xl overflow-hidden px-6 py-16 sm:py-24 lg:px-8">
            <div class="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
                <!-- Brand Section -->
                <div class="col-span-1 md:col-span-2">
                    <div class="logo-custom mb-4">
                        <span>Fakt Share</span>
                    </div>
                    <p class="text-slate-400 mb-6 max-w-md">
                        Learn while having fun! Join our community of curious minds discovering fascinating facts about science, history, technology, and more.
                    </p>
                    <div class="flex space-x-4">
                        <a href="https://twitter.com/elvis_cibalinda" target="_blank"
                            class="text-slate-400 hover:text-orange-500 transition-colors">
                            <span class="sr-only">X</span>
                            <svg class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                <path
                                    d="M13.6823 10.6218L20.2391 3H18.6854L12.9921 9.61788L8.44486 3H3.2002L10.0765 13.0074L3.2002 21H4.75404L10.7663 14.0113L15.5685 21H20.8131L13.6819 10.6218H13.6823ZM11.5541 13.0956L10.8574 12.0991L5.31391 4.16971H7.70053L12.1742 10.5689L12.8709 11.5655L18.6861 19.8835H16.2995L11.5541 13.096V13.0956Z">
                                </path>
                            </svg>
                        </a>

                        <a href="https://github.com/ElvisAns" target="_blank" class="text-slate-400 hover:text-orange-500 transition-colors">
                            <span class="sr-only">GitHub</span>
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24"
                                aria-hidden="true">
                                <path fill-rule="evenodd"
                                    d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                                    clip-rule="evenodd"></path>
                            </svg>
                        </a>
                    </div>
                </div>

                <!-- Quick Links -->
                <div>
                    <h3 class="text-sm font-semibold text-slate-200 mb-4">Quick Links</h3>
                    <ul class="space-y-3">
                        <li>
                            <NuxtLink to="/" class="text-slate-400 hover:text-orange-500 transition-colors text-sm">
                                Home
                            </NuxtLink>
                        </li>
                        <li>
                            <NuxtLink to="/explore" class="text-slate-400 hover:text-orange-500 transition-colors text-sm">
                                Explore
                            </NuxtLink>
                        </li>
                        <li>
                            <NuxtLink to="/about" class="text-slate-400 hover:text-orange-500 transition-colors text-sm">
                                About Us
                            </NuxtLink>
                        </li>
                        <li>
                            <NuxtLink to="/signin" class="text-slate-400 hover:text-orange-500 transition-colors text-sm">
                                Sign In
                            </NuxtLink>
                        </li>
                    </ul>
                </div>

                <!-- Topics -->
                <div>
                    <h3 class="text-sm font-semibold text-slate-200 mb-4">Popular Topics</h3>
                    <ul class="space-y-3">
                        <li>
                            <NuxtLink to="/explore?tag=science" class="text-slate-400 hover:text-orange-500 transition-colors text-sm">
                                Science
                            </NuxtLink>
                        </li>
                        <li>
                            <NuxtLink to="/explore?tag=technology" class="text-slate-400 hover:text-orange-500 transition-colors text-sm">
                                Technology
                            </NuxtLink>
                        </li>
                        <li>
                            <NuxtLink to="/explore?tag=history" class="text-slate-400 hover:text-orange-500 transition-colors text-sm">
                                History
                            </NuxtLink>
                        </li>
                        <li>
                            <NuxtLink to="/explore?tag=space" class="text-slate-400 hover:text-orange-500 transition-colors text-sm">
                                Space
                            </NuxtLink>
                        </li>
                    </ul>
                </div>
            </div>

            <!-- Bottom Section -->
            <div class="border-t border-slate-800 pt-8">
                <div class="flex flex-col md:flex-row justify-between items-center">
                    <p class="text-xs text-slate-400 mb-4 md:mb-0">
                        © 2024 FaktShare. All rights reserved.
                    </p>
                    <div class="flex space-x-6 text-xs text-slate-400">
                        <NuxtLink to="/about" class="hover:text-orange-500 transition-colors">About</NuxtLink>
                        <!--span>•</span>
                        <a href="#" class="hover:text-orange-500 transition-colors">Privacy</a>
                        <span>•</span>
                        <a href="#" class="hover:text-orange-500 transition-colors">Terms</a-->
                    </div>
                </div>
            </div>
        </div>
    </footer>
</template>

<style scoped>
.logo-custom span {
    font-family: "Pink Sunday";
    font-size: 32px;
    line-height: 100%;
}
</style>