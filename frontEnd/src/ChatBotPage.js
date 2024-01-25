import React from 'react'
import 'semantic-ui-react';

import ChatBot from 'react-simple-chatbot'
import { Segment } from 'semantic-ui-react'



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
        end: true
    },



];



function ChatBotPage() {
    return (
        <>
            {/* <div className='chat-wrapper flex justify-end px-40 pt-32 '>
    <Segment floated="right">
        <ChatBot steps={steps}  style={{ width: '600px', height: 'auto' }} />

    </Segment>
    </div> */}

            <div className='chat-wrapper flex items-center justify-center'>
                <Segment >
                    <ChatBot steps={steps} style={{ width: '60vw', height: 'auto' }} />

                </Segment>
            </div>
        </>
    )
}

export default ChatBotPage