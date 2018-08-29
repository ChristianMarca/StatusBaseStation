import React from "react";
import Autosuggest from "react-autosuggest/dist/Autosuggest";
import './style.css'



class Location extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    alert('A name was submitted: ' + this.state.value);
    // console.log(this.state.value)
    event.preventDefault();
  }

  render() {

    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Name:
          <input type="text" value={this.state.value} onChange={this.handleChange} />
        </label>
        <input type="submit" value="Submit" />
      </form>
    );
  }
}

class CajaTxt extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      valueCajaTxt: '',
      value: '',
      suggestions: [],

      f4Value: '',
      f4Suggestions: [],
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
    
    return this.state.RadioBases.filter(user => regex.test(user.f4) || regex.test(user.f8) || regex.test(user.f7));
  }
  
  getSuggestionf4(suggestion) {
    return String(suggestion.f4);
  }
  
  getSuggestionf8(suggestion) {
    return String(suggestion.f8);
  }
  
  getSuggestionf7(suggestion) {
    return String(suggestion.f7);
  }
  
  renderSuggestion(suggestion) {
    return (
      <span>{suggestion.f4}/{suggestion.f8}/{suggestion.f7}</span>
    );
  }

  onf4Change = (event, { newValue }) => {
    this.setState({
      f4Value: newValue
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
  
  onf4SuggestionsFetchRequested = ({ value }) => {
    this.setState({
      f4Suggestions: this.getSuggestions(value)
    });
  };

  onf4SuggestionsClearRequested = (event) => {
    this.setState({
      f4Suggestions: []
    });
  };

  onf4SuggestionSelected = (event, { suggestion, suggestionValue, suggestionIndex, sectionIndex, method }) => {
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
      f4Value: suggestion.f4,
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
      f4Value: suggestion.f4,
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
      f4Value, 
      f4Suggestions, 
      f8Value, 
      f8Suggestions ,
      f7Suggestions,
      f7Value
    } = this.state;
    const f4InputProps = {
      placeholder: "S719",
      value: f4Value,
      onChange: this.onf4Change,
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
        <h3>Estructura</h3>
        <Autosuggest
          id="f4" 
          suggestions={f4Suggestions}
          onSuggestionsFetchRequested={this.onf4SuggestionsFetchRequested}
          onSuggestionsClearRequested={this.onf4SuggestionsClearRequested}
          onSuggestionSelected={this.onf4SuggestionSelected}
          getSuggestionValue={this.getSuggestionf4}
          renderSuggestion={this.renderSuggestion}
          inputProps={f4InputProps}
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
  Location,
  CajaTxt
}
