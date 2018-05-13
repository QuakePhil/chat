function socket() {
}

socket.prototype.retry = (e) => {
    // if (e.code == 'ECONNREFUSED') { // e.code doesn't exist?
    /* don't really need this
    if (this.instance.readyState == 1) 
      return;
    } */

  console.log('Reconnecting', e);
  setTimeout(function(){
    client.open();
  }, 5000);
}

socket.prototype.send = (data) => {
  try {
    this.instance.send(data);
  } catch (e) {
    this.instance.emit('error', e);
  }
}


socket.prototype.open = (url = false) => {
  if (url !== false) {
    this.url = url;
  }
  console.log('Trying', this.url);
  this.instance = new WebSocket(this.url);

  this.instance.onclose = (e) => {
    client.retry(e);
  }

  this.instance.onerror = (e) => {
    console.log('Error: ', e);
  }
}

let client = new socket();
client.open('wss://chat.quakephil.com:1337');
client.onmessage = (data, e) => {
  console.log('message: ', data, e, client.instance)
}
