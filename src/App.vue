<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div>
    <router-view/>
  </div>
</template>

<style lang="scss">
@import "assets/scss/custom-bootstrap.scss";
@import "node_modules/bootstrap/scss/bootstrap.scss";
@import "assets/scss/style.scss";
</style>
