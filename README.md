# News Aggregator API

[![Open in Visual Studio Code](https://classroom.github.com/assets/open-in-vscode-2e0aaae1b6195c2367325f4f02e2d04e9abb55f0b24a779b69b11b9e10269abc.svg)](https://classroom.github.com/online_ide?assignment_repo_id=22180020&assignment_repo_type=AssignmentRepo)

A modern, scalable news aggregation API built with Node.js, Express, and JWT authentication. This API fetches personalized news from NewsAPI.org based on user preferences and provides a clean RESTful interface for news consumption.

## 🚀 Features

### Core Functionality
- **User Authentication**: Secure signup/login with JWT tokens
- **Personalized News**: Get news based on user preferences (technology, sports, business, etc.)
- **Real-time News**: Fetches latest news from NewsAPI.org
- **User Preferences**: Manage news categories of interest
- **Secure API**: JWT-based authentication for all protected routes

### Technical Features
- **Modern JavaScript**: Uses ES6+ features and native fetch API
- **Clean Architecture**: Well-organized service layer separation
- **Environment Configuration**: dotenv for secure credential management
- **Comprehensive Testing**: Full test coverage with TAP framework
- **Error Handling**: Robust error handling and validation
- **Security**: Password hashing with bcrypt, JWT token validation

## 🛠 Tech Stack

- **Runtime**: Node.js 18+
- **Framework**: Express.js
- **Authentication**: JWT (JSON Web Tokens)
- **Password Hashing**: bcrypt
- **HTTP Client**: Native fetch API
- **Testing**: TAP framework
- **Environment**: dotenv
- **External API**: NewsAPI.org

## 📁 Project Structure

```
news-aggregator-api/
├── app.js                 # Main application entry point
├── data/
│   └── users.js          # Mock user database
├── Routes/
│   ├── newsRoutes.js     # News-related endpoints
│   └── userRoutes.js     # User authentication & preferences
├── Services/
│   ├── authService.js    # Authentication business logic
│   ├── newsService.js    # News fetching & processing
│   └── userService.js    # User data management
├── Middleware/
│   └── authMiddleware.js # JWT authentication middleware
├── Utils/
│   └── jwtUtils.js       # JWT token utilities
├── test/
│   └── server.test.js    # Comprehensive API tests
├── .env                  # Environment variables (not committed)
├── .gitignore           # Git ignore rules
├── package.json         # Dependencies and scripts
└── README.md            # This file
```

## 🔧 Installation & Setup

### Prerequisites
- Node.js 18 or higher
- npm or yarn package manager
- NewsAPI.org API key (free tier available)

### Installation Steps

1. **Clone the repository**
   ```bash
   git clone https://github.com/airtribe-projects/news-aggregator-api-amlan-dutta.git
   cd news-aggregator-api-amlan-dutta
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

### Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
# News API Configuration
NEWS_API_KEY=your_newsapi_key_here

# Server Configuration
PORT=3000

# JWT Configuration
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
JWT_EXPIRES_IN=15m
```

**Required Variables:**
- `NEWS_API_KEY`: Your API key from [NewsAPI.org](https://newsapi.org/)

**Optional Variables (with defaults):**
- `PORT`: Server port (default: 3000)
- `JWT_SECRET`: Secret key for JWT signing (default: 'secretkey')
- `JWT_EXPIRES_IN`: Token expiration time (default: '15m')

4. **Start the server**
   ```bash
   npm start
   # or for development
   npm run dev
   ```

The API will be available at `http://localhost:3000`

## 📖 API Documentation

### Authentication Endpoints

#### POST `/users/signup`
Register a new user account.

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "securepassword123",
  "preferences": ["technology", "sports", "business"]
}
```

**Response (200):**
```json
{
  "message": "User registered successfully"
}
```

**Error Responses:**
- `400`: Validation errors (missing fields, user exists)

#### POST `/users/login`
Authenticate user and receive JWT token.

**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "securepassword123"
}
```

**Response (200):**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**Error Responses:**
- `401`: Invalid credentials

### User Preferences Endpoints

#### GET `/users/preferences`
Get current user's news preferences.

**Headers:**
```
Authorization: Bearer <jwt_token>
```

**Response (200):**
```json
{
  "preferences": ["technology", "sports"]
}
```

#### PUT `/users/preferences`
Update user's news preferences.

**Headers:**
```
Authorization: Bearer <jwt_token>
```

**Request Body:**
```json
{
  "preferences": ["movies", "comics", "games"]
}
```

**Response (200):**
```json
{
  "message": "Preferences updated successfully"
}
```

### News Endpoints

#### GET `/news`
Get personalized news based on user preferences.

**Headers:**
```
Authorization: Bearer <jwt_token>
```

**Response (200):**
```json
{
  "news": [
    {
      "id": 1,
      "title": "Latest Tech News",
      "content": "Breaking news in technology...",
      "category": "technology",
      "publishedAt": "2024-01-11T10:00:00Z",
      "source": "TechCrunch",
      "url": "https://example.com/news/1",
      "urlToImage": "https://example.com/image.jpg"
    }
  ]
}
```

## 🧪 Testing

Run the comprehensive test suite:

```bash
npm test
```

The test suite covers:
- User registration and authentication
- JWT token validation
- Preference management
- News fetching (with mock data when API unavailable)
- Error handling scenarios

## 🔐 Security Features

- **Password Hashing**: bcrypt with salt rounds
- **JWT Authentication**: Stateless token-based auth
- **Input Validation**: Request body validation
- **Error Handling**: Secure error responses without data leakage
- **Environment Variables**: Sensitive data stored securely

## 🎯 Supported News Categories

The API supports the following news categories:
- `technology`
- `sports`
- `business`
- `entertainment`
- `health`
- `science`
- `movies` (maps to entertainment)
- `comics` (maps to entertainment)
- `games` (maps to entertainment)

## 🚀 Deployment

### Environment Variables for Production
```env
NEWS_API_KEY=your_production_api_key
NODE_ENV=production
PORT=3000
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
JWT_EXPIRES_IN=15m
```

### Docker Support (Optional)
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
EXPOSE 3000
CMD ["npm", "start"]
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📝 License

This project is licensed under the ISC License - see the package.json file for details.

## 🙏 Acknowledgments

- [NewsAPI.org](https://newsapi.org/) for providing the news data
- [Express.js](https://expressjs.com/) for the web framework
- [JWT.io](https://jwt.io/) for token standards
- Airtribe for the learning opportunity

## 📞 Support

For questions or issues, please open an issue on the GitHub repository.

---

**Note**: This is Assignment 2 for the Backend Engineering Launchpad program at Airtribe. The API uses a mock user database for demonstration purposes. In production, consider using a proper database like MongoDB or PostgreSQL.
