import './App.css';
import { Form, Checkbox, Button, Input, Header, Image, Divider, Icon } from 'semantic-ui-react';
import { firestore } from './firebase';
import { useState } from 'react';
import { arrayUnion, doc, getDoc, updateDoc } from 'firebase/firestore';
import Countdown from 'react-countdown';


function Main() {

    // State variable for holding language selection
    const [language, setLanguage] = useState(null);

    // State variables for form
    const [name, setName] = useState('');
    const [partyCount, setPartyCount] = useState(0);
    const [email, setEmail] = useState('');
    const [isAttending, setIsAttending] = useState(null);

    const submitRSVP = async () => {
        console.log(name, partyCount, email, isAttending)
        // Set data map for user response
        const formData = {
            name: name,
            partyCount: partyCount,
            email: email,
            isAttending: isAttending,
        }

        // If user IS attending
        if (isAttending === "yes") {
            const docRef = doc(firestore, "guests", "attending");
            try {
                await updateDoc(docRef, {
                    guestArr: arrayUnion(formData)
                });
            }
            catch (error) {
                console.error("Error adding user RSVP:", error);
            }
        }

        // If user NOT attending
        if (isAttending === "no") {
            const docRef = doc(firestore, "guests", "not_attending");
            try {
                await updateDoc(docRef, {
                    guestArr: arrayUnion(formData)
                });
            }
            catch (error) {
                console.error("Error adding user RSVP:", error);
            }
        }

        // If user MAYBE attending
        if (isAttending === "maybe") {
            const docRef = doc(firestore, "guests", "maybe");
            try {
                await updateDoc(docRef, {
                    guestArr: arrayUnion(formData)
                });
            }
            catch (error) {
                console.error("Error adding user RSVP:", error);
            }
        }

    }

    

    if (language === null) {
        return (
            <div className='MainContainer'>
                <h1 className='MainHeaderH1'>RSVP!</h1>
                <h3 className='MainHeader'>December 9, 2023</h3>
                <Image className='MainImage' circular size='medium' src='./portraits/IMG-3316_1.webp' />
                <Countdown className='countdownTimer' date={1702162800000} />

                    <h3 className='MainHeaderTop'>You're Invited to Melanie's Quinceañera!</h3>
                    <Divider className='DividerMain' horizontal>
                        <Icon name='heart'></Icon>
                        <Icon name='heart outline'></Icon>
                        <Icon name='heart'></Icon>
                    </Divider>
                    <h3 className='MainHeader'>¡Estás invitado a la quinceañera de Melanie!</h3>

                <div className='ButtonContainer'>
                    <a className='EnglishButton' onClick={() => setLanguage("english")}><text className='LanguageText'>RSVP English</text></a>
                    <a className='SpanishButton' onClick={() => setLanguage("spanish")}><text className='LanguageText'>RSVP Español</text></a>
                </div>
            </div>
        )
    }

    if (language === "english") {
        return (
            <div className='MainContainer'>
                <Button href={'/'}>Back</Button>
                {/* Header stuff */}
                <div className='RSVPheader'>
                    <text>Are you attending?</text>
                    <text>RSVP by: <b>November 1st 2023</b></text>
                    <text>{`We have reserved ____ amount of seats in your honor.`}</text>
                    <text>{`____ out of ____ guests are attending.`}</text>
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
                        <Form.Group>
                            <label>Will you be attending?</label>
                            <Form.Radio
                                label='Yes'
                                value='yes'
                                checked={isAttending === 'yes'}
                                onChange={() => setIsAttending('yes')}
                            >
                            </Form.Radio>
                            <Form.Radio
                                label='No'
                                value='no'
                                checked={isAttending === 'no'}
                                onChange={() => setIsAttending('no')}
                            >
                            </Form.Radio>
                            <Form.Radio
                                label='Maybe'
                                value='maybe'
                                checked={isAttending === 'maybe'}
                                onChange={() => setIsAttending('maybe')}
                            >
                            </Form.Radio>
                        </Form.Group>
                        <Button onClick={() => submitRSVP()} type='submit'>Confirm</Button>
                    </Form>
                </div>

            </div>

        );

    }

    if (language === "spanish") {
        return (
            <div className='MainContainer'>
                <Button href={'/'}>Back</Button>
                {/* Header stuff */}
                <div className='RSVPheader'>
                    <text>¿Estas atendiendo?</text>
                    <text>Confirmar su asistencia antes de: <b>Noviembre 1 2023</b></text>
                    <text>{`Hemos reservado ____ asientos en tu honor.`}</text>
                    <text>{`____ de ____ invitados van a atender.`}</text>
                </div>

                {/* Form area */}
                <div className='FormContainer'>
                    <Form className='RSVPform'>
                        <Form.Field>
                            <Input type='text' onChange={(event) => setName(event.target.value)} placeholder='Nombre' />
                        </Form.Field>
                        <Form.Field>
                            <Input type='number' onChange={(event) => setPartyCount(event.target.value)} placeholder='Cantidad de personas' />
                        </Form.Field>
                        <Form.Field>
                            <Input type='email' onChange={(event) => setEmail(event.target.value)} placeholder='Correo' />
                        </Form.Field>
                        <Form.Group>
                            <label>¿Asistirás?</label>
                            <Form.Radio
                                label='Sí'
                                value='yes'
                                checked={isAttending === 'yes'}
                                onChange={() => setIsAttending('yes')}
                            >
                            </Form.Radio>
                            <Form.Radio
                                label='No'
                                value='no'
                                checked={isAttending === 'no'}
                                onChange={() => setIsAttending('no')}
                            >
                            </Form.Radio>
                            <Form.Radio
                                label='Tal Vez'
                                value='maybe'
                                checked={isAttending === 'maybe'}
                                onChange={() => setIsAttending('maybe')}
                            >
                            </Form.Radio>
                        </Form.Group>
                        <Button onClick={() => submitRSVP()} type='submit'>Confirmar</Button>
                    </Form>
                </div>

            </div>

        );
    }

}

export default Main