# ForbiddenBirdYumServer

Server Repository for the ForbiddenBirdYum project, using Fastify and Sequelize with MySQL.

### Getting Started

**Install Dependencies**

```yarn install```

or

```npm install```

**Set Database Credentials**

Create a ```.env``` file inside the root directory with the following structure:
```
DB_HOST=your_host
DB_USER=your_user
DB_PASSWORD=your_password
DB_DATABASE=your_database
```

**Starting Server**

```yarn start```

or

```npm start```

try accessing the server by typing ```http://localhost:3000``` in your browser or sending a ```GET``` request and 
you should see the message ```OK```