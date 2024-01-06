import Heading from "../ui/Heading";
import Row from "../ui/Row";
import BookingTable from "../features/bookings/BookingTable";

function Bookings() {
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">Todas as reservas</Heading>
        <p>TEST</p>
      </Row>
      
      <BookingTable />
    </>
  );
}

export default Bookings;
