import BookingRow from "./BookingRow";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
import Empty from "../../ui/Empty";
import Spinner from "../../ui/Spinner";
import { useBooking } from "./useBookings";

function BookingTable() {
  const { bookings=[], isLoading, count } = useBooking();

  if (isLoading) return <Spinner />;

  if (!bookings.length) return <Empty resourceName="bookings" />;

  return (
    <Menus>
      <Table columns="0.6fr 2fr 2.4fr 1.4fr 1fr 3.2rem">
        <Table.Header>
          <div>Cabine</div>
          <div>Hóspedes</div>
          <div>Datas</div>
          <div>Status</div>
          <div>Valor</div>
          <div></div>
        </Table.Header>
        
        <Table.Body
          data={bookings}
          render={(booking) => (
            <BookingRow key={booking.id} booking={booking} />
          )}
        />
        
      </Table>
    </Menus>
  );
}

export default BookingTable;
