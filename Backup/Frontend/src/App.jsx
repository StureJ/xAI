import { useState } from "react";
import Fixed from "./Components/Fixed.jsx";
import "./App.css";
import Prediction from "./Components/Prediction.jsx";
import Categories from "./Components/Categories/Categories.jsx";
import NotActionable from "./Components/NotActionable.jsx";
import Diagram from "./Components/Diagram.jsx";
import US_Changeable from "./Components/Changeable/Variations/US_Changeable.jsx";
import Changeable2 from "./Components/Changeable/Variations/CG_Changeable.jsx";
import MS_Changeable from "./Components/Changeable/Variations/MS_Changeable.jsx";

function App() {
  const [prediction, setPrediction] = useState(1);
  const [shapData, setShapData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("cardiometabolic");

  // Create a trigger state
  const [refreshKey, setRefreshKey] = useState(0);

  const handlePatientSwitch = () => {
    setRefreshKey(prev => prev + 1);
  };

  const [mode, setMode] = useState("A");


  return (
    <div className="container">
      <div className="upper-row">
        <div className="left-column">
          <Fixed onPatientSwitch={handlePatientSwitch} setMode={setMode} mode={mode}/>
          <div className="lower-column">
            <Categories activeTab={activeTab} setActiveTab={setActiveTab} />
            <NotActionable />
          </div>
        </div>
        <Prediction prediction={prediction} isLoading={isLoading}/>
      </div>
      <div className="lower-row">
        {mode === "A" && <US_Changeable setPrediction={setPrediction} setShapData={setShapData} setIsLoading={setIsLoading} activeTab={activeTab} refreshKey={refreshKey}/>}
        {mode === "B" && <Changeable2 setPrediction={setPrediction} setShapData={setShapData} setIsLoading={setIsLoading} activeTab={activeTab} refreshKey={refreshKey}/>}
        {mode === "C" && <MS_Changeable setPrediction={setPrediction} setShapData={setShapData} setIsLoading={setIsLoading} activeTab={activeTab} refreshKey={refreshKey}/>}
        <Diagram shapData={shapData} isLoading={isLoading}/>
      </div>
    </div>
  );
}

export default App;