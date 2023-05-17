"use strict";
function calculateIPRange(ipParts, mask) {
  const maskBits = parseInt(mask, 10);
  const ipDecimal =
    (ipParts[0] << 24) | (ipParts[1] << 16) | (ipParts[2] << 8) | ipParts[3];
  const maskDecimal = (0xffffffff << (32 - maskBits)) >>> 0;
  const networkDecimal = ipDecimal & maskDecimal;
  const startIPDecimal = networkDecimal >>> 0;
  const endIPDecimal = (networkDecimal | ~maskDecimal) >>> 0;

  const startIP = [
    (startIPDecimal >>> 24) & 0xff,
    (startIPDecimal >>> 16) & 0xff,
    (startIPDecimal >>> 8) & 0xff,
    startIPDecimal & 0xff,
  ].join(".");

  const endIP = [
    (endIPDecimal >>> 24) & 0xff,
    (endIPDecimal >>> 16) & 0xff,
    (endIPDecimal >>> 8) & 0xff,
    endIPDecimal & 0xff,
  ].join(".");

  return `${startIP} - ${endIP}`;
}

function getNetworkClass(firstOctet) {
  if (isNaN(firstOctet) || firstOctet < 1 || firstOctet > 255)
    return "Invalid IP address";

  return firstOctet <= 126
    ? "A"
    : firstOctet <= 191
    ? "B"
    : firstOctet <= 223
    ? "C"
    : firstOctet <= 239
    ? "D"
    : "E";
}

function calculate() {
  const cidr = document.getElementById("cidr").value;
  const ip = [
    document.getElementById("ip_1").value,
    document.getElementById("ip_2").value,
    document.getElementById("ip_3").value,
    document.getElementById("ip_4").value,
  ];

  // check input
  const invalidIP = ip.some((el) => el < 0 || el > 255);
  const invalidCIDR = cidr < 0 || cidr > 32;
  if (invalidIP || invalidCIDR) {
    document.getElementById("v-range").innerHTML = "Invalid Value";
    document.getElementById("v-class").innerHTML = "Invalid Value";
    document.getElementById("v-count").innerHTML = "Invalid Value";
    return;
  }

  console.log(cidr);
  document.getElementById("v-range").innerHTML = calculateIPRange(ip, cidr);
  document.getElementById("v-class").innerHTML = getNetworkClass(ip[0]);
  document.getElementById("v-count").innerHTML = Math.pow(
    2,
    32 - cidr
  ).toLocaleString();
}
