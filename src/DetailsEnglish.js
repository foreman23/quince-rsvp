import './App.css';
import { Form, Button, Input, Image, Divider, Icon, List } from 'semantic-ui-react';
import { firestore } from './firebase';
import { useEffect, useState } from 'react';
import { arrayUnion, collection, doc, updateDoc, getDocs } from 'firebase/firestore';
import Carousel from './components/Carousel';
import { Col, Container, Row } from 'react-bootstrap';

function DetailsEnglish() {

    // State variables for form
    const [name, setName] = useState(null);
    const [partyCount, setPartyCount] = useState(null);
    const [email, setEmail] = useState(null);
    const [isAttending, setIsAttending] = useState(null);


    const [formSubmitted, setFormSubmitted] = useState(false);
    const [warning, setWarning] = useState(false);
    const [warningNegative, setWarningNegative] = useState(false);
    // const [warningTooMany, setWarningTooMany] = useState(false);
    // const [limitReached, setLimitReached] = useState(false);
    // Submit RSVP
    const submitRSVP = async () => {
        // Set data map for user response
        const formData = {
            name: name,
            partyCount: partyCount,
            email: email,
            isAttending: isAttending,
        }

        // First check for all required inputs
        if (name === null || partyCount === null || email === null || isAttending === null) {
            console.log('No null values!')
            setWarning(true);
            return;
        }

        // // Check if partyCount exceeds seats remaining
        // if (partyCount > (200 - seatsTaken)) {
        //     console.log('Not enough seats!')
        //     setWarningTooMany(true);
        //     return;
        // }

        // Make sure partyCount is greater than 0
        if (partyCount <= 0) {
            setWarningNegative(true);
            setWarning(false);
            return;
        }

        // If user IS attending
        if (isAttending === "yes") {
            const docRef = doc(firestore, "guests", "attending");
            try {
                await updateDoc(docRef, {
                    guestArr: arrayUnion(formData)
                });
                setFormSubmitted(true);
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
                setFormSubmitted(true);
            }
            catch (error) {
                console.error("Error adding user RSVP:", error);
            }
        }

    }

    // Gets seat taken count from firestore
    // const [seatsTaken, setSeatsTaken] = useState(null);
    const getSeatCount = async () => {
        const querySnapshot = await getDocs(collection(firestore, "guests"));
        let guestMap = {
            attendingArr: [],
            not_attendingArr: [],
        }
        querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            //console.log(doc.id, " => ", doc.data());
            if (doc.id === "attending") {
                guestMap.attendingArr = doc.data().guestArr;
            }
            if (doc.id === "not_attending") {
                guestMap.not_attendingArr = doc.data().guestArr;
            }
        });

        let attendingCount = 0
        guestMap.attendingArr.forEach((party) => {
            console.log(party.partyCount)
            attendingCount += party.partyCount;
            console.log(attendingCount)
        })

        console.log(attendingCount)

        if (attendingCount < 0) {
            attendingCount = 0;
        }

        // setSeatsTaken(attendingCount)

    }

    // On page load
    useEffect(() => {
        getSeatCount();
    }, [])


    return (
        <div className='MainWidth2'>
            <Container className='MainContainer2'>

                {/* Invitation */}
                <Container className='InvitationContainer'>
                    <Row>
                        <Col style={{ marginBottom: '20px' }}>
                            <h1 className='FontHeader DetailsHeaderSize HeaderTextShadow'>Melanie's Quinceañera</h1>
                        </Col>
                    </Row>
                    <Row>
                        <Col><Carousel></Carousel></Col>
                    </Row>
                    <h2 className='FontSubHeader' style={{ marginTop: '30px', marginBottom: '20px', fontSize: '22px', width: '70%' }}>Manuel and Leydiana invite you to celebrate the Quinceañera of their daughter, Melanie</h2>
                    <Image size='medium' src='./dividers/2.webp'></Image>

                </Container>


                {/* Location and Time */}
                <Container style={{ justifyContent: 'center', display: 'flex', textAlign: 'center', margin: '20px', marginTop: '0px', backgroundColor: '#D2D2D2' }}>
                    <Row>
                        <Col>
                            <Divider></Divider>
                            <h2 className='FontSubHeader'>DATE, TIME & LOCATION</h2>
                            <h2 className='FontText'><b>Saturday, December 9th, 2023 <br></br>3:00pm - 11pm</b></h2>
                            <h3 className='FontText'>525 3rd Street <br></br>Lake Oswego, OR 97034</h3>
                            <Divider></Divider>
                        </Col>
                    </Row>
                </Container>


                {/* Dress Code */}
                <Container style={{ display: 'flex', justifyContent: 'center', flexDirection: 'row', alignItems: 'center', marginBottom: '60px', marginTop: '35px' }}>
                    <Row>
                        <Col>
                            <Image size='medium' className='OutfitsImage' src='./clip-art/outfits.webp'></Image>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Col><h3 className='FontText PleaseWear'>Please wear <b>BLACK</b> and <br></br>
                                <b style={{ color: '#5A8F7B' }}>FOREST GREEN</b> ONLY</h3>
                                <h4 className='FontHeader'>- Thank you!</h4>
                            </Col>
                        </Col>
                    </Row>
                </Container>


                {/* Event Details */}
                <Container className='DetailsContainer'>
                    <Row>
                        <Col xs={12} md={5} className='DetailsContainerCol1'>
                            <h2 className='FontText'><u>Event Details</u></h2>
                            <List className='FontText'>
                                <List.Item className='DetailsListItem'>
                                    <List.Header><List.Icon name='map outline'></List.Icon>Location:</List.Header>525 3rd Street
                                    <br></br>Lake Oswego, OR 97034
                                </List.Item>
                                <List.Item className='DetailsListItem'>
                                    <List.Header><List.Icon name='calendar outline'></List.Icon>Date:</List.Header>December 9th, 2023
                                </List.Item>
                                <List.Item className='DetailsListItem'>
                                    <List.Header><List.Icon name='clock outline'></List.Icon>Time of Event:</List.Header>
                                    3:00pm - 11pm
                                </List.Item>
                                <List.Item className='DetailsListItem'>
                                    <List.Header><List.Icon name='food'></List.Icon>Food Reception:</List.Header>
                                    4:00pm - 6pm
                                </List.Item>
                            </List>
                        </Col>

                        <Col xs={0} md={7} className='DetailsContainerCol2 HideOnMobile'>
                            <Image className='CropImageTown' src='./clip-art/town.webp'></Image>
                        </Col>
                    </Row>
                </Container>


                {/* Form area */}
                {formSubmitted ? (
                    <Container style={{ paddingBottom: '170px' }} className='FormContainer'>
                        <Row className='RSVPheader'>
                            <Col>
                                <h3 style={{ paddingTop: '120px', marginBottom: '40px' }} className='FontText'>Response Received!</h3>
                                <Icon style={{ alignSelf: 'center' }} size='massive' name='calendar check outline'></Icon>
                            </Col>
                        </Row>
                    </Container>
                ) : (
                    <Container className='FormContainer'>
                        <Row className='RSVPheader'>
                            <Col>
                                <div>
                                    <h3 style={{ fontSize: '42px' }} className='FontHeader'>Are you attending?</h3>
                                    <h5 className='FontSubHeader'>RSVP by: <b>November 1st 2023</b></h5>
                                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                                        <Divider horizontal className='DividerMain'>
                                            <Icon name='heart'></Icon>
                                            <Icon name='heart outline'></Icon>
                                            <Icon name='heart'></Icon>
                                        </Divider>
                                    </div>
                                    {/* <h5 className='FontText'>{`We have reserved 200 seats in your honor.`}</h5> */}
                                </div>


                                {warning && (
                                    <h5 style={{ fontWeight: 'bold' }} className='FontText'>{`*Please fill out all fields and try again`}</h5>
                                )}
                                {warningNegative && (
                                    <h5 style={{ fontWeight: 'bold' }} className='FontText'>{`*Party size must be more than 0`}</h5>
                                )}
                                {/* {!warning && (
                                    <h5 className='FontText'>There are <span style={{ fontWeight: 'bold' }}>{200 - seatsTaken}</span> seats remaining.</h5>
                                )} */}
                                {/* {warningTooMany && (
                                    <h5 style={{ fontWeight: 'bold' }} className='FontText'>{`*Not enough seats remaining!`}</h5>
                                )} */}
                            </Col>
                        </Row>
                        <Row>
                            <Col style={{ justifyContent: 'center', display: 'flex', marginTop: '30px' }}>
                                <Form className='RSVPform'>
                                    <Form.Field>
                                        <Input type='text' onChange={(event) => setName(event.target.value)} placeholder='Name' />
                                    </Form.Field>
                                    <Form.Field>
                                        <Input type='number' onChange={(event) => setPartyCount(parseInt(event.target.value, 10))} placeholder='Number of persons' />
                                    </Form.Field>
                                    <Form.Field>
                                        <Input type='text' onChange={(event) => setEmail(event.target.value)} placeholder='E-mail or Phone #' />
                                    </Form.Field>
                                    <label><b className='FontText'>Will you be attending?</b></label>
                                    <Form.Group style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', marginTop: '10px' }}>
                                        <Form.Radio
                                            className='FontText'
                                            label='Yes'
                                            value='yes'
                                            checked={isAttending === 'yes'}
                                            onChange={() => setIsAttending('yes')}
                                        >
                                        </Form.Radio>
                                        <Form.Radio
                                            className='FontText'
                                            label='No'
                                            value='no'
                                            checked={isAttending === 'no'}
                                            onChange={() => setIsAttending('no')}
                                        >
                                        </Form.Radio>
                                    </Form.Group>
                                    <Button style={{ marginTop: '15px', fontFamily: 'Merriweather', backgroundColor: 'white' }} onClick={() => submitRSVP()} type='submit'>Confirm</Button>
                                </Form>
                            </Col>
                        </Row>
                    </Container>
                )}



            </Container>
        </div>

    );
}

export default DetailsEnglish