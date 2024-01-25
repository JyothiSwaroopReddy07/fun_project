from __future__ import absolute_import, unicode_literals
from django.utils.dateparse import parse_datetime
from celery import shared_task
import requests
from .models import *
from .serializers import *
import requests
from isodate import parse_duration
from django.conf import settings
from django.shortcuts import render

@shared_task
def youtube_api_request():
    search_url = 'https://www.googleapis.com/youtube/v3/search'
    video_url = 'https://www.googleapis.com/youtube/v3/videos'
    search_params = {
        'part': 'snippet',
        'q': 'cricket',
        'key': settings.YOUTUBE_DATA_API_KEY,
        'maxResults': 50,
        'type': 'video',
    }
    video_ids = []
    r = requests.get(search_url,params=search_params)
    results = r.json()['items']
    for result in results:
        video_ids.append(result['id']['videoId'])

    video_params = {
        'key': settings.YOUTUBE_DATA_API_KEY,
        'part': 'snippet,contentDetails,statistics',
        'id': ','.join(video_ids),
        'maxResults': 50,
    }

    r = requests.get(video_url, params= video_params)
    results = r.json()['items']
    for result in results:
        view_count = result['statistics'].get('viewCount', 0)
        like_count = result['statistics'].get('likeCount', 0)
        favorite_count = result['statistics'].get('favoriteCount', 0)
        comment_count = result['statistics'].get('commentCount', 0)

        video_data = {
            'title': result['snippet']['title'],
            'id': result['id'],
            'duration': int(parse_duration(result['contentDetails']['duration']).total_seconds()//60),
            'thumbnail': result['snippet']['thumbnails']['high']['url'],
            'publishedAt': result['snippet']['publishedAt'],
            'viewCount': view_count,
            'likeCount': like_count,
            'favoriteCount': favorite_count,
            'commentCount': comment_count,
        }
        
        published_at = parse_datetime(video_data['publishedAt'])

        video, created = Videos.objects.get_or_create(
            id=video_data['id'],
            defaults={
                'title': video_data['title'],
                'thumbnail': video_data['thumbnail'],
                'publishedAt': published_at,
                'duration': video_data['duration'],
                'viewCount': view_count,
                'likeCount': like_count,
                'favoriteCount': favorite_count,
                'commentCount': comment_count,
            }
        )
        if not created:
            video.title = video_data['title']
            video.thumbnail = video_data['thumbnail']
            video.viewCount = view_count
            video.likeCount = like_count
            video.commentCount = comment_count
            video.favoriteCount = favorite_count
            video.save()
