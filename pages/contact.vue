<template>
    <div class="bg-white">
        <div class="mx-auto py-10 px-4 sm:px-6 lg:px-8">
            <div class="max-w-lg mx-auto md:max-w-none md:grid md:grid-cols-2 md:gap-8">
                <div>
                    <h2 class="text-2xl font-extrabold text-gray-900 sm:text-3xl">Contact Me</h2>
                    <div class="mt-3">
                        <p class="text-lg text-gray-500">Just give me a call or write a concise email,<br />pick
                            whatever works for you.</p>
                    </div>
                    <div class="mt-9">
                        <div class="flex text-indigo-500">
                            <div class="flex-shrink-0">
                                <PhoneIcon class="h-6 w-6" aria-hidden="true" />
                            </div>
                            <div class="ml-3 text-base">
                                <p><a href="tel:+9779862258069">+977 9862258069</a></p>
                            </div>
                        </div>
                        <div class="mt-6 flex text-indigo-500">
                            <div class="flex-shrink-0">
                                <EnvelopeIcon class="h-6 w-6" aria-hidden="true" />
                            </div>
                            <div class="ml-3 text-base">
                                <p><a href="mailto:hi@atulkhanal.com.np">hi@atulkhanal.com.np</a></p>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="mt-12 sm:mt-16 md:mt-0">
                    <h2 class="text-2xl font-extrabold text-gray-900 sm:text-3xl">Virtual Meeting</h2>
                    <div class="mt-3">
                        <p class="text-lg text-gray-500">Is there a better way to connect than a virtual meeting?</p>
                    </div>
                    <div class="mt-9">
                        <div class="flex text-indigo-500">
                            <div class="flex-shrink-0">
                                <CalendarIcon class="h-6 w-6" aria-hidden="true" />
                            </div>
                            <div class="ml-3 text-base cursor-pointer">
                                <p>
                                    <span data-cal-link="atul-khanal/meet">
                                        Setup a Virtual Meeting
                                    </span>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { CalendarIcon, EnvelopeIcon, PhoneIcon } from '@heroicons/vue/24/outline'

onMounted(() => {
    (function (C, A, L) {
        let p = function (a, ar) {
            a.q.push(ar);
        };
        let d = C.document;
        C.Cal =
            C.Cal ||
            function () {
                let cal = C.Cal;
                let ar = arguments;
                if (!cal.loaded) {
                    cal.ns = {};
                    cal.q = cal.q || [];
                    d.head.appendChild(d.createElement("script")).src = A;
                    cal.loaded = true;
                }
                if (ar[0] === L) {
                    const api = function () {
                        p(api, arguments);
                    };
                    const namespace = ar[1];
                    api.q = api.q || [];
                    typeof namespace === "string"
                        ? (cal.ns[namespace] = api) && p(api, ar)
                        : p(cal, ar);
                    return;
                }
                p(cal, ar);
            };
    })(window, "https://cal.com/embed.js", "init");
    Cal("init");
})

</script>