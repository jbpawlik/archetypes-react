/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-undef */
import { Terminal } from 'xterm';
import { FitAddon } from 'xterm-addon-fit';
import { AttachAddon } from 'xterm-addon-attach';
import { useEffect, useState } from 'react';
import { questionList16 } from '../objectLists/questionList16.js';
import { archetypes16 } from '../objectLists/archetypes16.js';
import areEqual from '../functions/areEqual.js';
import haveMatches from '../functions/haveMatches.js'
// import xtermTheme from 'xterm-theme';
import '../css/xterm.css';
import 'chalkie';
// import archetypesText from '../objectLists/archtypesText.js';
// import ptyServer from '../components/ptyServer.js'
// import {openpty} from 'xterm-pty';
import {readline} from '../components/readlineInterface.js'
import term from '../components/xterm.js';

export default function TerminalInterface() {
  // const { master, slave } = openpty();
  const [playGame, setPlayGame] = useState(true)
  const [playerInput, setPlayerInput] = useState('')

  useEffect(() => {

    const AskAndRepeat = function(question) {
      return new Promise( (res, rej) => {
          readline.question(question, answer => {
              res(answer);
          })
      });
    };

    if (playGame) {

    async function archetypes() {

      let name;
      let age;
      let intro;
      let askQuestions;
      let playerAttributes = []
      let occurrences = { };
      let playerArchetype = []
      let playerOpposite = []
      let friendArchetypes = []
      let followup1;
      let followup2;
      let followup3;
      let followup4;
      let archetype;
      let friendArchetype;
      let oppositeArchetype;
      let playAgain;


      // readline.on('line', function (cmd) {
      //   console.log('You just typed: '+cmd);
      // });

      term.write(chalk.ansi256(179)(`
  █████╗ ██████╗  ██████╗██╗  ██╗███████╗  
 ██╔══██╗██╔══██╗██╔════╝██║  ██║██╔════╝  
 ███████║██████╔╝██║     ███████║█████╗    
 ██╔══██║██╔══██╗██║     ██╔══██║██╔══╝    
 ██║  ██║██║  ██║╚██████╗██║  ██║███████╗  
 ╚═╝  ╚═╝╚═╝  ╚═╝ ╚═════╝╚═╝  ╚═╝╚══════╝  
                                        
████████╗██╗   ██╗██████╗ ███████╗███████╗
╚══██╔══╝╚██╗ ██╔╝██╔══██╗██╔════╝██╔════╝
   ██║    ╚████╔╝ ██████╔╝█████╗  ███████╗
   ██║     ╚██╔╝  ██╔═══╝ ██╔══╝  ╚════██║
   ██║      ██║   ██║     ███████╗███████║
   ╚═╝      ╚═╝   ╚═╝     ╚══════╝╚══════╝
      \n`));

      readline.question('', (answer) => {
        // return new Promise( (res, rej) => {
          // readline.cursorTo()
          term.write('\x1Bc');
        // });
      })

      readline.on('line', async function () {
        while (!name) {
          name = await AskAndRepeat('          What is your name?\n')
          term.write('\x1Bc')
          term.write(chalk.green(`\nWelcome ${name}`,`, answer these questions to receive an archetype\n`))
          askQuestions = true;
        }
      });


      const AskArchetypeQuestions = function(question, i) {
        readline.setPrompt(question);
        readline.prompt();
        return new Promise( (res, rej) => {
          readline.question(question, response => {
            if (response === 'Y' | response === 'y' | response === 'Yes' | response === 'yes') {
              questionList16[i].answer = 'Y'
              playerAttributes.push(questionList16[i].traits[0])
              playerAttributes.push(questionList16[i].traits[1])
              playerAttributes.push(questionList16[i].traits[2])
              playerAttributes.push(questionList16[i].traits[3])
              res(response)
            } else if (response === 'N' | response === 'n' | response === 'No' | response === 'no') {
              questionList16[i].answer = 'N'
              res(response)
            } else {
              term.write('\nYes or no, please.',
              res(AskArchetypeQuestions(question, i)))
            }
          })
        });
      };

      readline.on('line', async function() {
        while (askQuestions) {
          for (let i = 0; i <= 15; i++) {
            askQuestions = await AskArchetypeQuestions(questionList16[i].question, i)
            console.log(i)
          }
          askQuestions = false;
          followup1 = true
        }
      })


      for (let i = 0, j = playerAttributes.length; i < j; i++) {
        occurrences[playerAttributes[i]] = (occurrences[playerAttributes[i]] || 0) + 1;
      }

      const AskFollowupQuestions = function(question) {
        readline.setPrompt(question);
        readline.prompt();
        return new Promise( (res, rej) => {
          readline.question(question, response => {
            if (response === 'Y' | response === 'y' | response === 'Yes' | response === 'yes') {
              res(response)
            } else if (response === 'N' | response === 'n' | response === 'No' | response === 'no') {
              res(response)
            } else {
              term.write('\nYes or no, please.',
              res(AskFollowupQuestions(question)))
            }
          })
        });
      };

      readline.on('line', async function() {
        while (followup1) {
        if (occurrences.solo > occurrences.social) {
          playerArchetype.push('solo')
          playerOpposite.push('social')
        } else if (occurrences.social > occurrences.solo) {
          playerArchetype.push('social')
          playerOpposite.push('solo')
        } else {
          followup1 = await AskFollowupQuestions(chalk.blue('Do you prefer the company of yourself to the company of others?'))
          if (followup1 === 'Y' | followup1 === 'y' | followup1 === 'Yes' | followup1 === 'yes') {
            playerArchetype.push('solo')
            playerOpposite.push('social')
          } else {
            playerArchetype.push('social')
            playerOpposite.push('solo')
          }
          followup1 = false;
          followup2 = true;
        }}})

        readline.on('line', async function() {
          while (followup2) {
            if (occurrences.novelty > occurrences.nostalgia) {
              playerArchetype.push('novelty')
              playerOpposite.push('nostalgia')
            } else if (occurrences.nostalgia > occurrences.novelty) {
              playerArchetype.push('nostalgia')
              playerOpposite.push('novelty')
          } else {
            followup2 = await AskFollowupQuestions(chalk.blue('Would you rather experience something new than revisit a favorite activity?'))
            if (followup2 === 'Y' | followup2 === 'y' | followup2 === 'Yes' | followup2 === 'yes') {
              playerArchetype.push('novelty')
              playerOpposite.push('nostalgia')
            } else {
              playerArchetype.push('nostalgia')
              playerOpposite.push('novelty')
            }
            followup2 = false;
            followup3 = true;
          }}})

        readline.on('line', async function() {
          while (followup3) {
            if(occurrences.active > occurrences.passive) {
              playerArchetype.push('active')
              playerOpposite.push('passive')
            } else if (occurrences.passive > occurrences.active) {
              playerArchetype.push('passive')
              playerOpposite.push('active')
            } else {
              followup3 = await AskFollowupQuestions(chalk.blue('Are you more Type A (go-getter) than Type B (go-with-the-flow)?'))
              if (followup3 === 'Y' | followup3 === 'y' | followup3 === 'Yes' | followup3 === 'yes') {
                playerArchetype.push('active')
                playerOpposite.push('passive')
              } else {
                playerArchetype.push('passive')
                playerOpposite.push('active')
              }
              followup3 = false;
              followup4 = true;
        }}})

        readline.on('line', async function() {
          while (followup4) {
            if(occurrences.specific > occurrences.general) {
                playerArchetype.push('specific')
                playerOpposite.push('general')
              } else if (occurrences.general > occurrences.specific) {
                playerArchetype.push('general')
                playerOpposite.push('specific')
              } else {
              followup4 = await AskFollowupQuestions(chalk.blue('Do you consider yourself a big-picture thinker?'))
              if (followup4 === 'Y' | followup4 === 'y' | followup4 === 'Yes' | followup4 === 'yes')  {
                playerArchetype.push('general')
                playerOpposite.push('specific')
              } else {
                playerArchetype.push('specific')
                playerOpposite.push('general')
              }
              followup4 = false;
              archetype = true;
        }}})

        readline.on('line', async function() {
          while (archetype) {
            for (let i = 0; i <= 15; i++) {
              let archetypeArray = await archetypes16[i].traits
              if (areEqual(archetypeArray, playerArchetype )) {
                term.write(chalk.yellow(`\nYour archetype is ${archetypes16[i].name}`))
                term.write(chalk.cyan(`\n${archetypes16[i].description}`))
              }
            }
            archetype = false
            friendArchetype = true
          }
        })

        readline.on('line', async function() {
          while (friendArchetype) {
            for (let i = 0; i <= 15; i++) {
              let archetypeArray = await archetypes16[i].traits
              if (haveMatches(archetypeArray, playerArchetype) === 3) {
                friendArchetypes.push(archetypes16[i])
              }
            }
            friendArchetype = false
            oppositeArchetype = true
          }
          if (friendArchetypes.length >= 4 && oppositeArchetype) {
            term.write(chalk.yellow(`\nYou are a kindred spirit to these archetypes:`))
            term.write(chalk.cyan(`\n${friendArchetypes[0].name}.  ${friendArchetypes[0].description}\n\n${friendArchetypes[1].name}.  ${friendArchetypes[1].description}\n\n${friendArchetypes[2].name}.  ${friendArchetypes[2].description}\n\n${friendArchetypes[3].name}.  ${friendArchetypes[3].description}`))
          }
          })

        readline.on('line', async function() {
          while (oppositeArchetype) {
            for(let i = 0; i <= 15; i++) {
              let archetypeArray = await archetypes16[i].traits
              if (areEqual(archetypeArray, playerOpposite)) {
                term.write(chalk.red(`\nYour shadow archetype is ${archetypes16[i].name}\n\n${archetypes16[i].description}\n\nThis archetype is the least similar to you, but they may make good friends or even partners.`))
              }
            }
            oppositeArchetype = false;
            playAgain = true;
          }
        })

        readline.on('line', async function() {
          while (playAgain) {
            playAgain = await AskAndRepeat(`Rediscover yourself, ${name}?`)
            if (playAgain === 'Y' | playAgain === 'y' | playAgain === 'Yes' | playAgain === 'yes') {
              term.write('\x1Bc')
              playAgain = false
              archetypes()
            } else {
              term.write(chalk.cyanBright('Goodbye!'))
              playAgain = false
              term.dispose();
            }
          }
        })
      }
      archetypes()
    }
      return () => {
        setPlayGame(false)
      }
  }, [playGame])



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
    // }
}
