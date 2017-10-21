// YOUR CODE HERE:
var app = {};
app.room = [];
app.server = 'http://parse.sfm8.hackreactor.com/';
app.init = function() { 
};

app.send = function(message) { 
  
  $.ajax({
  // This is the url you should use to communicate with the parse API server.
    url: 'http://parse.sfm8.hackreactor.com/chatterbox/classes/messages',
    type: 'POST',
    data: message,
    contentType: 'application/json',
    success: function (data) {
      console.log('chatterbox: Message sent');
    },
    error: function (data) {
      // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
      console.error('chatterbox: Failed to send message', data);
    }
  });
};

app.fetch = function() { 
  
  $.ajax({
  // This is the url you should use to communicate with the parse API server.
    url: 'http://parse.sfm8.hackreactor.com/chatterbox/classes/messages',
    type: 'GET',
    success: function (data) {
      console.log(data);
      for (let message of data.results) {
        app.renderMessage(message);
      }
    },
    error: function (data) {
      // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
      console.error('chatterbox: Failed to send message', data);
    }
  });
};
app.clearMessages = function() { 
  $('#chats').html('');
};

app.renderMessage = function(message) { 
  if (!app.room.includes(message.roomname)) {
    app.room.push(message.roomname);
    let roomOpt = '<option value=' + message.roomname + '>' + message.roomname + '</option>';
    $('#chatrooms').append(roomOpt);
  }
  let child = '<p class=' + message.roomname + '><span class="username">' + message.username + ': ' + '</span>' + message.text + '</p>';
  $('#chats').append(child);
};

app.renderRoom = function(room) { 
  let child = '<option>' + room + '</option>';
  
  $('#roomSelect').append(child);
};

app.handleUsernameClick = function() { 
  console.log('Hello');
};

app.handleSubmit = function() { 
  
};
$(document).ready(function() {
  app.fetch();
  $('#main').on('click', $('.username'), function() {
    app.handleUsernameClick();
  });
  
  $('#send').on('submit', $('.submit'), function() {
    app.handleSubmit();
  });
  var filterByRoom = function() {
    let room = document.getElementById('chatrooms').value;
    console.log(room);
    let msgClass = '.' + room;
    let filteredMsg = $(msgClass);
    console.log(filteredMsg);
  };
});









