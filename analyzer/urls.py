from django.urls import path
from .views import UploadImageView, tests_list

urlpatterns = [
    path('upload/', UploadImageView.as_view(), name='upload-image'),
    path('tests/', tests_list, name='tests-list'),
]