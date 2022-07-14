import { Terminal } from 'xterm';
import { FitAddon } from 'xterm-addon-fit';
import { AttachAddon } from 'xterm-addon-attach';
// import '../App.css';
// import { TextInterface } from '../TextInterface/TextInterface.js';

export default function CommandLineTerminal() {
  let term = new Terminal({
    // rendererType: 'canvas',
    rendererType: 'dom',
    rows: 20,
    cols: 600,
    cursorBlink: 'block',
    theme: '',
    windowOptions: {
      textarea: {
        rows: 200,
        cols: 600,
        clientHeight: 20,
        clientLeft: 0,
      }
    }
  });
  console.log(term)
  let curr_line = "";
  let entries = [];
  const socket = new WebSocket("ws://localhost:3000", "echo-protocol");
  term.loadAddon(new AttachAddon(socket));
  const fitAddon = new FitAddon();
  term.loadAddon(fitAddon);
  term.open(document.getElementById('terminal'));
  fitAddon.fit();
  term.write('Archetypes interface deployed... \n');
  term.onResize(function (evt) {
    socket.send({ rows: evt.rows });
 });
  term.onKey(e => {
    curr_line += e.key;
    term.write(e.key);
  });
  term.prompt = () => {
    if (curr_line) {
      let data = { method: 'command', command: curr_line };
      socket.send(JSON.stringify(data));
    }
  }
  term.prompt();
  socket.onmessage = msg => {
    term.write("\r\n" + JSON.parse(msg.data).data);
    curr_line =  "";
  }
  term.onKey(e => {
    if (e.keyCode === 13) {
      if (curr_line) {
        entries.push(curr_line);
        term.write("\r\n");
        term.prompt();
      } else {
        curr_line += e.key;
        term.write(e.key);
      }
    } else if (e.keyCode === 8) {
      if (curr_line) {
        curr_line = curr_line.slice(0, curr_line.length -1);
        term.write("\b \b");
      }
    }
  });
  term.onData(data => {
    curr_line += data;
    term.write(data)
  })

}