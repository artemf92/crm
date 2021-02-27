import M from 'materialize-css';

export default {
  bind(el, { value, modifiers }) {
    const position = Object.keys(modifiers);
    M.Tooltip.init(el, { html: value, position: position[0] || 'bottom' });
  },
  unbind(el) {
    const tooltip = M.Tooltip.getInstance(el);
    if (tooltip && tooltip.destroy) {
      tooltip.destroy();
    }
  },
};
