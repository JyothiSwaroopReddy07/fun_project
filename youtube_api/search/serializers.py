from rest_framework import serializers
from .models import *

# serializer for creation of video to push into database
class VideoCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Videos
        fields = ['id', 'title', 'thumbnail', 'publishedAt', 'duration', 'viewCount','likeCount','commentCount','favoriteCount']
    
    def create(self, validated_data):
        video = Videos.objects.create(**validated_data)
        video.save()
        return video
    

# serializer for Videos model
class VideoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Videos
        fields = ['id','title','thumbnail','publishedAt','duration','viewCount','likeCount','commentCount','favoriteCount']
        read_only_fields = ['id','title','thumbnail','publishedAt','duration','viewCount','likeCount','commentCount','favoriteCount']