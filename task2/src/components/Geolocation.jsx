import React from "react";

export default function Geolocation({ users }) {
  function distance(lat1, lon1, lat2, lon2) {
    const R = 6371;

    const phi1 = (lat1 * Math.PI) / 180;
    const phi2 = (lat2 * Math.PI) / 180;
    const delta_phi = ((lat2 - lat1) * Math.PI) / 180;
    const delta_lambda = ((lon2 - lon1) * Math.PI) / 180;

    const a =
      Math.sin(delta_phi / 2) ** 2 +
      Math.cos(phi1) * Math.cos(phi2) * Math.sin(delta_lambda / 2) ** 2;

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    const d = R * c;

    return d;
  }

  let furthestUsers = { user1: null, user2: null, distance: 0 };

  for (let i = 0; i < users.length; i++) {
    for (let j = i + 1; j < users.length; j++) {
      const dist = distance(
        users[i].address.geolocation.lat,
        users[i].address.geolocation.long,
        users[j].address.geolocation.lat,
        users[j].address.geolocation.long
      );
      if (dist > furthestUsers.distance) {
        furthestUsers = { user1: users[i], user2: users[j], distance: dist };
      }
    }
  }

  return (
    <div>
      <h1>Users furthest away from each other:</h1>
      <p>
        User 1: {furthestUsers.user1.name.firstname}{" "}
        {furthestUsers.user1.name.lastname}
      </p>
      <p>
        User 2: {furthestUsers.user2.name.firstname}{" "}
        {furthestUsers.user2.name.lastname}
      </p>
      <p>Distance: {furthestUsers.distance} km</p>
    </div>
  );
}
