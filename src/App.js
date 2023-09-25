import './App.css';
import { Form, Checkbox, Button, Input } from 'semantic-ui-react';
import { useState } from 'react';

function App() {

  const submitRSVP = () => {
    console.log(name, partyCount, email)
  }

  // State variables for form
  const [name, setName] = useState('');
  const [partyCount, setPartyCount] = useState(0);
  const [email, setEmail] = useState('');


  return (
    <div className='body'>
      {/* Header stuff */}
      <div className='RSVPheader'>
        <text>Are you attending?</text>
        <text>RSVP</text>
      </div>

      {/* Form area */}
      <div className='FormContainer'>
        <Form className='RSVPform'>
          <Form.Field>
            <Input type='text' onChange={(event) => setName(event.target.value)} placeholder='Name' />
          </Form.Field>
          <Form.Field>
            <Input type='number' onChange={(event) => setPartyCount(event.target.value)} placeholder='Number of persons' />
          </Form.Field>
          <Form.Field>
            <Input type='email' onChange={(event) => setEmail(event.target.value)} placeholder='E-mail' />
          </Form.Field>
          <Button onClick={() => submitRSVP()} type='submit'>Confirm</Button>
        </Form>
      </div>

    </div>
    
  );
}

export default App;
