import { useRef, useEffect, useState } from "react";
import 'stencil-input-validation';

import './App.css';
import { webUrlPattern } from "./consts";

function App() {
  const inputElement = useRef({});
  const [formValues, setFormValues] = useState({});

  useEffect(() => {
    const listener = (e) => {
      inputElement.current[e.target.name].isSubmitted = false;
      setFormValues(state => {
        const newState = {
          ...state,
          [e.target.name]: e.target.value
        }
        return newState
      })
    };

    document.body.addEventListener("changeInput", listener);
    return () => {
      document.body.removeEventListener("changeInput", listener);
    };
  }, []);

  const delay = (delay) => {
    return new Promise((resolve) => setTimeout(resolve, delay));
  };

  const submitForm = () => {
    inputElement.current["webShopUrl"].isSubmitted = true;
    inputElement.current["webShopUrl1"].isSubmitted = true;
    inputElement.current["webShopUrl2"].isSubmitted = true;
    delay(0).then(()=>{
      if (
        inputElement.current["webShopUrl"].isValid &&
        inputElement.current["webShopUrl1"].isValid &&
        inputElement.current["webShopUrl2"].isValid) {
        alert(`Success ${JSON.stringify(formValues)}`)
      }
    })
  }

  return (
    <section id="form-wrap">
      <div id="form">
        <div className="mb-10">
          <custom-input
            value="https://test."
            id="webShopUrl"
            name="webShopUrl"
            type="url"
            label="Web Shop URL"
            error="Fill in Valid URL"
            validation={webUrlPattern}
            ref={(el) => (inputElement.current["webShopUrl"] = el)}
          ></custom-input>
        </div>
        <div className="mb-10">
          <custom-input
            value="https://test.c"
            id="webShopUrl1"
            name="webShopUrl1"
            type="url"
            label="Web Shop URL"
            error="Fill in Valid URL"
            validation={webUrlPattern}
            ref={(el) => (inputElement.current["webShopUrl1"] = el)}
          ></custom-input>
        </div>
        <div>
          <custom-input
            id="webShopUrl2"
            name="webShopUrl2"
            type="url"
            label="Web Shop URL"
            error="Fill in Valid URL"
            validation={webUrlPattern}
            ref={(el) => (inputElement.current["webShopUrl2"] = el)}
          ></custom-input>
        </div>
        <button onClick={submitForm}>Submit form</button>
      </div>
    </section>
  );
}

export default App;
