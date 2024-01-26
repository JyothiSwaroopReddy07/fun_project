# CeleryTube

This is a youtube video finder which uses celery to run asynchronous tasks and push data into database.
- **Backend:** Django rest framework
- **Asynchronous tasks:** celery, redis server
- **frontend:** Reactjs
- **database:** Sqlite3

## Features
1. Celery to fetch data from youtube every 30 seconds
2. Pushing the data into data base and fetching it.
3. Use filters such as views, likes,comments,favorites, upload date to sort the data in ascending and descending order
4. Implemented Pagination, Search Filter using django-fliters
5. Implemented Dashboard to display the search results
6. Utilized pagination concepts to fetch data in bundle of 10's to frontend
7. Utilized more than 30 API keys of Youtube data v3 api which selects the api key at random and reduce chance of expiration of quota of api requests


## Getting Started

### Prerequisites

- Python 3.10 or higher
- pip (Python package installer)
- Ubuntu or wsl installation(Redis is not available on windows)
- Virtual environment (optional but recommended)
- redis server installed

# Installation

## Backend Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/JyothiSwaroopReddy07/fun_project.git
    ```

2. Create a virtual environment and activate it:
    ```bash
        python -m venv venv
        source venv/bin/activate
    ```
3. Install the required packages:

```bash
    pip install -r requirements.txt
```
4. Make migrations to the models created
   ```bash
   python manage.py makemigrations
   ```

5. Apply the migrations:

```bash
    python manage.py migrate
```

6. Run the development server:
```bash
    python manage.py runserver
```

The backend server should now be running on http://localhost:8000.

## API ENDPOINTS

   ### Get Videos
   - **Method**: GET
   - **EndPoint**: /videos
   - **Params**:
           1. search="searchString" (search using title of video)
           2. category="Field used to sort the data" {"views","comments","likes","favorites","upload_date"}
           3. order = "asc" or "desc" {sorting in ascending or descending order"}
           4. page = page number of the response

   - **Example**: http://127.0.0.1:8000/videos/?search=z&category=likeCount&order=desc&page=1
   - **Response**:
     ```bash
            HTTP 200 OK
            Allow: GET
            Content-Type: application/json
            Vary: Accept
            
            {
                "success": {
                    "count": 4,
                    "next": null,
                    "previous": null,
                    "results": [
                        {
                            "id": "PeXfQ1t2ALw",
                            "title": "Yuzvendra chahal and Ishan Kishan funny moment😂 #cricket #shorts",
                            "thumbnail": "https://i.ytimg.com/vi/PeXfQ1t2ALw/hqdefault.jpg",
                            "publishedAt": "2024-01-09T09:20:57Z",
                            "duration": 0,
                            "viewCount": 3678729,
                            "likeCount": 177583,
                            "commentCount": 82,
                            "favoriteCount": 0
                        },
                        {
                            "id": "2437RbesXDQ",
                            "title": "NZ vs PAK 3rd T20I - Cricket Highlights | Prime Video India",
                            "thumbnail": "https://i.ytimg.com/vi/2437RbesXDQ/hqdefault.jpg",
                            "publishedAt": "2024-01-17T06:15:00Z",
                            "duration": 16,
                            "viewCount": 4338324,
                            "likeCount": 64013,
                            "commentCount": 3392,
                            "favoriteCount": 0
                        },
                        {
                            "id": "dviUIdnTz-A",
                            "title": "IND 119/1 Jaiswal Bazzball Vs Eng, Pak Media Shocked | India Destroy Eng! But Eng 500 V Pak on Day 1",
                            "thumbnail": "https://i.ytimg.com/vi/dviUIdnTz-A/hqdefault.jpg",
                            "publishedAt": "2024-01-25T11:46:31Z",
                            "duration": 20,
                            "viewCount": 43348,
                            "likeCount": 2257,
                            "commentCount": 68,
                            "favoriteCount": 0
                        },
                        {
                            "id": "2Zv8BvnnWjg",
                            "title": "JAISWAL ‘HEARTLESS’ AGAINST HARTLEY AS INDIA NOT ENGLAND PLAY BAZBALL IN HYD TEST…PCB AIK AUR KAMAAL",
                            "thumbnail": "https://i.ytimg.com/vi/2Zv8BvnnWjg/hqdefault.jpg",
                            "publishedAt": "2024-01-25T11:51:44Z",
                            "duration": 22,
                            "viewCount": 41119,
                            "likeCount": 1678,
                            "commentCount": 131,
                            "favoriteCount": 0
                        }
                    ]
                }
            }
     ```



## Redis server Installation

1. Update System Packages
First, update your system's package index. Open a terminal and run:

```bash
sudo apt update
```
2. Install Redis Server
Install Redis by executing:

```bash
sudo apt install redis-server
```
This command downloads and installs Redis and its dependencies.

3. Configure Redis (Optional)
By default, Redis is not configured to run as a daemon. To change this, you'll need to edit the Redis configuration file:

```bash
sudo nano /etc/redis/redis.conf
```
In this file, find the supervised directive. By default, it is set to no. Change it to systemd:


4. Restart Redis Server
To apply the changes, restart the Redis service:

```bash
sudo systemctl restart redis.service
```

5. Enable Redis to Start on Boot
If you want Redis to start automatically when your server boots, run:

```bash
sudo systemctl enable redis.service
```

## Running Celery and Redis Server

1. Open New Terminal,Go to folder youtube_api
   ```bash
   cd youtube_api
   celery -A youtube_api worker -l info
   ```
2. Open New Terminal Again, Go to folder youtube_api
  ```bash
    cd youtube_api
   celery -A youtube_api beat -l info
   ```
This starts the celery to work


## Running Frontend

1. Redirect to folder Frontend in terminal
   ```bash
   cd frontend
   npm install
   npm run start
   ```
The backend server should now be running on http://localhost:3000.

## Result ScreenShots

![Screenshot (98)](https://github.com/JyothiSwaroopReddy07/fun_project/assets/107217455/059e60ef-5e29-458c-9f10-46460812e712)

![Screenshot (99)](https://github.com/JyothiSwaroopReddy07/fun_project/assets/107217455/4c9723d8-9c5d-40a4-a086-c671f19b27a3)

![Screenshot (100)](https://github.com/JyothiSwaroopReddy07/fun_project/assets/107217455/c396fd5b-8d26-40af-badb-fbb4a6bbb7cc)


##  Note: Make sure the port numbers are same as mentioned



## Contributing
Contributions are always welcome! Please read the contribution guidelines first.

## License
This project is licensed under the MIT License - see the LICENSE file for details.

