const windowHandler = {
  setCaretPosition(ctrl, pos) {
    ctrl.focus();
    ctrl.setSelectionRange(pos, pos);
  },
};

export default windowHandler;
