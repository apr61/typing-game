import { useState } from "react";

function App() {
  const TypingString = "The quick brown fox jumps over the lazy dog near the quiet riverbank, where the sun sets behind the tall mountains, casting a golden hue across the serene landscape As the evening breeze gently rustles the leaves, the distant sound of crickets begins to fill the air. Nearby, a small boat drifts slowly along the calm waters, leaving ripples in its wake. The peaceful scene is a reminder of nature's simple beauty, untouched by the hustle and bustle of daily life, offering a moment of tranquility and reflection amidst the chaos of the world.".toLowerCase();

  const InitialElements = TypingString.split("").map((ch, i) => {
    return (
      <span key={i} className="text-white text-opacity-20">
        {ch}
      </span>
    );
  });

  const [current, setCurrent] = useState<string>("");
  const [gameString, setGameString] =
    useState<React.ReactElement[]>(InitialElements);

  const handleGameChange = (index: number, value: string) => {
    const tempGameString = gameString.map((e, i) => {
      if (i === index) {
        if (value[index] === TypingString[index]) {
          return (
            <span key={i} className="text-white">
              {TypingString[index]}
            </span>
          );
        }
        return (
          <span key={i} className="text-red-500">
            {TypingString[index]}
          </span>
        );
      }
      return e;
    });
    setGameString(tempGameString);
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value.length === 0) {
      setGameString(InitialElements);
      setCurrent("");
      return;
    }
    const len = value.length - 1;
    handleGameChange(len, value)
    setCurrent(value)
  };

  const handleButtonChange = () => {
    const newLen = current.length + 5
    const newString = TypingString.substring(0, newLen);
    handleGameChange(newLen - 1, newString)
    setCurrent(newString) 
  }

  return (
    <div className="max-w-7xl w-full mx-auto mt-10">
      <div className="text-xl">{gameString}</div>
      <div className="my-4">
        <input
          name="currentInput"
          className="w-full resize-none bg-transparent border-2 focus-visible:outline-none p-2 text-xl rounded-md"
          value={current}
          onChange={handleChange}
        />
      </div>
      <div>
        <button className="w-10 h-10 border-2 rounded-full text-2xl" onClick={handleButtonChange}>+</button>
      </div>
    </div>
  );
}

export default App;
