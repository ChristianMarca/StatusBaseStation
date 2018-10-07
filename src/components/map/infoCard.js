import React from 'react'
import './map.css'
import 'tachyons';



const ListComponent = ({title,content})=> {


      // const {title , information}=props;
      return(
        <div className="dt w-100 pa2 mt1 special-border bg-white-80" href="#0">
          <div className="dtc w-60 v-mid pl3">
            <h2 className="contentListItem fw4 mt0 mb0 black">{content}</h2>
          </div>
          <div className="dtc w-20 v-mid tr">
            {/* <h3 class="f5 ma0"></h3> */}

              {/* <img src="https://png.icons8.com/metro/1600/source-code.png" height="25" width="25" href='https://github.com/ChristianMarca'></img> */}
              <h1 className="contentListHead f5-ns fw6 lh-title black-60 mv0">{title}</h1>
          </div>
        </div>
      )

}

export default ListComponent;
