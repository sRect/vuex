<template>
  <div id="app">
    hello的年龄：
    {{this.$store.state.age}}
    <hr>
    我的年龄: {{this.$store.getters.myAge}}
    <hr>
    <button @click="add()">同步 syncAdd 10</button>
    <button @click="minus()">异步 asyncMinus 10</button>

  </div>
</template>

<script>
export default {
  name: 'app',
  methods: {
    add() {
      this.$store.commit('syncAdd', 10);
    },
    minus() {
      this.$store.dispatch('asyncMinus', 10);
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