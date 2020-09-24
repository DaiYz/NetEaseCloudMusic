import React, { Component } from 'react'
import Image from 'react-native-fast-image'
import images from '../../source/images'
class ImagePlaceholder extends Component {
  constructor (props) {
    super(props)
    const { source } = props
    this.state = {
      image: source,
      loading: true,
      loadError: false
    }
  }

  render () {
    let { style = {}, source } = this.props
    source = this.state.loadError || this.state.loading
      ? images.placeholder
      : source
    return (
      <Image
        {...this.props}
        source={source}
        style={style}
        onError={(e) => {
          console.log(e, '[error]')
          this.setState({ loadError: true })
        }}
        onLoadEnd={() => {
          this.setState({ loading: false })
        }}
      />
    )
  }
}

export default ImagePlaceholder
