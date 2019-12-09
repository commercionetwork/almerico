/**
 * Custom click outside directive
 */
const clickOutside = {
  /**
   * Bind directive
   *
   * @param element
   * @param binding
   * @param vNode
   */
  bind(element, binding, vNode) {
    // Provided expression must evaluate to a function.
    if (typeof binding.value !== "function") {
      const compName = vNode.context.name;
      let warn = `[Vue-click-outside:] provided expression '${
        binding.expression
      }' is not a function, but has to be`;
      if (compName) {
        warn += `Found in component '${compName}'`;
      }
      /* eslint-disable no-console*/
      console.warn(warn);
      /* eslint-enable no-console*/
    }

    // Define Handler and cache it on the element
    const bubble = binding.modifiers.bubble;
    const handler = event => {
      if (
        bubble ||
        (!element.contains(event.target) && element !== event.target)
      ) {
        binding.value(event);
      }
    };
    element.__vueClickOutside__ = handler;

    // add Event Listeners
    document.addEventListener("click", handler);
  },

  /**
   * Unbind directive
   *
   * @param element
   */
  unbind(element) {
    // Remove Event Listeners
    document.removeEventListener("click", element.__vueClickOutside__);
    element.__vueClickOutside__ = null;
  }
};

export default clickOutside;
