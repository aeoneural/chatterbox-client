// YOUR CODE HERE:
var removeSpecialChars = function (str) {
  return str.replace(/(?!\w|\s)./g, '')
    .replace(/\s+/g, ' ')
    .replace(/^(\s*)([\W\w]*)(\b\s*$)/g, '$2');
};


var app = {};
app.room = [];
app.server = 'http://parse.sfm8.hackreactor.com/chatterbox/classes/messages';
app.init = function() { 
};

app.send = function(message) { 
  
  $.ajax({
  // This is the url you should use to communicate with the parse API server.
    url: app.server,
    type: 'POST',
    data: message,
    dataType: 'json',
    // contentType: 'application/json',
    success: function (data) {
      console.log('chatterbox: Message sent');
    },
    error: function (data) {
      
      // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
      console.error('chatterbox: Failed to send message', data);
    }
  });
};

app.fetch = function(room) {
  $('#chats').html('');

  if (!room) {
    var data = {
      order: '-createdAt',
      limit: 1000,
    };
    $.ajax({
    // This is the url you should use to communicate with the parse API server.
      url: app.server,
      type: 'GET',
      data: data,
      success: function (data) {
        for (let message of data.results) {
          app.renderMessage(message);
        }
      },
      error: function (data) {
        // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
        console.error('chatterbox: Failed to receive message', data);
      }
    });
  } else {
    var data = {
      order: '-createdAt',
      limit: 1000,
      where: {
        'roomname': room
      }
    };
    $.ajax({
    // This is the url you should use to communicate with the parse API server.
      url: app.server,
      type: 'GET',
      data: data,
      success: function (data) {
        for (let message of data.results) {
          app.renderMessage(message);
        }
      },
      error: function (data) {
        // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
        console.error('chatterbox: Failed to receive message', data);
      }
    });
  }
};
app.clearMessages = function() { 
  $('#chats').html('');
};

app.renderMessage = function(message) {
  if (message.text === undefined || message.text.includes('script')) {
    return;
  }
  if (!app.room.includes(message.roomname)) {
    app.room.push(message.roomname);
    let roomOpt = '<option value=' + message.roomname + '>' + message.roomname + '</option>';
    $('#chatrooms').append(roomOpt);
  }
  username = removeSpecialChars(message.username);
  let child = '<p class=' + message.roomname + '><span class=' + username.split(' ').join('').split('%20').join('') + '>' + username.split('%20').join(' ') + '</span>' + ' : ' + message.text + '</p>';
  $('#chats').append(child);
};

app.renderRoom = function(room) { 
  let child = '<option>' + room + '</option>';
  
  $('#chatrooms').append(child);
};

app.handleUsernameClick = function(username) { 
  username = username.split(' ').join('');
  username = removeSpecialChars(username);
  $('.' + username).css({'font-weight': 'bold'});
};

app.handleSubmit = function() { 
  let username = location.search.split('=')[1].split('%20').join(' ');
  var message = {
    username: username,
    text: $('#message')[0].value,
    roomname: $('#chatrooms')[0].value
  };
  app.send(message);
  app.fetch($('#chatrooms')[0].value);
};

var filterByRoom = function() {
  
  let room = $('#chatrooms')[0].value;
  if (room === 'addNewRoom') { 
    var newRoomName = prompt('What is the new room name?');
    app.renderRoom(newRoomName);
    app.fetch(newRoomName);
  } else {
    app.fetch(room);
  }
};

$(document).ready(function() {
  app.fetch();
  $('#chats').on('click', 'span', function() {
    app.handleUsernameClick($(this)[0].innerText);
  });
  
  $('#send').on('submit', function() {
  
    app.handleSubmit();
    event.preventDefault();
  });
  $('.clearMsg').on('click', function() {
    app.clearMessages();
  });
});









