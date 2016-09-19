new Vue({
  el: '#app',
  data: {
    login: false,
    register: false,
    search: false,

    z: 0,
    zLogin: 0,
    zRegister: 0
  },
  methods: {
    zTrack: function (value, data) {
      if (value) this.z++
      else this.z--

      if (this.zLogin > this.z) this.z = this.zLogin
      if (this.zRegister > this.z) this.z = this.zRegister
    }
  },
  // computed: {
  //   zlogin: {
  //     get: function () {
  //       return this.z + 1
  //     },
  //     set: function () {
  //
  //     }
  //   }
  // },
  watch: {
    login: function (value) {
      this.zTrack(value)
      this.zLogin = this.z + 1
      console.log(this.z)
    },
    register: function (value) {
      this.zTrack(value)
      this.zRegister = this.z + 1
      console.log(this.z)
    }
  },
  components: {
    modal: require('./components/modal/main.js')
  },
  mounted: function () {
    var v = this
    window.addEventListener('keydown', function (e) {
      if (e.shiftKey && e.keyCode === 80) {
        v.search = !v.search
      }

      // Escape Key
      if (e.keyCode === 27) {
        v.search = !v.search
      }


    })
  }
})
