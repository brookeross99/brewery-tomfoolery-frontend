import './App.css';
import NavBar from './components/NavBar';
import Home from './components/Home';
import About from './components/About';
import MyBrews from './components/MyBrewsFolder/MyBrews';
import EditBrewCard from './components/MyBrewsFolder/EditBrewCard';
import Login from './components/Login';
import FavoriteBrews from './components/FavoritesFolder/FavoriteBrews';
import GlobalBrews from './components/GlobalBrewsFolder/GlobalBrews';
import {Route, Switch} from 'react-router-dom';
import React,{useState,useEffect} from 'react'
// import BrewsList from './components/MyBrewsFolder/BrewsList';
import Search from './components/Search';

function App() {
  const [token, setToken] = useState(false);
  const [currentUser, setUser] = useState("");
  const [currentId, setCurrentId] = useState();
  // const [myBrewsCards,setMyBrewsCards]=useState([])
  const [search, setSearch]=useState("")
  const [editFormData, setEditFormData] = useState({})

  // useEffect(()=>{
  //   fetch(`http://localhost:9292/api/entries/user/${currentId}`)
  //   .then((res) =>res.json())
  //   .then(setMyBrewsCards)
  // },[currentId, editFormData])

  // //Logic for deleting a brew:
  // function handleDeleteBrew(id){
  //   const updatedBrewArray=myBrewsCards.filter((oneMyBrewCard) => oneMyBrewCard.id !== id);
  //   setMyBrewsCards(updatedBrewArray)
  // }

  // //Search bar logic for myBrews. Will need to make a filter for Favorites 
  // const filterMyBrewsCards = myBrewsCards.filter((myBrewsCard) =>
  // myBrewsCard.name.toLowerCase().includes(search.toLowerCase())
  // )

  const handleLogOut = () => {
    setUser("");
    setToken(false);
  }

  if(!token) {
    return <Login setToken={setToken} setUser={setUser} setCurrentId={setCurrentId}/>
  }

  return (
    <div className="App">
      <NavBar username={currentUser} id={currentId} handleLogOut={handleLogOut}/>
        <div className="content-container">
          <Switch>
            <Route exact path="/">
              <Home id={currentId}/>
            </Route>
            <Route exact path="/about">
              <About />
            </Route>
            <Route exact path="/myBrews">
              
              <MyBrews 
                // filterMyBrewsCards={filterMyBrewsCards} 
                search={search}
                setSearch={setSearch}
                id={currentId}
                // handleDeleteBrew={handleDeleteBrew}
                editFormData={editFormData}
              />              
            </Route>
            <Route path="/favorites">
              
              <FavoriteBrews 
                id={currentId} 
                search={search} 
                setSearch={setSearch}
              />
            </Route>
            <Route exact path="/globalBrews">
              <GlobalBrews 
                currentId={currentId}
                search={search}
                setSearch={setSearch}
              />
            </Route>
            <Route  exact path="/myBrews/:id">
              <EditBrewCard editFormData={editFormData} setEditFormData={setEditFormData}/>
            </Route>
          </Switch>
        </div>
    </div>
  );
}

export default App;
