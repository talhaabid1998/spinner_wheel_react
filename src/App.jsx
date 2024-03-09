import React, { useEffect, useState } from "react";
import WinnerModal from "./component/modal";

import WheelComponent from "react-wheel-of-prizes";

export default function App() {
  const [segments, setSegments] = useState([
    "entry1",
    "entry2",
    "entry3",
    "entry4",
  ]);
  const segColors = ["#EE4040", "#F0CF50", "#815CD1", "#3DA5E0", "#34A24F"];
  const [newEntry, setNewEntry] = useState("");

  const addEntry = (event) => {
    event.preventDefault();
    if (newEntry) {
      // Prevent adding empty strings
      setSegments([...segments, newEntry]);
      setNewEntry(""); // Reset input field
    }
  };

  useEffect(() => {
    console.log(segments);
  }, [segments]);

  // Randomize segment colors for new entries
  const getRandomColor = () => {
    let letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };
  const [wheelSize, setWheelSize] = useState(250); // Default size

  useEffect(() => {
    // Function to update the size based on the viewport
    const updateSize = () => {
      const newSize = Math.min(window.innerWidth - 60, 200); // Ensure a margin of 50px on each side
      setWheelSize(newSize);
    };

    // Call it once to set the initial size
    updateSize();

    // Add event listener for window resize
    window.addEventListener("resize", updateSize);

    // Clean up event listener
    return () => window.removeEventListener("resize", updateSize);
  }, []);
  const removeEntry = (index) => {
    setSegments(segments.filter((_, i) => i !== index));
  };
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [winner, setWinner] = useState("");

  const onFinishedd = (winner) => {
    console.log(winner);
    setWinner(winner);
    setIsModalOpen(true); // Show the modal when the wheel finishes
  };

  // Function to close the modal
  const closeModal = () => {
    setIsModalOpen(false);
  };
  const [currentSegment, setCurrentSegment] = useState("");
  console.log(currentSegment, "cr");
  const onSegmentChange = (segment) => {
    setCurrentSegment(segment); // Update the current segment being highlighted
  };
  useEffect(() => {
    if (isModalOpen) {
      const sound = new Audio("./assets/cheer.mp3"); // The path to your sound file
      sound.play();
    }
  }, [isModalOpen]); // This effect runs when `isModalOpen` changes
  return (
    <div className="overflow-hidden">
     
    
      
      <div className="flex flex-col sm:flex-row items-start justify-center space-y-8 sm:space-y-0 sm:space-x-8 p-4">
        <div className="sm:w-1/3 lg:w-1/4 w-full mt-6">
        <h1 className="text-2xl sm:text-4xl font-bold text-center my-4">
        Spin the Wheel!
      </h1>
          <form onSubmit={addEntry} className="flex flex-col space-y-4">
            <input
              type="text"
              className="px-4 py-2 border rounded shadow w-full"
              value={newEntry}
              onChange={(e) => setNewEntry(e.target.value)}
              placeholder="Enter new entry"
            />
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded shadow hover:bg-blue-700 w-full"
            >
              Add Entry
            </button>
          </form>
          <div className="mt-4">
            
  <h3 className="text-md font-semibold mb-2">Entries:</h3>
  <div className="max-h-40 overflow-y-auto"> {/* Set the maximum height to control when to start scrolling */}
    <ul className="space-y-2">
      {segments.map((segment, index) => (
        <li
          key={index}
          className="group bg-white shadow border rounded-md px-4 py-2 flex justify-between items-center"
        >
          <span>{segment}</span>
          <button
            onClick={() => removeEntry(index)}
            className="opacity-0 group-hover:opacity-100 focus:opacity-100"
          >
            delete
          </button>
        </li>
      ))}
    </ul>
  </div>
</div>
        </div>

        <div className="w-full sm:w-2/3 lg:w-3/4 max-w-full">
          <WheelComponent
            // ... (rest of your props)
            key={segments.length} // Ensures the component re-renders on update
            segments={segments}
            segColors={segments.map(() => getRandomColor())} // Assign a random color to each segment
            onFinished={onFinishedd}
            primaryColor="gray"
            onSegmentChange={onSegmentChange}
            contrastColor="white"
            buttonText="start"
            isOnlyOnce={false}
            upDuration={500} // milliseconds, increase for a slower spin-up
            downDuration={6000} // milliseconds, increase for a slower spin down
            fontFamily="Arial"
            size={wheelSize} // Use state to set the size
            className="w-full max-w-full animate-spin-slight"
          />
        </div>
      </div>
      <WinnerModal winner={winner} isOpen={isModalOpen} onClose={closeModal} />
    </div>
  );
}
