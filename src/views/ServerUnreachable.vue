<template>
  <div class="row d-flex justify-content-start">
    <p v-html="$t('messages.serverUnreachable')"/>
  </div>
</template>

<script>
export default {
  name: "ServerUnreachable",
  description: "Server unreachable page"
}
</script>
