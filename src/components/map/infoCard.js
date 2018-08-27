import React from 'react'
import './map.css'
import 'tachyons';



const ListComponent = ({title,content})=> {

     
      // const {title , information}=props;
      return(
        <div class="dt w-100 pa2 mt1 special-border bg-white-80" href="#0">
          <div class="dtc w-60 v-mid pl3">
            {/* <h1 class="f7 f5-ns fw6 lh-title black mv0">{title}</h1> */}
            <h2 class="contentListItem fw4 mt0 mb0 black">{content}</h2>
          </div>
          <div class="dtc w-20 v-mid tr">
            {/* <h3 class="f5 ma0"></h3> */}

              {/* <img src="https://png.icons8.com/metro/1600/source-code.png" height="25" width="25" href='https://github.com/ChristianMarca'></img> */}
              <h1 class="contentListHead f5-ns fw6 lh-title black-60 mv0">{title}</h1>
          </div>
        </div>
      )
    
}

export default ListComponent;
