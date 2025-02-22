import { useState } from "react";
import "./TestPage.css";

const TestPage = () => {
  const [response, setResponse] = useState<string>(
    "Hi there! How can I assist you?"
  );
  const [value, setValue] = useState<string>("");

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setValue(e.target.value);

  const handleSubmit = async () => {
    // the call to the api
    const response =
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum";
    setResponse(response);
  };

  return (
    <div className="test-container">
      <div>
        <input type="text" value={value} onChange={onChange}></input>
      </div>
      <div>
        <button onClick={handleSubmit}>Submit</button>
      </div>
      <div>
        <p>Chatbot: {response}</p>
      </div>
    </div>
  );
};

export default TestPage;
