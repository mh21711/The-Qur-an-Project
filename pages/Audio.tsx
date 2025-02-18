import { useEffect, useRef, useState } from "react";
import axios from "axios";

// Define the type of an Ayah
interface Ayah {
  SurahNumber: string;
  AyahNumber: string;
  AyahExplain: string;
  SurahText: string;
  GlobalAyahNumber: number;
  AyahText: string;
}

// Interface defining props for the AudioComponent
interface AudioProps {
  randomAyah: Ayah | null; // Selected Ayah object
  reader_id: string; // Reciter identifier
  getNextAyah: () => void; // Function to fetch the next Ayah
}

// Component to fetch and play Ayah audio
function AudioComponent({ randomAyah, reader_id, getNextAyah }: AudioProps) {
  const [audioUrl, setAudioUrl] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const audioElement = useRef<HTMLAudioElement>(null);

  // Fetch audio URL when Ayah or Reciter changes
  useEffect(() => {
    async function fetchAudio() {
      if (!randomAyah || !reader_id) return;
      setLoading(true);
      try {
        const response = await axios.get(
          `https://api.alquran.cloud/v1/ayah/${randomAyah.GlobalAyahNumber}/${reader_id}`
        );

        if (response.data.data.audio) {
          setAudioUrl(response.data.data.audio);
        } else {
          console.warn("No audio file found for this Ayah.");
          setAudioUrl("");
        }
      } catch (error) {
        console.error("Error fetching audio:", error);
        setAudioUrl("");
      } finally {
        setLoading(false);
      }
    }
    fetchAudio();
  }, [randomAyah, reader_id]);

  // Set default audio volume to 5%
  useEffect(() => {
    if (audioElement.current) {
      audioElement.current.volume = 0.05;
    }
  }, [audioUrl]);

  if (loading) {
    return <p>Loading audio...</p>;
  }

  if (!audioUrl) {
    return <p>No audio available for this Ayah.</p>;
  }

  return (
    <audio
      ref={audioElement}
      src={audioUrl}
      controls
      onEnded={getNextAyah}
      autoPlay
    />
  );
}

export default AudioComponent;
