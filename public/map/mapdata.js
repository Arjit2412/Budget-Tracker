var simplemaps_countrymap_mapdata={
  main_settings: {
   //General settings
    width: "responsive", //'700' or 'responsive'
    background_color: "#FFFFFF",
    background_transparent: "yes",
    border_color: "#ffffff",
    
    //State defaults
    state_description: "State description",
    state_color: "#88A4BC",
    state_hover_color: "#3B729F",
    state_url: "",
    border_size: 1.5,
    all_states_inactive: "no",
    all_states_zoomable: "yes",
    
    //Location defaults
    location_description: "Location description",
    location_url: "",
    location_color: "#FF0067",
    location_opacity: 0.8,
    location_hover_opacity: 1,
    location_size: 25,
    location_type: "square",
    location_image_source: "frog.png",
    location_border_color: "#FFFFFF",
    location_border: 2,
    location_hover_border: 2.5,
    all_locations_inactive: "no",
    all_locations_hidden: "no",
    
    //Label defaults
    label_color: "#ffffff",
    label_hover_color: "#ffffff",
    label_size: 16,
    label_font: "Arial",
    label_display: "auto",
    label_scale: "yes",
    hide_labels: "no",
    hide_eastern_labels: "no",
   
    //Zoom settings
    zoom: "yes",
    manual_zoom: "yes",
    back_image: "no",
    initial_back: "no",
    initial_zoom: "-1",
    initial_zoom_solo: "no",
    region_opacity: 1,
    region_hover_opacity: 0.6,
    zoom_out_incrementally: "yes",
    zoom_percentage: 0.99,
    zoom_time: 0.5,
    
    //Popup settings
    popup_color: "white",
    popup_opacity: 0.9,
    popup_shadow: 1,
    popup_corners: 5,
    popup_font: "12px/1.5 Verdana, Arial, Helvetica, sans-serif",
    popup_nocss: "no",
    
    //Advanced settings
    div: "map",
    auto_load: "yes",
    url_new_tab: "no",
    images_directory: "default",
    fade_time: 0.1,
    link_text: "View Website",
    popups: "detect",
    state_image_url: "",
    state_image_position: "",
    location_image_url: ""
  },
  state_specific: {
    INAN: {
      name: "Andaman and Nicobar",
      url: "/states/andaman-and-nicobar"
    },
    INAP: {
      name: "Andhra Pradesh",
      url: "/states/andhra-pradesh"
    },
    INAR: {
      name: "Arunachal Pradesh",
      url: "/states/arunachal-pradesh"
    },
    INAS: {
      name: "Assam",
      url: "/states/assam"
    },
    INBR: {
      name: "Bihar",
      url: "/states/bihar"
    },
    INCH: {
      name: "Chandigarh",
      url: "/states/chandigarh"
    },
    INCT: {
      name: "Chhattisgarh",
      url: "/states/chhattisgarh"
    },
    INDH: {
      name: "Dādra and Nagar Haveli and Damān and Diu",
      url: "/states/dadra-and-nagar-haveli-and-daman-and-diu"
    },
    INDL: {
      name: "Delhi",
      url: "/states/delhi"
    },
    INGA: {
      name: "Goa",
      url: "/states/goa"
    },
    INGJ: {
      name: "Gujarat",
      url: "/states/gujarat"
    },
    INHP: {
      name: "Himachal Pradesh",
      url: "/states/himachal-pradesh"
    },
    INHR: {
      name: "Haryana",
      url: "/states/haryana"
    },
    INJH: {
      name: "Jharkhand",
      url: "/states/jharkhand"
    },
    INJK: {
      name: "Jammu and Kashmir",
      url: "/states/jammu-and-kashmir"
    },
    INKA: {
      name: "Karnataka",
      url: "/states/karnataka"
    },
    INKL: {
      name: "Kerala",
      url: "/states/kerala"
    },
    INLA: {
      name: "Ladakh",
      url: "/states/ladakh"
    },
    INLD: {
      name: "Lakshadweep",
      url: "/states/lakshadweep"
    },
    INMH: {
      name: "Maharashtra",
      url: "/states/maharashtra"
    },
    INML: {
      name: "Meghalaya",
      url: "/states/meghalaya"
    },
    INMN: {
      name: "Manipur",
      url: "/states/manipur"
    },
    INMP: {
      name: "Madhya Pradesh",
      url: "/states/madhya-pradesh"
    },
    INMZ: {
      name: "Mizoram",
      url: "/states/mizoram"
    },
    INNL: {
      name: "Nagaland",
      url: "/states/nagaland"
    },
    INOR: {
      name: "Orissa",
      url: "/states/orissa"
    },
    INPB: {
      name: "Punjab",
      url: "/states/punjab"
    },
    INPY: {
      name: "Puducherry",
      url: "/states/puducherry"
    },
    INRJ: {
      name: "Rajasthan",
      url: "/states/rajasthan"
    },
    INSK: {
      name: "Sikkim",
      url: "/states/sikkim"
    },
    INTG: {
      name: "Telangana",
      url: "/states/telangana"
    },
    INTN: {
      name: "Tamil Nadu",
      url: "/states/tamil-nadu"
    },
    INTR: {
      name: "Tripura",
      url: "/states/tripura"
    },
    INUP: {
      name: "Uttar Pradesh",
      url: "/states/uttar-pradesh"
    },
    INUT: {
      name: "Uttaranchal",
      url: "/states/uttaranchal"
    },
    INWB: {
      name: "West Bengal",
      url: "/states/west-bengal"
    }
  },
  locations: {
    "0": {
      name: "New Delhi",
      lat: "28.6",
      lng: "77.2"
    }
  },
  labels: {
    INAN: {
      name: "Andaman and Nicobar",
      parent_id: "INAN"
    },
    INAP: {
      name: "Andhra Pradesh",
      parent_id: "INAP"
    },
    INAR: {
      name: "Arunachal Pradesh",
      parent_id: "INAR"
    },
    INAS: {
      name: "Assam",
      parent_id: "INAS"
    },
    INBR: {
      name: "Bihar",
      parent_id: "INBR"
    },
    INCH: {
      name: "Chandigarh",
      parent_id: "INCH"
    },
    INCT: {
      name: "Chhattisgarh",
      parent_id: "INCT"
    },
    INDH: {
      name: "Dādra and Nagar Haveli and Damān and Diu",
      parent_id: "INDH"
    },
    INDL: {
      name: "Delhi",
      parent_id: "INDL"
    },
    INGA: {
      name: "Goa",
      parent_id: "INGA"
    },
    INGJ: {
      name: "Gujarat",
      parent_id: "INGJ"
    },
    INHP: {
      name: "Himachal Pradesh",
      parent_id: "INHP"
    },
    INHR: {
      name: "Haryana",
      parent_id: "INHR"
    },
    INJH: {
      name: "Jharkhand",
      parent_id: "INJH"
    },
    INJK: {
      name: "Jammu and Kashmir",
      parent_id: "INJK"
    },
    INKA: {
      name: "Karnataka",
      parent_id: "INKA"
    },
    INKL: {
      name: "Kerala",
      parent_id: "INKL"
    },
    INLA: {
      name: "Ladakh",
      parent_id: "INLA"
    },
    INLD: {
      name: "Lakshadweep",
      parent_id: "INLD"
    },
    INMH: {
      name: "Maharashtra",
      parent_id: "INMH"
    },
    INML: {
      name: "Meghalaya",
      parent_id: "INML"
    },
    INMN: {
      name: "Manipur",
      parent_id: "INMN"
    },
    INMP: {
      name: "Madhya Pradesh",
      parent_id: "INMP"
    },
    INMZ: {
      name: "Mizoram",
      parent_id: "INMZ"
    },
    INNL: {
      name: "Nagaland",
      parent_id: "INNL"
    },
    INOR: {
      name: "Orissa",
      parent_id: "INOR"
    },
    INPB: {
      name: "Punjab",
      parent_id: "INPB"
    },
    INPY: {
      name: "Puducherry",
      parent_id: "INPY"
    },
    INRJ: {
      name: "Rajasthan",
      parent_id: "INRJ"
    },
    INSK: {
      name: "Sikkim",
      parent_id: "INSK"
    },
    INTG: {
      name: "Telangana",
      parent_id: "INTG"
    },
    INTN: {
      name: "Tamil Nadu",
      parent_id: "INTN"
    },
    INTR: {
      name: "Tripura",
      parent_id: "INTR"
    },
    INUP: {
      name: "Uttar Pradesh",
      parent_id: "INUP"
    },
    INUT: {
      name: "Uttaranchal",
      parent_id: "INUT"
    },
    INWB: {
      name: "West Bengal",
      parent_id: "INWB"
    }
  },
  legend: {
    entries: []
  },
  regions: {}
};