// SELECTORS
const submitBtn = document.querySelector('#submitBtn');
const inputField = document.querySelector('#input-field');
const ipAdressText = document.querySelector('#ip-adress');
const locationText = document.querySelector('#location');
const timezoneText = document.querySelector('#timezone');
const ispText = document.querySelector('#isp');

// IP Geolocation API using JQuery SDK
const geoLocation = async (ip = '') => {
  const data = fetch(
    `https://geo.ipify.org/api/v2/country,city?apiKey=at_efomf36n0o4l9vO9YBTI80SSmAIKa&ipAddress=${ip} `
  )
    .then((response) => response.json())
    .then((data) => data);
  return data;
};

// FUNCTIONS
const populateContainer = (ip = '') => {
  geoLocation(ip).then((data) => {
    ipAdressText.textContent = data.ip;
    locationText.textContent = `${data.location.region}, ${data.location.city} ${data.location.postalCode}`;
    timezoneText.textContent = `UTC ${data.location.timezone}`;
    ispText.textContent = data.isp;

    let newLatLng = new L.LatLng(data.location.lat, data.location.lng);
    map.setView(newLatLng);
    marker.setLatLng(newLatLng);
  });
};

// put initial values in data-container
populateContainer();

// MAP
const mapOptions = {
  zoomControl: false,
};
const map = L.map('map', mapOptions).setView([51.505, -0.09], 13);
const marker = L.marker([51.5, -0.09]).addTo(map);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 19,
  attribution:
    '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
}).addTo(map);

// EVENT LISTENERS
submitBtn.addEventListener('click', () => {
  populateContainer(inputField.value);
});
