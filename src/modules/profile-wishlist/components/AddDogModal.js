import React, { PureComponent } from 'react';
// import ImagesPreviewListCard from './ImagesPreviewListCard'
import { Upload, Icon, Modal, Button, Row, Col, DatePicker, Form, Select, Input } from 'antd';
import { connect } from 'react-redux'
// import * as ContractProgressEvaluationDetailActions from '../ContractProgressEvaluationDetailActions'
import moment from 'moment'
import AvatarUpload from './AvatarUpload'

const FormItem = Form.Item;
const Option = Select.Option;

class AddDogModal extends PureComponent {
  state = { 
    uploading: false, 
    imageFileList: [],
    confirmUploaded: false,
    photosDate: moment.utc(new Date()).format("L")
  }

  _onBeforeUpload(file) {
    this._convertToBase64(file, (e) => {
      this._addImage(e.target.result, file)
    })
    return false;
  }

  _onRemoveImage(file) {
    this.setState(({ imageFileList }) => {
      const index = imageFileList.indexOf(file);
      const newFileList = imageFileList.slice();
      newFileList.splice(index, 1);
      return {
        imageFileList: newFileList,
      };
    });
  }

  _onUpdateImage(imageFile) {
    const indexToUpdate = this._getImageIndexToUpdated(imageFile.id)
    let newArray = [...this.state.imageFileList];
    newArray[indexToUpdate] = imageFile;
    this._updateImageFileList(newArray);
  }

  // _updateImageFileList(newArray) {
  //   this.setState({
  //     imageFileList: newArray
  //   });
  // } 


  _addImage(base64Url, file) {
    const defaultInitialDateTime = this._getDateTimeByDateTimeStrings(this.state.photosDate, '10:00')

    // this.setState(({ imageFileList }) => ({
    //   imageFileList: [...imageFileList, {
    //     id: this._generateIdForImage(),
    //     base64Url,
    //     imageFile: file,
    //     contractProgressEvaluationId: this.props.contractProgressEvaluationId,
    //     updatedAt: defaultInitialDateTime
    //   }],
    // }));
  }

  _generateIdForImage() {
    const { imageFileList } = this.state
    if(imageFileList) {
      return imageFileList.length + 1
    } else {
      return 0
    }
  }

  _convertToBase64(file, onLoadCallback) {
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = onLoadCallback;
    reader.onerror = function (error) {
      console.log('Error: ', error);
    };
  }

  handleSubmit = (value) => {
    console.log(value);
    // const { imageFileList } = this.state;
    // this.props.sendImages(imageFileList)
  }

  render() {
    const { imageFileList, fileList, photosDate } = this.state;
    const { isUploadingImages } = this.props
    const { getFieldDecorator } = this.props.form;

    return (
      <Modal
        title="Add Dog"
        visible={this.props.visible}
        onOk={this.handleOk}
        onCancel={this.props.handleCancel}
        width={600}
        maskClosable={false}
        footer={[
          <Button key="back" onClick={this.props.handleCancel}>
            Cancelar
          </Button>,
          <Button 
            key="submit" 
            type="primary" 
            loading={isUploadingImages} 
            onClick={this.handleSubmit} 
            htmlType="submit"
          >
            { isUploadingImages ? 'Enviando' : 'Enviar'}
          </Button>,
        ]}
      >
          <Row type="flex" justify="start" style={{ marginTop: 5, marginBottom: 20 }}>
            <Col span={18} >
              <Form onSubmit={this.handleSubmit} style={{ marginRight: '4em' }}>
                <FormItem
                  label="Dog Name"
                  labelCol={{ span: 6 }}
                  wrapperCol={{ span: 18 }}
                >
                  {getFieldDecorator('name', {
                    rules: [{ required: true, message: 'Please input dog name !' }],
                  })(
                    <Input />
                  )}
                </FormItem>
                <FormItem
                  label="Dog Breed"
                  labelCol={{ span: 6 }}
                  wrapperCol={{ span: 18 }}
                >
                  {getFieldDecorator('breed', {
                    rules: [{ required: true, message: 'Please select dog breed!' }],
                  })(
                    <Select
                      placeholder="Select a option and change input text above"
                      onChange={this.handleSelectChange}
                    >
                      <Option value="male">male</Option>
                      <Option value="female">female</Option>
                    </Select>
                  )}
                </FormItem>
              </Form>
            </Col>
            <Col span={5}>
              <AvatarUpload /> 
            </Col>
          </Row>
      </Modal>
    )
  }

}

const mapStateToProps = (state) => ({
  // isUploadingImages: state.contractProgressEvaluationDetail.isUploadingImages,
})

const mapDispatchToProps = {
  // sendImages: ContractProgressEvaluationDetailActions.sendImages,
}


const AddDogModalWrapped = Form.create()(AddDogModal);

export default connect(mapStateToProps, mapDispatchToProps)(AddDogModalWrapped)