import tourImg01 from "../images/tour-img01.png";
import tourImg02 from "../images/tour-img02.png";
import tourImg03 from "../images/tour-img03.png";
import tourImg04 from "../images/tour-img04.png";
import tourImg05 from "../images/tour-img05.png";
import tourImg06 from "../images/tour-img06.jpg";
import tourImg07 from "../images/tour-img07.png";
import tourImg08 from "../images/tour-img08.png";

const places = [
  {
    id: "01",
    title: "Truffle",
    city: "Viet Nam",
    address: "L73 Landmark, 720A Dien Bien Phu, Ward 22, Binh Thanh, City. Ho Chi Minh",
    distance: 300,
    price: 115,
    maxGroupSize: 100,
    desc: "The French restaurant space is perfect for any occasion. Whether you want to celebrate a birthday, plan a romantic date, or hold an important business meeting, “Truffle” offers a space that meets every need.",
    reviews: [
      {
        name: "jhon doe",
        rating: 4.6,
      },
      {
        name: "john sins",
        rating: 4.2,
      },
    ],
    avgRating: 4.5,
    photo: tourImg01,
    featured: true,
  },
  {
    id: "02",
    title: "SEI Dining",
    city: "Viet Nam",
    distance: 400,
    address: "13-15-17 Dong Khoi, Ben Nghe Ward, District 1, City. Ho Chi Minh",
    price: 20,
    maxGroupSize: 150,
    desc: "With a prime location on the frontage of Dong Khoi Street and possessing a spacious, luxurious and private space. SEI Dining Lounge provides and fully meets your party organization needs, from private personal parties to group, corporate, and business parties.",
    reviews: [],
    avgRating: 4.5,
    photo: tourImg02,
    featured: true,
  },
  {
    id: "03",
    title: "ROS Yacht Club",
    city: "Viet Nam",
    address: "Bach Dang Wharf, 10B Ton Duc Thang Street, Ben Nghe, District 1, City. Ho Chi Minh",
    distance: 500,
    price: 48,
    maxGroupSize: 300,
    desc: "ROS not only owns a million-dollar yacht but also a riverside restaurant located in a prime location in the center of District 1, right at Bach Dang wharf. The space is large, airy, from indoors to outside in the garden and the table area close to the railing with a view of the Saigon River is a romantic place loved by diners every time they come. ROS is proud to be a restaurant with a classy space for your private year-end party.",
    reviews: [
      {
        name: "jhon doe",
        rating: 4.6,
      },
    ],
    avgRating: 4.5,
    photo: tourImg03,
    featured: true,
  },
  {
    id: "04",
    title: "Chill Dining",
    city: "Viet Nam",
    address: "Level 27, AB Tower, 76A Le Lai, Ben Thanh, District 1, City. Ho Chi Minh",
    distance: 500,
    price: 60,
    maxGroupSize: 200,
    desc: "Chill Dining restaurant on the 27th floor of AB Tower, located in an easily accessible and convenient location for guests, an extremely convenient location for organizing events with a diverse and quality menu, Chill Dining will is a great advantage for event organization because it can satisfy the diverse tastes of guests.",
    reviews: [
      {
        name: "jhon doe",
        rating: 4.6,
      },
    ],
    avgRating: 4.5,
    photo: tourImg04,
    featured: true,
  },
  {
    id: "05",
    title: "Chill Skybar",
    city: "Viet Nam",
    address: "Level 26, AB Tower, 76A Le Lai, Ben Thanh, District 1, City. Ho Chi Minh",
    distance: 500,
    price: 10,
    maxGroupSize: 200,
    desc: "Located on the rooftop of AB Tower in the heart of District 1, with a prime location and unique highlights, the rooftop bar Chill Sky Bar has the most expensive view in Saigon, bringing a cool space with stylish decoration. Splendid and luxurious decoration. Every detail, from space, service, food to drinks, from sound to lighting effects, is specially taken care of by Chill Skybar to ensure the success of a classy and memorable party.",
    reviews: [
      {
        name: "jhon doe",
        rating: 4.6,
      },
    ],
    avgRating: 4.5,
    photo: tourImg05,
    featured: false,
  },
  {
    id: "06",
    title: "Towa",
    city: "Viet Nam",
    address: "Floor 28 Saigon Center, 65 Le Loi, Ben Nghe, District 1, City. Ho Chi Minh",
    distance: 500,
    price: 2,
    maxGroupSize: 100,
    desc: "Experience the taste of Japanese cuisine with fresh, filtered ingredients prepared by an experienced chef, bringing diners an enjoyable experience. In particular, have dinner on the high floor, watching the sparkling city of Saigon",
    reviews: [
      {
        name: "jhon doe",
        rating: 4.6,
      },
    ],
    avgRating: 4.5,
    photo: tourImg06,
    featured: false,
  },
  {
    id: "07",
    title: "LAI – Cantonese Restaurant ",
    city: "Viet Nam",
    address: "28th Floor Sedona Suites 92-94 Nam Ky Khoi Nghia, Ben Nghe Ward, District 1, Ho Chi Minh City",
    distance: 500,
    price: 8,
    maxGroupSize: 300,
    desc: "LAI – Cantonese Restaurant is an authentic Chinese cuisine in the heart of Ho Chi Minh City. The restaurant is located in a prime location in Saigon Center and next to Takashimaya Vietnam. The combination of classic and modern brings new culinary discoveries and experiences.",
    reviews: [
      {
        name: "jhon doe",
        rating: 4.6,
      },
    ],
    avgRating: 4.5,
    photo: tourImg07,
    featured: false,
  },
  {
    id: "08",
    title: "The Wann",
    city: "Viet Nam",
    address: "51 Bui Thi Xuan, Pham Ngu Lao Ward, District 1, Ho Chi Minh",
    distance: 500,
    price: 6,
    maxGroupSize: 150,
    desc: "The restaurant has an open, extremely comfortable and unique space to make your party the most special and exciting. Professional and friendly service from the staff will help you have the most complete and successful party.",
    reviews: [
      {
        name: "jhon doe",
        rating: 4.6,
      },
    ],
    avgRating: 4.5,
    photo: tourImg08,
    featured: false,
  },
];

export default places;
