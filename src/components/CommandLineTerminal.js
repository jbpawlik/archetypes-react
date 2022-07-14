/* eslint-disable no-undef */
import { Terminal } from 'xterm';
import { FitAddon } from 'xterm-addon-fit';
import { AttachAddon } from 'xterm-addon-attach';
import xtermTheme from 'xterm-theme';
import TerminalInterface from '../TextInterface/TerminalInterface.js'
import '../css/xterm.css'
import 'chalkie'
import archetypesText from '../objectLists/archtypesText.js';

// import '../App.css';
// import { TextInterface } from '../TextInterface/TextInterface.js';
// console.log(chalk)
export default function CommandLineTerminal() {

  return (
  <TerminalInterface/>
  )
}