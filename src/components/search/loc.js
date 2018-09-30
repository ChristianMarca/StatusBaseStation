import React from "react";
import Autosuggest from "react-autosuggest/dist/Autosuggest";
import './style.css'

class CajaTxt extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      valueCajaTxt: '',
      value: '',
      suggestions: [],

      f11Value: '',
      f11Suggestions: [],
      f8Value: '',
      f8Suggestions: [],
      f7Value: '',
      f7Suggestions: [],

      informationValue:{},

      RadioBases: this.props.menuList,
    };

    ///##codigo 1########
    // this.handleChange = this.handleChange.bind(this);
    // this.onChange = this.onChange.bind(this);
    this.onKeyDown = this.onKeyDown.bind(this);
    //#fin vondiedo 1
    // this.onSuggestionsUpdateRequested = this.onSuggestionsUpdateRequested.bind(this);
  }

  componentWillReceiveProps(nextProps){
    // const {menuList}=this.props;
    // console.log('astisdsdff',menuList)

    this.setState({RadioBases: nextProps.menuList})

  // console.log('Casi al fina',this.state.RadioBases)
    console.log('radiobases',this.state.RadioBases)
  }

  escapeRegexCharacters(str) {
    return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  }

  getSuggestions(value) {
    const escapedValue = this.escapeRegexCharacters(value.trim());
    const regex = new RegExp('^' + escapedValue, 'i');

    return this.state.RadioBases.filter(user => regex.test(user.f11) || regex.test(user.f8) || regex.test(user.f7));
  }

  getSuggestionf11(suggestion) {
    return String(suggestion.f11);
  }

  getSuggestionf8(suggestion) {
    return String(suggestion.f8);
  }

  getSuggestionf7(suggestion) {
    return String(suggestion.f7);
  }

  renderSuggestion(suggestion) {
    return (
      <span>{suggestion.f11}/{suggestion.f8}/{suggestion.f7}</span>
    );
  }

  onf11Change = (event, { newValue }) => {
    this.setState({
      f11Value: newValue
    });
    event.preventDefault();
    event.stopPropagation();
  };

  onf8Change = (event, { newValue }) => {
    this.setState({
      f8Value: newValue
    });
    event.preventDefault();
    event.stopPropagation();
  };

  onf7Change = (event, { newValue }) => {
    this.setState({
      f7Value: newValue
    });
    event.preventDefault();
    event.stopPropagation();
  };

  onf11SuggestionsFetchRequested = ({ value }) => {
    this.setState({
      f11Suggestions: this.getSuggestions(value)
    });
  };

  onf11SuggestionsClearRequested = (event) => {
    this.setState({
      f11Suggestions: []
    });
  };

  onf11SuggestionSelected = (event, { suggestion, suggestionValue, suggestionIndex, sectionIndex, method }) => {
    console.log(method)
    this.setState({
      f8Value: suggestion.f8,
      f7Value: String(suggestion.f7),
      informationValue: suggestion,
    });
    this.props.locate(suggestion)
    event.preventDefault();
    event.stopPropagation();
  };

  onf7SuggestionsFetchRequested = ({ value }) => {
    this.setState({
      f7Suggestions: this.getSuggestions(String(value))
    });
  };

  onf7SuggestionsClearRequested = (event) => {
    this.setState({
      f7Suggestions: []
    });
  };

  onf7SuggestionSelected = (event, { suggestion, suggestionValue, suggestionIndex, sectionIndex, method }) => {
    console.log(method)
    this.setState({
      f8Value: suggestion.f8,
      f11Value: suggestion.f11,
      informationValue: suggestion,
    });
    this.props.locate(this.state.informationValue)
    event.preventDefault();
    event.stopPropagation();
  };

  onf8SuggestionsFetchRequested = ({ value }) => {
    this.setState({
      f8Suggestions: this.getSuggestions(value)
    });
  };

  onf8SuggestionsClearRequested = () => {
    this.setState({
      f8Suggestions: []
    });
  };

  onf8SuggestionSelected = (event, { suggestion, suggestionValue, suggestionIndex, sectionIndex, method }) => {
    this.setState({
      f11Value: suggestion.f11,
      f7Value: String(suggestion.f7),
      informationValue: suggestion,

    });
    this.props.locate(this.state.informationValue)
    event.preventDefault();
    event.stopPropagation();
  };

  onKeyDown(event) {
      if (event.key === 'Enter') {
        this.props.value(event.target.value);
        // alert('ENTER',event.target.value)
        // this.onSuggestionsClearRequested();
        this.props.locate(this.state.informationValue)
        event.preventDefault();
        event.stopPropagation();
      }
    }
    handleClick=()=>{
      alert('Se logro el click')
    }

  render() {

    const {
      f11Value,
      f11Suggestions,
      f8Value,
      f8Suggestions ,
      f7Suggestions,
      f7Value
    } = this.state;
    const f11InputProps = {
      placeholder: "12345",
      value: f11Value,
      onChange: this.onf11Change,
      onKeyDown: this.onKeyDown,
    };
    const f8InputProps = {
      placeholder: "Cuenca Centro",
      value: f8Value,
      onChange: this.onf8Change,
      onKeyDown: this.onKeyDown,
    };
    const f7InputProps = {
      placeholder: "El Rosario",
      value: f7Value,
      onChange: this.onf7Change,
      onKeyDown: this.onKeyDown,
    };

    return(

      <div className="locationContainer">
        <h3>Cell ID</h3>
        <Autosuggest
          id="f11"
          suggestions={f11Suggestions}
          onSuggestionsFetchRequested={this.onf11SuggestionsFetchRequested}
          onSuggestionsClearRequested={this.onf11SuggestionsClearRequested}
          onSuggestionSelected={this.onf11SuggestionSelected}
          getSuggestionValue={this.getSuggestionf11}
          renderSuggestion={this.renderSuggestion}
          inputProps={f11InputProps}
        />
        <h3>Dirección</h3>
        <Autosuggest
          id="f8"
          suggestions={f8Suggestions}
          onSuggestionsFetchRequested={this.onf8SuggestionsFetchRequested}
          onSuggestionsClearRequested={this.onf8SuggestionsClearRequested}
          onSuggestionSelected={this.onf8SuggestionSelected}
          getSuggestionValue={this.getSuggestionf8}
          renderSuggestion={this.renderSuggestion}
          inputProps={f8InputProps}
        />
        <h3>Parroquia</h3>
        <Autosuggest
          id="f7"
          suggestions={f7Suggestions}
          onSuggestionsFetchRequested={this.onf7SuggestionsFetchRequested}
          onSuggestionsClearRequested={this.onf7SuggestionsClearRequested}
          onSuggestionSelected={this.onf7SuggestionSelected}
          getSuggestionValue={this.getSuggestionf7}
          renderSuggestion={this.renderSuggestion}
          inputProps={f7InputProps}
        />

      </div>
    )}
}

export {
  CajaTxt
}
