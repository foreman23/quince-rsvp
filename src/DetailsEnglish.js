import './App.css';
import { Form, Checkbox, Button, Input, Header, Image, Divider, Icon, List } from 'semantic-ui-react';
import { firestore } from './firebase';
import { useState } from 'react';
import { arrayUnion, doc, getDoc, updateDoc } from 'firebase/firestore';
import Countdown from 'react-countdown';
import Carousel from './components/Carousel';
import { Col, Container, Row } from 'react-bootstrap';

function DetailsEnglish() {

    // State variables for form
    const [name, setName] = useState('');
    const [partyCount, setPartyCount] = useState(0);
    const [email, setEmail] = useState('');
    const [isAttending, setIsAttending] = useState(null);


    // Submit RSVP
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


    return (
        <div>
            <Container className='MainContainer2'>

                {/* Invitation */}
                <Container className='InvitationContainer'>
                    <Row>
                        <Col style={{ marginBottom: '20px' }}>
                            <h1>MELANIE'S QUINCEAÑERA</h1>
                        </Col>
                    </Row>
                    <Row>
                        <Col><Carousel></Carousel></Col>
                    </Row>
                    <h2 style={{ marginTop: '30px', marginBottom: '20px' }}>Manuel and Leydiana invite you to celebrate the Quinceañera of their daughter Melanie</h2>
                    <Image size='medium' src='./dividers/2.webp'></Image>
                    
                </Container>


                {/* Location and Time */}
                <Container style={{ justifyContent: 'center', display: 'flex', textAlign: 'center', margin: '20px', marginTop: '0px', backgroundColor: '#D2D2D2' }}>
                    <Row>
                        <Col>
                            <Divider></Divider>
                            <h2>DATE, TIME & LOCATION</h2>
                            <h2><b>Saturday, December 9th, 2023 <br></br>3:00pm - 11pm</b></h2>
                            <h3>525 3rd Street <br></br>Lake Oswego, OR 97034</h3>
                            <Divider></Divider>
                        </Col>
                    </Row>
                </Container>


                {/* Dress Code */}
                <Container className='DresscodeContainer'>
                    <Row>
                        <Col xs={5}>
                            <Image className='OutfitsImage' src='./clip-art/outfits.webp'></Image>
                        </Col>
                        <Col xs={7}>
                            <Row>
                                <Col><h3>Please wear <b className='BlackText'>BLACK</b> and <br></br><b className='GreenText'>FOREST GREEN</b> ONLY<br></br><u>no other colors allowed!</u></h3></Col>
                            </Row>
                        </Col>
                    </Row>
                </Container>


                {/* Event Details */}
                <Container className='DetailsContainer'>
                    <Row>
                        <Col xs={5} className='DetailsContainerCol1'>
                            <h2>Event Details</h2>
                            <List>
                                <List.Item>
                                    <List.Header><List.Icon name='map outline'></List.Icon>Location:</List.Header>525 3rd Street
                                    <br></br>Lake Oswego, OR 97034
                                </List.Item>
                                <List.Item>
                                    <List.Header><List.Icon name='calendar outline'></List.Icon>Date:</List.Header>December 9th, 2023
                                </List.Item>
                                <List.Item>
                                    <List.Header><List.Icon name='clock outline'></List.Icon>Time of Event:</List.Header>
                                    3:00pm - 11pm
                                </List.Item>
                                <List.Item>
                                    <List.Header><List.Icon name='food'></List.Icon>Food Reception:</List.Header>
                                    4:00pm - 6pm
                                </List.Item>
                            </List>
                        </Col>

                        <Col xs={7} className='DetailsContainerCol2'>
                            <Image src='./clip-art/town.webp'></Image>
                        </Col>
                    </Row>
                </Container>



                {/* Form area */}
                <Container className='FormContainer'>
                    <Row className='RSVPheader'>
                        <Col>
                            <h3>Are you attending?</h3>
                            <h5>RSVP by: <b>November 1st 2023</b></h5>
                            <div style={{ display: 'flex', justifyContent: 'center' }}>
                                <Divider horizontal className='DividerMain'>
                                    <Icon name='heart'></Icon>
                                    <Icon name='heart outline'></Icon>
                                    <Icon name='heart'></Icon>
                                </Divider>
                            </div>
                            <h5>{`We have reserved 200 seats in your honor.`}</h5>
                            <h5>{`____ out of ____ guests are attending.`}</h5>
                        </Col>
                    </Row>
                    <Row>
                        <Col style={{ justifyContent: 'center', display: 'flex', marginTop: '30px' }}>
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
                                <label><b>Will you be attending?</b></label>
                                <Form.Group style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', marginTop: '10px' }}>
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
                                <Button style={{ marginTop: '15px' }} onClick={() => submitRSVP()} type='submit'>Confirm</Button>
                            </Form>
                        </Col>
                    </Row>
                </Container>

            </Container>
        </div>

    );
}

export default DetailsEnglish