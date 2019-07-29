<template>
  <div id="app">
    hello
    {{this.$store.state.age}}
  </div>
</template>

<script>
export default {
  name: 'app',
  mounted() {
    console.log(this.$store)
  }
}
</script>