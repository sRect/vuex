let Vue = null; // vue的实例

class Store {
  constructor({state, getters, actions, mutations}) {
    let myGetters = getters || {};
    let myMutations = mutations || {};
    let myActions = actions || {};
    // 这样写的目的：
    // 利用vue自身的data，把state加上set和get属性
    // 这样就可以做到双向绑定,实时监听数据变化，响应视图
    this._s = new Vue({
      data() {
        return {
          state
        }
      }
    });

    this.getters = {};
    // 此时需要把getters属性定义到this.getters中，并且根据状态的变化，重新执行此函数
    Object.keys(myGetters).forEach((getterName) => {
      Object.defineProperty(this.getters, getterName, {
        get:() => {
          return myGetters[getterName](this.state);
        }
      })
    })

    this.mutations = {};
    // 把用户传过来的mutations放到我们store实例上
    Object.keys(myMutations).forEach((mutationName) => {
      this.mutations[mutationName] = (payload) => {
        myMutations[mutationName](this.state, payload);
      }
    })

    this.actions = {};
    Object.keys(myActions).forEach((actionName) => {
      this.actions[actionName] = (payload) => {
        myActions[actionName](this, payload);
      }
    })
  }

  get state() { // 属性访问器
    return this._s.state;
  }

  commit = (type, payload) => { // 找到对应的action执行
    this.mutations[type](payload);
  }

  dispatch = (type, payload) => {
    this.actions[type](payload);
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