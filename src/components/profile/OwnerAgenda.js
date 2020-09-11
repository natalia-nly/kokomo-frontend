import React, { useState, useEffect } from "react";
import { ReactAgenda, ReactAgendaCtrl, guid, Modal } from "react-agenda";
import * as moment from "moment";

require("moment/locale/fr.js");

var colors = {
  "color-1": "rgba(102, 195, 131 , 1)",
  "color-2": "rgba(242, 177, 52, 1)",
  "color-3": "rgba(235, 85, 59, 1)",
};

var now = new Date();



const OwnerAgenda = (props) => {
    const items = [];
 
  props.properties.map((property) =>
    property.bookings.map((booking) => {
      console.log(booking);
      var a = booking.time.split(":");
      console.log("booking split" , a);
      var minutes = +a[0] * 60 + +a[1];
      var date = new Date(booking.day);
      var unidad = {
        _id: guid(),
        name: booking.customer.username,
        startDateTime: new Date(date.getTime() + minutes * 60000),
        endDateTime: new Date(date.getTime() + (minutes + 30) * 60000),
        classes: "color-2",
      };
      items.push(unidad);
    })
  );

//   var d = new Date(2020, 08, 16, 10, 30, 0);
  //Mon Dec 24 2018 10:33:30
  // 16/09/2020
  // 16:30



//   classes: "color-2"
// duration: Duration {_isValid: true, _milliseconds: 1800000, _days: 0, _months: 0, _data: {…}, …}
// endDateTime: Wed Sep 09 2020 10:30:00 GMT+0200 (Central European Summer Time) {}
// name: "Claudi Sanchez"
// startDateTime: Wed Sep 09 2020 10:00:00 GMT+0200 (Central European Summer Time) {}
// _id: "c9fafb3d-5977-9d87-50b0-6ec5449b5f77"

//   0:
// classes: "color-1"
// duration: Duration {_isValid: true, _milliseconds: 7200000, _days: 0, _months: 0, _data: {…}, …}
// endDateTime: Thu Sep 10 2020 12:00:00 GMT+0200 (Central European Summer Time)
// __proto__: Object
// name: "Working lunch , Holly"
// startDateTime: Thu Sep 10 2020 10:00:00 GMT+0200 (Central European Summer Time)
// __proto__: Object
// _id: "31f8a21a-78bb-e674-6bda-ef042cb2b746"
// __proto__: Object
// 1: {_id: "f88be1dd-315c-fde8-8f39-36f6d3c16437", name: "Working lunch , Holly", startDateTime: Fri Sep 11 2020 11:00:00 GMT+0200 (Central European Summer Time), endDateTime: Fri Sep 11 2020 13:00:00 GMT+0200 (Central European Summer Time), classes: "color-2 color-3", …}
// length: 2

//   var items = [
//     {
//      _id            :guid(),
//       name          : 'Working lunch , Holly',
//       startDateTime : new Date(now.getFullYear(), now.getMonth(), now.getDate(), 10, 0),
//       endDateTime   : new Date(now.getFullYear(), now.getMonth(), now.getDate(), 12, 0),
//       classes       : 'color-1'
//     },
//     {
//      _id            :guid(),
//       name          : 'Working lunch , Holly',
//       startDateTime : new Date(now.getFullYear(), now.getMonth(), now.getDate()+1, 11, 0),
//       endDateTime   : new Date(now.getFullYear(), now.getMonth(), now.getDate()+1, 13, 0),
//       classes       : 'color-2 color-3'
//     },
   
//   ];

  const handleCellSelection= (item)=>{
    console.log('handleCellSelection',item)
  }
  const handleItemEdit=(item)=>{
    console.log('handleItemEdit', item)
  }
  const handleRangeSelection= (item)=>{
    console.log('handleRangeSelection', item)
  }
  

  
  console.log("ITEMS: ", items);
  return (
    <div>
      <ReactAgenda
        minDate={now}
        maxDate={new Date(now.getFullYear(), now.getMonth() + 3)}
        disablePrevButton={false}
        startDate={ new Date()}
        cellHeight={20}
        locale={'fr'}
        items={items}
        numberOfDays={7}
        rowsPerHour={2}
        itemColors={colors}
        autoScale={false}
        fixedHeader={true}
        onItemEdit={handleItemEdit}
          onCellSelect={handleCellSelection}
          onRangeSelection={handleRangeSelection}
      />
    </div>
  );
};

export default OwnerAgenda;


