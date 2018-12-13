// @flow
import React from 'react';
import { View, TouchableOpacity, Text, Dimensions } from 'react-native';
import PropTypes from 'prop-types';
import type { Element as ReactElement } from 'react';
import { RNCamera } from 'react-native-camera';
import RNMLKit from '../../modules/RNMLKit';

import styles from './Camera.styles';

type CameraProps = {}; // TODO: Add props type here
type CameraState = {}; // TODO: Add state type here

class Camera extends React.PureComponent<CameraProps, CameraState> {
  static defaultProps: any

  constructor(props: CameraProps) {
    super(props);
  }

  getRef = (ref) => {
    this._camera = ref;
  }

  barcodesDetected = ({ barcodes }) => {
    console.log(barcodes);
  }

  takePicture = () => {
    if(this._camera) {
      const {height, width} = Dimensions.get('window');
      const options = { quality: 0.5, base64: true, forceUpOrientation: true, fixOrientation: true, width: width, height:height };
      const { navigation } = this.props;
      this._camera.takePictureAsync(options)
        .then(image => {
          RNMLKit.deviceFaceRecognition(image.uri)
            .then((data) => {
              navigation.navigate('ImageScreen', {
                imageUrl: image.uri,
                responseData: data,
              });
            })
            .catch((error) => {
              console.log(error);
            })
        })
        .catch(error => {
          console.log(error);
        });
    }
  }

  renderContent = (): ReactElement<any> => {
    return (
      <View style={styles.container}>
          <RNCamera
            ref={this.getRef}
            style = {styles.previewContainer}
            type={RNCamera.Constants.Type.front}
            flashMode={RNCamera.Constants.FlashMode.off}
            permissionDialogTitle={'Permission to access camera.'}
            permissionDialogMessage={'DetectApp requires your permission to access the camera.'}
            onGoogleVisionBarcodesDetected={this.barcodesDetected}
          />
          <View style={styles.buttonContainer}>
            <TouchableOpacity
                onPress={this.takePicture}
                style = {styles.captureButton}
            >
              <View style={styles.buttonInnerView} />
            </TouchableOpacity>
          </View>
      </View>
    );
  }

  render() {
    const content = this.renderContent();

    return content;
  }
}

Camera.propTypes = {};

Camera.defaultProps = {};

export default Camera;
