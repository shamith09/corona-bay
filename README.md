# Corona Bay

Diagnosing COVID-19 based on CT lung scan images.

## Development Setup

Clone the repository
```
git clone https://github.com/shamith09/corona-bay
```

Navigate to directory
```
cd corona-bay
```

Create a .env file in the root directory
```
touch .env
```

Enter MongoDB admin user key into .env file
```
MONGO_USERNAME=admin
MONGO_PASSWORD=MongoDB Password
```

Install all NPM packages
```
npm install && cd client && npm install && cd ..
```

Run site in development mode
```
npm run dev
```
