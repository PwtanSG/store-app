import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps"

const StoreMap = withScriptjs(withGoogleMap((props) =>
  <GoogleMap
    defaultZoom={16}
    defaultCenter={{ lat: 1.3098, lng: 103.7775 }}
  >
    {props.isMarkerShown && <Marker position={{ lat: 1.3098, lng: 103.7775 }} />}
  </GoogleMap>
))

export default StoreMap;