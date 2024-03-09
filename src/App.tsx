import { SideBar } from "./component/side-bar"
import { Routes, Route } from 'react-router-dom';
import { RoutesData } from "./routes-data";
import { ListProvider } from "./store";

function App() {
  return (
    <ListProvider>
      <div className="flex h-100vh w-100vw">
        <SideBar />
        <div className="flex-1 h-full">
          <Routes>
            {RoutesData.map((route, index) => {
              return <Route key={index} path={route.path} element={route.element} />
            })}
          </Routes>
        </div>
      </div>
    </ListProvider>
  )
}

export default App
