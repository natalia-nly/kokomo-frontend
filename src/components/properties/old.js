<div
                className="home-bg image-background"
                style={{
                "background-image": `url(${state.property.mainImage})`
            }}>
                <div className="container-left"></div>

                <div className="white-card">
                    <div className="title-heart">
                        <div>
                            <span className="fa-stack fa-2x mr-4">
                                <i className="fas fa-circle fa-stack-2x orange"></i>
                                <i className="far fa-heart fa-stack-1x fa-inverse"></i>
                            </span>
                        </div>
                        <div>
                            <h2 className="title-search">{state.property.name}</h2>

                        </div>
                    </div>
                    <nav>
                        <div className="nav nav-tabs nav-fill" id="nav-tab" role="tablist">
                            <a
                                className="nav-item nav-link "
                                id="nav-description-tab"
                                data-toggle="tab"
                                href="#nav-description"
                                role="tab"
                                aria-controls="nav-description"
                                aria-selected="false">Descripción</a>
                            <a
                                className="nav-item nav-link"
                                id="nav-comments-tab"
                                data-toggle="tab"
                                href="#nav-comments"
                                role="tab"
                                aria-controls="nav-comments"
                                aria-selected="false">Comentarios</a>
                            <a
                                className="nav-item nav-link"
                                id="nav-openings-tab"
                                data-toggle="tab"
                                href="#nav-openings"
                                role="tab"
                                aria-controls="nav-openings"
                                aria-selected="false">Horarios</a>
                            <a
                                className="nav-item nav-link active"
                                id="nav-reservations-tab"
                                data-toggle="tab"
                                href="#nav-reservations"
                                role="tab"
                                aria-controls="nav-reservations"
                                aria-selected="true">Reservas</a>
                        </div>
                    </nav>
                    <div className="tab-content" id="nav-tabContent">
                        <div
                            className="tab-pane fade"
                            id="nav-description"
                            role="tabpanel"
                            aria-labelledby="nav-description-tab">
                            <h3 className="subtitle-search mb-4">{state.property.description}</h3>
                            <p>
                                <i className="fas fa-map-marker-alt"></i>
                                {state.property.location.name}
                            </p>
                            <p>Duración de la reserva: {state.property.bookingDuration}</p>
                            <p>Plazas disponibles: {state.property.availablePlaces}</p>
                        </div>
                        <div
                            className="tab-pane fade"
                            id="nav-comments"
                            role="tabpanel"
                            aria-labelledby="nav-comments-tab">...</div>
                        <div
                            className="tab-pane fade"
                            id="nav-openings"
                            role="tabpanel"
                            aria-labelledby="nav-openings-tab">
                            <h3 className="subtitle-search mb-4">Días de apertura</h3>

                            <p>Día de apertura:
                                <span id="openingDay1">{state.property.openingDays[0].openingDay}</span>
                            </p>

                            <p>Día de cierre:
                                <span id="closingDay1">{state.property.openingDays[0].closingDay}</span>
                            </p>

                            <p>Días de la semana: {state.property.weekDays}</p>

                            <p>Hora de apertura: {state.property.openingHours[0].openingTime}</p>
                            <p>Hora de cierre: {state.property.openingHours[0].closingTime}</p>

                        </div>
                        <div
                            className="tab-pane fade show active"
                            id="nav-reservations"
                            role="tabpanel"
                            aria-labelledby="nav-reservations-tab">
                            <h3 className="subtitle-search mb-4">Reservas activas: {state.property.bookings.length}</h3>

                            <p>Código de la reserva: {state.property.bookingRef}</p>

                        </div>
                    </div>

                    <form action="/local/{{property._id}}" method="POST" className="mt-4">
                        <div className="display-form mb-3">
                            <div>
                                <input
                                    type="date"
                                    name="bookingDate"
                                    data-date-format="DD MMMM YYYY"
                                    id=""
                                    className="kokomo-input"/>
                            </div>
                            <div>
                                <input
                                    type="number"
                                    name="numberGuests"
                                    id=""
                                    min="0"
                                    className="kokomo-input"
                                    placeholder="Personas"/>
                            </div>
                        </div>
                        <input type="submit" value="Ver disponibilidad" className="kokomo-btn-form"/>
                    </form>

                    <div className="mt-4 border-top">
                        <p>Necesitas una cuenta para poder hacer reservas.</p>
                        <a href="/signup" className="btn btn-success mt-3">Regístrate ahora</a>
                    </div>

                </div>
            </div>

            //from navbar search
            <Link to="/search" className="mdi mdi-magnify"></Link>

            //results search
            <div className="body-container">
            <h3 className="mt-4 mb-4 section-title">Resultados de tu búsqueda</h3>
            <div className="properties-group-2">
            {state.listOfPlaces.map(result =>{
            return(
                <div className="one-property">
                        <a href="/property/propertyId">
                            <div className="property-card">
                            <span className="fa-stack fa-2x float-right heart-home">
                                <i className="fas fa-circle fa-stack-2x orange-80"></i>
                                <i className="fas fa-heart fa-stack-1x fa-inverse"></i>
                            </span>
                            <div>
                                <img src="{result.mainImage}" style="z-index: 1;"/>
                                <img src="{result.mainImage}" className="blur-image"/>
                            </div>
                            </div>
                        </a>
                        <div className="search-pc">
                            <h3>{result.name}</h3>
                            <p className="mdi mdi-map-marker-radius"> {result.location.name}</p>
                                <div className="row mt-3 ml-2 mb-4">
                                {schedules(result)}
                                </div>
                        </div>
                    </div>
            )}
                    
                )
}
            </div>
        </div>






function schedules(result) {
    return (
        <div>
            {/* {result.timeboxes.map(timebox =>{
                <form onSubmit={handleSubmit}>
          <input type="hidden" name="propertyId" value=""/>
          <input type="hidden" name="day" value=""/>
          <input type="hidden" name="guests" value=""/>
          <input type="submit" class="kokomo-hours" value=""/>
        </form>
            })}*/}
            <h1>schedules</h1>
        </div>
    )
}

const handleSubmit = (event) => {
    {/*event.preventDefault();
axios
  .get("http://localhost:5000/api/search/maps?search=" + state.search)
  .then((response) => {
    console.log(response);
    setState({
      ...state,
      oneResult: response.data.candidates[0].name,
      lat: response.data.candidates[0].geometry.location.lat,
      lng: response.data.candidates[0].geometry.location.lng,
    });
  });*/
    };
   


    0:
guests: "2"
property:
availablePlaces: 20
bookingDuration: 30
bookings: []
categories: ["Restaurante"]
comments: []
createdAt: "2020-09-03T11:16:19.083Z"
description: "Paelles variades i racions de marisc en un restaurant mariner amb terrassa i sostre modern pintat de blau."
location: {name: "Barcelona", lat: 41.393542, long: 2.203153}
media: ["https://uh.gsstatic.es/sfAttachPlugin/744809.jpg"]
name: "Xiringuito Escribà"
openingHours: [{…}]
updatedAt: "2020-09-03T11:16:19.083Z"
__v: 0
_id: "5f50d083340539513cde1711"
__proto__: Object
timeboxes: (22) [{…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}]
__proto__:
constructor: ƒ Object()
hasOwnProperty: ƒ hasOwnProperty()
isPrototypeOf: ƒ isPrototypeOf()
propertyIsEnumerable: ƒ propertyIsEnumerable()
toLocaleString: ƒ toLocaleString()
toString: ƒ toString()
valueOf: ƒ valueOf()
__defineGetter__: ƒ __defineGetter__()
__defineSetter__: ƒ __defineSetter__()
__lookupGetter__: ƒ __lookupGetter__()
__lookupSetter__: ƒ __lookupSetter__()
get __proto__: ƒ __proto__()
set __proto__: ƒ __proto__()
1: {property: null, timeboxes: Array(26), guests: "2"}
2: {property: {…}, timeboxes: Array(26), guests: "2"}
length: 3
__proto__: Array(0)

{
    property: {
      location: [Object],
      categories: [],
      media: [],
      bookings: [],
      _id: 5f525c17279482567e8585f5,
      name: 'El Capo',
      description: 'El Capo es uno de los chiringuitos más carismáticos de todo el Baix Llobregat. Un espacio elegante, a pie de playa, donde disfrutar de la paz y el relax.',
      mainImage: '',
      openingHours: [Array],
      bookingDuration: 30,
      availablePlaces: 40,
      comments: [],
      createdAt: 2020-09-04T15:24:07.803Z,
      updatedAt: 2020-09-04T15:24:07.803Z,
      __v: 0
    },
    timeboxes: [
      [Object], [Object], [Object],
      [Object], [Object], [Object],
      [Object], [Object], [Object],
      [Object], [Object], [Object],
      [Object], [Object], [Object],
      [Object], [Object], [Object],
      [Object], [Object], [Object],
      [Object], [Object], [Object],
      [Object], [Object]
    ],
    guests: '3'
  }


                                          {/* <input
                                            type="hidden"
                                            name="propeprtyId"
                                            value={result.property._id}
                                            ref={(input) => {
                                            propertyInput = input
                                        }}/> */}

                                        //booking controlesrs--->booking create schedule filter:
                                        ([{
                                            timeBoxes
                                          }]