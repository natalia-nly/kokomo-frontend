import React, {useState, useEffect} from "react";
import axios from "axios";
import Booking from "./Booking";
import OwnerLocal from "./OwnerLocal"
import Messages from "./Messages";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
var reservas = <p>Todavía no tienes reservas</p>
var reservasProperties = <p>Todavía no tienes reservas</p>
var active="client"

const initialState = {
    bookings: [],
    properties: []
};

const MyBookings = (props) => {
    const [state,
        setState] = useState(initialState);

    useEffect(() => {
        const CancelToken = axios.CancelToken;
        const source = CancelToken.source();
        if(props.loggedInUser.owner){
          active="owner"
        }
        const loadData = () => {
            try {
                axios
                    .get(process.env.REACT_APP_API_URL + "/booking/my-bookings", {withCredentials: true})
                    .then((response) => {
                        console.log("CONSOLE LOG DESDE AXIOS GET", response.data.bookings);
                        setState({
                            ...state,
                            bookings: response.data.bookings
                        });
                    });
            } catch (error) {
                if (axios.isCancel(error)) {
                    console.log("cancelled");
                } else {
                    throw error;
                }
            }
        };
        loadData();
        return () => {
            source.cancel();
        };
    }, []);

    useEffect(() => {
      axios
          .get(process.env.REACT_APP_API_URL + "/booking/my-properties-bookings", {withCredentials: true})
          .then((response) => {
              console.log("CONSOLE LOG DESDE AXIOS GET bookings en mis props:", response.data.ownProperties);
              setState({
                  ...state,
                  properties: response.data.ownProperties
              });
          });
  }, []);

    const refreshPage = () => {
        window
            .location
            .reload(false);
    };

    const deleteBooking = (booking) => {
        console.log(booking)
        axios.post(process.env.REACT_APP_API_URL + "/booking/delete/" + booking, {}, {withCredentials: true}).then((response) => {
            console.log(response.data);
            refreshPage();
        });
    };

    if (state.bookings.length) {
        console.log(state.bookings);
        reservas = state
            .bookings
            .map((booking, index) => (<Booking key={index} booking={booking} delete={deleteBooking}/>));
    }

    console.log(props)

    if (props.loggedInUser.owner){
      var ownerTab =<></>
      if (state.properties.length) {
        console.log(state.properties);
        reservasProperties = state.properties.map((property, index) => (
          <OwnerLocal key={index} property={property} user={props.loggedInUser} delete={deleteBooking} />
            ))
          ownerTab=( <Tab eventKey="owner" title="Reservas en tus Locales" className="nav-item nav-link">
          <div >
              <div
                  className="tab-pane fade show active"
                  id="nav-next-bookings"
                  role="tabpanel"
                  aria-labelledby="nav-next-bookings-tab">
                  <div className="group-booking">{reservasProperties}</div>
              </div>
          </div>
      </Tab>)
        
          
          }
     

    }

  console.log(active)

    return (

            <div className="body-container">
                <h3 className="section-title mt-4 mdi mdi-calendar">Gestión de reservas</h3>
                <Tabs  defaultActiveKey={active}
            id="nav-tab"
            className="nav nav-tabs">
            {ownerTab}
                    <Tab eventKey="client" title="Tus reservas" className="nav-item nav-link">
                        <div >
                            <div
                                className="tab-pane fade show active"
                                id="nav-next-bookings"
                                role="tabpanel"
                                aria-labelledby="nav-next-bookings-tab">
                                <div className="group-booking">{reservas}</div>
                            </div>
                        </div>
                    </Tab>
                    <Tab eventKey="messages" title="Tus mensajes" className="nav-item nav-link">
                        <Messages/>
                    </Tab>
                </Tabs>
            </div>

    );
};

export default MyBookings;
