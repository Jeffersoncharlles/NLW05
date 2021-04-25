const socket = io();

let connectionsUsers = [];
/*=====================================================================*/
/*=====================================================================*/
socket.on('admin_list_all_users', (connect) =>{
  connectionsUsers = connect;

  // console.log(connect);

  document.getElementById('list_users').innerHTML = '';

  let templete = document.getElementById('template').innerHTML;

  connect.forEach(element => {

    const rendered = Mustache.render(templete,{
      email: element.user.email,
      id: element.socket_id
    });

    document.getElementById('list_users').innerHTML += rendered;

  });
});
/*=====================================================================*/
/*=====================================================================*/

//funcao de comunicacao
/*=====================================================================*/
/*=====================================================================*/
/*=====================================================================*/
/*=====================================================================*/
function call(id){

  //find percorre o array e procura a condicao colocado la
  const connetion = connectionsUsers.find( (connetion) => connetion.socket_id === id);

  const template = document.getElementById('admin_template').innerHTML;

  const rendered = Mustache.render(template,{
    email: connetion.user.email,
    id: connetion.user_id,
  });

  document.getElementById('supports').innerHTML += rendered;

  const params = {
    user_id:connetion.user_id
  }
/*=====================================================================*/
/*=====================================================================*/
  socket.emit('admin_user_in_support', params);

/*=====================================================================*/
/*=====================================================================*/
    socket.emit("admin_list_messages_by_user", params, (messages)=>{
      //console.log('Messages', messages);
      const divMessages = document.getElementById(`allMessages${connetion.user_id}`);

       
        messages.forEach((ele) =>{
          const createDiv = document.createElement('div');

          if (ele.admin_id === null){
              createDiv.className = 'admin_message_client';
              
              createDiv.innerHTML = `<span>${connetion.user.email}</span>`;
              createDiv.innerHTML += `<span>${ele.text}</span>`;
              createDiv.innerHTML += `<span class="admin_date">${dayjs(ele.created_at).format('DD/MM/YYY HH:mm:ss')}</span>`;
          }else{
              createDiv.className = 'admin_message_admin';

              createDiv.innerHTML = `Atendente: <span>${ele.text}</span>`;
              createDiv.innerHTML += `<span class="admin_date">${dayjs(ele.created_at).format('DD/MM/YYY HH:mm:ss')}</span>`;
          }

          divMessages.appendChild(createDiv);
      });

    });
/*=====================================================================*/
/*=====================================================================*/
}
/*=====================================================================*/
/*=====================================================================*/
/*=====================================================================*/
/*=====================================================================*/
function sendMessage(id){
  const text = document.getElementById(`send_message_${id}`);

  const params = {
    text: text.value,
    user_id: id
  };

  socket.emit('admin_send_message', params);

  const divMessages = document.getElementById(`allMessages${id}`);
  const createDiv = document.createElement('div');
  createDiv.className = 'admin_message_admin';
  createDiv.innerHTML = `Atendente: <span>${params.text}</span>`;
  createDiv.innerHTML += `<span class="admin_date">${dayjs().format('DD/MM/YYY HH:mm:ss')}</span>`;

  divMessages.appendChild(createDiv);
  text.value = '';
}
/*=====================================================================*/
/*=====================================================================*/


/*=====================================================================*/
/*=====================================================================*/
  socket.on('admin_receive_message', (data) =>{

    const connection  = connectionsUsers.find( (connetion) => connetion.socket_id = data.socket_id);

    const divMessages = document.getElementById(`allMessages${connection.user_id}`);
    const createDiv = document.createElement('div');


    createDiv.className = 'admin_message_client';
                
    createDiv.innerHTML = `<span>${connection.user.email}</span>`;
    createDiv.innerHTML += `<span>${data.message.text}</span>`;
    createDiv.innerHTML += `<span class="admin_date">${dayjs(data.message.created_at).format('DD/MM/YYY HH:mm:ss')}</span>`;

    divMessages.appendChild(createDiv);
  });
/*=====================================================================*/
/*=====================================================================*/