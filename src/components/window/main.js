module.exports = {
  template: '#modal',
  data: function () {
    return {
      modal: false,
      active: false
    }
  },
  beforeMount: function () {
    this.active = document.activeElement
    console.log(this.active)
  },
  mounted: function () {
    this.$refs.modal.focus()
  }
}
