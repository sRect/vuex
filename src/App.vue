<template>
  <div id="app">
    hello的年龄：
    {{this.$store.state.age}}
    <hr>
    我的年龄: {{this.$store.getters.myAge}}
    <hr>
    <button @click="add()">add 10</button>
  </div>
</template>

<script>
export default {
  name: 'app',
  methods: {
    add() {
      this.$store.commit('syncAdd', 10);
    }
  },
  mounted() {
    console.log(this.$store);
    setTimeout(() => {
      this.$store.state.age = 20;
    }, 1000)
  }
}
</script>