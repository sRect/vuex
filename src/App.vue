<template>
  <div id="app">
    hello的年龄：
    {{this.$store.state.age}}
    <hr>
    我的年龄: {{this.$store.getters.myAge}}
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