import loadSvg from "../assets/images/loading.svg"

export default {
  mounted(el, binding) {
    const obServer = new IntersectionObserver(entries => {
      if (entries.find(v => v.intersectionRatio)) {
        el.src = binding.value.replace(/http:\/\//g, "https://")
        obServer.unobserve(el)
      }
    })
    obServer.observe(el)
  },

  // unmounted() {},
}
