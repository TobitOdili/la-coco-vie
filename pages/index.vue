<template>
  <!-- Homepage has no DOM content of its own — the WebGL carousel (mounted in the
       persistent shell, app.vue) IS the homepage. This empty page just claims the
       '/' route. Keep it inert so it never intercepts pointer/scroll events meant
       for the scene's hit layer. -->
  <div class="home-page" aria-hidden="true" />
</template>

<style scoped>
.home-page {
  width: 0;
  height: 0;
  pointer-events: none;
}
</style>
