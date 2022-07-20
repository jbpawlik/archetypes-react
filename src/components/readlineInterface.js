import rl from 'readline-browser';
import getStringWidth from 'string-width';
import term from './xterm.js'

function getMappedKeyName(rawName){
  if(rawName === "Backspace"){
      return "backspace";
  }else if(rawName === "ArrowLeft"){
      return 'left';
  }else if(rawName === "ArrowRight"){
      return 'right';
  }else if(rawName === "ArrowUp"){
      return 'up';
  }else if(rawName === "ArrowDown"){
      return 'down';
  }else if(rawName === "Delete"){
      return 'delete';
  }else if(rawName === "Enter"){
      return 'enter';
  }else if(rawName === "Tab"){
      return 'tab';
  }else if(rawName === "Home"){
      return 'home';
  }else if(rawName === "End"){
      return 'end';
  }else if(rawName === "Return"){
      return 'return';
  }
  return rawName;
}

const input = {
  on(event,listener){
      if(event === "data"){
        // console.log(data)
      }else if(event === "keypress"){
          term.onData((char)=>{
              if(getStringWidth(char)>=2){
                  listener(char,{
                      sequence:char,
                      name:undefined,
                      ctrl:false,
                      meta:false,
                      shift:false,
                  })
              }
          });

          term.onKey(({key,domEvent})=>{

              const name = getMappedKeyName(domEvent.key);
              const ctrl = domEvent.ctrlKey;
              const shift = domEvent.shiftKey;

              listener(key,{
                  sequence:name,
                  name,
                  ctrl,
                  shift
              });
          });
      }
  },
  resume(){
      // console.log("resume");
  },
  pause(){
      // console.log("pause");
  }
}

const output = {
  isTTY:true,
  get columns(){
      return term.cols;
  },
  on(event,listener){
      if(event === "resize"){
          term.onResize(listener);
      }
  },
  write(data){
      term.write(data);
  }
}

export const readline = rl.createInterface(input,output);
// export const readline = rl.createInterface(input,output);
