import {
  Landmark, Train, GraduationCap, Stethoscope, ShoppingBag, Trees, Bus,
} from "lucide-react";

export const SF = "-apple-system, BlinkMacSystemFont, 'SF Pro Display', 'SF Pro Text', 'Segoe UI', Roboto, Helvetica, Arial, sans-serif";
export const GRADIENT = "linear-gradient(135deg, #2563eb 0%, #db2777 100%)";

export const AMENITY_STYLE = {
  metro: { icon: Train, bg: "bg-blue-50", text: "text-blue-600" },
  school: { icon: GraduationCap, bg: "bg-amber-50", text: "text-amber-600" },
  hospital: { icon: Stethoscope, bg: "bg-rose-50", text: "text-rose-600" },
  mall: { icon: ShoppingBag, bg: "bg-purple-50", text: "text-purple-600" },
  park: { icon: Trees, bg: "bg-green-50", text: "text-green-600" },
  bus: { icon: Bus, bg: "bg-orange-50", text: "text-orange-600" },
  bank: { icon: Landmark, bg: "bg-teal-50", text: "text-teal-600" },
};

export const LOCALITY_DB = {
  whitefield: { zone: "East", landmark: "near ITPL", amenities: [
    { type: "metro", name: "Whitefield Metro Station", distance: "1.2 km" },
    { type: "school", name: "Vydehi School of Excellence", distance: "0.6 km" },
    { type: "hospital", name: "Vydehi Hospital", distance: "1.8 km" },
    { type: "mall", name: "Phoenix Marketcity", distance: "3.1 km" },
  ] },
  "hsr layout": { zone: "South", landmark: "near Agara Lake", amenities: [
    { type: "school", name: "Delhi Public School, HSR", distance: "0.5 km" },
    { type: "hospital", name: "Sakra World Hospital", distance: "1.2 km" },
    { type: "mall", name: "Central Mall, HSR", distance: "2.0 km" },
    { type: "park", name: "HSR Club Park", distance: "0.4 km" },
  ] },
  yelahanka: { zone: "North", landmark: "near the airport road stretch", amenities: [
    { type: "metro", name: "Yelahanka Metro Station", distance: "2.1 km" },
    { type: "school", name: "National Public School", distance: "0.8 km" },
    { type: "hospital", name: "Columbia Asia Hospital", distance: "3.4 km" },
    { type: "park", name: "Yelahanka Lake Park", distance: "1.5 km" },
  ] },
  indiranagar: { zone: "East", landmark: "near 100 Feet Road", amenities: [
    { type: "metro", name: "Indiranagar Metro Station", distance: "0.4 km" },
    { type: "bank", name: "HDFC Bank", distance: "0.3 km" },
    { type: "bus", name: "100 Feet Road Bus Stop", distance: "0.1 km" },
    { type: "mall", name: "Indiranagar Shopping District", distance: "0.5 km" },
  ] },
  koramangala: { zone: "South", landmark: "near Sony World Signal", amenities: [
    { type: "metro", name: "Koramangala Metro (upcoming)", distance: "1.8 km" },
    { type: "school", name: "Christ Academy", distance: "0.9 km" },
    { type: "hospital", name: "St. John's Hospital", distance: "1.5 km" },
    { type: "mall", name: "Forum Mall", distance: "1.1 km" },
  ] },
  default: { zone: "South", landmark: "in a well-connected neighbourhood", amenities: [
    { type: "bus", name: "Local bus stop", distance: "0.4 km" },
    { type: "school", name: "Nearby public school", distance: "1.0 km" },
    { type: "hospital", name: "Nearby multi-specialty hospital", distance: "2.5 km" },
    { type: "bank", name: "Nearby bank branch", distance: "0.8 km" },
  ] },
};

export const MOCK_LISTINGS = [
  { id: 1, title: "30x40 BDA approved corner site in Yelahanka New Town, Bengaluru North", locality: "Yelahanka New Town", zone: "North", price: 8500000, type: "Plot", status: "Published", views: 342, date: "3 days ago" },
  { id: 2, title: "3 BHK gated villa near ITPL, Whitefield, Bengaluru East", locality: "Whitefield", zone: "East", price: 21500000, type: "Villa", status: "Published", views: 518, date: "5 days ago" },
  { id: 3, title: "20x30 BMRDA approved site on Sarjapur Road, Bengaluru East", locality: "Sarjapur Road", zone: "East", price: 4200000, type: "Plot", status: "Draft", views: 0, date: "1 day ago" },
  { id: 4, title: "2 BHK resale apartment in HSR Layout Sector 2, Bengaluru South", locality: "HSR Layout", zone: "South", price: 9800000, type: "Flat", status: "Published", views: 276, date: "1 week ago" },
  { id: 5, title: "40x60 corner BDA allotted site on Kanakapura Road, Bengaluru South", locality: "Kanakapura Road", zone: "South", price: 15000000, type: "Plot", status: "Published", views: 194, date: "2 weeks ago" },
  { id: 6, title: "1800 sq.ft ground floor commercial space in Indiranagar, Bengaluru East", locality: "Indiranagar", zone: "East", price: 32000000, type: "Commercial", status: "Draft", views: 0, date: "6 hours ago" },
];
