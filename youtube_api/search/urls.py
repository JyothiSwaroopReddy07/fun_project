
from django.urls import path
from .views import VideoViewset

urlpatterns = [
    path('videos/', VideoViewset.as_view({
        'get': 'list',
    })),
]