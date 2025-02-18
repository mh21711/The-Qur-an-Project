"use client";

import { useEffect, useState } from "react";
import { Ayahs, Surahs } from "../Function And Data/data";
import AudioFunction from "./Audio";
import { getRandomColor } from "../Function And Data/Functions";

// Define the type of an Ayah
interface Ayah {
  SurahNumber: string;
  AyahNumber: string;
  AyahExplain: string;
  SurahText: string;
  GlobalAyahNumber: number;
  AyahText: string;
}

function Home() {
  // State variables
  const [randomAyah, setRandomAyah] = useState<Ayah | null>(null); // Stores the current random Ayah
  const [reader_id, setReaderId] = useState<string>("ar.alafasy"); // Stores the selected Quran reciter
  const [surahNumber, setSurahNumber] = useState<number>(1); // Stores the selected Surah number
  const [ayahNumber, setAyahNumber] = useState<number>(1); // Stores the selected Ayah number
  const [randomColor, setRandomColor] = useState<string>("#ffffff"); // Stores the background color
  const [message, setMessage] = useState<string>(""); // Stores any error or info messages
  const [isLoading, setIsLoading] = useState<boolean>(true); // Tracks loading state
  const [explainState, setExplainState] = useState<boolean>(false); // Tracks The Explain Dev State ( Transparent or Block )

  // Fetch a random Ayah on component mount
  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * Ayahs.length);
    setRandomAyah(Ayahs[randomIndex]); // Set a random Ayah
    setRandomColor(getRandomColor()); // Set a random background color
    setIsLoading(false); // Mark loading as complete
  }, []);

  // Update Surah and Ayah numbers when randomAyah changes
  useEffect(() => {
    if (randomAyah) {
      setSurahNumber(Number(randomAyah.SurahNumber)); // Update Surah number
      setAyahNumber(Number(randomAyah.AyahNumber)); // Update Ayah number
    }
  }, [randomAyah]);

  // Function to get a random Ayah
  function getRandomAyah() {
    const randomIndex = Math.floor(Math.random() * Ayahs.length);
    const newRandomAyah = Ayahs[randomIndex];

    // Update states
    setRandomAyah(newRandomAyah); // Set new random Ayah
    setRandomColor(getRandomColor()); // Set new random color
    setMessage(""); // Clear any messages

    if (newRandomAyah) {
      setSurahNumber(Number(newRandomAyah.SurahNumber)); // Update Surah number
      setAyahNumber(Number(newRandomAyah.AyahNumber)); // Update Ayah number
    }
  }

  // Function to handle Ayah selection
  function handleAyahSelection() {
    const ayah = Ayahs.find((ele) => Number(ele.SurahNumber) === surahNumber && Number(ele.AyahNumber) === ayahNumber);
    if (!ayah) {
      setMessage("الآية غير موجودة"); // Ayah not found
      return;
    }

    setRandomAyah(ayah); // Set selected Ayah
    setRandomColor(getRandomColor()); // Set new random color
    setMessage(""); // Clear any messages
  }

  // Function to get the next Ayah
  function getNextAyah() {
    if (randomAyah) {
      const nextAyahNumber = randomAyah.GlobalAyahNumber + 1;
      const nextAyah = Ayahs.find((ele) => ele.GlobalAyahNumber === nextAyahNumber);
      if (!nextAyah) {
        setMessage("لا يوجد آية تالية"); // No next Ayah
        return;
      }

      setRandomAyah(nextAyah); // Set next Ayah
    }
    setRandomColor(getRandomColor()); // Set new random color
    setMessage(""); // Clear any messages
  }

  // Function to get the previous Ayah
  function getPreviousAyah() {
    if (randomAyah) {
      const previousAyahNumber = randomAyah.GlobalAyahNumber - 1;
      const previousAyah = Ayahs.find((ele) => ele.GlobalAyahNumber === previousAyahNumber);
      if (!previousAyah) {
        setMessage("لا يوجد آية سابقة"); // No previous Ayah
        return;
      }

      setRandomAyah(previousAyah); // Set previous Ayah
    }
    setRandomColor(getRandomColor()); // Set new random color
    setMessage(""); // Clear any messages
  }

  // Function To Get The Explain of the ayah
  async function getExplainAyah() {
    setExplainState(!explainState); // Make the Explain Element Visible or Invisible
  }

  // Show loading spinner while data is being fetched
  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="main-container" style={{ backgroundColor: randomColor }}>
      {/* Display Any Errors or Any Messages */}
      <p className="message">{message}</p>

      {/* Display the Ayah and Surah And The Explain of The Ayah */}
      <div className="ayah-container">
        <div
          className="explain-container"
          style={explainState ? { display: "block" } : { display: "none" }}
        >
          <span onClick={() => setExplainState(false)}>x</span>
          {randomAyah?.AyahExplain}
        </div>
        <p className="ayah-text" style={{ color: randomColor }}>
          {randomAyah?.AyahText}
        </p>
        <p className="surah-name" style={{ color: randomColor }}>
          -- {randomAyah?.SurahText}
        </p>
        <div className="ayah-buttons">
          <button
            onClick={getRandomAyah}
            className="ayah-button"
            style={{ backgroundColor: randomColor }}
          >
            تغيير الآية بشكل عشوائي
          </button>
          <button
            onClick={getNextAyah}
            className="ayah-button"
            style={{ backgroundColor: randomColor }}
          >
            الآية التالية
          </button>
          <button
            onClick={getPreviousAyah}
            className="ayah-button"
            style={{ backgroundColor: randomColor }}
          >
            الآية السابقة
          </button>
          <button
            onClick={getExplainAyah}
            className="ayah-button"
            style={{ backgroundColor: randomColor }}
          >
            تفسير الآية
          </button>
        </div>
      </div>

      {/* Audio player for the Ayah */}
      <div className="audio-player">
        <AudioFunction
          randomAyah={randomAyah}
          reader_id={reader_id}
          getNextAyah={getNextAyah}
        />
      </div>

      {/* Controls for selecting reciter, Surah, and Ayah */}
      <div className="controls-container">
        <div className="reciter-selector">
          <span style={{ color: randomColor }}>الشيخ:</span>
          <select
            style={{ color: randomColor }}
            onChange={(e) => setReaderId(e.target.value)}
            defaultValue="ar.alafasy"
          >
            <option value="ar.alafasy">مشاري العفاسي</option>
            <option value="ar.abdulsamad">عبد الباسط عبد الصمد</option>
            <option value="ar.husary">محمود خليل الحصري</option>
            <option value="ar.minshawi">محمد صديق المنشاوي</option>
          </select>
        </div>
        <div className="surah-ayah-selector">
          <div className="surah-selector">
            <span style={{ color: randomColor }}>السورة:</span>
            <select
              style={{ color: randomColor }}
              onChange={(e) => setSurahNumber(Number(e.target.value))}
              value={surahNumber}
            >
              {Surahs.map((surah, index) => (
                <option key={index} value={index + 1}>
                  سُورَةُ {surah}
                </option>
              ))}
            </select>
          </div>
          <div className="ayah-selector">
            <span style={{ color: randomColor }}>الآية:</span>
            <input
              type="number"
              style={{ color: randomColor }}
              onChange={(e) => setAyahNumber(Number(e.target.value))}
              value={ayahNumber}
            />
          </div>
          <button
            className="change-button"
            style={{ color: randomColor }}
            onClick={handleAyahSelection}
          >
            تغيير
          </button>
        </div>
      </div>
    </div>
  );
}

export default Home;