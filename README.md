# CoronaBay

## Development Setup

Clone the repository
```
git clone https://github.com/taylorallen0913/corona-hub
```

Navigate to directory
```
cd corona-hub
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
