/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-undef */
import { Terminal } from 'xterm';
import { FitAddon } from 'xterm-addon-fit';
import { AttachAddon } from 'xterm-addon-attach';
import { useEffect, useState } from 'react';
// import xtermTheme from 'xterm-theme';
import '../css/xterm.css';
import 'chalkie';
// import archetypesText from '../objectLists/archtypesText.js';
// import ptyServer from '../components/ptyServer.js'
import {openpty} from 'xterm-pty';

export default function TerminalInterface() {
  const { master, slave } = openpty();
  const [playGame, setPlayGame] = useState(true)
  const [playerInput, setPlayerInput] = useState('')

  useEffect(() => {

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

    const socket = new WebSocket("ws://localhost:3000", "echo-protocol");
    term.loadAddon(new AttachAddon(socket));
    term.loadAddon(master)

    term.onData(e => {
      switch (e) {
        case '\u0003': // Ctrl+C
          // term.write('');
          // prompt(term);
          term.reset();
          playArchetypes();
          break;
        case '\r': // Enter
          runCommand(term, command);
          command = '';
          break;
        case '\u007F': // Backspace (DEL)
          // Do not delete the prompt
          if (term._core.buffer.x > 2) {
            slave.write('\b \b');
            if (command.length > 0) {
              command = command.substr(0, command.length - 1);
            }
          }
          break;
        default: // Print all other characters for demo
          if (e >= String.fromCharCode(0x20) && e <= String.fromCharCode(0x7E) || e >= '\u00a0') {
            command += e;
            // This line doubles the characters being typed in the console (but not the number of inputs)
            // slave.write(e);
          }
      }
    }
    );

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

  function prompt(term) {
    command = '';
    term.write('\r\n ');
  }

  function runCommand(term, text) {
    const command = text.trim().split(' ')[0];
    if (command.length > 0) {
      // term.writeln('');
      if (command in commands) {
        commands[command].f();
        return;
      }
      // term.writeln(`${command}: command not found`);
    }
    prompt(term);
  }

    function playArchetypes() {
      let userInput = '';

      if (slave._initialized) {
        return;
      }
  
      slave._initialized = true;
  
      slave.prompt = () => {
        slave.write('\r\n');
      };
  
      slave.write(`${chalk.ansi256(179)(`
   █████╗ ██████╗  ██████╗██╗  ██╗███████╗████████╗██╗   ██╗██████╗ ███████╗███████╗
  ██╔══██╗██╔══██╗██╔════╝██║  ██║██╔════╝╚══██╔══╝╚██╗ ██╔╝██╔══██╗██╔════╝██╔════╝
  ███████║██████╔╝██║     ███████║█████╗     ██║    ╚████╔╝ ██████╔╝█████╗  ███████╗
  ██╔══██║██╔══██╗██║     ██╔══██║██╔══╝     ██║     ╚██╔╝  ██╔═══╝ ██╔══╝  ╚════██║
  ██║  ██║██║  ██║╚██████╗██║  ██║███████╗   ██║      ██║   ██║     ███████╗███████║
  ╚═╝  ╚═╝╚═╝  ╚═╝ ╚═════╝╚═╝  ╚═╝╚══════╝   ╚═╝      ╚═╝   ╚═╝     ╚══════╝╚══════╝
      \n`)}`);

      function askAnswer(text) {
        let textArray = [];
        slave.write(text)
        slave.prompt()
        slave.onReadable(() => {
          const textInput = slave.read()
          console.log(textInput)
          textInput.forEach(number => {
            textArray.push(String.fromCharCode(number))
          })
          console.log(textArray)
          userInput = textInput
          slave.write(`Hi, ${ textArray.join('') }!\n`)
          // setPlayerInput(textInput)
          // console.log(playerInput)
          // slave.write(playerInput)
          // userInput = String.fromCharCode(97,100,119,97,100,10)
          console.log(userInput)
        })
        // console.log(userInput)
        // return userInput
        // console.log(playerInput)
      }

      askAnswer('Input your name: ')
      // slave.write("Input your name:");
      // slave.onReadable(() => {
      //   // slave.write(slave.read())
      //   const text = slave.read().toString()
      //   console.log(text)
      //   slave.write(text);
      // });
      // console.log(slave.read());
      // slave.prompt()
      // console.log(slave.read());
      // slave.onReadable(() => {
      //   // slave.write(slave.read())
      //   const text = slave.read().toString()
      //   console.log(text)
      //   slave.write(text);
      // });
    }

    term.open(document.getElementById('terminal'));
    // const fitAddon = new FitAddon();
    // term.loadAddon(fitAddon);
    // fitAddon.fit();


    document.querySelector('.xterm').addEventListener('wheel', e => {
      if (term.buffer.active.baseY > 0) {
        e.preventDefault();
      }
    });

    playArchetypes();
    return () => {
      setPlayGame(false)
    }
  }, [playGame])


  if (playGame) {

    // runFakeTerminal();

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


  // slave.onReadable((text)=> {
  //   console.log(text)
  //   if (slave.read() === 'Yes' ||  slave.read() === 'Y') {
  //     // term.reset()
  //     // playGame=true
  //   } else {
  //     // playGame = false
  //   }
  //   term.write(slave.read())
  // })
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
}
