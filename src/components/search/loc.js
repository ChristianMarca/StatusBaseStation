import React from "react";
import Autosuggest from "react-autosuggest/dist/Autosuggest";
import DataStorage from "../../configs/index";
import './style.css'

class CajaTxt extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      valueCajaTxt: '',
      value: '',
      suggestions: [],

      estValue: '',
      estSuggestions: [],
      cell_idValue: '',
      cell_idSuggestions: [],
      direccionValue: '',
      direccionSuggestions: [],
      parroquiaValue: '',
      parroquiaSuggestions: [],

      informationValue:{},
      RadioBases:[]
      //RadioBases: this.props.menuList,
    };

    ///##codigo 1########
    // this.handleChange = this.handleChange.bind(this);
    // this.onChange = this.onChange.bind(this);
    this.onKeyDown = this.onKeyDown.bind(this);
    //#fin vondiedo 1
    // this.onSuggestionsUpdateRequested = this.onSuggestionsUpdateRequested.bind(this);
  }

  // componentWillReceiveProps(nextProps){
  //   // const {menuList}=this.props;
  //   // console.log('astisdsdff',menuList)

  //   this.setState({RadioBases: nextProps.menuList})

  // // console.log('Casi al fina',this.state.RadioBases)
  //   //console.log('radiobases',this.state.RadioBases)
  // }
  escapeRegexCharacters(str) {
    return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  }

  getSuggestions(value) {
    const escapedValue = this.escapeRegexCharacters(value.trim());
    const regex = new RegExp('^' + escapedValue, 'i');
    // console.log(this.state.RadioBases)
    return this.state.RadioBases.filter(user => regex.test(user.nom_sit) || regex.test(user.cell_id) || regex.test(user.dir) || regex.test(user.parroquia));
  }

  getSuggestionest(suggestion) {
    return String(suggestion.nom_sit);
  }

  getSuggestioncell_id(suggestion) {
    return String(suggestion.cell_id);
  }

  getSuggestiondireccion(suggestion) {
    return String(suggestion.dir);
  }

  getSuggestionparroquia(suggestion) {
    return String(suggestion.parroquia);
  }

  renderSuggestion(suggestion) {
    return (
      <span>{suggestion.nom_sit}/{suggestion.cell_id}/{suggestion.dir}/{suggestion.parroquia}</span>
    );
  }

  // onChangeEst = (event, { newValue }) => {
  //   newValue.length>=2 && fetch.get(`http://192.168.1.102:3000/radioBases/test?nom_sit=${newValue}`)
  //   .then(resp=>resp.json())
  //   .then(resp=>{
  //     console.log(resp)
  //     this.setState({RadioBases: resp.data})
  //   })
  //   .catch(console.log)
  //   this.setState({
  //     Est: String(newValue)
  //   });
  // };

  onestChange = (event, { newValue }) => {
    // console.log(this.props.dataSelected,'thistadas')
    const DataStorageSuggestNom_Sit= new DataStorage();
    newValue.length>=2 && 
      DataStorageSuggestNom_Sit.fetchRadioBasesSuggest(newValue,this.props.dataSelected,"nom_sit",window.localStorage.getItem('acceptAdvisement'))
    .then(resp=>{
      !(resp==='Not Found')?this.setState({RadioBases: resp}):this.setState({RadioBases: []})
    })
    this.setState({
      estValue: newValue
    });
    event.preventDefault();
    event.stopPropagation();
  };

  oncell_idChange = (event, { newValue }) => {
    const DataStorageSuggestCell_Id= new DataStorage();
    // newValue.length>=2 && fetch(`http://192.168.1.102:3000/radioBases/StatusBaseStation?cell_id=${newValue}`)
    // .then(resp=>resp.json())
    newValue.length>=2 && 
      DataStorageSuggestCell_Id.fetchRadioBasesSuggest(newValue,this.props.dataSelected,"cell_id",window.localStorage.getItem('acceptAdvisement'))
    .then(resp=>{
      //this.setState({RadioBases: resp.data})
      !(resp==='Not Found')?this.setState({RadioBases: resp}):this.setState({RadioBases: []})
    })
    this.setState({
      cell_idValue: newValue
    });
    event.preventDefault();
    event.stopPropagation();
  };

  ondireccionChange = (event, { newValue }) => {
    const DataStorageSuggestDir= new DataStorage();
    // newValue.length>=2 && fetch(`http://192.168.1.102:3000/radioBases/StatusBaseStation?dir=${newValue}`)
    // .then(resp=>resp.json())
    newValue.length>=2 && 
      DataStorageSuggestDir.fetchRadioBasesSuggest(newValue,this.props.dataSelected,"dir",window.localStorage.getItem('acceptAdvisement'))
    .then(resp=>{
      //this.setState({RadioBases: resp})
      !(resp==='Not Found')?this.setState({RadioBases: resp}):this.setState({RadioBases: []})
    })
    this.setState({
      direccionValue: newValue
    });
    event.preventDefault();
    event.stopPropagation();
  };

  onparroquiaChange = (event, { newValue }) => {
    const DataStorageSuggest= new DataStorage();
    // newValue.length>=2 && fetch(`http://192.168.1.102:3000/radioBases/StatusBaseStation?parroquia=${newValue}`)
    // .then(resp=>resp.json())
    newValue.length>=2 && 
      DataStorageSuggest.fetchRadioBasesSuggest(newValue,this.props.dataSelected,"parroquia",window.localStorage.getItem('acceptAdvisement'))
    .then(resp=>{
        !(resp==='Not Found')?this.setState({RadioBases: resp}):this.setState({RadioBases: []})
    })
    this.setState({
      parroquiaValue: newValue
    });
    event.preventDefault();
    event.stopPropagation();
  };

  onestSuggestionsFetchRequested = ({ value }) => {
    this.setState({
      estSuggestions: this.getSuggestions(value)
    });
  };

  onestSuggestionsClearRequested = () => {
    this.setState({
      estSuggestions: []
    });
  };

  onestSuggestionSelected = (event, { suggestion, suggestionValue, suggestionIndex, sectionIndex, method }) => {
    this.setState({
      cell_idValue: String(suggestion.cell_id),
      direccionValue: String(suggestion.dir),
      parroquiaValue: String(suggestion.parroquia),
      informationValue: suggestion,

    });
    this.props.locate(this.state.informationValue)
    event.preventDefault();
    event.stopPropagation();
  };

  oncell_idSuggestionsFetchRequested = ({ value }) => {
    this.setState({
      cell_idSuggestions: this.getSuggestions(value)
    });
  };

  oncell_idSuggestionsClearRequested = (event) => {
    this.setState({
      cell_idSuggestions: []
    });
  };

  oncell_idSuggestionSelected = (event, { suggestion, suggestionValue, suggestionIndex, sectionIndex, method }) => {
    this.setState({
      estValue: String(suggestion.nom_sit),
      direccionValue: String(suggestion.dir),
      parroquiaValue: String(suggestion.parroquia),
      informationValue: suggestion,
    });
    this.props.locate(suggestion)
    event.preventDefault();
    event.stopPropagation();
  };

  onparroquiaSuggestionsFetchRequested = ({ value }) => {
    this.setState({
      parroquiaSuggestions: this.getSuggestions(String(value))
    });
  };

  onparroquiaSuggestionsClearRequested = (event) => {
    this.setState({
      parroquiaSuggestions: []
    });
  };

  onparroquiaSuggestionSelected = (event, { suggestion, suggestionValue, suggestionIndex, sectionIndex, method }) => {
    //console.log(method)
    this.setState({
      estValue: String(suggestion.nom_sit),
      direccionValue: String(suggestion.dir),
      cell_idValue: String(suggestion.cell_id),
      informationValue: suggestion,
    });
    this.props.locate(this.state.informationValue)
    event.preventDefault();
    event.stopPropagation();
  };

  ondireccionSuggestionsFetchRequested = ({ value }) => {
    this.setState({
      direccionSuggestions: this.getSuggestions(value)
    });
  };

  ondireccionSuggestionsClearRequested = () => {
    this.setState({
      direccionSuggestions: []
    });
  };

  ondireccionSuggestionSelected = (event, { suggestion, suggestionValue, suggestionIndex, sectionIndex, method }) => {
    this.setState({
      estValue: String(suggestion.nom_sit),
      cell_idValue: String(suggestion.cell_id),
      parroquiaValue: String(suggestion.parroquia),
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
      estValue,
      estSuggestions,
      cell_idValue,
      cell_idSuggestions,
      direccionValue,
      direccionSuggestions ,
      parroquiaSuggestions,
      parroquiaValue
    } = this.state;
    const estInputProps = {
      placeholder: "Cuenca",
      value: estValue,
      onChange: this.onestChange,
      onKeyDown: this.onKeyDown,
    };
    const cell_idInputProps = {
      placeholder: "12345",
      value: cell_idValue,
      onChange: this.oncell_idChange,
      onKeyDown: this.onKeyDown,
    };
    const direccionInputProps = {
      placeholder: "Cuenca Centro",
      value: direccionValue,
      onChange: this.ondireccionChange,
      onKeyDown: this.onKeyDown,
    };
    const parroquiaInputProps = {
      placeholder: "El Rosario",
      value: parroquiaValue,
      onChange: this.onparroquiaChange,
      onKeyDown: this.onKeyDown,
    };

    return(

      <div className="locationContainer">
        <h4 className="titleFieldSearch">Estructura</h4>
        <Autosuggest
          id="nom_sit"
          suggestions={estSuggestions}
          onSuggestionsFetchRequested={this.onestSuggestionsFetchRequested}
          onSuggestionsClearRequested={this.onestSuggestionsClearRequested}
          onSuggestionSelected={this.onestSuggestionSelected}
          getSuggestionValue={this.getSuggestionest}
          renderSuggestion={this.renderSuggestion}
          inputProps={estInputProps}
        />
        <h4 className="titleFieldSearch">Cell ID</h4>
        <Autosuggest
          id="cell_id"
          suggestions={cell_idSuggestions}
          onSuggestionsFetchRequested={this.oncell_idSuggestionsFetchRequested}
          onSuggestionsClearRequested={this.oncell_idSuggestionsClearRequested}
          onSuggestionSelected={this.oncell_idSuggestionSelected}
          getSuggestionValue={this.getSuggestioncell_id}
          renderSuggestion={this.renderSuggestion}
          inputProps={cell_idInputProps}
        />
        <h4 className="titleFieldSearch">Dirección</h4>
        <Autosuggest
          id="dir"
          suggestions={direccionSuggestions}
          onSuggestionsFetchRequested={this.ondireccionSuggestionsFetchRequested}
          onSuggestionsClearRequested={this.ondireccionSuggestionsClearRequested}
          onSuggestionSelected={this.ondireccionSuggestionSelected}
          getSuggestionValue={this.getSuggestiondireccion}
          renderSuggestion={this.renderSuggestion}
          inputProps={direccionInputProps}
        />
        <h4 className='titleFieldSearch'>Parroquia</h4>
        <Autosuggest
          id="parroquia"
          suggestions={parroquiaSuggestions}
          onSuggestionsFetchRequested={this.onparroquiaSuggestionsFetchRequested}
          onSuggestionsClearRequested={this.onparroquiaSuggestionsClearRequested}
          onSuggestionSelected={this.onparroquiaSuggestionSelected}
          getSuggestionValue={this.getSuggestionparroquia}
          renderSuggestion={this.renderSuggestion}
          inputProps={parroquiaInputProps}
        />

      </div>
    )}
}

export {
  CajaTxt
}
