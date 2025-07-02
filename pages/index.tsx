import React, { useCallback, useEffect, useRef, useState } from "react";
import TimerSpan from "../components/timer/TimerSpan";
import Footer from "../components/Footer/Footer";
import TypingStatistics from "../components/Statistics/TypingStatistics";
import { getData, calculateWpm, calculateAccuracy, handleOnChangeInput } from "../components/Functions/functions";
import CursorCarrotComp from "../components/CursorCarotComp/CursorCarotComp";
import {ActiveWordWithIndex, Data, Statistics} from "../components/Types/types";

let keyboardEvent; // this variable will hold the keyboard event callback function;
let eventInputLostFocus; //  this variable will hold the event callback function that will be fired when window is resizing & input lost focus

export default function Home() {
  //  this general state will hold the data
  const [myText, setMyText] = React.useState<Data>([[], [], { CursorPosition: 0 }]);
  // this state will hold the active word index and the word details
  const [activeWordWithIndex, setActiveWordWithIndex] = useState<ActiveWordWithIndex>(null); // this state will hold the active word with its index in the quote
  const [roundCounter, setRoundCounter] = useState<number>(0); // this state will hold the round counter
  const [isFinished, setIsFinished] = useState(false);// this state will hold when user finished typing
  const inputRef = useRef<HTMLInputElement>(null);// user input Ref
  const textInputRef = useRef<HTMLDivElement>(null);
  const absoluteTextINputRef = useRef<HTMLDivElement>(null);// absolute div Ref when input Lost focus
  const [inputLostFocus, setInputLostFocus] = useState(false);
  const timeToType: number = 180; // default time to type
  const seconds = useRef<number>(timeToType); // this useRef will hold the remaining seconds to type
  const timerCountingInterval = useRef(); // this useRef will hold the interval used in TimerSpan Component
  const [statistics, setStatistics] = useState<Statistics>([]); // this state will hold the statistics after user finish typing
  const [isStartedTyping,seIsStartedTyping] = useState<boolean>(false); // this state will hold if user started typing

  //  this restart will be assigned again in each render only when roundCounter increase
  const restart = useCallback(() => {
    document.removeEventListener("keydown", keyboardEvent);
    console.log("event Listener is Removed!!!!!!!!!!");
    seconds.current = timeToType; // update the seconds to default value again
    getData(setMyText, setActiveWordWithIndex, setRoundCounter, roundCounter);
    setActiveWordWithIndex(null);
    seIsStartedTyping(false);
    if (inputRef.current?.value) {
      inputRef.current.value = "";
    }
  }, [roundCounter]);

  // update Statistics state
  const updateStatistics = useCallback(() => {
    statistics.push({
      round: roundCounter,
      wpm: calculateWpm(myText[1], timeToType - seconds.current),
      accuracy: calculateAccuracy(myText[1]),
    });
    setStatistics([...statistics]);
  }, [myText, roundCounter, statistics]);

  // add event listener to track window size to change inputLostFocus Element height
  useEffect(() => {
    if (inputLostFocus) {
      eventInputLostFocus = () => {
        console.log("window is resized..Changing inputLostFocus height");
        if (absoluteTextINputRef.current?.style && inputLostFocus) {
          absoluteTextINputRef.current.style.height = textInputRef.current.clientHeight + "px";
        }
      };
      window.addEventListener("resize", eventInputLostFocus);
    } else {
      // delete event listener when it's Focused
      window.removeEventListener("resize", eventInputLostFocus);
    }
  }, [inputLostFocus]);

  // this useEffect will be called when the component is rendered for the first time and will keep focus on input
  useEffect(() => {
    if (myText[0].length == 0) {
      console.log("#useEffect Getting Data.......");
      getData(setMyText, setActiveWordWithIndex, setRoundCounter, roundCounter); // setMyText is the callback function
    }
    inputRef.current?.focus();
    console.log("useEffect executed...");
  }, [myText, activeWordWithIndex, isFinished, roundCounter]);
  // this useEffect will be called each time restart is changed, it will initialize the keyboard event
  useEffect(() => {
    inputRef.current?.focus();
    keyboardEvent = (e: KeyboardEvent) => {
      console.log("KeyDown Detected : ", e.code);
      if ((e.metaKey || e.ctrlKey) && e.code === "Slash") {
        restart();
        console.log("Restarted By Shortcut!!!!");
      }
    };
  }, [restart]);

  // add event listener when the user finished typing
  useEffect(() => {
    if (isFinished) {
      console.log("event Listener added!!!");
      document.addEventListener("keydown", keyboardEvent);
    }
  }, [isFinished]);

  // this will handle new round conditions.
  useEffect(() => {
    console.log("event Listener is Removed!!!!!!!!!!");
    document.removeEventListener("keydown", keyboardEvent);
    if (inputRef.current?.value) {
      inputRef.current.value = "";
    }
    setIsFinished(false); // set isFinished to false each time roundCounter changes that means each new round
    console.log("useEffect RoundCounter executed...");
  }, [roundCounter]);

  // this useEffect will handle inputLostFocus state
  useEffect(() => {
    if (inputLostFocus) {
      if (absoluteTextINputRef.current?.style && inputLostFocus) {
        absoluteTextINputRef.current.style.height = textInputRef.current.clientHeight + "px";
      }
    } else {
      inputRef.current?.focus();
    }
  }, [inputLostFocus]);

  return (
    <div className="bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 min-h-screen w-full flex flex-col">
      {/* Header */}
      <header className="w-full px-4 py-6 flex justify-center">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-lg">T</span>
          </div>
          <h1 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
            TypeMaster
          </h1>
        </div>
      </header>

      <div className={`flex-1 flex flex-col justify-center items-center ${isFinished ? "pt-16" : ""}`}>
        {!isFinished && !(myText[1].length == 0) && (
          <>
            {/* Main Typing Interface */}
            <main className="w-full max-w-6xl mx-auto px-6 flex flex-col justify-center items-center space-y-8">
              {/* Stats Bar */}
              {isStartedTyping && (
                <div className="w-full bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-6 shadow-2xl">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center space-x-6">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-cyan-400">
                          {seconds.current == timeToType ? "0" : calculateWpm(myText[1], timeToType - seconds.current)}
                        </div>
                        <div className="text-sm text-gray-400 uppercase tracking-wide">WPM</div>
                      </div>
                      <div className="w-px h-12 bg-gray-600"></div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-blue-400">
                          {calculateAccuracy(myText[1])}%
                        </div>
                        <div className="text-sm text-gray-400 uppercase tracking-wide">Accuracy</div>
                      </div>
                    </div>
                    <div className="text-center">
                      <TimerSpan
                        setIsFinished={setIsFinished}
                        inputLostFocus={inputLostFocus}
                        seconds={seconds}
                        timerCountingInterval={timerCountingInterval}
                        updateStatistics={updateStatistics}
                      />
                      <div className="text-sm text-gray-400 uppercase tracking-wide mt-1">Time Left</div>
                    </div>
                  </div>
                </div>
              )}

              {/* Typing Area */}
              <div ref={textInputRef} className="relative w-full">
                {inputLostFocus && (
                  <div
                    onClick={() => setInputLostFocus(false)}
                    ref={absoluteTextINputRef}
                    className="absolute w-full z-10 bg-slate-900/95 backdrop-blur-sm rounded-2xl border border-cyan-400/30 flex justify-center items-center hover:cursor-pointer transition-all duration-300 hover:border-cyan-400/50"
                  >
                    <div className="text-center py-8">
                      <div className="text-cyan-400 text-lg font-semibold mb-2">Click to continue typing</div>
                      <div className="text-gray-400 text-sm">Press any key to resume</div>
                    </div>
                  </div>
                )}
                
                <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-8 shadow-2xl">
                  <div
                    className="text-2xl leading-relaxed hover:cursor-pointer flex flex-wrap"
                    onClick={() => inputRef.current.focus()}
                  >
                    {myText[0].map((item, index) => {
                      return (
                        <div key={index} className="flex">
                          {item.word.split("").map((char, i) => {
                            if (
                              char.localeCompare(" ") == 0 &&
                              myText[1][item.indexFrom + i].charColor.localeCompare("text-AAError") == 0
                            ) {
                              return (
                                <div key={i} className={`relative text-red-400`}>
                                  {i + item.indexFrom == myText[2].CursorPosition ? <CursorCarrotComp /> : <></>}
                                  <div className="relative">
                                    &nbsp; <div className="absolute bottom-0 h-[3px] w-full bg-red-400 rounded"></div>
                                  </div>
                                </div>
                              );
                            } else if (char.localeCompare(" ") == 0) {
                              return (
                                <div key={i} className="relative">
                                  {i + item.indexFrom == myText[2].CursorPosition ? <CursorCarrotComp /> : <></>}
                                  &nbsp;
                                </div>
                              );
                            } else {
                              return (
                                <div key={i} className={`relative transition-colors duration-150 ${
                                  myText[1][item.indexFrom + i].charColor === "text-AAsecondary" ? "text-cyan-400" :
                                  myText[1][item.indexFrom + i].charColor === "text-AAError" ? "text-red-400" :
                                  "text-gray-400"
                                }`}>
                                  {char}
                                  {i + item.indexFrom == myText[2].CursorPosition ? <CursorCarrotComp /> : <></>}
                                </div>
                              );
                            }
                          })}
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Hidden Input */}
                <input
                  onBlur={() => {
                    console.log("input lost focus!!");
                    setInputLostFocus(true);
                  }}
                  ref={inputRef}
                  type="text"
                  className="w-0 h-0 opacity-0 absolute"
                  onChange={e => {
                    if(isStartedTyping==false){
                      seIsStartedTyping(true);
                    }
                    handleOnChangeInput(
                      e.target.value,
                      e,
                      activeWordWithIndex,
                      setActiveWordWithIndex,
                      myText,
                      setMyText,
                      setIsFinished,
                      timerCountingInterval,
                      updateStatistics
                    );
                  }}
                  onKeyDownCapture={e => {
                    if (e.key === "ArrowLeft" || e.key === "ArrowRight") {
                      inputRef.current.setSelectionRange(
                        inputRef.current.value.length,
                        inputRef.current.value.length + 1
                      );
                    }
                  }}
                />
              </div>

              {/* Instructions */}
              {!isStartedTyping && (
                <div className="text-center space-y-4">
                  <div className="text-gray-300 text-lg">Click on the text area and start typing to begin</div>
                  <div className="flex items-center justify-center space-x-4 text-sm text-gray-400">
                    <div className="flex items-center space-x-2">
                      <kbd className="px-2 py-1 bg-gray-700 rounded text-xs">Ctrl</kbd>
                      <span>+</span>
                      <kbd className="px-2 py-1 bg-gray-700 rounded text-xs">/</kbd>
                      <span>to restart</span>
                    </div>
                  </div>
                </div>
              )}
            </main>
            <Footer className="mt-16" link="https://github.com/arnab-4/Typing-school" />
          </>
        )}

        {/* Results Screen */}
        {isFinished && (
          <>
            <TypingStatistics
              restart={restart}
              roundCounter={roundCounter}
              seconds={seconds}
              statistics={statistics}
              timeToType={timeToType}
            />
            <Footer className="mt-16" link="https://github.com/arnab-4/Typing-Trainer" />
          </>
        )}
      </div>
    </div>
  );
}