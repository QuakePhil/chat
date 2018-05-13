let inputbox = document.getElementById('inputbox');
let enterkey = document.getElementById('enterkey');
let chat = document.getElementById('chat');

function sanitize(what) {
  let ret = '';
  for (let i = 0, l = what.length; i < l; ++i) {
    if (what[i].match(/[0-9a-zA-Z_]/)) {
      ret += what[i];
    }
  }
  return ret;
}

function validate() {
  if (inputbox.value) {
    client.send(inputbox.value);
    addMessage(inputbox.value);
    inputbox.value = '';
  }
}

enterkey.onclick = validate;

inputbox.onkeypress = function(e) {
  if (e.keyCode == 13) {
    validate();
  }
}

inputbox.focus()

function addMessage(message, color, dt) {
  nick = 'test';
  color = 'green';
  dt = new Date();
  let timestamp = '[' + (dt.getHours() < 10 ? '0'
      + dt.getHours() : dt.getHours()) + ':'
      + (dt.getMinutes() < 10
        ? '0' + dt.getMinutes() : dt.getMinutes())
      + ']';
  chat.insertAdjacentHTML('beforeend', 
    '<p>'+timestamp+' <span style="color:' + color + '">'
      + nick + '</span>: ' + message + '</p>');
  window.scrollTo(0,document.body.scrollHeight);
  inputbox.focus();
}

function test() {
  for (let i = 0; i < 100; ++i) {
    addMessage('test', 'This is line ' + (i + 1) + ' of the test scrollback');
  }
}

// window.onload = function() { test(); }
