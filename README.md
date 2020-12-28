# Pencil search
Stores and create an index over question objects in MongoDB, and provides a NodeJS + Express based server that exposes a RESTful API to query the index and return questions that match the query.

Access live url at https://pencil-search.herokuapp.com/

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
You should be able to access the server at `https://pencil-search.herokuapp.com/`
### Serve in production
```
npm start
```

# Populate DB from Spreadsheet

```bash
$ node scripts/import_sheet.js
```

This populates the db with the spreadsheet at 
PS: A copy of the current spreadsheet at the time of creating this is included in the codebase at `data/Questions_and_Topics.xlsx` for prosterity just in case the original gets modified or deleted.

## Example request

### Search:

GET /search?q="Topic to search"

https://pencil-search.herokuapp.com/search?q=Breakdown%20of%20alcohol
https://pencil-search.herokuapp.com/search?q=Mitochondria
https://pencil-search.herokuapp.com/search?q=Explain%20enzyme%20action%20in%20terms%20of%20the%20%E2%80%98lock%20and%20key%E2%80%99%20hypothesis

https://pencil-search.herokuapp.com/search?q=Describe%20the%20function%20of%20the%20placenta%20and%20umbilical%20cord%20in%20relation%20to%20exchange%20of%20dissolved%20nutrients,%20gases%20and%20excretory%20products%20(structural%20details%20are%20not%20required)

Sample response
```
{
  "data":[
    {
      "_id":"5fe9bf09803e4332d835e528",
      "question_number":56
    },
    {
      "_id":"5fe9bf09803e4332d835e589",
      "question_number":153
    },
    {
      "_id":"5fe9bf09803e4332d835e5ae",
      "question_number":190
    }
  ]
}
```

Returns all questions that contain an annotation which is anywhere in the subtree of the query topic. 