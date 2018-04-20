import React, { PureComponent } from 'react';
import { Col, Row, Spin, Icon } from 'antd';
import * as LikeDogsActions from './LikeDogsActions'
import { connect } from 'react-redux'

class LikeDogs extends PureComponent {

  async componentWillMount() {
    // this.props.loadDogs()
  }

  render() {
    const { dogs, isFetchingDogs } = this.props
    const loadingIcon = <Icon type="loading" style={{ fontSize: 50, color: '#ee3923' }} spin />;
  
    if (isFetchingDogs) {
      return (
        <Row type="flex" justify="center" align="middle" gutter={16}>
          <Spin
            size="large"
            indicator={loadingIcon}
          />
        </Row>
      )
    }

    return (
      <div >
        <Row type="flex" justify="start" gutter={16}>
          LIKEDOGS SCREEN
        </Row>
      </div>
    )

  }
}


const mapStateToProps = (state) => ({
  dogs: state.likeDogs.companies,
  isFetchingCompanies: state.likeDogs.isFetchingDogs
})

const mapDispatchToProps = {
  loadDogs: LikeDogsActions.loadDogs,
}

export default connect(mapStateToProps, mapDispatchToProps)(LikeDogs)
