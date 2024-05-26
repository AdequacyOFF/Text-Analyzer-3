import { useState } from "react";
import '../Pages_css/Url.css';
import OutputText from "./OutPutText.jsx";
import { useLocation } from 'react-router-dom';
import '../Pages_css/OutPutText.css';


function Url() {

  const location = useLocation();
  const redirectUrl = new URLSearchParams(location.search).get('redirect_url');
  
  const [responseData, setResponseData] = useState([]);
  const [inputValue, setInputValue] = useState("");

  

  const handleChange = (event) => {
    setInputValue(event.target.value);
  };

  // useEffect(() => {
  //   setInputValue(redirectUrl);
  // }, [redirectUrl]);

  const handleSubmit = () => {
    fetch('http://127.0.0.1:8080/url', {
      method: 'POST',
      headers: {
        'Content-Type': 'text/html; charset=utf',
      },
      body: inputValue,
    })
    .then((response) => response.json())
    .then((data) => setResponseData(data));
  };

  const handleKeyPress = (event) => {
    if(event.key === 'Enter'){
      handleSubmit();
    }
  };

  const handleSave = () => {
    fetch('http://127.0.0.1:8080/outputText/articleSave', {
      method: 'GET',
      headers: {
        'publishArticle': true,
      },
    })
  };

  


  
  return (
    <div className="section">
      {/* <p>{redirectUrl}</p> */}

      <div className="answer_block">
        <input type="text" className='input_field' value={redirectUrl} placeholder='Введите ссылку на источник(URL)...'  onChange={handleChange} onKeyPress={handleKeyPress}/>
        <button className='Processing_btn' type="button" onClick={handleSubmit}>
          <img src="src/Images/Processing.png" alt="Processing" />
        </button>
      </div>
      <div className='answer-url'>
        <div className='answer-url-frame'>
          {responseData.length!=0 ? <OutputText inputArray={responseData}/> : null}
        </div>
      </div>
      <div>
        <button className='Save_btn' type="button" onClick={handleSave}>
          <img src="src/Images/SaveButton.png" alt="Save" />
        </button>
      </div>

    </div>
    
  );
};

export default Url;
