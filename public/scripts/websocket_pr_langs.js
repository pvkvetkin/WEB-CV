const message_pr_lang = document.getElementById('inp_title');
const messages_pr_lang = document.getElementById('programming_languages');


const handleSubmitNewMessagePrLang = () => {
  socket.emit('messagePrLang', { data: message_pr_lang.value })
}

socket.on('messagePrLang', ({ data }) => {
  handleNewMessagePrLang(data);
})

const handleNewMessagePrLang = (message) => {
  messages_pr_lang.appendChild(buildNewMessagePrLang(message));
}

const buildNewMessagePrLang = (message) => {
  const li = document.createElement("li");
  li.appendChild(document.createTextNode(message))
  return li;
}




// const socket = io("http://localhost:12345", {transports: ["websocket"]});
//
// const message = document.getElementById('message');
// const messages = document.getElementById('messages');
//
// const handleSubmitNewMessage = () => {
//   socket.emit('message', { data: message.value })
// }
//
// socket.on('message', ({ data }) => {
//   handleNewMessage(data);
// })
//
// const handleNewMessage = (message) => {
//   messages.appendChild(buildNewMessage(message));
// }
//
// const buildNewMessage = (message) => {
//   const li = document.createElement("li");
//   li.appendChild(document.createTextNode(message))
//   return li;
// }





// const socket = io("http://localhost:4001")
//
// const attr = document.getElementById("inp_title");
// const attrs = document.getElementById("post_pr_langs");
//
// const some_submit = () => {
//   socket.emit('msgToServer', { data: attr.value })
// }
//
// socket.on('msgToServer', ({ data }) => {
//   handleNewAttr(data);
// } )
//
// handleNewAttr = (attr) => {
//   attrs.appendChild(buildNewAttr(attr))
// }
//
// const buildNewAttr = (attr) => {
//   return document.createTextNode(attr);
// }