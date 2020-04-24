var arrayCows = []; //Access from any place
let arrayMarkers = [];

const createCowMarkerFactory = (cellCow) => {

  let towerIcon = L.icon({
    iconUrl: "images/tower_x.png",
    iconSize: [45, 60], // size of the icon
    iconAnchor: [22, 58], // point of the icon which will correspond to marker's location
    popupAnchor: [-3, -76] // point from which the popup should open relative to the iconAnchor
  });

  let point = [cellCow.lat, cellCow.lng];
  let cowMarker = L.marker(point, {
    title: "COW",
    alt: "COW TO DEPLOY",
    draggable: true,
    icon: towerIcon
  });

  const infoCow = (cellCow) => {
    let html = `
    <div class="row" >
      <div class="col s12">
        <div class="card">
          <div class="card-content">
            <span class="card-title"><b>COW Info</b></span>

            <div >
              <input
                id="_id"
                disabled
                onchange="onChangeInfo()"
                type="number"
                class="validate"
                value="${cellCow.id}"
              />
              <label for="_id">Id</label>
            </div>            

            <div >
              <input
                id="lat"
                onchange="onChangeInfo()"
                type="number"
                class="validate"
                value="${cellCow.lat}"
              />
              <label for="lat">Latitude</label>
            </div>
    
            <div>
              <input
                id="lng"
                onchange="onChangeInfo()"
                type="number"
                class="validate"
                value="${cellCow.lng}"
              />
              <label for="lng">Longitude</label>
            </div>
          
            <div>
              <input
              id="txh"
              onchange="onChangeInfo()"
              type="number"
              class="validate"
              value="${cellCow.txh}"
              />
              <label for="txh">TX Height (m)</label>
            </div>
            
            <div>
              <input 
              id="pwr" 
              onchange="onChangeInfo()" 
              type="number" 
              class="validate" 
              value="${cellCow.pwr}" 
              />
              <label for="erp">Max Power (dBm)</label>
            </div>
          </div>
          
          <div class="card-action">
            <button
              id="predictBtn"
              class="waves-effect blue lighten-2 btn"
              onclick="run()"
              type="button"
              >
              <span>Prediction</span>
            </button>
    
            <!-- <button
              id="addBtn"
              class="waves-effect blue lighten-2 btn-small"
              onclick="add()"
              type="button"
              >
              <span>Update</span>
            </button>-->
          
          </div>
        </div>
      </div>
    </div>
    `;
  
    return html;
  }

  cowMarker.bindPopup(infoCow(cellCow));
  cowMarker._id = cellCow.id


  //On Market Dragend
  cowMarker.on("dragend", () => {
    const id = cowMarker._id;
    console.log(id)
    console.log(cowMarker.getLatLng());
    let point = cowMarker.getLatLng();

    arrayCows[id].lat = parseFloat(point.lat.toFixed(6));
    arrayCows[id].lng = parseFloat(point.lng.toFixed(6));
    
    let cellCow = arrayCows[id];
    
    cowMarker.bindPopup(
      infoCow(cellCow)
    );
    //console.log(arrayCows);
  });

  //On Market click
  cowMarker.on("click", () => {
    const id = cowMarker._id;
    console.log(id)
    let cellCow = arrayCows[id];
    cowMarker.bindPopup(
      infoCow(cellCow)
    );
    cowMarker.setLatLng([cellCow.lat,cellCow.lng]);
    //console.log(arrayCows);
  });

  cowMarker.on("popupclose", () =>{
    const id = cowMarker._id;
    let cellCow = arrayCows[id];
    cowMarker.setLatLng([cellCow.lat,cellCow.lng]);
  })


  return{
    marker: cowMarker,
  }

}

function addCow(point) {
  
  let id = arrayCows.length

  let newCow = {
    lat:parseFloat(point.lat.toFixed(6)), 
    lng:parseFloat(point.lng.toFixed(6)),
    txh:4.371,
    pwr:31,
    id:id
  } 
  
  //Add to array
  arrayCows.push(newCow)
  arrayMarkers.push(createCowMarkerFactory(newCow).marker);
  
  map.setView(point, 15);
  //console.log(arrayCows)
  L.layerGroup(arrayMarkers).addTo(map)

}

let onChangeInfo = () => {
  let id = ($("#_id").val())
  arrayCows[id].lat= parseFloat($("#lat").val()); 
  arrayCows[id].lng= parseFloat($("#lng").val()); 
  arrayCows[id].txh= parseFloat($("#txh").val()); 
  arrayCows[id].pwr= parseFloat($("#pwr").val()); 
  //console.log(arrayCows)
}


//***Add FirstPoint */
let firstCow = {
  lat:39.618783, 
  lng:-107.012868,
  txh:4.371,
  pwr:31,
  id:0
} 

arrayCows.push(firstCow)
arrayMarkers.push(createCowMarkerFactory(firstCow, arrayCows).marker);

L.layerGroup(arrayMarkers).addTo(map)


