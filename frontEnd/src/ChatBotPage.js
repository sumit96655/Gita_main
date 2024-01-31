import React from 'react'
import 'semantic-ui-react';

import ChatBot from 'react-simple-chatbot'
import { Segment } from 'semantic-ui-react'

import { useState } from 'react';
import { useEffect } from 'react';



const FetchAnswer = ({ steps }) => {
  const [answer, setAnswer] = useState('');
  const [error, setError] = useState(null);

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
  }, [steps]);

  if (error) {
    return <p>Error: {error}</p>;
  }

  return <p>{answer.answer}</p>;
};

const steps = [
  {
    id: 'Greet',
    message: 'Hello , welcome to our website !!',
    trigger: 'Ask Name'
  },
  {
    id: 'Ask Name',
    message: 'Please enter your name',
    trigger: 'waiting1'
  },
  {
    id: 'waiting1',
    user: true,
    trigger: 'Name'
  },
  {
    id: 'Name',
    message: 'Hi {previousValue} ,what do you wants to know about?',
    // end: true
    trigger: 'AskQuery'
  },
  {
    id: 'AskQuery',
    message: 'Please ask your question',
    trigger: 'waiting2',
  },
  {
    id: 'waiting2',
    user: true,
    trigger: 'FetchAnswer',
  },
  {
    id: 'FetchAnswer',
    component: <FetchAnswer />,
    asMessage: true,
    waitAction: true,
  },
  


];

function ChatBotPage() {
  return (
    <>
      <div className='chat-wrapper flex items-center justify-center'>
        <Segment >
          <ChatBot steps={steps} style={{ width: '60vw', height: 'auto' }} />

        </Segment>
      </div>
    </>
  )
}

export default ChatBotPage

