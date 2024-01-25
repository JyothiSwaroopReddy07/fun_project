
from rest_framework import parsers, viewsets, status
from .models import *
from .serializers import *
from rest_framework.filters import SearchFilter
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.response import Response


# Create your views here.



# View set for managing Videos Model related data and apis.

class VideoViewset(viewsets.ModelViewSet):
    # queryset to pre-load all the data before processing the api request
    queryset = Videos.objects.all()
    parser_classes = [parsers.JSONParser, parsers.MultiPartParser, parsers.FormParser]
    serializer_class = VideoSerializer
    # search filters
    filter_backends = [DjangoFilterBackend, SearchFilter]

    http_method_names = ['get','post','put','delete']
    # search fitler for title field in video model
    search_fields = ['title']

    action_serializers = {
        'create': VideoCreateSerializer,
        'list': VideoSerializer,
    }

    def get_queryset(self):
        """
        filtering the queryset based on category which is fieldName in Videos Model
        if FieldName is valid -> filter based on the given order(if no order is specified 'desc' is taken as priority).
        else -> default 'publishedAt' fieldName is used to sort the queryset in 'desc' order.
        """
        queryset = self.queryset
        category_field = self.request.query_params.get('category', 'publishedAt')
        order = self.request.query_params.get('order', 'desc')

        if category_field and category_field in [f.name for f in Videos._meta.fields]:
            if order == 'desc':
                queryset = queryset.order_by(f'-{category_field}')
            else:
                queryset = queryset.order_by(category_field)
        else:
            queryset = queryset.order_by(f'-publishedAt')

        return queryset

    # method used to list the list of videos
    def list(self, request):
        response = super(VideoViewset, self).list(request)

        return Response(data={"success":response.data})



