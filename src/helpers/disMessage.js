const disMessge = (dispatch, addMessage, removeMessage, message) => {
  dispatch(addMessage(message));
  setTimeout(() => {
    dispatch(removeMessage());
  }, 3000);
};

export default disMessge;
