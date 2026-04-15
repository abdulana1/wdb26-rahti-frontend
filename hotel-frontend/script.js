//const apiUrl = "https://wdb26-exempel-deployment-testing.2.rahtiapp.fi/api/ip";
const apiUrl = "http://127.0.0.1:8080";

async function getBookings() {
    const res = await fetch(`${apiUrl}/bookings`);
    const bookings = await res.json();

    document.getElementById("bookings-list").innerHTML = "";

    for (const b of bookings) {
        document.getElementById("bookings-list").innerHTML += `
            <li>${b.firstname} ${b.lastname} – rum ${b.room_number} – ${b.datefrom} → ${b.dateto}</li>
        `;
    }
}
getBookings();

getRooms();

async function getGuests() {
    const res = await fetch(`${apiUrl}/guests`);
    const guests = await res.json();

    for (const g of guests) {
        document.getElementById("guest-list").innerHTML += `
            <option value="${g.id}">
                ${g.firstname} ${g.lastname} (${g.total_visits} besök)
            </option>
        `;
    }
}
getGuests();



async function getRooms() {
    const res = await fetch(`${apiUrl}/rooms`);
    const rooms = await res.json();

    console.log(rooms)

    for (room of rooms) {
        document.getElementById("room-list").innerHTML += `
            <option value="${room.id}">
                ${room.room_number} - 
                ${room.room_type} - 
                ${room.price} €
            </option>
        `;
    }
    
}

async function saveBooking() {

    const booking = {
        room_id: document.getElementById("room-list").value,
        guest_id: document.getElementById("guest-list").value,
        datefrom: document.getElementById("datefrom").value,
        dateto: document.getElementById("dateto").value
    }
    const res = await fetch(`${apiUrl}/bookings`, { 
        method: 'POST',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify(booking)
    });
    const data = await res.json();

    console.log(data);
}

document.getElementById('btn-save').addEventListener('click', saveBooking);