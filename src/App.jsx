import React, { useCallback, useState } from 'react';

function App() {
  const [length, setLength] = useState(8);
  const [num, setNum] = useState(false);
  const [char, setChar] = useState(false);
  const [pass, setPass] = useState("");
  const [copied, setCopied] = useState(false);

  // Function to generate the password
  const PasswordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (num) str += "0123456789";
    if (char) str += "!@#$%^&*()_+";

    for (let i = 0; i < length; i++) {
      let randomIndex = Math.floor(Math.random() * str.length);
      pass += str.charAt(randomIndex);
    }

    setPass(pass);
    setCopied(false); // Reset copy status when new password is generated
  }, [length, num, char]);

  // Function to copy the password to the clipboard
  const copyToClipboard = () => {
    navigator.clipboard.writeText(pass).then(() => {
      setCopied(true); // Show confirmation that password was copied
    });
  };

  return (
    <div className='w-full h-screen bg-zinc-900'>
      <h1 className='py-4 text-center text-white text-6xl'>Password Generator</h1>

      <div className='w-full max-w-md mx-auto rounded-lg px-4 my-8 text-orange-500 '>
        <div className='p-4'>
          {/* Input for password length */}
          <input
            type='number'
            value={length}
            onChange={(e) => setLength(e.target.value)}
            className='block mb-4 p-2'
            placeholder='Password Length'
          />

          {/* Checkbox for including numbers */}
          <label>
            <input
              type='checkbox'
              checked={num}
              onChange={() => setNum(!num)}
              className='mr-2'
            />
            Include Numbers
          </label>
          <br />

          {/* Checkbox for including special characters */}
          <label>
            <input
              type='checkbox'
              checked={char}
              onChange={() => setChar(!char)}
              className='mr-2'
            />
            Include Special Characters
          </label>
          <br />

          {/* Button to generate password */}
          <button
            onClick={PasswordGenerator}
            className='mt-4 w-[28vw] px-4 py-2 bg-blue-500 text-white rounded'
          >
            Generate Password
          </button>

          {/* Display the generated password */}
          <p className='mt-4 text-white text-center'>{pass}</p>

          {/* Copy button and copy status message */}
          {pass && (
            <>
              <button
                onClick={copyToClipboard}
                className='mt-2 w-[28vw] px-4 py-2 bg-green-500 text-white rounded'
              >
                Copy Password
              </button>
              {copied && <span className='ml-2 text-green-300'>Password Copied!</span>}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
