# Hum Bhi Berozgar - हम भी बेरोजगार

A platform for educated unemployed individuals across India to connect, share experiences, and build a community.

## Features

- **User Registration**: Complete registration system with validation
- **Community Browsing**: View and filter registered users
- **CAPTCHA Verification**: Human verification during registration
- **Search & Filter**: Find users by name, college, degree, or graduation year
- **Responsive Design**: Works on all devices
- **Hinglish Interface**: Accessible language for Indian users

## Project Structure

```
hum-bhi-berozgar/
├── server.js                 # Express.js backend server
├── public/                   # Frontend assets
│   ├── html/                # HTML pages
│   │   ├── index.html       # Hero/landing page
│   │   ├── register.html    # Registration page
│   │   └── users.html       # Users listing page
│   ├── css/                 # Stylesheets
│   │   └── style.css        # Main CSS file
│   └── js/                  # JavaScript files
│       ├── main.js          # Homepage functionality
│       ├── register.js      # Registration page logic
│       └── users.js         # Users page functionality
├── scripts/                 # Database scripts
│   └── seed-database.js     # Database seeding script
├── package.json             # Node.js dependencies
└── README.md               # Project documentation
```

## Installation & Setup

1. **Clone the repository**
   ```bash
   git clone `<repository-url>`
   cd hum-bhi-berozgar
   ```
2. **Install dependencies**
   ```bash
   npm install
   ```
3. **Set up MongoDB**

   - Install MongoDB locally or use MongoDB Atlas
   - Set the `MONGODB_URI` environment variable
4. **Seed the database** (optional)
   ```bash
   npm run seed
   ```
5. **Start the server**
   ```bash
   npm start

   # or for development

   npm run dev
   ```
6. **Open in browser**
   ```
   http://localhost:3000
   ```

## Environment Variables

Create a `.env` file in the root directory:

```env
MONGODB_URI=mongodb://localhost:27017
PORT=3000
```

## API Endpoints

- `GET /` - Homepage
- `GET /register` - Registration page
- `GET /users` - Users listing page
- `POST /api/register` - Register new user
- `GET /api/users` - Get all users

## Technologies Used

- **Backend**: Node.js, Express.js, MongoDB
- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **Database**: MongoDB with native driver
- **Styling**: Custom CSS with responsive design
- **Icons**: Font Awesome

## Features

### Core Functionality

- **User Registration**: Complete form with name, degree, college, and graduation year
- **CAPTCHA Verification**: Math-based CAPTCHA to prevent spam
- **User Listing**: Browse all registered community members
- **Search & Filter**: Find users by multiple criteria
- **Responsive Design**: Mobile-friendly interface

### User Experience

- **Hinglish Interface**: Mix of Hindi and English for better accessibility
- **Real-time Validation**: Form validation with helpful error messages
- **Loading States**: Visual feedback during API calls
- **Smooth Animations**: CSS transitions and JavaScript animations

### Security Features

- **Input Validation**: Server-side and client-side validation
- **XSS Prevention**: HTML escaping for user-generated content
- **Duplicate Prevention**: Unique constraints on name + college combination
- **CAPTCHA Protection**: Human verification during registration

## Database Schema

### Users Collection

```javascript
{
  _id: ObjectId,
  name: String (required),
  degree: String (required),
  college: String (required),
  year: String (required),
  registeredAt: ISODate (required)
}
```

### Indexes

- `{ name: 1, college: 1 }` - Unique compound index
- `{ degree: 1 }` - For filtering by degree
- `{ year: 1 }` - For filtering by year
- `{ registeredAt: -1 }` - For sorting by registration date

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

If you encounter any issues or have questions:

- Create an issue on GitHub
- Contact the development team

## Acknowledgments

- Built with ❤ for the Indian community
- Inspired by the need to connect educated unemployed individuals
- Thanks to all contributors and users

---

**Made in India 🇮🇳 | हम भी बेरोजगार**
