import Dexie from "dexie";
var conecelObj=[];
var otecelObj=[];
var cntObj=[];
var otecelObjFilter=[];
var conecelObjFilter=[];
var cntObjFilter=[];
var otecelOBjSuggest=[];
var conecelOBjSuggest=[];
var cntOBjSuggest=[];
class DataStorage{
  constructor(API_URL='http://192.168.1.102:3000'){
    // this.conecelObj=conecelObj;
    // this.otecelObj=otecelObj;
    // this.cntObj=cntObj;
    this.API_URL=API_URL;
  }
  fetchRadioBases=async(isStorage)=>{
    // return isStorage?fetch('http://192.168.1.102:3000/mapa/data_radiobase', {
    return isStorage?fetch(`${this.API_URL}/mapa/data_radiobase`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
      }).then(response => response.json()).then(datosnuev => datosnuev.jsonData).then(myData => {
        console.log('Realizando Fetch al servidor...')
        return myData
      }):this.indexedDBFetching(this.getObjectConvert)
  }

  fetchRadioBasesFilter=async(optionsButtons, isStorage)=>{
    return isStorage?
    this.indexedDBFetchingFilter(optionsButtons,this.getObjectConvert)
    // :fetch('http://192.168.1.102:3000/mapa/filter_radiobase', {
      :fetch(`${this.API_URL}/mapa/filter_radiobase`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          // body: JSON.stringify({campos: this.props.optionsButtons})
          body: JSON.stringify({campos: optionsButtons})
        })
  }

  fetchRadioBasesSuggest=(infoSearch, optionsButtons, field, isStorage)=>{
    return isStorage?
    this.indexedDBFetchingSuggest(infoSearch, optionsButtons, field,this.similarity, this.editDistance)//.then(info=>console.log('estess',info))
    // return fetch(`http://192.168.1.102:3000/radioBases/StatusBaseStation?nom_sit=${newValue}`,
    :
    // fetch(`http://192.168.1.102:3000/radioBases/StatusBaseStation?${field}=${infoSearch}`,
    fetch(`${this.API_URL}/radioBases/StatusBaseStation?${field}=${infoSearch}`,
      {
        method: 'POST',
        headers:{
          'Content-Type': 'application/json'
        },
        // body: JSON.stringify({dataSelected: this.props.dataSelected})
        body: JSON.stringify({dataSelected: optionsButtons})
      })
    .then(resp=>resp.json())
  }

  indexedDBFetchingSuggest=(infoSearch, optionsButtons, field, similarity, editDistance)=>{
    otecelOBjSuggest=[];
    conecelOBjSuggest=[];    
    cntOBjSuggest=[];
    var db = new Dexie('Rb');
    db.version(1).stores({
      conecel_: "++id,nom_sit,cell_id,dir,parroquia,tecnologia, operadora, [tecnologia+operadora]",
      otecel_: "++id,nom_sit,cell_id,dir,parroquia,tecnologia, operadora,[tecnologia+operadora]",
      cnt_: "++id,nom_sit,cell_id,dir,parroquia,tecnologia, operadora, [tecnologia+operadora]",
    });
    db.open();
    // console.log(typeof optionsButtons,optionsButtons.length, 'Example')
    return !(typeof optionsButtons !== undefined && optionsButtons.length>0)?
    (()=>{
      // console.log('ENtro en el primero')
      switch(field){
      case 'nom_sit':
          return db.otecel_.where("nom_sit").startsWithIgnoreCase(infoSearch)
            .each((obj)=>{
              return otecelOBjSuggest.push(obj)
            })
            .then(()=>{
              return db.conecel_.where("nom_sit").startsWithIgnoreCase(infoSearch)
                .each((obj)=>{
                  return conecelOBjSuggest.push(obj)
                }).then(()=>{
                  return db.cnt_.where("nom_sit").startsWithIgnoreCase(infoSearch)
                    .each((obj)=>{
                      return cntOBjSuggest.push(obj)
                    }).then(()=>{
                      return otecelOBjSuggest.concat(conecelOBjSuggest,cntOBjSuggest)
                    })
                })
            })
      case 'cell_id':
          return db.otecel_.where("cell_id").startsWithIgnoreCase(infoSearch)
            .each((obj)=>{
              return otecelOBjSuggest.push(obj)
            })
            .then(()=>{
              return db.conecel_.where("cell_id").startsWithIgnoreCase(infoSearch)
                .each((obj)=>{
                  return conecelOBjSuggest.push(obj)
                }).then(()=>{
                  return db.cnt_.where("cell_id").startsWithIgnoreCase(infoSearch)
                    .each((obj)=>{
                      return cntOBjSuggest.push(obj)
                    }).then(()=>{
                      return otecelOBjSuggest.concat(conecelOBjSuggest,cntOBjSuggest)
                    })
                })
            })
      case 'dir':
          return db.otecel_.where("dir").startsWithIgnoreCase(infoSearch)
            .each((obj)=>{
              return otecelOBjSuggest.push(obj)
            })
            .then(()=>{
              return db.conecel_.where("dir").startsWithIgnoreCase(infoSearch)
                .each((obj)=>{
                  return conecelOBjSuggest.push(obj)
                }).then(()=>{
                  return db.cnt_.where("dir").startsWithIgnoreCase(infoSearch)
                    .each((obj)=>{
                      return cntOBjSuggest.push(obj)
                    }).then(()=>{
                      return otecelOBjSuggest.concat(conecelOBjSuggest,cntOBjSuggest)
                    })
                })
            })
      case 'parroquia':
          return db.otecel_.where("parroquia").startsWithIgnoreCase(infoSearch)
            .each((obj)=>{
              return otecelOBjSuggest.push(obj)
            })
            .then(()=>{
              return db.conecel_.where("parroquia").startsWithIgnoreCase(infoSearch)
                .each((obj)=>{
                  return conecelOBjSuggest.push(obj)
                }).then(()=>{
                  return db.cnt_.where("parroquia").startsWithIgnoreCase(infoSearch)
                    .each((obj)=>{
                      return cntOBjSuggest.push(obj)
                    }).then(()=>{
                      return otecelOBjSuggest.concat(conecelOBjSuggest,cntOBjSuggest)
                    })
                })
            })
      default:
          break;
    }})()
    :
    (()=>{switch(field){
      case 'nom_sit':
          return db.otecel_.where("nom_sit").startsWithIgnoreCase(infoSearch)
            .and(function(data){
                  return optionsButtons.includes(data.tecnologia)
                })
                .and(function(data){
                  return optionsButtons.includes(data.operadora)
                })
            .each((obj)=>{
              return otecelOBjSuggest.push(obj)
            })
            .then(()=>{
              return db.conecel_.where("nom_sit").startsWithIgnoreCase(infoSearch)
                .and(function(data){
                  return optionsButtons.includes(data.tecnologia)
                })
                .and(function(data){
                  return optionsButtons.includes(data.operadora)
                })
                .each((obj)=>{
                  return conecelOBjSuggest.push(obj)
                }).then(()=>{
                  return db.cnt_.where("nom_sit").startsWithIgnoreCase(infoSearch)
                        .and(function(data){
                          return optionsButtons.includes(data.tecnologia)
                        })
                        .and(function(data){
                          return optionsButtons.includes(data.operadora)
                        })
                    .each((obj)=>{
                      return cntOBjSuggest.push(obj)
                    }).then(()=>{
                      return otecelOBjSuggest.concat(conecelOBjSuggest,cntOBjSuggest)
                    })
                })
            })
      case 'cell_id':
          return db.otecel_.where("cell_id").startsWithIgnoreCase(infoSearch)
            .and(function(data){
                  return optionsButtons.includes(data.tecnologia)
                })
                .and(function(data){
                  return optionsButtons.includes(data.operadora)
                })
            .each((obj)=>{
              return otecelOBjSuggest.push(obj)
            })
            .then(()=>{
              return db.conecel_.where("cell_id").startsWithIgnoreCase(infoSearch)
                .and(function(data){
                  return optionsButtons.includes(data.tecnologia)
                })
                .and(function(data){
                  return optionsButtons.includes(data.operadora)
                })
                .each((obj)=>{
                  return conecelOBjSuggest.push(obj)
                }).then(()=>{
                  return db.cnt_.where("cell_id").startsWithIgnoreCase(infoSearch)
                        .and(function(data){
                          return optionsButtons.includes(data.tecnologia)
                        })
                        .and(function(data){
                          return optionsButtons.includes(data.operadora)
                        })
                    .each((obj)=>{
                      return cntOBjSuggest.push(obj)
                    }).then(()=>{
                      return otecelOBjSuggest.concat(conecelOBjSuggest,cntOBjSuggest)
                    })
                })
            })
      case 'dir':
          return db.otecel_.where("dir").startsWithIgnoreCase(infoSearch)
            .and(function(data){
                  return optionsButtons.includes(data.tecnologia)
                })
                .and(function(data){
                  return optionsButtons.includes(data.operadora)
                })
            .each((obj)=>{
              return otecelOBjSuggest.push(obj)
            })
            .then(()=>{
              return db.conecel_.where("dir").startsWithIgnoreCase(infoSearch)
                .and(function(data){
                  return optionsButtons.includes(data.tecnologia)
                })
                .and(function(data){
                  return optionsButtons.includes(data.operadora)
                })
                .each((obj)=>{
                  return conecelOBjSuggest.push(obj)
                }).then(()=>{
                  return db.cnt_.where("dir").startsWithIgnoreCase(infoSearch)
                        .and(function(data){
                          return optionsButtons.includes(data.tecnologia)
                        })
                        .and(function(data){
                          return optionsButtons.includes(data.operadora)
                        })
                    .each((obj)=>{
                      return cntOBjSuggest.push(obj)
                    }).then(()=>{
                      return otecelOBjSuggest.concat(conecelOBjSuggest,cntOBjSuggest)
                    })
                })
            })
      case 'parroquia':
          return db.otecel_.where("parroquia").startsWithIgnoreCase(infoSearch)
            .and(function(data){
                  return optionsButtons.includes(data.tecnologia)
                })
                .and(function(data){
                  return optionsButtons.includes(data.operadora)
                })
            .each((obj)=>{
              return otecelOBjSuggest.push(obj)
            })
            .then(()=>{
              return db.conecel_.where("parroquia").startsWithIgnoreCase(infoSearch)
                .and(function(data){
                  return optionsButtons.includes(data.tecnologia)
                })
                .and(function(data){
                  return optionsButtons.includes(data.operadora)
                })
                .each((obj)=>{
                  return conecelOBjSuggest.push(obj)
                }).then(()=>{
                  return db.cnt_.where("parroquia").startsWithIgnoreCase(infoSearch)
                        .and(function(data){
                          return optionsButtons.includes(data.tecnologia)
                        })
                        .and(function(data){
                          return optionsButtons.includes(data.operadora)
                        })
                    .each((obj)=>{
                      return cntOBjSuggest.push(obj)
                    }).then(()=>{
                      return otecelOBjSuggest.concat(conecelOBjSuggest,cntOBjSuggest)
                    })
                })
            })
      default:
          break;
    }})()
  }

  indexedDBFetchingFilter=async(optionsButtons,getObjectConvert)=>{
    
    otecelObjFilter=[];
    conecelObjFilter=[];
    cntObjFilter=[];
    var db = new Dexie('Rb');
    db.version(1).stores({
        conecel_: "++id,nom_sit,cell_id,dir,parroquia,tecnologia, operadora, [tecnologia+operadora]",
        otecel_: "++id,nom_sit,cell_id,dir,parroquia,tecnologia, operadora,[tecnologia+operadora]",
        cnt_: "++id,nom_sit,cell_id,dir,parroquia,tecnologia, operadora, [tecnologia+operadora]",
    });
    db.open();
    // return db.transaction('rw',db.otecel_,function(){
    //   console.log('entro...')
    return db.otecel_.where("tecnologia").anyOf(optionsButtons)
      .and(function(data){
        return optionsButtons.includes(data.operadora)
      })      
      .each(function(obj){
          otecelObjFilter.push(getObjectConvert(obj,"union"))
        })
        .then(()=>{
          return db.conecel_.where("tecnologia").anyOf(optionsButtons)
            .and(function(data){
              return optionsButtons.includes(data.operadora)
            })      
            .each(function(obj){
                conecelObjFilter.push(getObjectConvert(obj,"union"))
              })
              .then(()=>{
                return db.cnt_.where("tecnologia").anyOf(optionsButtons)
                  .and(function(data){
                    return optionsButtons.includes(data.operadora)
                  })      
                  .each(function(obj){
                      cntObjFilter.push(getObjectConvert(obj,"union"))
                    })
                    .then(()=>{
                      console.log('Extraccion de datos de filtro completada');
                        return ({
                          conecel:{features: conecelObjFilter},
                          otecel:{features: otecelObjFilter},
                          cnt:{features: cntObjFilter}
                      })
                    })
                    .catch(function (error) {
                      console.error(error.stack || error);
                    })  
              })
              .catch(function (error) {
                console.error(error.stack || error);
              })
        })
        .catch(function (error) {
          console.error(error.stack || error);
        })
    // })
    // console.log(otecelObjFilter,'Here')
  }
  
  indexedDBFetching=async(getObjectConvert)=>{
    
    var db = new Dexie('Rb');
    db.version(1).stores({
        conecel_: "++id,nom_sit,cell_id,dir,parroquia,tecnologia, operadora, [tecnologia+operadora]",
        otecel_: "++id,nom_sit,cell_id,dir,parroquia,tecnologia, operadora, [tecnologia+operadora]",
        cnt_: "++id,nom_sit,cell_id,dir,parroquia,tecnologia, operadora, [tecnologia+operadora]",
    });
    const API_URL=this.API_URL;
    db.on('ready', function () {
        return db.conecel_.count(function (count) {
            if (count > 0) {
                console.log("Datos Almacenados");
            } else {
                console.log("Database is empty. Iniciando peticion al servidor...");
                return new Promise(function (resolve, reject) {
                  // fetch('http://192.168.1.102:3000/mapa/data_radiobase', {
                  fetch(`${API_URL}/mapa/data_radiobase`, {
                    method: 'GET',
                    headers: {
                      'Content-Type': 'application/json'
                    }
                  }).then(response => response.json()).then(datosnuev => resolve(datosnuev.jsonData))
                  .catch(err=>reject(err))
                  }).then(function (data) {
                    console.log("No existe data, se realizara un Fetch");
                    return [
                      db.transaction('rw', db.conecel_, function () {
                        data.conecel.features.forEach(function (item) {
                          db.conecel_.add(getObjectConvert(item,"destruct"));
                        });
                      }),
                      db.transaction('rw', db.otecel_, function () {
                        data.otecel.features.forEach(function (item) {
                          db.otecel_.add(getObjectConvert(item,"destruct"));
                        });
                      }),
                      db.transaction('rw', db.cnt_, function () {
                        data.cnt.features.forEach(function (item) {
                          db.cnt_.add(getObjectConvert(item,"destruct"));
                        });
                      })
                    ]
                }).then(function () {
                    console.log ("Transaccion Completada");
                });
            }
        });
    });
  
    db.open();
  
    return db.conecel_.each(function (obj) {
        conecelObj.push(getObjectConvert(obj,"union"))
    }).then(function (feat) {
        return db.otecel_.each(function (obj) {
          otecelObj.push(getObjectConvert(obj))
        }).then(function (feat) {
            return db.cnt_.each(function (obj) {
              cntObj.push(getObjectConvert(obj))
            }).then(function (feat) {
              console.log('Extraccion de datos completada');
                return ({
                  conecel:{features: conecelObj},
                  otecel:{features: otecelObj},
                  cnt:{features: cntObj}
              })
            }).catch(function (error) {
                console.error(error.stack || error);
            });
        }).catch(function (error) {
            console.error(error.stack || error);
        });
    }).catch(function (error) {
        console.error(error.stack || error);
    });
  }
  getObjectConvert=(item,type='union')=>{
    if(type==="destruct"){
      return {
        geometry: item.geometry,
        canton: item.properties.canton,
        cell_id: item.properties.cell_id,
        cod_est: item.properties.cell_id,
        densidad: item.properties.densidad,
        dir: item.properties.dir,
        estado: item.properties.estado,
        geom: item.properties.geom,
        id_bs: item.properties.id_bs,
        lat: item.properties.lat,
        lat_dec: item.properties.lat_dec,
        long: item.properties.long,
        long_dec: item.properties.long_dec,
        nom_sit: item.properties.nom_sit,
        num: item.properties.num,
        operadora: item.properties.operadora,
        parroquia: item.properties.parroquia,
        provincia: item.properties.provincia,
        tecnologia: item.properties.tecnologia
      }
    }
    else{
      return {
        geometry: item.geometry,
        properties: {
          canton: item.canton,
          cell_id: item.cell_id,
          cod_est: item.cell_id,
          densidad: item.densidad,
          dir: item.dir,
          estado: item.estado,
          geom: item.geom,
          id_bs: item.id_bs,
          lat: item.lat,
          lat_dec: item.lat_dec,
          long: item.long,
          long_dec: item.long_dec,
          nom_sit: item.nom_sit,
          num: item.num,
          operadora: item.operadora,
          parroquia: item.parroquia,
          provincia: item.provincia,
          tecnologia: item.tecnologia
        },
        type:"Feature"
      }
    }
  }

  //Algorithm based on Levenshetein Distance
  // similarity=(s1, s2, editDistance)=> {
  //   var longer = s1;
  //   var shorter = s2;
  //   if (s1.length < s2.length) {
  //     longer = s2;
  //     shorter = s1;
  //   }
  //   var longerLength = longer.length;
  //   if (longerLength === 0) {
  //     return 1.0;
  //   }
  //   return (longerLength - editDistance(longer, shorter)) / parseFloat(longerLength);
  // }
  // editDistance=(s1, s2)=> {
  //   s1 = s1.toLowerCase();
  //   s2 = s2.toLowerCase();
  
  //   var costs = new Array();
  //   for (var i = 0; i <= s1.length; i++) {
  //     var lastValue = i;
  //     for (var j = 0; j <= s2.length; j++) {
  //       if (i === 0)
  //         costs[j] = j;
  //       else {
  //         if (j > 0) {
  //           var newValue = costs[j - 1];
  //           if (s1.charAt(i - 1) !== s2.charAt(j - 1))
  //             newValue = Math.min(Math.min(newValue, lastValue),
  //               costs[j]) + 1;
  //           costs[j - 1] = lastValue;
  //           lastValue = newValue;
  //         }
  //       }
  //     }
  //     if (i > 0)
  //       costs[s2.length] = lastValue;
  //   }
  //   return costs[s2.length];
  // }

}

export default DataStorage;