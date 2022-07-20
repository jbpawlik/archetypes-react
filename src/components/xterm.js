import { Terminal } from 'xterm';
import { FitAddon } from 'xterm-addon-fit';
import { AttachAddon } from 'xterm-addon-attach';

const term = new Terminal({
  // rendererType: 'canvas',
  rendererType: 'dom',
  rows: 20,
  cols: 46,
  fontSize: 18,
  fontFamily: 'Rye',
  // fontFamily: 'VT323',
  fontWeightBold: 100,
  cursorBlink: false,
  cursorStyle: 'block',
  tooMuchOutput: 'continue',
  theme: {
    foreground:"#3b2322",
    background:"#dfdbc3",
    cursor:"#73635a",
    black:"#000000",
    brightBlack:"#808080",
    red:"#cc0000",
    brightRed:"#cc0000",
    green:"#009600",
    brightGreen:"#009600",
    yellow:"#d06b00",
    brightYellow:"#d06b00",
    blue:"#0000cc",
    brightBlue:"#0000cc",
    magenta:"#cc00cc",
    brightMagenta:"#cc00cc",
    cyan:"#0087cc",
    brightCyan:"#0087cc",
    white:"#cccccc",
    brightWhite:"#ffffff",
  },
  convertEol: true,
});

term.open(document.getElementById('terminal'));
const socket = new WebSocket("ws://localhost:3000", "echo-protocol");
term.loadAddon(new AttachAddon(socket));
    // const fitAddon = new FitAddon();
    // term.loadAddon(fitAddon);
    // fitAddon.fit();
export default term;