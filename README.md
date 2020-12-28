# Pencil search


## Setup

### Clone repo and cd into directory
```
git clone https://github.com/Alameen688/pencil-search
```

### Install dependencies
```
npm install
```
### Serve in development environment
```
npm run dev
```
You should be able to access the server at `http://localhost:3000/`
### Serve in production
```
npm start
```

## Example request

### Search:

GET /search?q="Topic to search"

http://localhost:3000/search?q=Breakdown%20of%20alcohol
http://localhost:3000/search?q=Mitochondria
http://localhost:3000/search?q=Explain%20enzyme%20action%20in%20terms%20of%20the%20%E2%80%98lock%20and%20key%E2%80%99%20hypothesis

Sample response
```
{
  "data":[
    10,
    19,
    55,
    77,
    127
  ]
}
```

Returns all questions that contain an annotation which is anywhere in the subtree of the query topic. 