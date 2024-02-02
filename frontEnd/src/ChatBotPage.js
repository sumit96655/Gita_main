import React from 'react'
import 'semantic-ui-react';

import ChatBot from 'react-simple-chatbot'
import { Segment } from 'semantic-ui-react'

import { useState } from 'react';
import { useEffect } from 'react';

import { ThemeProvider } from 'styled-components';

// font - family: -apple - system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
//   'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
//   sans - serif;

const theme = {
  background: '#f5f8fb',
  fontFamily: 'sans-serif',
  headerBgColor: '#6C22A6',
  headerFontColor: '#fff',
  headerFontSize: '15px',
  botBubbleColor: '#6C22A6',
  botFontColor: '#fff',
  userBubbleColor: '#fff',
  userFontColor: '#4a4a4a',
  // innerHeight:'90vh'
};

const FetchAnswer = ({ steps, triggerNextStep }) => {
  const [answer, setAnswer] = useState('');
  const [error, setError] = useState(null);
  console.log(steps);
  const fetchAnswerFromModel = async (question) => {
    try {
      console.log('Fetching answer for query:', question);

      const formData = new FormData();
      formData.append('question', question);

      const response = await fetch(`http://127.0.0.1:5000/answer_to/`, {
        method: 'POST',
        // body: JSON.stringify({ question }),
        body: formData,
      });
      console.log('Response:', response);

      const data = await response.json();
      console.log('Data:', data);

      if (response.ok) {
        setAnswer(data.answer);
        setError(null);
        triggerNextStep({ trigger: "waiting2" });
      } else {
        setError(data.answer || 'An error occurred.');
      }
    } catch (error) {
      console.error('Error fetching answer:', error);
      setError('An error occurred while fetching the answer.');
    }
  };

  useEffect(() => {
    let userQuery = '';
    // Ensure that steps is an array
    // Find the step with the user input in the steps array


    userQuery = steps.waiting2.value;
    // const userQuery = userQueryStep ? userQueryStep.value : '';

    if (userQuery) {
      fetchAnswerFromModel(userQuery);
    } else {
      setError('No question provided.');
    }
  }, []);

  if (error) {
    return <p>Error: {error}</p>;
  }

  return <p style={{ color: 'white' }}>{answer.answer}</p>;
};

const steps = [
  // {
  //   id: 'Greet',
  //   message: 'Hello , welcome to our website !!',
  //   trigger: 'Ask Name'
  // },
  // {
  //   id: 'Ask Name',
  //   message: 'Please enter your name',
  //   trigger: 'waiting1'
  // },
  // {
  //   id: 'waiting1',
  //   user: true,
  //   trigger: 'Name'
  // },
  // {
  //   id: 'Name',
  //   message: 'Hi {previousValue} ,what do you wants to know about?',
  //   // end: true
  //   trigger: 'AskQuery'
  // },
  {
    id: 'AskQuery',
    message: 'Hello, how can I help you?',
    trigger: 'waiting2',
  },
  {
    id: 'waiting2',
    user: true,
    trigger: 'FetchAnswer',
  },
  {
    id: 'FetchAnswer',
    style: { botFontColor: '#fff' },
    component: <FetchAnswer />,
    asMessage: true,
    // user:true,
    // waitAction: true,
    // trigger: 'waiting2'
  },



];

function ChatBotPage() {


  // { width: '60vw', height: 'auto'}
  return (
    <>
      <div className='chat-wrapper flex items-center justify-center'>
        <ThemeProvider theme={theme} >
          <ChatBot steps={steps} style={{width:'60vw', height:'auto'}} />

        </ThemeProvider>
      </div>
    </>
  )
}

export default ChatBotPage

