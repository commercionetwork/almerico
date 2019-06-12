<template>
  <footer class="footer text-center">
    <span 
      class="text-muted" 
      v-html="footerText"
    />
  </footer>
</template>

<script>
export default {
  name: "Footer",
  description: "The footer of the application",
  data() {
    return {
      year: new Date().getFullYear()
    };
  },
  computed: {
    footerText() {
      return `${this.year}&nbsp;Commercio.network`;
    }
  }
}
</script>

<style lang="scss" scoped>
.footer {
  padding: 20px 0 5px;
  @include z-index(footer);
}
</style>
