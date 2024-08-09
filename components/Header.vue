<!-- This example requires Tailwind CSS v2.0+ -->
<template>
    <header class="bg-gray-900">
      <nav class="mx-auto px-4 sm:px-6 lg:px-8" aria-label="Top">
        <div class="w-full py-6 flex items-center justify-between border-b border-indigo-500 lg:border-none">
          <div class="flex items-center">
            <a href="#">
              <span class="sr-only">Workflow</span>
              <img class="h-14 w-auto" src="/logo.png" alt="" />
            </a>
            <div class="hidden ml-10 space-x-8 lg:block">
              <NuxtLink v-for="link in navigation" :key="link.name" :to="link.href" class="text-base font-medium text-white hover:text-indigo-50">
                {{ link.name }}
              </NuxtLink>
            </div>
          </div>
          <div class="ml-10 space-x-4">
            <a href="#" class="inline-block bg-indigo-500 py-2 px-4 border border-transparent rounded-md text-base font-medium text-white hover:bg-opacity-75">View CV</a>
          </div>
        </div>
        <div class="py-4 flex flex-wrap justify-center space-x-6 lg:hidden">
          <a v-for="link in navigation" :key="link.name" :href="link.href" class="text-base font-medium text-white hover:text-indigo-50">
            {{ link.name }}
          </a>
        </div>
      </nav>
    </header>
  </template>
  
  <script>

  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'Experiences', href: '#' },
    { name: 'Blog', href: '#' },
    { name: 'Projects', href: '#' },
    { name: 'Contact', href: '/contact' },
    
  ]
  
  export default {
    setup() {
      return {
        navigation,
      }
    },
  }
  </script>