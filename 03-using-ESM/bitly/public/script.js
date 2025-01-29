const longUrlAnchor = document.getElementById("long-url");
const shortUrlAnchor = document.getElementById("short-url");
const domain = window.location.origin

longUrl = longUrlAnchor.attributes.href.value;
shortUrl = shortUrlAnchor.attributes.href.value;

longUrlAnchor.innerHTML = longUrl;
shortUrlAnchor.innerHTML = domain + shortUrl;