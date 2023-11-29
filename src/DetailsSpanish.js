import './App.css';
import { Form, Button, Input, Image, Divider, Icon, List } from 'semantic-ui-react';
import { firestore } from './firebase';
import { useEffect, useState } from 'react';
import { arrayUnion, collection, doc, updateDoc, getDocs } from 'firebase/firestore';
import Carousel from './components/Carousel';
import { Col, Container, Row } from 'react-bootstrap';

function DetailsSpanish() {

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
            setWarning(true);
            return
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
            if (doc.id === "attending") {
                guestMap.attendingArr = doc.data().guestArr;
            }
            if (doc.id === "not_attending") {
                guestMap.not_attendingArr = doc.data().guestArr;
            }
        });

        let attendingCount = 0
        guestMap.attendingArr.forEach((party) => {
            attendingCount += party.partyCount;
        })

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
                            <h1 className='FontHeader DetailsHeaderSize HeaderTextShadow'>La quinceañera de Melanie</h1>
                        </Col>
                    </Row>
                    <Row>
                        <Col><Carousel></Carousel></Col>
                    </Row>
                    <h2 className='FontSubHeader' style={{ marginTop: '30px', marginBottom: '20px', fontSize: '22px', width: '70%' }}>Manuel y Leydiana te invitan a celebrar la quinceañera de su hija Melanie</h2>
                    <Image size='medium' src='./dividers/2.webp'></Image>

                </Container>


                {/* Location and Time */}
                <Container style={{ justifyContent: 'center', display: 'flex', textAlign: 'center', margin: '20px', marginTop: '0px', backgroundColor: '#D2D2D2' }}>
                    <Row>
                        <Col>
                            <Divider></Divider>
                            <h2 className='FontSubHeader'>FECHA, HORA Y UBICACIÓN</h2>
                            <h2 className='FontText'><b>Sábado 9 de diciembre de 2023 <br></br>3:00pm - 11pm</b></h2>
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
                            <Col><h3 className='FontText PleaseWear'>Por favor, vistan de <b>NEGRO</b> y <br></br>
                                <b style={{ color: '#5A8F7B' }}>VERDE BOSQUE</b> SOLAMENTE</h3>
                                <h4 className='FontHeader'>- Gracias</h4>
                            </Col>
                        </Col>
                    </Row>
                </Container>


                {/* Event Details */}
                <Container className='DetailsContainer'>
                    <Row>
                        <Col xs={12} md={5} className='DetailsContainerCol1'>
                            <h2 className='FontText'><u>Detalles de evento</u></h2>
                            <List className='FontText'>
                                <List.Item className='DetailsListItem'>
                                    <List.Header><List.Icon name='map outline'></List.Icon>Dirección:</List.Header>525 3rd Street
                                    <br></br>Lake Oswego, OR 97034
                                </List.Item>
                                <List.Item className='DetailsListItem'>
                                    <List.Header><List.Icon name='calendar outline'></List.Icon>Fecha:</List.Header>December 9th, 2023
                                </List.Item>
                                <List.Item className='DetailsListItem'>
                                    <List.Header><List.Icon name='clock outline'></List.Icon>Horario del evento:</List.Header>
                                    3:00pm - 11pm
                                </List.Item>
                                <List.Item className='DetailsListItem'>
                                    <List.Header><List.Icon name='food'></List.Icon>Recepción de comida:</List.Header>
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



            </Container>
        </div>

    );
}

export default DetailsSpanish