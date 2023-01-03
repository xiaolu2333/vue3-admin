<template>
  <nav>
    <router-link :to="{ name: 'Home' }">Home</router-link>
    <router-link :to="{ name: 'Login' }">Login</router-link>
  </nav>
  <router-view />
</template>

<style lang="scss">
#app {
}
a {
  margin: 10px;
}
</style>
