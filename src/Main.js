import './App.css';
import { Form, Checkbox, Button, Input, Header, Image, Divider, Icon, List } from 'semantic-ui-react';
import { firestore } from './firebase';
import { useState } from 'react';
import { arrayUnion, doc, getDoc, updateDoc } from 'firebase/firestore';
import Countdown from 'react-countdown';
import Carousel from './components/Carousel';
import { Col, Container, Row } from 'react-bootstrap'; 

function Main() {

    return (
        <div className='MainWidth'>
        <Container className='MainContainer'>
                <Container>
                    <Row>
                        <Col className='MainContainer'>
                            <h1 className='MainHeaderH1 FontText'>RSVP!</h1>
                            <h3 className='MainHeader FontHeader'>December 9, 2023</h3>
                            <Image className='MainImage' circular size='medium' src='./portraits/IMG-3316_1.webp' />
                            <Countdown className='countdownTimer FontText' date={1702162800000} />
                        </Col>
                    </Row>
                </Container>

                <Container className='YoureInvitedContainer'>
                    <Row>
                        <Col className='MainContainer'>
                            <h3 className='MainHeaderTop FontSubHeader'>You're Invited to Melanie's Quinceañera!</h3>
                            <Divider className='DividerMain' horizontal>
                                <Icon name='heart'></Icon>
                                <Icon name='heart outline'></Icon>
                                <Icon name='heart'></Icon>
                            </Divider>
                            <h3 className='MainHeaderBottom FontSubHeader'>¡Estás invitado a la quinceañera de Melanie!</h3>
                        </Col>
                    </Row>
                </Container>

                <Container className='ButtonContainer'>
                    <Row>
                        <Col className='MainContainer'>
                            <a className='EnglishButton FontSubHeader' href='/rsvp-1'><p className='LanguageText'>RSVP English</p></a>
                            <a className='SpanishButton FontSubHeader' href='/rsvp-2'><p className='LanguageText'>RSVP Español</p></a>
                        </Col>
                    </Row>
                </Container>

        </Container>
        </div>
    )

}

export default Main