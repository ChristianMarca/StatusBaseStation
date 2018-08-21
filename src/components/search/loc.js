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

// https://developer.mozilla.org/en/docs/Web/JavaScript/Guide/Regular_Expressions#Using_Special_Characters
//############codigo 1##############
// function escapeRegexCharacters(str) {
//   return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
// }

// function getSuggestions(value) {
//   const escapedValue = escapeRegexCharacters(value.trim());
  
//   if (escapedValue === '') {
//     return [];
//   }

//   const regex = new RegExp('^' + escapedValue, 'i');

//   return languages
//     .map(section => {
//       return {
//         title: section.title,
//         languages: section.languages.filter(language => regex.test(language.name))
//       };
//     })
//     .filter(section => section.languages.length > 0);
// }

// function getSuggestionValue(suggestion) {
//   return suggestion.name;
// }

// function do_something(){
//   alert('fpskd')
// }
// function do_something_else(){
//   console.log('fpskd')
// }
// function renderSuggestion(suggestion) {
//   return (
//     // <span>{suggestion.name}</span>
//     <button onClick={do_something}>{suggestion.name}</button>
//   );
// }

// function renderSectionTitle(section) {
//   return (
//     <strong>{section.title}</strong>
//   );
// }

// function getSectionSuggestions(section) {
//   return section.languages;
// }

// function renderSuggestionsContainer(options){

//   return (
//     <div>
//       {options.children}
//       {options.children(<div><button onClick={do_something_else}>Another function</button></div>)}
//     </div>
//     )
//   }

//################Finc odigo 1############

// https://developer.mozilla.org/en/docs/Web/JavaScript/Guide/Regular_Expressions#Using_Special_Characters
// function escapeRegexCharacters(str) {
//   return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
// }

// function getSuggestions(value) {
//   const escapedValue = escapeRegexCharacters(value.trim());
//   const regex = new RegExp('^' + escapedValue, 'i');
  
//   return users.filter(user => regex.test(user.f2) || regex.test(user.f3) || regex.test(user.coordinates));
// }

// function getSuggestionf2(suggestion) {
//   return suggestion.f2;
// }

// function getSuggestionf3(suggestion) {
//   return suggestion.f3;
// }

// function getSuggestioncoordinates(suggestion) {
//   return suggestion.coordinates;
// }

// function renderSuggestion(suggestion) {
//   return (
//     <span>{suggestion.f2} - {suggestion.f3} - {suggestion.coordinates}</span>
//   );
// }
// function clickBtn(){
//   alert('button clicked when mouse enter');
// }

// function renderSuggestion(suggestion) {
//   return (
//     <div>
//       <button onClick={clickBtn}>Click me</button>
//     <span>{suggestion.f2}</span>
//       </div>
//   );
// }


class CajaTxt extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      valueCajaTxt: '',
      value: '',
      suggestions: [],

      f2Value: '',
      f2Suggestions: [],
      f3Value: '',
      f3Suggestions: [],
      coordinatesValue: '',
      coordinatesSuggestions: [],

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
    
    return this.state.RadioBases.filter(user => regex.test(user.f2) || regex.test(user.f3) || regex.test(user.coordinates));
  }
  
  getSuggestionf2(suggestion) {
    return suggestion.f2;
  }
  
  getSuggestionf3(suggestion) {
    return suggestion.f3;
  }
  
  getSuggestioncoordinates(suggestion) {
    return String(suggestion.coordinates);
  }
  
  renderSuggestion(suggestion) {
    return (
      <span>{suggestion.f2}/{suggestion.f3}/{suggestion.coordinates}</span>
    );
  }
  
  // componentDidUpdate(){
  //   const {menuList}=this.props;
  //     this.setState({RadioBases: menuList})

  //   console.log('Casi al fina',this.state.RadioBases)
  // }

  // handleChange(event) {
  //   this.setState({valueCajaTxt: event.target.value});
  //   this.props.value(event.target.value);
  //   console.log(event.target.value)
  //   // this.props.value(this.state.value);
  //   // console.log(event)
  //   // console.log(event.charCode)
  //   // console.log(event.target.value)
  // }

  // _handleKeyPress = (event) => {
  //   if (event.key === 'Enter') {
  //     console.log('do validate');
  //     this.props.value(this.state.valueCajaTxt);
  //   }
  // }

  //#####Codigo 1########

  // onChange = (event, { newValue, method }) => {
  //   // alert(method)
  //   this.props.value(event.target.value);
  //   this.setState({
  //     value: newValue
  //   });
  // };
  // //##############################
  // onSuggestionsFetchRequested = ({ value }) => {
  //   this.setState({
  //     suggestions: getSuggestions(value)
  //   });
  // };

  // onSuggestionsClearRequested = () => {
  //   this.setState({
  //     suggestions: []
  //   });
  // };

  // onSuggestionSelected = (event,{ suggestion, suggestionValue, suggestionIndex, sectionIndex, method }) => {
  //   event.preventDefault();
  //   event.stopPropagation();

  //   alert(method)

  //   this.setState({
  //     f3Suggestions: []
  //   });
  // };

  // onSuggestionHighlighted=()=>{
  //   // alert('focus')
  // }

  // onKeyDown(event) {
  //   console.log("ev",event)
  //   if (event.key === 'Enter') {
  //     console.log('Enter pressed!')
  //     this.props.value(event.target.value);
  //     this.onSuggestionsClearRequested();
  //     event.preventDefault();
  //     event.stopPropagation();
  //   }
  // }
  // onrenderSuggestionsContainer({ containerProps, children,query }){
  //   console.log('children',containerProps)
  //   const { ref, ...restContainerProps } = containerProps;
  //   const callRef = isolatedScroll => {
  //     if (isolatedScroll !== null) {
  //       ref(isolatedScroll.component);
  //     }
  //   };

  //   return (
  //     <IsolatedScroll ref={callRef} {...restContainerProps}>
  //       {children}
  //     </IsolatedScroll>
  //   );
  // }
  //####### Fin codigo 1######

  // onChange = (event, { newValue, method }) => {
  //   this.setState({
  //     value: newValue
  //   });
  // };

  onf2Change = (event, { newValue }) => {
    this.setState({
      f2Value: newValue
    });
    event.preventDefault();
    event.stopPropagation();
  };

  onf3Change = (event, { newValue }) => {
    this.setState({
      f3Value: newValue
    });
    event.preventDefault();
    event.stopPropagation();
  };

  oncoordinatesChange = (event, { newValue }) => {
    this.setState({
      coordinatesValue: newValue
    });
    event.preventDefault();
    event.stopPropagation();
  };
  
  onf2SuggestionsFetchRequested = ({ value }) => {
    this.setState({
      f2Suggestions: this.getSuggestions(value)
    });
  };

  onf2SuggestionsClearRequested = (event) => {
    this.setState({
      f2Suggestions: []
    });
  };

  onf2SuggestionSelected = (event, { suggestion, suggestionValue, suggestionIndex, sectionIndex, method }) => {
    console.log(method)
    this.setState({
      f3Value: suggestion.f3,
      coordinatesValue: String(suggestion.coordinates),
      informationValue: suggestion,
    });
    this.props.locate(this.state.informationValue)
    event.preventDefault();
    event.stopPropagation();
  };

  oncoordinatesSuggestionsFetchRequested = ({ value }) => {
    this.setState({
      coordinatesSuggestions: this.getSuggestions(String(value))
    });
  };

  oncoordinatesSuggestionsClearRequested = (event) => {
    this.setState({
      coordinatesSuggestions: []
    });
  };

  oncoordinatesSuggestionSelected = (event, { suggestion, suggestionValue, suggestionIndex, sectionIndex, method }) => {
    console.log(method)
    this.setState({
      f3Value: suggestion.f3,
      f2Value: suggestion.f2,
      informationValue: suggestion,
    });
    this.props.locate(this.state.informationValue)
    event.preventDefault();
    event.stopPropagation();
  };

  onf3SuggestionsFetchRequested = ({ value }) => {
    this.setState({
      f3Suggestions: this.getSuggestions(value)
    });
  };

  onf3SuggestionsClearRequested = () => {
    this.setState({
      f3Suggestions: []
    });
  };

  onf3SuggestionSelected = (event, { suggestion, suggestionValue, suggestionIndex, sectionIndex, method }) => {
    this.setState({
      f2Value: suggestion.f2,
      coordinatesValue: String(suggestion.coordinates),
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
    // const {value}=this.props;
    // console.log(value)
    //######c1#######
    // const { value, suggestions } = this.state;
    // const inputProps = {
    //   placeholder: "Ej. Azuay, Cuenca, El vecino",
    //   value,
    //   // onChange: this.onChange,
    //   // onKeyDown: this.onKeyDown,
    // };
    ///##fin c1###

    const { 
      f2Value, 
      f2Suggestions, 
      f3Value, 
      f3Suggestions ,
      coordinatesSuggestions,
      coordinatesValue
    } = this.state;
    const f2InputProps = {
      placeholder: "Name",
      value: f2Value,
      onChange: this.onf2Change,
      onKeyDown: this.onKeyDown,
    };
    const f3InputProps = {
      placeholder: "City",
      value: f3Value,
      onChange: this.onf3Change,
      onKeyDown: this.onKeyDown,
    };
    const coordinatesInputProps = {
      placeholder: "coordinates",
      value: coordinatesValue,
      onChange: this.oncoordinatesChange,
      onKeyDown: this.onKeyDown,
    };

    return( 
      
      <form>
        {/* <div className="card-header">Buscar RadioBase</div> */}
          {/* <form>
            <div> */}
              {/* <input type="text" value={this.state.value} onChange={this.handleChange} onKeyPress={this._handleKeyPress} placeholder="Ej. Azuay, Cuenca, El vecino">
              
              </input> */}

              {/* <Autosuggest 
              multiSection={true}
              suggestions={suggestions}
              onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
              onSuggestionsClearRequested={this.onSuggestionsClearRequested}
              onSuggestionSelected={this.onSuggestionSelected}
              onSuggestionHighlighted={this.onSuggestionHighlighted}
              getSuggestionValue={getSuggestionValue}
              renderSuggestion={renderSuggestion}
              renderSectionTitle={renderSectionTitle}
              getSectionSuggestions={getSectionSuggestions}
              renderSuggestionsContainer={this.onrenderSuggestionsContainer}
              inputProps={inputProps}
               /> */}

            {/* </div>
          </form> */}
        {/* </div> */}
        {/* ################### */}
        <h1>Nombre</h1>
        <Autosuggest
          id="f2" 
          suggestions={f2Suggestions}
          onSuggestionsFetchRequested={this.onf2SuggestionsFetchRequested}
          onSuggestionsClearRequested={this.onf2SuggestionsClearRequested}
          onSuggestionSelected={this.onf2SuggestionSelected}
          getSuggestionValue={this.getSuggestionf2}
          renderSuggestion={this.renderSuggestion}
          inputProps={f2InputProps}
        />
        <h1>Provincia</h1>
        <Autosuggest 
          id="f3"
          suggestions={f3Suggestions}
          onSuggestionsFetchRequested={this.onf3SuggestionsFetchRequested}
          onSuggestionsClearRequested={this.onf3SuggestionsClearRequested}
          onSuggestionSelected={this.onf3SuggestionSelected}
          getSuggestionValue={this.getSuggestionf3}
          renderSuggestion={this.renderSuggestion}
          inputProps={f3InputProps}
        />
        <h1>Canton</h1>
        <Autosuggest 
          id="coordinates"
          suggestions={coordinatesSuggestions}
          onSuggestionsFetchRequested={this.oncoordinatesSuggestionsFetchRequested}
          onSuggestionsClearRequested={this.oncoordinatesSuggestionsClearRequested}
          onSuggestionSelected={this.oncoordinatesSuggestionSelected}
          getSuggestionValue={this.getSuggestioncoordinates}
          renderSuggestion={this.renderSuggestion}
          inputProps={coordinatesInputProps}
        />
     
      </form>
    )}
}

export {
  Location,
  CajaTxt
}
