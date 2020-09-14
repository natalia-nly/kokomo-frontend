import axios from "axios";

class BookingService {
  constructor() {
    let service = axios.create({
      baseURL: process.env.REACT_APP_API_URL + "/booking",
      withCredentials: true,
    });
    this.service = service;
  }

  createBooking = (scheduleId, body) => {
    return this.service
      .post("/create-booking/" + scheduleId, body)
      .then((response) => response.data);
  };

  myBookings = () => {
    return this.service.get("/my-bookings").then((response) => response.data);
  };

  propertiesBookings = () => {
    return this.service
      .get("/my-properties-bookings")
      .then((response) => response.data);
  };

  bookingDetails = (bookingId) => {
    return this.service
      .get("/details/" + bookingId)
      .then((response) => response.data);
  };

  deleteBooking = (bookingId) => {
    return this.service
      .post("/delete/" + bookingId)
      .then((response) => response.data);
  };
}
export default BookingService;
