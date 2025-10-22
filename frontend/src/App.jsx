import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home.jsx";
import ErrorPage from "./pages/ErrorPage.jsx";
import FullScreenPlayer from "./pages/FullScreenPlayer.jsx";


function App() {
  try{
return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/play/:movieId" element={<FullScreenPlayer />} />
        <Route path="*" element={<ErrorPage message="Page not found" />} />
      </Routes>
    </>
  );
  }catch(err){
    console.error("Error in App.jsx",err.message)
    return <ErrorPage message={`Something went wrong: ${err.message}`} />
  }
  
}

export default App;
