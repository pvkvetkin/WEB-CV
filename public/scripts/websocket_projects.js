const socket = io("https://web-sem6.herokuapp.com", {transports: ["websocket"]});
// const socket = io("http://localhost:12345", {transports: ["websocket"]});

const message_project_title = document.getElementById('inp_title_projects');
const message_project_description = document.getElementById('inp_description_projects');
const messages_project = document.getElementById('project_field');

const handleSubmitNewMessageProjects = () => {
  socket.emit('messageProject', { data: message_project_title.value + "|" + message_project_description.value})
}

socket.on('messageProject', ({ data }) => {
  handleNewMessageProject(data);
})

const handleNewMessageProject = (message) => {
  messages_project.appendChild(buildNewMessageProject(message));
}

const buildNewMessageProject = (message) => {
  message = message.split("|");
  let b = document.createElement("b");
  b.appendChild(document.createTextNode(message[0]));
  const li = document.createElement("li");
  li.appendChild(b);
  li.appendChild(document.createElement("br"))
  li.appendChild(document.createTextNode(message[1]))
  return li;
}