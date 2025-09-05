import React, { useEffect, useRef, useState } from "react";
import giphy from "../images/giphycopy.gif";
import "./JarvisAssistant.css";

const JarvisAssistant = () => {
  const btnRef = useRef(null);
  const contentRef = useRef(null);
  const [initialized, setInitialized] = useState(false);
  const [response, setResponse] = useState("");
  const [isListening, setIsListening] = useState(false); // Listening state

  useEffect(() => {
    const speak = (text) => {
      const textSpeak = new SpeechSynthesisUtterance(text);
      textSpeak.rate = 1.4;
      textSpeak.volume = 1;
      textSpeak.pitch = 0.5;
      window.speechSynthesis.speak(textSpeak);
    };

    const initializeAssistant = () => {
      if (!initialized) {
        speak("Initializing JARVIS... ");
        setInitialized(true);
      }
    };

    const takeCommand = (message) => {
      let reply = "";
      message = message.trim().toLowerCase();

      // Recognized Commands
      if (message.includes("hey") || message.includes("hello")) {
        reply = "Hello Sir, How May I Help You?";
      } else if (message.includes("open google")) {
        window.open("https://google.com", "_blank");
        reply = "Opening Google...";
      } else if (message.includes("open youtube")) {
        window.open("https://youtube.com", "_blank");
        reply = "Opening YouTube...";
      } 

      // Java
      else if (message.includes("default value of a local variable in java")) {
        reply = "It must be initialized before use.";
      } else if (message.includes("final keyword")) {
        reply = "The variable cannot be reassigned a new value.";
      } else if (message.includes("features of java")) {
        reply = "Platform independence and object-oriented are key features of Java.";
      }

      // DSA
      else if (message.includes("which data structure is")) {
        reply = "Stack is the correct answer.";
      } else if (message.includes("what is the value of")) {
        reply = "-18 is the correct answer.";
      } else if (message.includes("which algorithm is used")) {
        reply = "Divide and conquer is the correct answer.";
      }

      // Python
      else if (message.includes("immutable data type in python")) {
        reply = "Tuple is the correct answer.";
      } else if (message.includes("what is the correct way to")) {
        reply = "def FunctionName(): is the correct answer.";
      } else if (message.includes("python libraries")) {
        reply = "Pandas and NumPy.";
      }

      // Default response
      else {
        reply = "I'm sorry, I didn't understand that. Searching on Google...";
        window.open(`https://www.google.com/search?q=${encodeURIComponent(message)}`, "_blank");
      }

      setResponse(reply);
      speak(reply);
    };

    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = SpeechRecognition ? new SpeechRecognition() : null;

    if (!recognition) {
      setResponse("Speech Recognition is not supported on this browser.");
      speak("Speech Recognition is not supported on this browser.");
      return;
    }

    recognition.onresult = (event) => {
      const transcript = event.results[event.resultIndex][0].transcript;
      contentRef.current.textContent = transcript;
      takeCommand(transcript.toLowerCase());
      setIsListening(false);
    };

    recognition.onend = () => setIsListening(false);

    recognition.onerror = (event) => {
      setResponse(`Error: ${event.error}`);
      speak(`Error: ${event.error}`);
      setIsListening(false);
    };

    const handleButtonClick = () => {
      if (recognition) {
        setIsListening(true);
        contentRef.current.textContent = "Listening...";
        recognition.start();
      }
    };

    const btn = btnRef.current;
    btn.addEventListener("click", handleButtonClick);

    if (!initialized) {
      initializeAssistant();
    }

    return () => {
      btn.removeEventListener("click", handleButtonClick);
    };
  }, [initialized]);

  return (
    <section className="main">
      <div className="image-container">
        <div className="image">
          <img src={giphy} alt="JARVIS" />
        </div>
        <h1>J A R V I S</h1>
        <h6>I am your Virtual Assistant JARVIS. How may I help you?</h6>
      </div>

      <div className="input">
        <button
          className={`talk ${isListening ? "listening" : ""}`}
          ref={btnRef}
        >
          <h1 className="content" ref={contentRef}>
            Click here to speak
          </h1>
        </button>
      </div>

      <div className="jarvis-frame">
        <p className="typing-effect">{response}</p>
      </div>
    </section>
  );
};

export default JarvisAssistant;
