import { MapContainer, TileLayer, CircleMarker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

export default function LocationMap() {
  return (
    <div
      style={{
        width: "100%",
        height: "500px",
        background: "#0f172a",
        marginBottom: "24px",
        borderRadius: "12px",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          padding: "20px",
          color: "white",
          fontSize: "20px",
          fontWeight: "bold",
        }}
      >
        📍 FRAUD LOCATION MAP
      </div>

      <div style={{ width: "100%", height: "420px" }}>
        <MapContainer
          center={[20.5937, 78.9629]}
          zoom={5}
          style={{
            width: "100%",
            height: "100%",
          }}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution="&copy; OpenStreetMap contributors"
          />

          <CircleMarker
            center={[28.6139, 77.209]}
            radius={15}
            pathOptions={{
              color: "red",
              fillColor: "red",
              fillOpacity: 0.8,
            }}
          >
            <Popup>
              <b>Delhi</b>
              <br />
              Risk: HIGH
            </Popup>
          </CircleMarker>

          <CircleMarker
            center={[19.076, 72.8777]}
            radius={15}
            pathOptions={{
              color: "red",
              fillColor: "red",
              fillOpacity: 0.8,
            }}
          >
            <Popup>
              <b>Mumbai</b>
              <br />
              Risk: CRITICAL
            </Popup>
          </CircleMarker>

          <CircleMarker
            center={[17.385, 78.4867]}
            radius={15}
            pathOptions={{
              color: "orange",
              fillColor: "orange",
              fillOpacity: 0.8,
            }}
          >
            <Popup>
              <b>Hyderabad</b>
              <br />
              Risk: MEDIUM
            </Popup>
          </CircleMarker>

          <CircleMarker
            center={[12.9716, 77.5946]}
            radius={15}
            pathOptions={{
              color: "green",
              fillColor: "green",
              fillOpacity: 0.8,
            }}
          >
            <Popup>
              <b>Bengaluru</b>
              <br />
              Risk: LOW
            </Popup>
          </CircleMarker>

          <CircleMarker
            center={[13.0827, 80.2707]}
            radius={15}
            pathOptions={{
              color: "orange",
              fillColor: "orange",
              fillOpacity: 0.8,
            }}
          >
            <Popup>
              <b>Chennai</b>
              <br />
              Risk: HIGH
            </Popup>
          </CircleMarker>
        </MapContainer>
      </div>
    </div>
  );
}