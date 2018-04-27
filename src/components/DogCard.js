import React, { PureComponent } from 'react';
import { Avatar, Button, Col } from 'antd';

class DogCard  extends PureComponent {

  state = {
    onCardHover: false,
  }

  _renderResponsibleContainer(user) {
    return this.state.onCardHover ? (
      <div style={styles.responsibleContainer}>
        <Avatar icon="user" /> <span>{ user ? user.username : null}</span>
      </div>
    ) : null
  }

  _renderBlackTransparentContainer() {
    const { onClickDogCard, dog } = this.props
    return this.state.onCardHover ? (
      <div style={styles.blackTransparentContainer}
        onClick={() => onClickDogCard(dog)} />) : null 
  }

  _renderLikeContainer() {
    const { isLikedByUser, onClickLikeButton, dog } = this.props

    return this.state.onCardHover ? (
      <div style={styles.likeContainer}>
        <Button 
          shape="circle" 
          icon="star"
          type={isLikedByUser ? 'primary' : 'default'}
          onClick={() => onClickLikeButton(dog)}
        />
      </div>
    ) : null
  }

  _renderDogName(dogName) {
    return this.state.onCardHover ? <div style={styles.dogNameContainer}>
        <span>{ dogName }</span>
      </div> : null;
  }

  render() {
    const { onClickDogCard, dog } = this.props

    return (
      <Col 
        span={5} 
        style={styles.cardImageContainer} 
        onMouseEnter={() => this.setState({ onCardHover: true })} 
        onMouseLeave={() => this.setState({ onCardHover: false })} 
        >

        {this._renderResponsibleContainer(dog.user)}
        {this._renderBlackTransparentContainer()}
        {this._renderLikeContainer()}
        {this._renderDogName(dog.name)}

        <img style={styles.dogImage} src={dog.base64Image} />
      </Col>)
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
  dogNameContainer: {
    position: 'absolute',
    display: 'flex',
    alignSelf: 'flex-start',
    bottom: '18px',
    right: '80%',
    color: 'white',
    zIndex: '3',
    fontWeight: 'bold'
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
    bottom: '80%',
    right: '85%',
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
    cursor: 'pointer'
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