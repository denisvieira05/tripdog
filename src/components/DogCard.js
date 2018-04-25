import React, { PureComponent } from 'react';
import { Row, Spin, Icon, Layout, Card, Avatar, Button, Col } from 'antd';

const { Meta } = Card;

class DogCard  extends PureComponent {

  state = {
    onCardHover: false,
  }

  renderResponsibleContainer() {
    return this.state.onCardHover ? (
      <div style={styles.responsibleContainer}>
        <Avatar icon="user" /> <span>Denis</span>
      </div>
    ) : null
  }

  renderBlackTransparentContainer() {
    return this.state.onCardHover ? (
      <div style={styles.blackTransparentContainer} />) : null 
  }

  renderLikeContainer() {
    return this.state.onCardHover ? (
      <div style={styles.likeContainer}>
        <Button shape="circle" icon="star" />
      </div>
    ) : null
  }

  render() {
    const { onCardHover } = this.state

    return (
      <Col
        span={5}
        style={styles.cardImageContainer}
        onMouseEnter={() => this.setState({ onCardHover: true })}
        onMouseLeave={() => this.setState({ onCardHover: false })}
      >
        { this.renderResponsibleContainer() }
        { this.renderBlackTransparentContainer() }
        { this.renderLikeContainer() }
          
        <img style={styles.dogImage} src="https://www.healthypawspetinsurance.com/Images/V3/DogAndPuppyInsurance/Dog_CTA_Desktop_HeroImage.jpg" />
      </Col>
    )
  } 


}

const styles = {
  dogImage: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    zIndex: 0,
    borderRadius: '1em',
  },
  responsibleContainer: {
    position: 'absolute',
    display: 'flex',
    flexDirection: 'column',
    textTransform: 'capitalize',
    alignItems: 'center',
    color: 'white',
    zIndex: '3',
    right: '15px',
    bottom: '7px',
    fontWeight: 'bold'
  },
  likeContainer: {
    position: 'absolute',
    display: 'flex',
    alignSelf: 'flex-end',
    bottom: '18px',
    right: '80%',
    zIndex: '3'
  },
  cardImageContainer: {
    display: 'flex',
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    borderRadius: '1em',
    marginRight: '2em',
    marginBottom: '2em',
    height: '15em',
  },
  blackTransparentContainer: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    backgroundColor: 'black',
    opacity: '0.3',
    zIndex: '1',
    borderRadius: '1em',
  },
}

export default DogCard