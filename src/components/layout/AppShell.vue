<template>
  <div class="min-h-screen flex flex-col">
    <header class="h-20 flex items-center px-10">
      <h1 class="text-3xl font-semibold flex items-center gap-3 text-violet-600 select-none">
        <svg class="w-9 h-9" viewBox="0 0 24 24" stroke="currentColor" fill="none" stroke-width="2">
          <path d="M2 12h20M12 2v20"/>
        </svg> Gomoku
      </h1>
    </header>
    <main class="flex-1 flex items-center justify-center"><slot/></main>
    <footer class="h-14 flex items-center justify-center text-xs text-gray-500">
      © {{ new Date().getFullYear() }} Gomoku Web
    </footer>
  </div>
</template>

<script setup/>
