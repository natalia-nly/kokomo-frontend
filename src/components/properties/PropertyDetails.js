import React, { useState, useEffect } from "react";
import axios from "axios";

const PropertyDetails = (props) => {
    const initialState = {
        property: '',
        favourites: props.getTheUser
    };

    const [state,
        setState] = useState(initialState);

    useEffect(() => {
        console.log(props)
        axios
            .get("http://localhost:5000/api/property/"+ props.match.params.propertyId)
            .then((response) => {
                console.log("CONSOLE LOG DESDE AXIOS GET", response);
                setState({
                    ...state,
                    property: response.data
                });
            });
    },[1]);

    return (
        <div>
        <h1>{state.property.name}</h1>
        </div>
    )
    }
    
    export default PropertyDetails;
