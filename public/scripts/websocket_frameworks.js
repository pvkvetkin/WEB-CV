const message_frame = document.getElementById('inp_title_frame');
const messages_frame = document.getElementById('frameworks');


const handleSubmitNewMessageFrame = () => {
  socket.emit('messageFrame', { data: message_frame.value })
}

socket.on('messageFrame', ({ data }) => {
  handleNewMessageFrame(data);
})

const handleNewMessageFrame = (message) => {
  messages_frame.appendChild(buildNewMessageFrame(message));
}

const buildNewMessageFrame = (message) => {
  const li = document.createElement("li");
  li.appendChild(document.createTextNode(message))
  return li;
}