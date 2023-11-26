from django.urls import path
from .views import index

urlpatterns = [
    path('', index),
    path('join', index),
    path('create', index),
    path('list', index),
    path('details/<str:vectorstore_id>', index),  # Add this line
    path('login', index),
    path('register', index),

]
