/* eslint-disable no-undef */
import { Terminal } from 'xterm';
import { FitAddon } from 'xterm-addon-fit';
import { AttachAddon } from 'xterm-addon-attach';
import xtermTheme from 'xterm-theme';
import '../css/xterm.css'
import 'chalkie'
import archetypesText from '../objectLists/archtypesText.js';

export default function TerminalInterface() {
  let term = new Terminal({
    // rendererType: 'canvas',
    rendererType: 'dom',
    rows: 20,
    cols: 84,
    fontSize: 10,
    fontFamily: 'Courier New',
    fontWeightBold: 900,
    cursorBlink: false,
    cursorStyle: 'block',
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
    // restoreWin: true,
    // setWinPosition: true,
    // setWinSizePixels: true,
    // screenReaderMode: true,
    // windowsMode: true,
  });
  const socket = new WebSocket("ws://localhost:3000", "echo-protocol");
  term.loadAddon(new AttachAddon(socket));
  // const fitAddon = new FitAddon();
  // term.loadAddon(fitAddon);
  term.open(document.getElementById('terminal'));
  // fitAddon.fit();

  document.querySelector('.xterm').addEventListener('wheel', e => {
    if (term.buffer.active.baseY > 0) {
      e.preventDefault();
    }
  });

  function runFakeTerminal() {
    if (term._initialized) {
      return;
    }

    term._initialized = true;

    term.prompt = () => {
      term.write('\r\n$ ');
    };


    // TODO: Use a nicer default font
    term.write(`${chalk.ansi256(179)(`
   █████╗ ██████╗  ██████╗██╗  ██╗███████╗████████╗██╗   ██╗██████╗ ███████╗███████╗
  ██╔══██╗██╔══██╗██╔════╝██║  ██║██╔════╝╚══██╔══╝╚██╗ ██╔╝██╔══██╗██╔════╝██╔════╝
  ███████║██████╔╝██║     ███████║█████╗     ██║    ╚████╔╝ ██████╔╝█████╗  ███████╗
  ██╔══██║██╔══██╗██║     ██╔══██║██╔══╝     ██║     ╚██╔╝  ██╔═══╝ ██╔══╝  ╚════██║
  ██║  ██║██║  ██║╚██████╗██║  ██║███████╗   ██║      ██║   ██║     ███████╗███████║
  ╚═╝  ╚═╝╚═╝  ╚═╝ ╚═════╝╚═╝  ╚═╝╚══════╝   ╚═╝      ╚═╝   ╚═╝     ╚══════╝╚══════╝
    `)}`);

    term.writeln('Below is a simple emulated backend, try running `help`.');
    addDecoration(term);
    prompt(term);

    term.onData(e => {
      switch (e) {
        case '\u0003': // Ctrl+C
          term.write('^C');
          prompt(term);
          break;
        case '\r': // Enter
          runCommand(term, command);
          command = '';
          break;
        case '\u007F': // Backspace (DEL)
          // Do not delete the prompt
          if (term._core.buffer.x > 2) {
            term.write('\b \b');
            if (command.length > 0) {
              command = command.substr(0, command.length - 1);
            }
          }
          break;
        default: // Print all other characters for demo
          if (e >= String.fromCharCode(0x20) && e <= String.fromCharCode(0x7E) || e >= '\u00a0') {
            command += e;
            term.write(e);
          }
      }
    });

    // Create a very simple link provider which hardcodes links for certain lines
    term.registerLinkProvider({
      provideLinks(bufferLineNumber, callback) {
        // eslint-disable-next-line default-case
        switch (bufferLineNumber) {
          case 2:
            callback([
              {
                text: 'VS Code',
                range: { start: { x: 28, y: 2 }, end: { x: 34, y: 2 } },
                activate() {
                  window.open('https://github.com/microsoft/vscode', '_blank');
                }
              },
              {
                text: 'Hyper',
                range: { start: { x: 37, y: 2 }, end: { x: 41, y: 2 } },
                activate() {
                  window.open('https://github.com/vercel/hyper', '_blank');
                }
              },
              {
                text: 'Theia',
                range: { start: { x: 47, y: 2 }, end: { x: 51, y: 2 } },
                activate() {
                  window.open('https://github.com/eclipse-theia/theia', '_blank');
                }
              }
            ]);
            return;
          case 8:
            callback([
              {
                text: 'WebGL renderer',
                range: { start: { x: 54, y: 8 }, end: { x: 67, y: 8 } },
                activate() {
                  window.open('https://npmjs.com/package/xterm-addon-webgl', '_blank');
                }
              }
            ]);
            return;
          case 14:
            callback([
              {
                text: 'Links',
                range: { start: { x: 45, y: 14 }, end: { x: 49, y: 14 } },
                activate() {
                  window.alert('You can handle links any way you want');
                }
              },
              {
                text: 'themes',
                range: { start: { x: 52, y: 14 }, end: { x: 57, y: 14 } },
                activate() {
                  isBaseTheme = !isBaseTheme;
                  term.setOption('theme', isBaseTheme ? baseTheme : otherTheme);
                  document.querySelector('.demo .inner').classList.toggle('other-theme', !isBaseTheme);
                  term.write(`\r\nActivated ${isBaseTheme ? 'xterm.js' : 'snazzy'} theme`);
                  prompt(term);
                }
              },
              {
                text: 'addons',
                range: { start: { x: 60, y: 14 }, end: { x: 65, y: 14 } },
                activate() {
                  window.open('/docs/guides/using-addons/', '_blank');
                }
              }
            ]);
            return;
          case 15: callback([
            {
              text: 'typed API',
              range: { start: { x: 45, y: 15 }, end: { x: 53, y: 15 } },
              activate() {
                window.open('https://github.com/xtermjs/xterm.js/blob/master/typings/xterm.d.ts', '_blank');
              }
            },
            {
              text: 'decorations',
              range: { start: { x: 56, y: 15 }, end: { x: 66, y: 15 } },
              activate() {
                window.open('https://github.com/xtermjs/xterm.js/blob/master/typings/xterm.d.ts#L947', '_blank');
              }
            },
          ]);
            return;
        }
        callback(undefined);
      }
    });
  }

  function prompt(term) {
    command = '';
    term.write('\r\n$ ');
  }

  let command = '';
  let commands = {
    help: {
      f: () => {
        term.writeln([
          'Welcome to xterm.js! Try some of the commands below.',
          '',
          ...Object.keys(commands).map(e => `  ${e.padEnd(10)} ${commands[e].description}`)
        ].join('\n\r'));
        prompt(term);
      },
      description: 'Prints this help message',
    },
    ls: {
      f: () => {
        term.writeln(['a', 'bunch', 'of', 'fake', 'files'].join('\r\n'));
        term.prompt(term);
      },
      description: 'Prints a fake directory structure'
    },
    loadtest: {
      f: () => {
        let testData = [];
        let byteCount = 0;
        for (let i = 0; i < 50; i++) {
          let count = 1 + Math.floor(Math.random() * 79);
          byteCount += count + 2;
          let data = new Uint8Array(count + 2);
          data[0] = 0x0A; // \n
          for (let i = 1; i < count + 1; i++) {
            data[i] = 0x61 + Math.floor(Math.random() * (0x7A - 0x61));
          }
          // End each line with \r so the cursor remains constant, this is what ls/tree do and improves
          // performance significantly due to the cursor DOM element not needing to change
          data[data.length - 1] = 0x0D; // \r
          testData.push(data);
        }
        let start = performance.now();
        for (let i = 0; i < 1024; i++) {
          for (const d of testData) {
            term.write(d);
          }
        }
        // Wait for all data to be parsed before evaluating time
        term.write('', () => {
          let time = Math.round(performance.now() - start);
          let mbs = ((byteCount / 1024) * (1 / (time / 1000))).toFixed(2);
          term.write(`\n\r\nWrote ${byteCount}kB in ${time}ms (${mbs}MB/s) using the ${isWebglEnabled ? 'webgl' : 'canvas'} renderer`);
          term.prompt();
        });
      },
      description: 'Simulate a lot of data coming from a process'
    }
  };

  function runCommand(term, text) {
    const command = text.trim().split(' ')[0];
    if (command.length > 0) {
      term.writeln('');
      if (command in commands) {
        commands[command].f();
        return;
      }
      term.writeln(`${command}: command not found`);
    }
    prompt(term);
  }

function addDecoration(term) {
  const marker = term.addMarker(15);
  const decoration = term.registerDecoration({ marker, x: 44 });
  decoration.onRender(element => {
    element.classList.add('link-hint-decoration');
    // must be inlined to override inlined width/height coming from xterm
    element.style.height = '';
    element.style.width = '';
  });
}

  // let playGame = true


  // while (playGame) {

    runFakeTerminal();

  // let curr_line = "";
  // let entries = [];
  // let currPos = 0;
  // let pos = 0;



//   term.onResize(function (evt) {
//     socket.send({ rows: evt.rows });
//  });
  
//  term.onKey(e => {
//     curr_line += e.key;
//     term.write(e.key);
//   });

//   term.prompt = () => {
//     if (curr_line) {
//       let data = { method: 'command', command: curr_line };
//       socket.send(JSON.stringify(data));
//     }
//   }
//   term.prompt();

//   socket.onmessage = msg => {
//     term.write("\r\n" + JSON.parse(msg.data).data);
//     curr_line =  "";
//   }
  // term.onKey(e => {
  //   if (e.keyCode === 13) {
  //     if (curr_line) {
  //       entries.push(curr_line);
  //       term.write("\r\n");
  //       term.prompt();
  //     } else {
  //       curr_line += e.key;
  //       term.write(e.key);
  //     }
  //   } else if (e.keyCode === 8) {
  //     if (curr_line) {
  //       curr_line = curr_line.slice(0, curr_line.length -1);
  //       term.write("\b \b");
  //     }
  //   }
  // });

  // term.onData(data => {
  //   curr_line += data;
  //   term.write(data)
  // })
  //   term.write(`${chalk.ansi256(179)(`
  //  █████╗ ██████╗  ██████╗██╗  ██╗███████╗████████╗██╗   ██╗██████╗ ███████╗███████╗
  // ██╔══██╗██╔══██╗██╔════╝██║  ██║██╔════╝╚══██╔══╝╚██╗ ██╔╝██╔══██╗██╔════╝██╔════╝
  // ███████║██████╔╝██║     ███████║█████╗     ██║    ╚████╔╝ ██████╔╝█████╗  ███████╗
  // ██╔══██║██╔══██╗██║     ██╔══██║██╔══╝     ██║     ╚██╔╝  ██╔═══╝ ██╔══╝  ╚════██║
  // ██║  ██║██║  ██║╚██████╗██║  ██║███████╗   ██║      ██║   ██║     ███████╗███████║
  // ╚═╝  ╚═╝╚═╝  ╚═╝ ╚═════╝╚═╝  ╚═╝╚══════╝   ╚═╝      ╚═╝   ╚═╝     ╚══════╝╚══════╝
  //   `)}`);
    // term.write(`${chalk.green("\nDiscover Your Archetype\n")}`);
    // term.write(archetypesText[0])
  //   term.prompt();

  //   const playerName = rs.question("\nWhat is your name?\n\n");

  //   console.log(chalk.green(`\nWelcome ${playerName}` + `, answer these questions to receive an archetype\n`));

  //   rs.question();

  //   let playerAttributes = []

  //   for (let i = 0; i <= 15; i++) {
  //     console.log(chalk.blue(`${questionList16[i].question}`))
  //     let response = rs.question(``, {
  //       limit: ['Yes', 'Y', 'yes', 'y', 'No', 'N', 'no', 'n'],
  //       limitMessage: 'Yes or no, please.'
  //     })
  //     if (response === 'Y' | response === 'y' | response === 'Yes' | response === 'yes') {
  //       questionList16[i].answer = 'Y'
  //       playerAttributes.push(questionList16[i].traits[0])
  //       playerAttributes.push(questionList16[i].traits[1])
  //       playerAttributes.push(questionList16[i].traits[2])
  //       playerAttributes.push(questionList16[i].traits[3])
  //     } else if (response === 'N' | response === 'n' | response === 'No' | response === 'no') {
  //       questionList16[i].answer = 'N'
  //     }
  //     response = ''
  //   }

  //   let occurrences = { };
  //   for (let i = 0, j = playerAttributes.length; i < j; i++) {
  //     occurrences[playerAttributes[i]] = (occurrences[playerAttributes[i]] || 0) + 1;
  //   }

  //   let playerArchetype = []
  //   let playerOpposite = []

  //   if(occurrences.solo > occurrences.social) {
  //     playerArchetype.push('solo')
  //     playerOpposite.push('social')
  //   } else if (occurrences.social > occurrences.solo) {
  //     playerArchetype.push('social')
  //     playerOpposite.push('solo')
  //   } else {
  //     console.log(chalk.blue('Do you prefer the company of yourself to the company of others?'))
  //     let response = rs.question(``, {
  //       limit: ['Yes', 'Y', 'yes', 'y', 'No', 'N', 'no', 'n'],
  //       limitMessage: 'Yes or no, please'
  //     })
  //     if (response === 'Y' | response === 'y' | response === 'Yes' | response === 'yes') {
  //       playerArchetype.push('solo')
  //       playerOpposite.push('social')
  //     } else {
  //       playerArchetype.push('social')
  //       playerOpposite.push('solo')
  //     }
  //   }

  //   if (occurrences.novelty > occurrences.nostalgia) {
  //     playerArchetype.push('novelty')
  //     playerOpposite.push('nostalgia')
  //   } else if (occurrences.nostalgia > occurrences.novelty) {
  //     playerArchetype.push('nostalgia')
  //     playerOpposite.push('novelty')
  //   } else {
  //     console.log(chalk.blue('Would you rather experience something new than revisit a favorite activity?'))
  //     let response = rs.question(``, {
  //       limit: ['Yes', 'Y', 'yes', 'y', 'No', 'N', 'no', 'n'],
  //       limitMessage: 'Yes or no, please'
  //     })
  //     if (response === 'Y' | response === 'y' | response === 'Yes' | response === 'yes') {
  //       playerArchetype.push('novelty')
  //       playerOpposite.push('nostalgia')
  //     } else {
  //       playerArchetype.push('nostalgia')
  //       playerOpposite.push('novelty')
  //     }
  //   }

  //   if(occurrences.active > occurrences.passive) {
  //     playerArchetype.push('active')
  //     playerOpposite.push('passive')
  //   } else if (occurrences.passive > occurrences.active) {
  //     playerArchetype.push('passive')
  //     playerOpposite.push('active')
  //   } else {
  //     console.log(chalk.blue('Are you more Type A (go-getter) than Type B (go-with-the-flow)?'))
  //     let response = rs.question(``, {
  //       limit: ['Yes', 'Y', 'yes', 'y', 'No', 'N', 'no', 'n'],
  //       limitMessage: 'Yes or no, please'
  //     })
  //     if (response === 'Y' | response === 'y' | response === 'Yes' | response === 'yes') {
  //       playerArchetype.push('active')
  //       playerOpposite.push('passive')
  //     } else {
  //       playerArchetype.push('passive')
  //       playerOpposite.push('active')
  //     }
  //   }
  //   if(occurrences.specific > occurrences.general) {
  //     playerArchetype.push('specific')
  //     playerOpposite.push('general')
  //   } else if (occurrences.general > occurrences.specific) {
  //     playerArchetype.push('general')
  //     playerOpposite.push('specific')
  //   } else {
  //     console.log(chalk.blue('Do you consider yourself a big-picture thinker?'))
  //     let response = rs.question(``, {
  //       limit: ['Yes', 'Y', 'yes', 'y', 'No', 'N', 'no', 'n'],
  //       limitMessage: 'Yes or no, please'
  //     })
  //     if (response === 'Y' | response === 'y' | response === 'Yes' | response === 'yes') {
  //       playerArchetype.push('general')
  //       playerOpposite.push('specific')
  //     } else {
  //       playerArchetype.push('specific')
  //       playerOpposite.push('general')
  //     }
  //   }

  //   rs.question()

  //   let friendArchetypes = []

  //   for(let i = 0; i <= 15; i++) {
  //     let archetypeArray = archetypes16[i].traits
  //     if (areEqual(archetypeArray, playerArchetype )) {
  //       console.log(chalk.yellow(`\nYour archetype is ${archetypes16[i].name}`))
  //       console.log(chalk.cyan(`\n${archetypes16[i].description}`))
  //     }
  //   }

  //   rs.question();

  //   for(let i = 0; i <= 15; i++) {
  //     let archetypeArray = archetypes16[i].traits
  //     if (haveMatches(archetypeArray, playerArchetype) === 3) {
  //       friendArchetypes.push(archetypes16[i])
  //     }
  //   }

  //   console.log(chalk.yellow(`\nYou are a kindred spirit to these archetypes:`))
  //   console.log(chalk.cyan(`\n${friendArchetypes[0].name}.  ${friendArchetypes[0].description}\n\n${friendArchetypes[1].name}.  ${friendArchetypes[1].description}\n\n${friendArchetypes[2].name}.  ${friendArchetypes[2].description}\n\n${friendArchetypes[3].name}.  ${friendArchetypes[3].description}`))

  //   rs.question();

  //   for(let i = 0; i <= 15; i++) {
  //     let archetypeArray = archetypes16[i].traits
  //     if (areEqual(archetypeArray, playerOpposite)) {
  //       console.log(chalk.red(`\nYour shadow archetype is ${archetypes16[i].name}\n\n${archetypes16[i].description}\n\nThis archetype is the least similar to you, but they may make good friends or even partners.`))
  //     }
  //   }

  //   rs.question()

  //   let playAgain = rs.question(`\n\nRediscover yourself, ${playerName}? `)

  //   if (playAgain === 'Y' | playAgain === 'y' | playAgain === 'Yes' | playAgain === 'yes') {
  //     console.log(` \n \n \n `)
  //     rs.question()
  //   } else {
  //     console.log(chalk.cyanBright('Goodbye!'))
  //     break
  //   }
  }
// }
