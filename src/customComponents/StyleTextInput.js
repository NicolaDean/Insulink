import * as React from "react";
import { StyleSheet, TextInput } from "react-native";


const BLUE = "#428AF8";
const LIGHT_GRAY = "#D3D3D3";


/*
TO IMPLEMENT -->
*/
class StyleTextInput extends React.Component {
  state = {
    isFocused: false
  };

  handleFocus = event => {
    this.setState({ isFocused: true });
    if (this.props.onFocus) {
      this.props.onFocus(event);
    }
  };

  handleBlur = event => {
    this.setState({ isFocused: false });
    if (this.props.onBlur) {
      this.props.onBlur(event);
    }
  };

  render() {
    const { isFocused } = this.state;
    const { onFocus, onBlur,name,placeholder, ...otherProps } = this.props;
    return (
      <TextInput
        selectionColor={BLUE}
        underlineColorAndroid={
          isFocused ? BLUE : LIGHT_GRAY
        }
        onFocus={this.handleFocus}
        onBlur={this.handleBlur}
        style={styles.textInput}
        {...otherProps}
        value={name}
        placeholder={placeholder}
      />
    );
  }
}

const styles = StyleSheet.create({
  textInput: {
    height: 40,
    paddingLeft: 6
  }
});

export default StyleTextInput;