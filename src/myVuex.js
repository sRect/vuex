let Vue = null; // vue的实例

class Store {
  constructor({state, getters}) {
    let myGetters = getters || {};
    this._s = state;
    this.getters = {};
    // 此时需要把getters属性定义到this.getters中，并且根据状态的变化，重新执行此函数
    Object.keys(myGetters).forEach((getterName) => {
      Object.defineProperty(this.getters, getterName, {
        get:() => {
          return myGetters[getterName](this.state);
        }
      })
    })

  }

  get state() { // 属性访问器
    return this._s;
  }
}

// vue组件渲染特点 先渲染父组件 后子组件 深度优先
const install = (_Vue, arg) => {
  Vue = _Vue;
  // console.log('install===', arg);
  // 为了每个组件都能拿到this.$store
  // 必须给每个组件都注册一个this.$store属性
  // 这里用到Vue.mixin混合方法，它在每个组件里都执行一次

  Vue.mixin({
    beforeCreate() { // 组件创建之前
      // console.log(this.$options.name);

      // 需要先判断是父组件还是子组件
      // 如果是子组件，应该把父组件的$tore给子组件
      // 实质是递归
      if(this.$options && this.$options.store) {
        this.$store = this.$options.store;
      } else {
        this.$store = this.$parent && this.$parent.$store;
      }

      console.log(this.$options);
    },
  })
}

export default {
  install,
  Store
}