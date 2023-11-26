from django.urls import path
from .views import VectorStoreView, UsersView, CreateVectorStoreView, download_vector_index, FileMetadataView, RetrieverView, FileMetadataByVectorStoreView

urlpatterns = [
    path('vectorstores', VectorStoreView.as_view()),
    path('users', UsersView.as_view()),
    path('createvectorstore', CreateVectorStoreView.as_view()),
    path('download/<str:filename>/', download_vector_index, name='download_vector_index'),
    path('filemetadata', FileMetadataView.as_view()),
    path('retrieve/', RetrieverView.as_view()),
    path('vectorstores/<int:vectorstore_id>/filemetadata', FileMetadataByVectorStoreView.as_view()),
]
