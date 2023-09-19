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

  // console.log("rounded Count : ", roundCounter);
  // console.log("page re-rendered...");
  // console.log("data : ", myText);
  // console.log("Active Word : ", activeWordWithIndex);
  // console.log("CursorPosition : ", myText[2].CursorPosition);
  // console.log("rendering Finished-----------------------------");

  return (
    <div
      className={` bg-AAprimary min-h-screen  w-full flex flex-col justify-center items-center ${
        isFinished ? "pt-48" : ""
      }`}
    >
      {!isFinished && !(myText[1].length == 0) && (
        <>
          {/* Main page / Typing page */}
          <main className="w-full 2xl:px-96 xl:px-80 lg:px-64 md:px-28 px-12 flex flex-col justify-center items-center space-y-12">
            <div ref={textInputRef} className="relative w-full h-full flex flex-col space-y-8  ">
              {inputLostFocus && (
                <div
                  onClick={() => {
                    setInputLostFocus(false);
                  }}
                  ref={absoluteTextINputRef}
                  className="absolute w-full z-10 bg-AAprimary opacity-90 rounded border-[0.5px] border-gray-700 flex justify-center items-center
                          hover:cursor-pointer"
                >
                  <span className="text-gray-400 font-mono">Click to continue..</span>
                </div>
              )}
              {/* Text : Wpm & Timer */}
              {isStartedTyping && <div className="w-full flex justify-between pb-8">
                <span className="text-gray-400 md:text-xl text-sm ">
                  {seconds.current == timeToType ? "0" : calculateWpm(myText[1], timeToType - seconds.current)} wpm
                </span>
                <TimerSpan
                  setIsFinished={setIsFinished}
                  inputLostFocus={inputLostFocus}
                  seconds={seconds}
                  timerCountingInterval={timerCountingInterval}
                  updateStatistics={updateStatistics}
                />
              </div>}
              
              <div
                className="lg:text-3xl md:text-xl sm:text-xl hover:cursor-pointer flex flex-wrap px-2 "
                onClick={() => inputRef.current.focus()}
              >
                {myText[0].map((item, index) => {
                  // console.log("DOM Showing words......");
                  return (
                    <div key={index} className="flex ">
                      {item.word.split("").map((char, i) => {
                        if (
                          char.localeCompare(" ") == 0 &&
                          myText[1][item.indexFrom + i].charColor.localeCompare("text-AAError") == 0
                        ) {
                          return (
                            <div key={i} className={`relative text-AAError`}>
                              {i + item.indexFrom == myText[2].CursorPosition ? <CursorCarrotComp /> : <></>}
                              <div className="relative">
                                &nbsp; <div className="absolute bottom-0 h-[3px] w-full bg-AAError"></div>
                              </div>
                            </div>
                          );
                        } else if (char.localeCompare(" ") == 0) {
                          return (
                            <div key={i} className="relative ">
                              {i + item.indexFrom == myText[2].CursorPosition ? <CursorCarrotComp /> : <></>}
                              &nbsp;
                            </div>
                          );
                        } else {
                          return (
                            <div key={i} className={`relative ${myText[1][item.indexFrom + i].charColor}`}>
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
              {/**
               * @textInput : this is the input that the user will type on it, it's hidden and it's used to get the user input
               */}
              <div className="w-full flex justify-center">
                <input
                  onBlur={() => {
                    console.log("input lost focus!!");
                    setInputLostFocus(true);
                  }}
                  ref={inputRef}
                  type="text"
                  // ?INFORMATIONAL : uncomment the following line to see the input
                  // className="w-52 bg-AAprimary text-xl text-center text-gray-600 border-b-2 border-b-gray-600
                  //           py-2 px-4 focus:outline-none "

                  className="w-0 h-0 bg-AAprimary text-xl text-center text-gray-600  border-b-gray-600
                  py-2 px-4 focus:outline-none "
                  
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
                    // prevent cursor in input from jumping two characters
                    if (e.key === "ArrowLeft" || e.key === "ArrowRight") {
                      inputRef.current.setSelectionRange(
                        inputRef.current.value.length,
                        inputRef.current.value.length + 1
                      );

                    }
                  }}
                />
              </div>
            </div>
          </main>
          <Footer className="absolute bottom-0" link="https://arnab-portfolio-v2.vercel.app/" />
        </>
      )}

      {/* Finished Typing Section */}
      {isFinished && (
        <>
          <TypingStatistics
            restart={restart}
            roundCounter={roundCounter}
            seconds={seconds}
            statistics={statistics}
            timeToType={timeToType}
          />
          <Footer className="pt-16" link="https://arnab-portfolio-v2.vercel.app/" />
        </>
      )}
    </div>
  );
}
