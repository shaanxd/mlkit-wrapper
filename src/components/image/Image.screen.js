// @flow
import React from 'react';
import {View, ImageBackground} from 'react-native';
import PropTypes from 'prop-types';
import type {Element as ReactElement} from 'react';

import styles from './Image.styles';

type ImageProps = {}; // TODO: Add props type here
type ImageState = {}; // TODO: Add state type here

class Image extends React.PureComponent<ImageProps, ImageState> {
  static defaultProps: any

  constructor(props: ImageProps) {
    super(props);
    const { navigation } = this.props;
    this.state = {
        imageUrl: navigation.getParam('imageUrl', ''),
        responseData: navigation.getParam('responseData', {}),
    }
  }

  renderContent = (): ReactElement<any> => {
    const {imageUrl, responseData} = this.state;
    console.log(responseData);
    return (
      <View style={styles.container}>
        <ImageBackground
            source={{ uri: imageUrl, isStatic:true }}
            style={styles.imageView}
        />
      </View>
    );
  }

  render() {
    const content = this.renderContent();

    return content;
  }
}

Image.propTypes = {};

Image.defaultProps = {};

export default Image;