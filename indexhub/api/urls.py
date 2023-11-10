from django.urls import path
from .views import VectorStoreView, UsersView, CreateVectorStoreView, download_vector_index

urlpatterns = [
    path('vectorstores', VectorStoreView.as_view()),
    path('users', UsersView.as_view()),
    path('createvectorstore', CreateVectorStoreView.as_view()),
    path('download/<str:filename>/', download_vector_index, name='download_vector_index'),
]
