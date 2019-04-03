const React = require('react')
const { ViewPropTypes } = ReactNative = require('react-native')
const PropTypes = require('prop-types')
const createReactClass = require('create-react-class')
const {
  StyleSheet,
  Text,
  View,
  Animated
} = ReactNative
const Button = require('./Button')

const DefaultTabBar = createReactClass({
  propTypes: {
    goToPage: PropTypes.func,
    activeTab: PropTypes.number,
    tabs: PropTypes.array,
    backgroundColor: PropTypes.string,
    activeTextColor: PropTypes.string,
    inactiveTextColor: PropTypes.string,
    textStyle: Text.propTypes.style,
    tabStyle: ViewPropTypes.style,
    renderTab: PropTypes.func,
    underlineStyle: ViewPropTypes.style
  },

  getDefaultProps () {
    return {
      activeTextColor: 'navy',
      inactiveTextColor: 'black',
      backgroundColor: null
    }
  },

  renderTabOption (name, page) {
  },

  renderTab (name, page, isTabActive, onPressHandler) {
    const { activeTextColor, inactiveTextColor, textStyle } = this.props
    const textColor = isTabActive ? activeTextColor : inactiveTextColor
    const fontWeight = isTabActive ? 'bold' : 'normal'

    return <Button
      style={{ flex: 1 }}
      key={name}
      accessible
      accessibilityLabel={name}
      activeOpacity={1}
      accessibilityTraits='button'
      onPress={() => onPressHandler(page)}
    >
      <View style={[ styles.tab, this.props.tabStyle ]}>
        <Text style={[ { color: textColor, fontWeight }, textStyle ]}>
          {name}
        </Text>
      </View>
    </Button>
  },

  render () {
    const containerWidth = this.props.containerWidth
    const numberOfTabs = this.props.tabs.length
    const tabUnderlineStyle = {
      position: 'absolute',
      width: (containerWidth - 100) / numberOfTabs,
      height: 4,
      justifyContent: 'flex-end',
      alignItems: 'center',
      bottom: 0
    }

    const translateX = this.props.scrollValue.interpolate({
      inputRange: [0, 1],
      outputRange: [0, (containerWidth - 100) / numberOfTabs]
    })
    return (
      <View style={[ styles.tabs, { backgroundColor: this.props.backgroundColor }, this.props.style ]}>
        <View style={{ flexDirection: 'row',
          flex: 1,
          justifyContent: 'space-around'
        }}>
          {this.props.tabs.map((name, page) => {
            const isTabActive = this.props.activeTab === page
            const renderTab = this.props.renderTab || this.renderTab
            return renderTab(name, page, isTabActive, this.props.goToPage)
          })}
          <Animated.View
            style={[
              tabUnderlineStyle,
              {
                transform: [
                  { translateX }
                ]
              },
              this.props.underlineStyle
            ]}
          >
            <Animated.View style={{ height: 3,
              width: 30,
              transform: [{
                scaleX: this.props.scrollValue.interpolate({
                  inputRange: [0, 0.5, 1],
                  outputRange: [1, 2, 1]
                })
              }],
              borderRadius: 2,
              backgroundColor: '#fff' }} />
          </Animated.View>
        </View>
      </View>
    )
  }
})

const styles = StyleSheet.create({
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  tabs: {
    height: 36,
    paddingBottom: 6,
    paddingHorizontal: 50
  }
})

module.exports = DefaultTabBar
