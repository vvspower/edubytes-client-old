import logo from "./logo.svg";
import classes from "./App.module.css";
import Main from "./components/Main";
import Footer from "./components/Footer/Footer";

function App() {
  return (
    <>
      <div style={{ marginTop: "20px" }} className={classes.Container}>
        <Main />
      </div>
      
    </>
  );
}



export default App;
