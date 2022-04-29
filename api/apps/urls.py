from django.urls import path
from apps.views import PostureDetectionView

urlpatterns = [
    path('', PostureDetectionView.as_view(), name = 'api'),
]